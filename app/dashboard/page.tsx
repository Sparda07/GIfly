export default function DashboardPage() {
  return (
    <main className="pb-16">

      {/* HEADER */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-500" />

            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600">
              Workspace
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-[-0.04em] text-neutral-950 sm:text-4xl">
            Welcome back.
          </h1>

          <p className="mt-2 text-[15px] leading-6 text-neutral-500">
            Manage your files, links, and creative work from one place.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-100 bg-white px-4 py-2 text-xs font-semibold text-neutral-600 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Free Plan
        </div>
      </section>


      {/* STAT CARDS */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="group rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
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
              1
            </span>

            <span className="mb-1 text-sm text-neutral-400">
              / 1 links
            </span>
          </div>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full w-full rounded-full bg-purple-500" />
          </div>
        </div>


        <div className="group rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">
              Total downloads
            </p>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm text-blue-600">
              ↓
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold tracking-[-0.04em]">
            24
          </p>

          <p className="mt-2 text-xs text-neutral-400">
            All-time processed files
          </p>
        </div>


        <div className="group rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">
              GIFs created
            </p>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-50 text-sm text-fuchsia-600">
              ✦
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold tracking-[-0.04em]">
            8
          </p>

          <p className="mt-2 text-xs text-neutral-400">
            Created with GIF Maker
          </p>
        </div>


        <div className="group rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">
              Current plan
            </p>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-sm text-amber-600">
              ★
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold tracking-[-0.04em]">
            Free
          </p>

          <button className="mt-2 text-xs font-semibold text-purple-600 transition-colors hover:text-purple-800">
            Upgrade plan →
          </button>
        </div>
      </section>


      {/* MAIN ACTION */}
      <section className="mt-6">
        <div className="relative overflow-hidden rounded-3xl border border-purple-100 bg-white p-7 shadow-[0_4px_30px_rgba(0,0,0,0.04)] sm:p-9">

          {/* Background glow */}
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


            {/* INPUT */}
            <div className="mt-8 flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-2 transition-all focus-within:border-purple-300 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(168,85,247,0.08)] sm:flex-row">

              <div className="flex flex-1 items-center px-4">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3 text-neutral-400"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>

                <input
                  type="text"
                  placeholder="Paste a YouTube, Instagram, Reddit or X link..."
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-neutral-400"
                />
              </div>

              <button
                type="button"
                className="rounded-xl bg-neutral-950 px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/20"
              >
                Process Link
              </button>
            </div>

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

        {/* ACTIVITY */}
        <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">

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

            <Activity
              icon="Y"
              iconClass="bg-red-50 text-red-500"
              title="YouTube video"
              time="2 minutes ago"
            />

            <Activity
              icon="I"
              iconClass="bg-pink-50 text-pink-500"
              title="Instagram Reel"
              time="Yesterday"
            />

            <Activity
              icon="R"
              iconClass="bg-orange-50 text-orange-500"
              title="Reddit video"
              time="2 days ago"
            />

          </div>
        </div>


        {/* PLAN */}
        <div className="relative overflow-hidden rounded-3xl bg-neutral-950 p-7 text-white shadow-xl">

          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-600/30 blur-3xl" />

          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-300">
              Current plan
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">
              Free
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-400">
              Perfect for trying GIFLY before upgrading.
            </p>

            <div className="my-7 h-px bg-white/10" />

            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">
                Daily usage
              </span>

              <span>
                1 / 1
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full rounded-full bg-purple-500" />
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


/* ACTIVITY COMPONENT */

function Activity({
  icon,
  iconClass,
  title,
  time,
}: {
  icon: string;
  iconClass: string;
  title: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">

      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${iconClass}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-800">
            {title}
          </p>

          <p className="mt-1 text-[11px] text-neutral-400">
            {time}
          </p>
        </div>
      </div>

      <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-600">
        Completed
      </span>
    </div>
  );
}