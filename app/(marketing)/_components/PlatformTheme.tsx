"use client";

import { ReactNode } from "react";
import { usePlatformTheme } from "../_context/PlatformThemeContext";

const platformBackgrounds = {
  default: "#f8f7fc",
  youtube: "#fff1f1",
  instagram: "#faf0f8",
  reddit: "#fff5ed",
  x: "#f3f3f3",
};

export default function PlatformTheme({
  children,
}: {
  children: ReactNode;
}) {
  const { platform } = usePlatformTheme();

  return (
    <main
      className="min-h-[calc(100vh-72px)] transition-colors duration-1000 ease-in-out"
      style={{
        backgroundColor: platformBackgrounds[platform],
      }}
    >
      {children}
    </main>
  );
}