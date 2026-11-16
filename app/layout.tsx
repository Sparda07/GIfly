import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./(marketing)/_context/ThemeContext";

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GIFLY",
  description: "Turn online videos into GIFs with GIFLY.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
    <html
      lang="en"
      className={`${robotoFlex.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-[var(--font-roboto-flex)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
