"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-950 text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <span className="text-sm font-bold">G</span>
          </div>

          <div>
            <span className="text-[17px] font-bold tracking-[-0.03em] text-neutral-950">
              GIFLY
            </span>

            <p className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400 sm:block">
              Workspace
            </p>
          </div>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="
              hidden
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-medium
              text-neutral-500
              transition-all
              duration-200
              hover:bg-neutral-100
              hover:text-neutral-950
              sm:block
            "
          >
            Back to website
          </Link>

          <div className="h-6 w-px bg-neutral-200" />

          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "h-9 w-9 ring-2 ring-white shadow-sm",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}