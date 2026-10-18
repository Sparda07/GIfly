"use server";

import { env } from "@/data/env/server";

const SHOTSTACK_BASE_URL =
  "https://api.shotstack.io/edit/stage";

type ShotstackResult = {
  id: string;
  status: string;
  url: string | null;
  error: string | null;
};

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