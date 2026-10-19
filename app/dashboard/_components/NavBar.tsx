"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "../../(marketing)/_context/ThemeContext";

export default function DashboardNavbar() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <header className={`sticky top-0 z-50 border-b font-[var(--font-roboto-flex)] backdrop-blur-2xl transition-colors duration-500 ${
      darkMode
        ? "border-white/[0.08] bg-[#111014]/80"
        : "border-black/[0.06] bg-white/75"
    }`}>
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-200 group-hover:scale-105 ${darkMode ? "bg-white text-neutral-950" : "bg-neutral-950"}`}>
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

          <div>
            <span className={`text-[17px] font-bold tracking-[-0.03em] ${darkMode ? "text-white" : "text-neutral-950"}`}>
              GIFLY
            </span>

            <p className={`hidden text-[10px] font-medium uppercase tracking-[0.18em] sm:block ${darkMode ? "text-neutral-500" : "text-neutral-400"}`}>
              CREATE • LOOP • SHARE
            </p>
          </div>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className={`hidden rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 sm:block ${darkMode ? "text-neutral-400 hover:bg-white/[0.07] hover:text-white" : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"}`}
          >
            Back to website
          </Link>

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${darkMode ? "text-neutral-300 hover:bg-white/[0.08] hover:text-white" : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"}`}
          >
            {darkMode ? "☀" : "☾"}
          </button>

          <div className={`h-6 w-px ${darkMode ? "bg-white/10" : "bg-neutral-200"}`} />

          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "h-9 w-9 ring-2 ring-white/80 shadow-sm",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
