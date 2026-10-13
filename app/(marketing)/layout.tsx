import { ReactNode } from "react";
import NavBar from "./_components/NavBar";
import { PlatformThemeProvider } from "./_context/PlatformThemeContext";
import { ThemeProvider } from "./_context/ThemeContext";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider>
      <PlatformThemeProvider>
        <div className="min-h-screen transition-colors duration-700">
          <NavBar />
          {children}
        </div>
      </PlatformThemeProvider>
    </ThemeProvider>
  );
}