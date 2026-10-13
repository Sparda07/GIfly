"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type Platform =
  | "default"
  | "youtube"
  | "instagram"
  | "reddit"
  | "x";

interface PlatformThemeContextType {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
}

const PlatformThemeContext =
  createContext<PlatformThemeContextType | undefined>(undefined);

export function PlatformThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [platform, setPlatform] = useState<Platform>("default");

  return (
    <PlatformThemeContext.Provider
      value={{
        platform,
        setPlatform,
      }}
    >
      {children}
    </PlatformThemeContext.Provider>
  );
}

export function usePlatformTheme() {
  const context = useContext(PlatformThemeContext);

  if (!context) {
    throw new Error(
      "usePlatformTheme must be used inside PlatformThemeProvider"
    );
  }

  return context;
}