"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  Show,
} from "@clerk/nextjs";

import { usePlatformTheme, type Platform } from "../_context/PlatformThemeContext";
import { useTheme } from "../_context/ThemeContext";

const platforms: Array<{
  value: Platform;
  label: string;
  description: string;
  accent: string;
}> = [
  { value: "default", label: "All platforms", description: "Show every link", accent: "bg-neutral-400" },
  { value: "youtube", label: "YouTube", description: "Watch & create", accent: "bg-red-500" },
  { value: "instagram", label: "Instagram", description: "Stories & reels", accent: "bg-gradient-to-br from-amber-400 via-pink-500 to-violet-600" },
  { value: "reddit", label: "Reddit", description: "Posts & media", accent: "bg-orange-500" },
  { value: "x", label: "X", description: "Posts & videos", accent: "bg-neutral-950 dark:bg-white" },
];

function PlatformMark({ platform }: { platform: Platform }) {
  if (platform === "youtube") {
    return <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.52 3.57 12 3.57 12 3.57s-7.52 0-9.4.51A3 3 0 0 0 .5 6.2 31.1 31.1 0 0 0 0 12a31.1 31.1 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.88.51 9.4.51 9.4.51s7.52 0 9.4-.51a3 3 0 0 0 2.1-2.12A31.1 31.1 0 0 0 24 12a31.1 31.1 0 0 0-.5-5.8ZM9.6 15.58V8.42L15.9 12l-6.3 3.58Z" /></svg>;
  }

  if (platform === "instagram") {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" /></svg>;
  }

  if (platform === "reddit") {
    return <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M14.7 16.54c-1.43 1.07-3.97 1.07-5.4 0a.75.75 0 1 0-.9 1.2c.98.73 2.22 1.1 3.6 1.1s2.62-.37 3.6-1.1a.75.75 0 0 0-.9-1.2ZM9.08 12.65a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm5.84 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM22.35 12a3.4 3.4 0 0 0-5.8-2.4A10.6 10.6 0 0 0 12.7 8.5l.8-3.7 2.57.55a1.9 1.9 0 1 0 .16-.73l-3.2-.68a.75.75 0 0 0-.89.58L11.2 8.9a10.6 10.6 0 0 0-3.76.72 3.4 3.4 0 1 0-3.82 5.43 6.46 6.46 0 0 0 2.2 3.6C7.3 20.1 9.5 20.8 12 20.8s4.7-.7 6.18-2.15a6.46 6.46 0 0 0 2.2-3.6A3.4 3.4 0 0 0 22.35 12ZM12 19.3c-3.82 0-6.93-2.56-6.93-5.7S8.18 7.9 12 7.9s6.93 2.56 6.93 5.7-3.1 5.7-6.93 5.7Z" /></svg>;
  }

  if (platform === "x") return <span className="text-xs font-bold leading-none">𝕏</span>;

  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5"><circle cx="12" cy="12" r="8.5" /><path d="M3.8 12h16.4M12 3.5c2.15 2.35 3.25 5.18 3.25 8.5S14.15 18.15 12 20.5C9.85 18.15 8.75 15.32 8.75 12S9.85 5.85 12 3.5Z" /></svg>;
}

export default function NavBar() {
  const { platform, setPlatform } = usePlatformTheme();
  const { darkMode, setDarkMode } = useTheme();
  const [platformMenuOpen, setPlatformMenuOpen] = useState(false);
  const platformMenuRef = useRef<HTMLDivElement>(null);
  const activePlatform = platforms.find((item) => item.value === platform) ?? platforms[0];

  useEffect(() => {
    const closePlatformMenu = (event: MouseEvent) => {
      if (!platformMenuRef.current?.contains(event.target as Node)) setPlatformMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPlatformMenuOpen(false);
    };

    document.addEventListener("mousedown", closePlatformMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closePlatformMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-colors duration-700 ${
        darkMode
          ? "border-white/[0.06] bg-[#111014]/80"
          : "border-black/[0.06] bg-white/75"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8">

        {/* ================= LOGO ================= */}

        <Link
          href="/"
          className="group flex items-center gap-2.5"
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm transition-all duration-700 group-hover:scale-105 ${
              darkMode
                ? "bg-white text-neutral-950"
                : "bg-neutral-950"
            }`}
          >
            <span className="text-sm font-bold">G</span>
          </div>

          <div>
            <span
              className={`text-[17px] font-bold tracking-[-0.03em] transition-colors duration-700 ${
                darkMode
                  ? "text-white"
                  : "text-neutral-950"
              }`}
            >
              GIFLY
            </span>

            <p
              className={`hidden text-[10px] font-medium uppercase tracking-[0.18em] transition-colors duration-700 sm:block ${
                darkMode
                  ? "text-neutral-500"
                  : "text-neutral-400"
              }`}
            >
              Turn Links Into GIFs
            </p>
          </div>
        </Link>

        {/* ================= NAVIGATION ================= */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* Platform Selector */}

          <div ref={platformMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setPlatformMenuOpen((open) => !open)}
              aria-expanded={platformMenuOpen}
              aria-haspopup="menu"
              className={`group flex h-10 items-center gap-2 rounded-xl border px-2.5 pr-2 text-sm font-medium outline-none transition-all duration-300 hover:-translate-y-px focus-visible:ring-2 ${
                darkMode
                  ? "border-white/[0.09] bg-white/[0.06] text-neutral-100 hover:border-white/[0.18] hover:bg-white/[0.1] focus-visible:ring-white/20"
                  : "border-black/[0.08] bg-white/80 text-neutral-700 shadow-sm hover:border-black/[0.14] hover:bg-white hover:shadow-md focus-visible:ring-neutral-300"
              }`}
            >
              <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-white shadow-sm ${activePlatform.accent}`}>
                <PlatformMark platform={platform} />
              </span>
              <span className="hidden max-w-20 truncate sm:block">{activePlatform.label}</span>
              <svg className={`h-4 w-4 transition-transform duration-300 ${platformMenuOpen ? "rotate-180" : ""} ${darkMode ? "text-neutral-500" : "text-neutral-400"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" /></svg>
            </button>

            <div
              role="menu"
              aria-label="Select platform"
              className={`absolute right-0 top-[calc(100%+0.65rem)] w-60 origin-top-right rounded-2xl border p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
                platformMenuOpen
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-2 scale-95 opacity-0"
              } ${darkMode ? "border-white/[0.1] bg-[#1a191e]/95 shadow-black/30" : "border-black/[0.08] bg-white/95 shadow-neutral-900/10"}`}
            >
              <p className={`px-2.5 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${darkMode ? "text-neutral-500" : "text-neutral-400"}`}>Source platform</p>
              {platforms.map((item) => {
                const selected = item.value === platform;
                return (
                  <button
                    key={item.value}
                    type="button"
                    role="menuitemradio"
                    aria-checked={selected}
                    onClick={() => {
                      setPlatform(item.value);
                      setPlatformMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors duration-200 ${
                      selected
                        ? darkMode ? "bg-white/[0.1] text-white" : "bg-neutral-100 text-neutral-950"
                        : darkMode ? "text-neutral-400 hover:bg-white/[0.06] hover:text-neutral-100" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950"
                    }`}
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white shadow-sm ${item.accent}`}><PlatformMark platform={item.value} /></span>
                    <span className="min-w-0 flex-1"><span className="block text-sm font-medium">{item.label}</span><span className={`block truncate text-xs ${darkMode ? "text-neutral-500" : "text-neutral-400"}`}>{item.description}</span></span>
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full transition-all ${selected ? (darkMode ? "bg-white text-neutral-950" : "bg-neutral-950 text-white") : "scale-75 opacity-0"}`}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3"><path d="m5 10 3 3 7-7" /></svg></span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact Us */}

          <Link
            href="/contact"
            className={`hidden rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-700 sm:block ${
              darkMode
                ? "text-neutral-400 hover:bg-white/[0.06] hover:text-white"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
            }`}
          >
            Contact Us
          </Link>

          {/* Gif Maker */}

          <Link
            href="/gif-maker"
            className={`hidden rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-700 sm:block ${
              darkMode
                ? "text-neutral-400 hover:bg-white/[0.06] hover:text-white"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
            }`}
          >
            Gif Maker
          </Link>

          {/* Divider */}

          <div
            className={`hidden h-6 w-px transition-colors duration-700 sm:block ${
              darkMode
                ? "bg-white/10"
                : "bg-neutral-200"
            }`}
          />

          {/* Dark / Light Toggle */}

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-700 ${
              darkMode
                ? "text-neutral-300 hover:bg-white/[0.08] hover:text-white"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
            }`}
          >
            {darkMode ? (
              /* Sun */
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                />

                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41-1.41" />
              </svg>
            ) : (
              /* Moon */
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          {/* Divider */}

          <div
            className={`h-6 w-px transition-colors duration-700 ${
              darkMode
                ? "bg-white/10"
                : "bg-neutral-200"
            }`}
          />

          {/* ================= AUTH ================= */}

          {/* Signed Out */}

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                className={`hidden rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-700 sm:block ${
                  darkMode
                    ? "text-neutral-400 hover:bg-white/[0.06] hover:text-white"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
                }`}
              >
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button
                type="button"
                className={`rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm transition-all duration-700 ${
                  darkMode
                    ? "bg-white text-neutral-950 hover:bg-neutral-200 hover:shadow-md"
                    : "bg-neutral-950 text-white hover:bg-neutral-800 hover:shadow-md"
                }`}
              >
                Get Started
              </button>
            </SignUpButton>
          </Show>

          {/* Signed In */}

          <Show when="signed-in">
            <Link
              href="/dashboard"
              aria-label="Open dashboard"
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 hover:-translate-y-px sm:hidden ${
                darkMode
                  ? "bg-white text-neutral-950 hover:bg-neutral-200"
                  : "bg-neutral-950 text-white hover:bg-neutral-800"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
            </Link>

            <Link
              href="/dashboard"
              className={`hidden items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-px sm:inline-flex ${
                darkMode
                  ? "bg-white text-neutral-950 hover:bg-neutral-200 hover:shadow-md"
                  : "bg-neutral-950 text-white hover:bg-neutral-800 hover:shadow-md"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              Dashboard
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "h-9 w-9 ring-2 ring-white shadow-sm",
                },
              }}
            />
          </Show>
        </div>
      </div>
    </header>
  );
}
