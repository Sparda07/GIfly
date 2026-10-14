"use client";

import Link from "next/link";
import { useState } from "react";

import { isValidUrl } from "@/lib/validators/url";

import { usePlatformTheme } from "./_context/PlatformThemeContext";
import { useTheme } from "./_context/ThemeContext";

const platformBackgrounds = {
  default: "#faf7ff",
  youtube: "#fff3f3",
  instagram: "#fff2fa",
  reddit: "#fff6ee",
  x: "#f5f5f7",
};

export default function HomePage() {
  const { platform } = usePlatformTheme();
  const { darkMode } = useTheme();

  // ================= URL VALIDATION STATE =================
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  // ================= HANDLE URL SUBMIT =================
  const handleSubmit = () => {
    // Clear previous error
    setError("");

    // Check if input is empty
    if (!url.trim()) {
      setError("Please enter a video URL.");
      return;
    }

    // Check if URL is valid
    if (!isValidUrl(url)) {
      setError("Please enter a valid URL.");
      return;
    }

    // For now, just test the valid URL.
    // Later this will call our API.
    console.log("Valid URL:", url);
  };

  return (
    <main
      className={`min-h-[calc(100vh-72px)] transition-colors duration-1000 ease-in-out ${
        darkMode ? "text-white" : "text-neutral-950"
      }`}
      style={{
        backgroundColor: darkMode
          ? "#111014"
          : platformBackgrounds[platform],
      }}
    >
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1400px] items-center px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto w-full max-w-5xl text-center">
            {/* Badge */}
            <div
              className={`mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium shadow-sm backdrop-blur-sm transition-colors duration-700 ${
                darkMode
                  ? "border-white/10 bg-white/[0.05] text-neutral-400"
                  : "border-purple-200/60 bg-white/60 text-neutral-500"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  darkMode ? "bg-purple-400" : "bg-purple-500"
                }`}
              />

              Turn online videos into GIFs
            </div>

            {/* Heading */}
            <h1
              className={`text-5xl font-bold tracking-[-0.055em] transition-colors duration-700 sm:text-6xl lg:text-7xl ${
                darkMode ? "text-white" : "text-neutral-950"
              }`}
            >
              Paste the Link.
              <br />

              <span className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                Get Your Desired File.
              </span>
            </h1>

            {/* Description */}
            <p
              className={`mx-auto mt-7 max-w-2xl text-base leading-7 transition-colors duration-700 sm:text-lg ${
                darkMode ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              Paste a video link from your favorite platform and turn it into
              a downloadable file with GIFLY.
            </p>

            {/* URL Input */}
            <div className="mx-auto mt-10 max-w-2xl">
              <div
                className={`flex flex-col gap-3 rounded-2xl border p-2 backdrop-blur-xl transition-all duration-700 sm:flex-row ${
                  darkMode
                    ? "border-white/10 bg-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                    : "border-purple-200/50 bg-white/70 shadow-[0_20px_60px_rgba(120,80,180,0.10)]"
                }`}
              >
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);

                    // Clear error while user is typing
                    if (error) {
                      setError("");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                  placeholder="Paste your video link here..."
                  className={`h-12 flex-1 rounded-xl bg-transparent px-4 text-sm outline-none ${
                    darkMode
                      ? "text-white placeholder:text-neutral-500"
                      : "text-neutral-900 placeholder:text-neutral-400"
                  }`}
                />

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="h-12 rounded-xl bg-neutral-950 px-7 text-sm font-semibold text-white transition-all duration-200 hover:bg-neutral-800 hover:shadow-lg dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                >
                  Get Started
                </button>
              </div>

              {/* Validation Error */}
              {error && (
                <p className="mt-2 px-2 text-left text-sm text-red-500">
                  {error}
                </p>
              )}
            </div>

            {/* Supported Platforms */}
            <div className="mt-8">
              <p
                className={`text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-700 ${
                  darkMode ? "text-neutral-500" : "text-neutral-400"
                }`}
              >
                Supported Platforms
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <PlatformBadge
                  name="YouTube"
                  active={platform === "youtube"}
                  darkMode={darkMode}
                />

                <PlatformBadge
                  name="Instagram"
                  active={platform === "instagram"}
                  darkMode={darkMode}
                />

                <PlatformBadge
                  name="Reddit"
                  active={platform === "reddit"}
                  darkMode={darkMode}
                />

                <PlatformBadge
                  name="X"
                  active={platform === "x"}
                  darkMode={darkMode}
                />
              </div>
            </div>

            {/* Read Docs */}
            <div className="mt-10">
              <Link
                href="/docs"
                className={`group inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                  darkMode
                    ? "border-white/10 bg-white/[0.04] text-neutral-400 hover:bg-white/[0.08] hover:text-white"
                    : "border-purple-200/60 bg-white/50 text-neutral-600 hover:bg-white hover:text-neutral-950"
                }`}
              >
                Read Docs

                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    d="M4 10h12M11 5l5 5-5 5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM INFO */}
      <section
        className={`border-t transition-colors duration-700 ${
          darkMode ? "border-white/[0.06]" : "border-purple-200/40"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                darkMode ? "text-neutral-500" : "text-neutral-400"
              }`}
            >
              One simple workflow
            </p>

            <h2
              className={`mt-4 text-3xl font-bold tracking-[-0.04em] transition-colors duration-700 sm:text-4xl ${
                darkMode ? "text-white" : "text-neutral-950"
              }`}
            >
              One link. One click. Your file.
            </h2>

            <p
              className={`mt-5 text-base leading-7 transition-colors duration-700 ${
                darkMode ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              GIFLY keeps the process simple. Choose your platform, paste your
              link, and let GIFLY handle the rest.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            <StepCard
              number="01"
              title="Choose a platform"
              description="Select YouTube, Instagram, Reddit, or X from the navigation."
              darkMode={darkMode}
            />

            <StepCard
              number="02"
              title="Paste your link"
              description="Add the video URL you want to process."
              darkMode={darkMode}
            />

            <StepCard
              number="03"
              title="Get your file"
              description="GIFLY processes your request and gives you the result."
              darkMode={darkMode}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

// ==========================================================
// PLATFORM BADGE
// ==========================================================

function PlatformBadge({
  name,
  active,
  darkMode,
}: {
  name: string;
  active: boolean;
  darkMode: boolean;
}) {
  return (
    <span
      className={`
        rounded-full
        border
        px-4
        py-2
        text-xs
        font-medium
        transition-all
        duration-500
        ${
          active
            ? darkMode
              ? "border-white/10 bg-white/10 text-white shadow-sm"
              : "border-purple-200 bg-white text-neutral-950 shadow-sm"
            : darkMode
              ? "border-white/[0.06] bg-white/[0.04] text-neutral-500"
              : "border-black/[0.06] bg-white/40 text-neutral-400"
        }
      `}
    >
      {name}
    </span>
  );
}

// ==========================================================
// STEP CARD
// ==========================================================

function StepCard({
  number,
  title,
  description,
  darkMode,
}: {
  number: string;
  title: string;
  description: string;
  darkMode: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${
        darkMode
          ? "border-white/[0.06] bg-white/[0.04] hover:bg-white/[0.07] hover:shadow-[0_15px_40px_rgba(0,0,0,0.20)]"
          : "border-purple-200/40 bg-white/50 hover:bg-white hover:shadow-[0_15px_40px_rgba(120,80,180,0.08)]"
      }`}
    >
      <span
        className={`text-xs font-semibold tracking-[0.15em] ${
          darkMode ? "text-neutral-500" : "text-neutral-400"
        }`}
      >
        {number}
      </span>

      <h3
        className={`mt-5 text-lg font-semibold tracking-[-0.02em] ${
          darkMode ? "text-white" : "text-neutral-950"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-3 text-sm leading-6 ${
          darkMode ? "text-neutral-400" : "text-neutral-500"
        }`}
      >
        {description}
      </p>
    </div>
  );
}