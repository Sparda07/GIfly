"use client";

import { ReactNode } from "react";
import DashboardNavbar from "./_components/NavBar";
import { useTheme } from "../(marketing)/_context/ThemeContext";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen font-[var(--font-roboto-flex)] transition-colors duration-500 selection:bg-purple-200 ${
        darkMode
          ? "bg-[#111014] bg-[radial-gradient(circle_at_top_right,_rgba(147,51,234,0.18),_transparent_28rem)] text-white"
          : "bg-[#f8f7fc] bg-[radial-gradient(circle_at_top_right,_rgba(168,85,247,0.12),_transparent_28rem)] text-neutral-950"
      }`}
    >
      <DashboardNavbar />

      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:py-10">
        {children}
      </div>
    </div>
  );
}
