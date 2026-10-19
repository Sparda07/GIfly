import { getDashboardData } from "@/app/action/jobs";
import ProcessLinkForm from "@/app/dashboard/_components/ProcessLinkForm";

export default async function DashboardPage() {
  const {
    recentJobs,
    todayJobs,
    totalJobs,
    completedJobs,
    plan,
  } = await getDashboardData();
  const planName = `${plan.charAt(0).toUpperCase()}${plan.slice(1)}`;

  return (
    <main className="pb-16 font-[var(--font-roboto-flex)]">
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 p-7 shadow-[0_12px_40px_rgba(31,20,52,0.05)] backdrop-blur-sm sm:p-9 dark:border-white/[0.08] dark:bg-white/[0.04]">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600">
                Workspace
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-[-0.055em] text-neutral-950 sm:text-5xl dark:text-white">
              Welcome back.
            </h1>

            <p className="mt-2 text-[15px] leading-6 text-neutral-500 dark:text-neutral-400">
              Manage your files, links, and creative work from one place.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-100 bg-white/90 px-4 py-2 text-xs font-bold text-neutral-600 shadow-sm dark:border-white/[0.1] dark:bg-white/[0.08] dark:text-neutral-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {planName} Plan
          </div>
        </div>
      </section>

      {/* STAT CARDS */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Daily usage */}
        <div className="group rounded-2xl border border-white bg-white/90 p-5 shadow-[0_2px_12px_rgba(31,20,52,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-100 hover:shadow-[0_18px_40px_rgba(126,34,206,0.1)] dark:border-white/[0.08] dark:bg-white/[0.05]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">
              Daily usage
            </p>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-sm text-purple-600">
              ↗
            </span>
          </div>

          <div className="mt-5 flex items-end gap-2">
            <span className="text-3xl font-bold tracking-[-0.04em]">
              {todayJobs}
            </span>

            <span className="mb-1 text-sm text-neutral-400">
              links today
            </span>
          </div>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full rounded-full bg-purple-500"
              style={{ width: `${Math.min(todayJobs * 25, 100)}%` }}
            />
          </div>
        </div>

        {/* Total downloads */}
        <div className="group rounded-2xl border border-white bg-white/90 p-5 shadow-[0_2px_12px_rgba(31,20,52,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-100 hover:shadow-[0_18px_40px_rgba(126,34,206,0.1)] dark:border-white/[0.08] dark:bg-white/[0.05]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">
              Total downloads
            </p>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm text-blue-600">
              ↓
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold tracking-[-0.04em]">
            {totalJobs}
          </p>

          <p className="mt-2 text-xs text-neutral-400">
            All-time processed files
          </p>
        </div>

        {/* GIFs created */}
        <div className="group rounded-2xl border border-white bg-white/90 p-5 shadow-[0_2px_12px_rgba(31,20,52,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-100 hover:shadow-[0_18px_40px_rgba(126,34,206,0.1)] dark:border-white/[0.08] dark:bg-white/[0.05]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">
              GIFs created
            </p>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-50 text-sm text-fuchsia-600">
              ✦
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold tracking-[-0.04em]">
            {completedJobs}
          </p>

          <p className="mt-2 text-xs text-neutral-400">
            Created with GIF Maker
          </p>
        </div>

        {/* Current plan */}
        <div className="group rounded-2xl border border-white bg-white/90 p-5 shadow-[0_2px_12px_rgba(31,20,52,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-100 hover:shadow-[0_18px_40px_rgba(126,34,206,0.1)] dark:border-white/[0.08] dark:bg-white/[0.05]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">
              Current plan
            </p>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-sm text-amber-600">
              ★
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold tracking-[-0.04em]">
            {planName}
          </p>

          <button className="mt-2 text-xs font-semibold text-purple-600 transition-colors hover:text-purple-800">
            Upgrade plan →
          </button>
        </div>
      </section>

      {/* MAIN ACTION */}
      <section className="mt-6">
        <div className="relative overflow-hidden rounded-3xl border border-white bg-white/90 p-7 shadow-[0_10px_35px_rgba(31,20,52,0.06)] sm:p-9 dark:border-white/[0.08] dark:bg-white/[0.05]">
          <div className="pointer-events-none absolute -right-20 -top-32 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-600">
                  Quick action
                </span>

                <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
                  Turn a link into something useful.
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                  Paste a video URL from your favorite platform and choose
                  what you want to create.
                </p>
              </div>

              <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 sm:flex">
                ↗
              </div>
            </div>

            {/* PROCESS LINK FORM */}
            <ProcessLinkForm />

            <div className="mt-4 flex flex-wrap gap-2">
              {["YouTube", "Instagram", "Reddit", "X"].map((platform) => (
                <span
                  key={platform}
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] font-medium text-neutral-500"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM */}
      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* RECENT ACTIVITY */}
        <div className="rounded-3xl border border-white bg-white/90 p-6 shadow-[0_10px_35px_rgba(31,20,52,0.05)] backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.05]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-[-0.03em]">
                Recent activity
              </h2>

              <p className="mt-1 text-xs text-neutral-400">
                Your latest processed links
              </p>
            </div>

            <button className="text-xs font-semibold text-purple-600 hover:text-purple-800">
              View all
            </button>
          </div>

          <div className="mt-6 divide-y divide-neutral-100">
            {recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <Activity
                  key={job.id}
                  jobId={job.id}
                  icon={getPlatformIcon(job.platform)}
                  iconClass={getPlatformIconClass(job.platform)}
                  title={getPlatformTitle(job.platform)}
                  url={job.sourceUrl}
                  time={formatJobTime(job.createdAt)}
                  status={job.status}
                  outputUrl={job.outputUrl}
                  errorMessage={job.errorMessage}
                />
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="text-sm font-medium text-neutral-500">
                  No activity yet.
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  Process your first link to see it here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* PLAN CARD */}
        <div className="relative overflow-hidden rounded-3xl bg-neutral-950 p-7 text-white shadow-xl">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-600/30 blur-3xl" />

          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-300">
              Current plan
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">
              {planName}
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-400">
              Perfect for trying GIFLY before upgrading.
            </p>

            <div className="my-7 h-px bg-white/10" />

            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">
                Daily usage
              </span>

              <span>{todayJobs} today</span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-purple-500"
                style={{ width: `${Math.min(todayJobs * 25, 100)}%` }}
              />
            </div>

            <button className="mt-7 w-full rounded-xl bg-white py-3 text-sm font-semibold text-neutral-950 transition-all hover:bg-purple-50">
              Upgrade plan
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------- */
/* ACTIVITY COMPONENT */
/* -------------------------------------------------- */

function Activity({
  jobId,
  icon,
  iconClass,
  title,
  url,
  time,
  status,
  outputUrl,
  errorMessage,
}: {
  jobId: string;
  icon: string;
  iconClass: string;
  title: string;
  url: string;
  time: string;
  status: string;
  outputUrl: string | null;
  errorMessage: string | null;
}) {
  const completedGifUrl =
    status === "completed" ? outputUrl ?? undefined : undefined;
  const isCompleted = Boolean(completedGifUrl);

  return (
    <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        {isCompleted ? (
          <img
            src={completedGifUrl}
            alt={`${title} GIF preview`}
            className="h-12 w-16 shrink-0 rounded-xl border border-black/[0.06] bg-neutral-100 object-cover"
          />
        ) : (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${iconClass}`}
          >
            {status === "processing" ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : status === "failed" ? (
              "!"
            ) : (
              icon
            )}
          </div>
        )}

        <div className="min-w-0">
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
            {title}
          </p>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block truncate text-[11px] text-neutral-400 transition-colors hover:text-purple-400 hover:underline"
            title={url}
          >
            {url}
          </a>

          <p className="mt-1 text-[11px] text-neutral-400">
            {time}
          </p>

          {status === "processing" && (
            <p className="mt-1 text-[11px] font-medium text-blue-600">
              Creating your GIF…
            </p>
          )}

          {status === "failed" && errorMessage && (
            <p className="mt-1 line-clamp-1 text-[11px] text-red-500" title={errorMessage}>
              {errorMessage}
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-semibold ${getStatusClass(
            status
          )}`}
        >
          {formatStatus(status)}
        </span>

        {isCompleted && (
          <a
            href={`/api/jobs/${jobId}/download`}
            download
            className="rounded-lg bg-neutral-950 px-3 py-1.5 text-[10px] font-semibold text-white transition-colors hover:bg-purple-700"
          >
            Download GIF
          </a>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* PLATFORM HELPERS */
/* -------------------------------------------------- */

function getPlatformIcon(platform: string) {
  switch (platform) {
    case "youtube":
      return "Y";

    case "instagram":
      return "I";

    case "reddit":
      return "R";

    case "twitter":
      return "X";

    default:
      return "?";
  }
}

function getPlatformIconClass(platform: string) {
  switch (platform) {
    case "youtube":
      return "bg-red-50 text-red-500";

    case "instagram":
      return "bg-pink-50 text-pink-500";

    case "reddit":
      return "bg-orange-50 text-orange-500";

    case "twitter":
      return "bg-neutral-100 text-neutral-700";

    default:
      return "bg-purple-50 text-purple-500";
  }
}

function getPlatformTitle(platform: string) {
  switch (platform) {
    case "youtube":
      return "YouTube video";

    case "instagram":
      return "Instagram Reel";

    case "reddit":
      return "Reddit video";

    case "twitter":
      return "X video";

    default:
      return "Video link";
  }
}

/* -------------------------------------------------- */
/* STATUS HELPERS */
/* -------------------------------------------------- */

function formatStatus(status: string) {
  switch (status) {
    case "pending":
      return "Pending";

    case "processing":
      return "Processing";

    case "completed":
      return "Completed";

    case "failed":
      return "Failed";

    default:
      return status;
  }
}

function getStatusClass(status: string) {
  switch (status) {
    case "pending":
      return "bg-amber-50 text-amber-600";

    case "processing":
      return "bg-blue-50 text-blue-600";

    case "completed":
      return "bg-emerald-50 text-emerald-600";

    case "failed":
      return "bg-red-50 text-red-600";

    default:
      return "bg-neutral-100 text-neutral-600";
  }
}

/* -------------------------------------------------- */
/* DATE FORMATTER */
/* -------------------------------------------------- */

function formatJobTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}
