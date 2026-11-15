"use client";

import Link from "next/link";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { useTheme } from "../_context/ThemeContext";

export default function NavBar() {
  const { darkMode, setDarkMode } = useTheme();
  const linkStyle = darkMode
    ? "text-neutral-400 hover:bg-white/[0.06] hover:text-white"
    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950";

  return (
    <header
      className={`sticky top-0 z-50 border-b font-[var(--font-roboto-flex)] backdrop-blur-2xl transition-colors duration-500 ${
        darkMode
          ? "border-white/[0.06] bg-[#111014]/85"
          : "border-black/[0.06] bg-white/80"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:h-[72px] sm:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M7.2 6.5A7.5 7.5 0 1 1 4.8 12" />
              <path d="M4.5 5.2v4h4" />
              <path d="m10 8.7 5 3.3-5 3.3V8.7Z" fill="currentColor" stroke="none" />
            </svg>
          </div>

          <div className="min-w-0">
            <span
              className={`block truncate text-[17px] font-bold tracking-[-0.03em] ${
                darkMode ? "text-white" : "text-neutral-950"
              }`}
            >
              GIFLY
            </span>
            <p
              className={`hidden text-[10px] font-medium uppercase tracking-[0.18em] sm:block ${
                darkMode ? "text-neutral-500" : "text-neutral-400"
              }`}
            >
              CREATE • LOOP • SHARE
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/contact"
            className={`hidden rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 sm:block sm:px-4 ${linkStyle}`}
          >
            Contact Us
          </Link>

          <Link
            href="/dashboard"
            className={`hidden rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 sm:block sm:px-4 ${linkStyle}`}
          >
            Gif Maker
          </Link>

          <div
            className={`hidden h-6 w-px sm:block ${
              darkMode ? "bg-white/10" : "bg-neutral-200"
            }`}
          />

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
              darkMode
                ? "text-neutral-300 hover:bg-white/[0.08] hover:text-white"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
            }`}
          >
            {darkMode ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          <div className={`h-6 w-px ${darkMode ? "bg-white/10" : "bg-neutral-200"}`} />

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                className={`hidden rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 sm:block sm:px-4 ${linkStyle}`}
              >
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button
                type="button"
                className="rounded-xl bg-neutral-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-px hover:bg-neutral-800 hover:shadow-md dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
              >
                <span className="sm:hidden">Start</span>
                <span className="hidden sm:inline">Get Started</span>
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <Link
              href="/dashboard"
              aria-label="Open dashboard"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-white transition-all duration-300 hover:-translate-y-px hover:bg-neutral-800 sm:hidden dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </Link>
            <Link
              href="/dashboard"
              className="hidden items-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-px hover:bg-neutral-800 hover:shadow-md sm:inline-flex dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              Dashboard
            </Link>
            <UserButton
              appearance={{
                elements: { avatarBox: "h-9 w-9 ring-2 ring-white shadow-sm" },
              }}
            />
          </Show>
        </div>
      </div>
    </header>
  );
}
