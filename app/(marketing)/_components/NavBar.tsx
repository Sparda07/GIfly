"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [platformOpen, setPlatformOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="px-4 pt-4">
      <nav
        className="
          mx-auto flex max-w-7xl items-center justify-between
          rounded-2xl
          border border-white/10
          bg-linear-to-r
          from-[#09090b]
          via-[#15111c]
          to-[#3b1d5a]
          px-5 py-3
          shadow-[0_10px_35px_rgba(0,0,0,0.15)]
          transition-all duration-300
          hover:from-[#0c0c0f]
          hover:via-[#19131f]
          hover:to-[#452166]
        "
      >
        {/* =========================
            LOGO
        ========================== */}
        <Link href="/" className="flex items-center gap-2">
          <div
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl
              bg-white
              text-black
              shadow-sm
            "
          >
            <span className="text-sm font-bold">G</span>
          </div>

          <span className="text-lg font-semibold tracking-tight text-white">
            GIFLY
          </span>
        </Link>

        {/* =========================
            NAVIGATION LINKS
        ========================== */}
        <div className="hidden items-center gap-1 md:flex">
          {/* PLATFORM DROPDOWN */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setPlatformOpen((prev) => !prev)}
              className="
                flex items-center gap-1.5
                rounded-lg
                px-4 py-2
                text-sm font-medium
                text-neutral-300
                transition-all duration-200
                hover:bg-white/10
                hover:text-white
              "
            >
              Platform

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${
                  platformOpen ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* PLATFORM MENU */}
            {platformOpen && (
              <div
                className="
                  absolute left-0 top-full z-50
                  mt-2 w-56
                  overflow-hidden
                  rounded-xl
                  border border-neutral-200/10
                  bg-[#111014]
                  p-1.5
                  shadow-2xl
                  shadow-black/30
                "
              >
                {/* YouTube */}
                <Link
                  href="#youtube"
                  onClick={() => setPlatformOpen(false)}
                  className="
                    flex items-center gap-3
                    rounded-lg
                    px-3 py-2.5
                    text-sm
                    text-neutral-300
                    transition-all duration-200
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  <span
                    className="
                      flex h-8 w-8 items-center justify-center
                      rounded-lg
                      bg-red-500/10
                      text-xs font-bold
                      text-red-400
                    "
                  >
                    Y
                  </span>

                  <span>YouTube</span>
                </Link>

                {/* Instagram */}
                <Link
                  href="#instagram"
                  onClick={() => setPlatformOpen(false)}
                  className="
                    flex items-center gap-3
                    rounded-lg
                    px-3 py-2.5
                    text-sm
                    text-neutral-300
                    transition-all duration-200
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  <span
                    className="
                      flex h-8 w-8 items-center justify-center
                      rounded-lg
                      bg-pink-500/10
                      text-xs font-bold
                      text-pink-400
                    "
                  >
                    I
                  </span>

                  <span>Instagram</span>
                </Link>

                {/* Reddit */}
                <Link
                  href="#reddit"
                  onClick={() => setPlatformOpen(false)}
                  className="
                    flex items-center gap-3
                    rounded-lg
                    px-3 py-2.5
                    text-sm
                    text-neutral-300
                    transition-all duration-200
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  <span
                    className="
                      flex h-8 w-8 items-center justify-center
                      rounded-lg
                      bg-orange-500/10
                      text-xs font-bold
                      text-orange-400
                    "
                  >
                    R
                  </span>

                  <span>Reddit</span>
                </Link>

                {/* Twitter / X */}
                <Link
                  href="#twitter"
                  onClick={() => setPlatformOpen(false)}
                  className="
                    flex items-center gap-3
                    rounded-lg
                    px-3 py-2.5
                    text-sm
                    text-neutral-300
                    transition-all duration-200
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  <span
                    className="
                      flex h-8 w-8 items-center justify-center
                      rounded-lg
                      bg-white/10
                      text-xs font-bold
                      text-white
                    "
                  >
                    X
                  </span>

                  <span>Twitter / X</span>
                </Link>
              </div>
            )}
          </div>

          {/* GIF MAKER */}
          <Link
            href="/gif-maker"
            className="
              rounded-lg
              px-4 py-2
              text-sm font-medium
              text-neutral-300
              transition-all duration-200
              hover:bg-white/10
              hover:text-white
            "
          >
            GIF Maker
          </Link>

          {/* CONTACT US */}
          <Link
            href="/contact"
            className="
              rounded-lg
              px-4 py-2
              text-sm font-medium
              text-neutral-300
              transition-all duration-200
              hover:bg-white
              hover:text-black
            "
          >
            Contact Us
          </Link>
        </div>

        {/* =========================
            RIGHT SIDE
        ========================== */}
        <div className="flex items-center gap-2">
          {/* DARK MODE */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              text-neutral-300
              transition-all duration-200
              hover:bg-white/10
              hover:text-white
            "
          >
            {darkMode ? (
              /* SUN ICON */
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              /* MOON ICON */
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* =========================
              CLERK - SIGNED OUT
          ========================== */}
          <Show when="signed-out">
            {/* SIGN IN */}
            <SignInButton>
              <button
                type="button"
                className="
                  hidden
                  rounded-lg
                  px-4 py-2
                  text-sm font-medium
                  text-neutral-300
                  transition-all duration-200
                  hover:text-white
                  sm:block
                "
              >
                Sign In
              </button>
            </SignInButton>

            {/* GET STARTED / SIGN UP */}
            <SignUpButton>
              <button
                type="button"
                className="
                  rounded-lg
                  bg-white
                  px-4 py-2
                  text-sm font-semibold
                  text-black
                  transition-all duration-200
                  hover:bg-purple-100
                  hover:shadow-lg
                  hover:shadow-purple-500/20
                "
              >
                Get Started
              </button>
            </SignUpButton>
          </Show>

          {/* =========================
              CLERK - SIGNED IN
          ========================== */}
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            />
          </Show>
        </div>
      </nav>
    </header>
  );
}