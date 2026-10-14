"use client";

import { useState } from "react";

import { createJob, processJob } from "@/app/action/jobs";
import { detectPlatform } from "@/lib/platform/detect";
import { isValidUrl } from "@/lib/validators/url";

export default function ProcessLinkForm() {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!url.trim()) {
      alert("Please enter a URL.");
      return;
    }

    if (!isValidUrl(url)) {
      alert("Please enter a valid URL.");
      return;
    }

    const platform = detectPlatform(url);

    if (platform === "other") {
      alert(
        "This platform is not supported yet. Please use YouTube, Instagram, Reddit or X."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      // Step 1: Create the job
      const result = await createJob(url, platform);

      if (!result.success || !result.job) {
        throw new Error("Failed to create job.");
      }

      // Step 2: Process the newly-created job
      await processJob(result.job.id);

      // Clear input after successful processing
      setUrl("");

      // Refresh the dashboard so Recent Activity gets the latest data
      window.location.reload();
    } catch (error) {
      console.error("PROCESS LINK ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while processing the link."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-2 transition-all focus-within:border-purple-300 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(168,85,247,0.08)] sm:flex-row">
      <div className="flex flex-1 items-center px-4">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-3 text-neutral-400"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>

        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !isSubmitting) {
              handleSubmit();
            }
          }}
          placeholder="Paste a YouTube, Instagram, Reddit or X link..."
          className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-neutral-400"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="rounded-xl bg-neutral-950 px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Processing..." : "Process Link"}
      </button>
    </div>
  );
}