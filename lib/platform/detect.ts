export type DetectedPlatform =
  | "youtube"
  | "instagram"
  | "reddit"
  | "x"
  | "other";

export function detectPlatform(
  value: string
): DetectedPlatform {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();

    // YouTube
    if (
      hostname === "youtube.com" ||
      hostname.endsWith(".youtube.com") ||
      hostname === "youtu.be"
    ) {
      return "youtube";
    }

    // Instagram
    if (
      hostname === "instagram.com" ||
      hostname.endsWith(".instagram.com")
    ) {
      return "instagram";
    }

    // Reddit
    if (
      hostname === "reddit.com" ||
      hostname.endsWith(".reddit.com") ||
      hostname === "redd.it"
    ) {
      return "reddit";
    }

    // X / Twitter
    if (
      hostname === "x.com" ||
      hostname.endsWith(".x.com") ||
      hostname === "twitter.com" ||
      hostname.endsWith(".twitter.com")
    ) {
      return "x";
    }

    // Unsupported platform
    return "other";
  } catch {
    return "other";
  }
}