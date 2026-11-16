import { createServer } from "node:http";
import { Innertube, UniversalCache } from "youtubei.js";

const port = Number(process.env.PORT ?? 8787);
const resolverSecret = process.env.YOUTUBE_RESOLVER_SECRET;

let youtubeClientPromise: ReturnType<typeof Innertube.create> | undefined;

function getYouTubeClient() {
  youtubeClientPromise ??= Innertube.create({
    cache: new UniversalCache(false),
    po_token: process.env.YOUTUBE_PO_TOKEN,
    visitor_data: process.env.YOUTUBE_VISITOR_DATA,
  });

  return youtubeClientPromise;
}

function extractVideoId(value: string) {
  const url = new URL(value);

  if (url.hostname === "youtu.be") {
    return url.pathname.slice(1);
  }

  if (
    url.hostname === "youtube.com" ||
    url.hostname.endsWith(".youtube.com")
  ) {
    if (url.searchParams.get("v")) {
      return url.searchParams.get("v");
    }

    const match = url.pathname.match(
      /^\/(?:shorts|embed)\/([^/?]+)/
    );

    return match?.[1];
  }

  return undefined;
}

async function resolveVideo(value: string) {
  const videoId = extractVideoId(value);

  if (!videoId) {
    throw new Error("Invalid YouTube URL.");
  }

  const attempts = [
    { client: "ANDROID", type: "video", quality: "360p", format: "mp4" },
    { client: "IOS", type: "video", quality: "360p", format: "mp4" },
    { client: "WEB_EMBEDDED", type: "video", quality: "best", format: "mp4" },
    { client: "TV_EMBEDDED", type: "video", quality: "best", format: "mp4" },
  ] as const;

  let lastError: unknown;

  for (const options of attempts) {
    try {
      const format = await (
        await getYouTubeClient()
      ).getStreamingData(videoId, options);

      if (format.url) {
        return format.url;
      }
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("YouTube did not provide streaming data.");
}

function sendJson(
  response: import("node:http").ServerResponse,
  status: number,
  body: Record<string, string>
) {
  response.writeHead(status, {
    "Content-Type": "application/json",
  });
  response.end(JSON.stringify(body));
}

createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/") {
    sendJson(response, 200, { status: "ok" });
    return;
  }

  if (request.method !== "POST" || request.url !== "/resolve") {
    sendJson(response, 404, { error: "Not found." });
    return;
  }

  if (
    resolverSecret &&
    request.headers.authorization !== `Bearer ${resolverSecret}`
  ) {
    sendJson(response, 401, { error: "Unauthorized." });
    return;
  }

  try {
    let body = "";

    for await (const chunk of request) {
      body += chunk;

      if (body.length > 10_000) {
        throw new Error("Request body is too large.");
      }
    }

    const input = JSON.parse(body) as { url?: unknown };

    if (typeof input.url !== "string" || !input.url) {
      throw new Error("A YouTube URL is required.");
    }

    sendJson(response, 200, {
      url: await resolveVideo(input.url),
    });
  } catch (error) {
    console.error("YOUTUBE RESOLVER ERROR:", error);
    sendJson(response, 422, {
      error:
        error instanceof Error
          ? error.message
          : "Unable to resolve the YouTube video.",
    });
  }
}).listen(port, () => {
  console.log(`YouTube resolver listening on port ${port}`);
});
