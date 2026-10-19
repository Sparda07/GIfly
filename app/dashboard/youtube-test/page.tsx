import { getYouTubeVideoUrl } from "@/app/action/youtube";

export default function YouTubeTestPage() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">
        YouTube Resolver Test
      </h1>

      <p className="mt-2 text-sm text-neutral-500">
        Test converting a YouTube URL into a direct video URL.
      </p>

      <form
        action={async (formData) => {
          "use server";

          const url =
            formData.get("url");

          if (
            typeof url !== "string" ||
            !url
          ) {
            throw new Error(
              "Please enter a YouTube URL."
            );
          }

          const videoUrl =
            await getYouTubeVideoUrl(url);

          console.log(
            "DIRECT YOUTUBE VIDEO URL:",
            videoUrl
          );
        }}
        className="mt-6 max-w-xl"
      >
        <input
          name="url"
          type="text"
          placeholder="Paste YouTube URL..."
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none"
        />

        <button
          type="submit"
          className="mt-4 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white"
        >
          Resolve Video
        </button>
      </form>
    </main>
  );
}