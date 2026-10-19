"use server";

import { Innertube } from "youtubei.js";

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

  console.log(
    "YOUTUBE VIDEO ID:",
    videoId
  );

  try {
    const youtube =
      await Innertube.create();

    // The web client can require a Proof of Origin token and sometimes
    // responds with formats that do not contain a decipherable URL. Try two
    // mobile clients because their available formats can vary per video.
    let streamingData;
    let lastError: unknown;

    for (const client of ["ANDROID", "IOS"] as const) {
      try {
        streamingData = await youtube.getStreamingData(videoId, {
          client,
          type: "video",
          quality: "360p",
          format: "mp4",
        });

        if (streamingData.url) {
          break;
        }
      } catch (error) {
        lastError = error;
      }
    }

    if (!streamingData?.url) {
      throw lastError instanceof Error
        ? lastError
        : new Error("YouTube did not provide a playable video URL.");
    }

    console.log(
      "YOUTUBE STREAMING DATA:",
      streamingData
    );

    const videoUrl = streamingData.url;

    console.log(
      "DIRECT YOUTUBE VIDEO URL:",
      videoUrl
    );

    return videoUrl;
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
