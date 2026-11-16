"use server";

import { Innertube, UniversalCache } from "youtubei.js";
import { env } from "@/data/env/server";

let youtubeClientPromise: ReturnType<typeof Innertube.create> | undefined;

function getYouTubeClient() {
  youtubeClientPromise ??= Innertube.create({
    cache: new UniversalCache(false),
    po_token: env.YOUTUBE_PO_TOKEN,
    visitor_data: env.YOUTUBE_VISITOR_DATA,
  });
  return youtubeClientPromise;
}

function extractYouTubeVideoId(url: string): string {
  try {
    const parsedUrl = new URL(url);

    // youtu.be/VIDEO_ID
    if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);

      if (videoId) {
        return videoId;
      }
    }

    // youtube.com/watch?v=VIDEO_ID
    if (
      parsedUrl.hostname === "youtube.com" ||
      parsedUrl.hostname.endsWith(".youtube.com")
    ) {
      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return videoId;
      }

      // youtube.com/shorts/VIDEO_ID
      const shortsMatch =
        parsedUrl.pathname.match(
          /^\/shorts\/([^/?]+)/
        );

      if (shortsMatch?.[1]) {
        return shortsMatch[1];
      }

      // youtube.com/embed/VIDEO_ID
      const embedMatch =
        parsedUrl.pathname.match(
          /^\/embed\/([^/?]+)/
        );

      if (embedMatch?.[1]) {
        return embedMatch[1];
      }
    }

    throw new Error(
      "Could not extract a YouTube video ID."
    );
  } catch {
    throw new Error(
      "Invalid YouTube URL."
    );
  }
}

export async function getYouTubeVideoUrl(
  youtubeUrl: string
): Promise<string> {
  const videoId =
    extractYouTubeVideoId(youtubeUrl);

  if (env.YOUTUBE_RESOLVER_URL) {
    const response = await fetch(
      env.YOUTUBE_RESOLVER_URL,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(env.YOUTUBE_RESOLVER_SECRET
            ? {
                Authorization: `Bearer ${env.YOUTUBE_RESOLVER_SECRET}`,
              }
            : {}),
        },
        body: JSON.stringify({ url: youtubeUrl }),
        cache: "no-store",
      }
    );

    const data = (await response.json()) as {
      url?: string;
      error?: string;
    };

    if (!response.ok || !data.url) {
      throw new Error(
        data.error ||
          `YouTube resolver worker failed (${response.status}).`
      );
    }

    return data.url;
  }

  console.log(
    "YOUTUBE VIDEO ID:",
    videoId
  );

  try {
    const youtube = await getYouTubeClient();

    // Vercel IPs can receive different format responses from YouTube. Try
    // embedded clients and progressively less restrictive format selections.
    let lastError: unknown;

    const attempts = [
      {
        client: "ANDROID",
        type: "video",
        quality: "360p",
        format: "mp4",
      },
      {
        client: "IOS",
        type: "video",
        quality: "360p",
        format: "mp4",
      },
      {
        client: "WEB_EMBEDDED",
        type: "video",
        quality: "best",
        format: "mp4",
      },
      {
        client: "TV_EMBEDDED",
        type: "video",
        quality: "best",
        format: "mp4",
      },
    ] as const;

    for (const options of attempts) {
      try {
        const streamingData =
          await youtube.getStreamingData(videoId, options);

        if (streamingData.url) {
          console.log(
            "DIRECT YOUTUBE VIDEO URL:",
            streamingData.url
          );

          return streamingData.url;
        }
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new Error("YouTube did not provide a playable video URL.");
  } catch (error) {
    console.error(
      "YOUTUBE RESOLVER ERROR:",
      error
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to resolve YouTube video."
    );
  }
}
