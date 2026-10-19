"use server";

import { env } from "@/data/env/server";

const SHOTSTACK_BASE_URL =
  "https://api.shotstack.io/edit/stage";
const SHOTSTACK_INGEST_URL =
  "https://api.shotstack.io/ingest/stage";

type ShotstackResult = {
  id: string;
  status: string;
  url: string | null;
  error: string | null;
};

type ShotstackSourceStatus = {
  data?: {
    attributes?: {
      source?: string;
      status?: string;
      error?: string;
    };
  };
};

/**
 * Google video URLs are signed for the requester and cannot be fetched by
 * Shotstack's render workers. Upload the bytes from this server to Shotstack's
 * ingest storage first, then render from its public source URL.
 */
export async function stageVideoForShotstack(
  sourceUrl: string
): Promise<string> {
  const videoResponse = await fetch(sourceUrl);

  if (!videoResponse.ok || !videoResponse.body) {
    throw new Error(
      `Unable to download the source video (${videoResponse.status}).`
    );
  }

  const uploadRequest = await fetch(
    `${SHOTSTACK_INGEST_URL}/upload`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": env.SHOTSTACK_API_KEY,
      },
      body: JSON.stringify({ filename: "source.mp4" }),
    }
  );

  const uploadData = await uploadRequest.json();
  const uploadUrl = uploadData?.data?.attributes?.url as
    | string
    | undefined;
  const sourceId = uploadData?.data?.id as string | undefined;

  if (!uploadRequest.ok || !uploadUrl || !sourceId) {
    throw new Error(
      uploadData?.message ||
        uploadData?.response?.error ||
        "Shotstack did not return an upload URL."
    );
  }

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    body: videoResponse.body,
    // Node.js requires this when the request body is a ReadableStream.
    duplex: "half",
  } as RequestInit & { duplex: "half" });

  if (!uploadResponse.ok) {
    throw new Error(
      `Unable to upload the source video to Shotstack (${uploadResponse.status}).`
    );
  }

  return waitForShotstackSource(sourceId);
}

export async function createShotstackGif(
  sourceUrl: string
): Promise<ShotstackResult> {
  const edit = {
    timeline: {
      tracks: [
        {
          clips: [
            {
              asset: {
                type: "video",
                src: sourceUrl,
              },
              start: 0,
              length: 10,
            },
          ],
        },
      ],
    },

    output: {
      format: "gif",
      resolution: "preview",
      fps: 12,
      repeat: true,
      quality: "low",
    },
  };

  const response = await fetch(
    `${SHOTSTACK_BASE_URL}/render`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": env.SHOTSTACK_API_KEY,
      },
      body: JSON.stringify(edit),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.response?.error ||
        "Shotstack render request failed."
    );
  }

  const renderId = data?.response?.id;

  if (!renderId) {
    throw new Error(
      "Shotstack did not return a render ID."
    );
  }

  return waitForShotstackRender(renderId);
}

async function getShotstackRenderStatus(
  renderId: string
): Promise<ShotstackResult> {
  const response = await fetch(
    `${SHOTSTACK_BASE_URL}/render/${renderId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "x-api-key": env.SHOTSTACK_API_KEY,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.response?.error ||
        "Failed to get Shotstack render status."
    );
  }

  return {
    id: data.response.id,
    status: data.response.status,
    url: data.response.url ?? null,
    error: data.response.error ?? null,
  };
}

async function waitForShotstackRender(
  renderId: string
): Promise<ShotstackResult> {
  const maxAttempts = 30;
  const interval = 2000;

  for (
    let attempt = 1;
    attempt <= maxAttempts;
    attempt++
  ) {
    const result =
      await getShotstackRenderStatus(renderId);

    console.log(
      `SHOTSTACK POLL ${attempt}/${maxAttempts}:`,
      result.status
    );

    if (result.status === "done") {
      return result;
    }

    if (result.status === "failed") {
      throw new Error(
        result.error ||
          "Shotstack render failed."
      );
    }

    await new Promise((resolve) =>
      setTimeout(resolve, interval)
    );
  }

  throw new Error(
    "Shotstack render timed out."
  );
}

async function waitForShotstackSource(
  sourceId: string
): Promise<string> {
  const maxAttempts = 30;
  const interval = 2000;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const response = await fetch(
      `${SHOTSTACK_INGEST_URL}/sources/${sourceId}`,
      {
        headers: {
          Accept: "application/json",
          "x-api-key": env.SHOTSTACK_API_KEY,
        },
        cache: "no-store",
      }
    );
    const data = (await response.json()) as ShotstackSourceStatus;
    const attributes = data.data?.attributes;

    if (!response.ok) {
      throw new Error(
        attributes?.error ||
          "Failed to get Shotstack source status."
      );
    }

    if (attributes?.status === "ready" && attributes.source) {
      return attributes.source;
    }

    if (attributes?.status === "failed") {
      throw new Error(
        attributes.error ||
          "Shotstack could not ingest the source video."
      );
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  throw new Error("Shotstack source upload timed out.");
}
