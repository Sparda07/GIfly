export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#faf8ff] via-[#f8f3ff] to-[#f3ebff] text-neutral-950">
      {/* ===================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================== */}

      <section className="relative flex min-h-[calc(100vh-90px)] items-center justify-center overflow-hidden px-6">
        {/* Background Glow */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            -z-0
            h-[600px]
            w-[600px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-purple-500/15
            blur-[140px]
          "
        />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div
            className="
              mb-7
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-purple-200
              bg-purple-50/70
              px-4
              py-2
              text-sm
              font-medium
              text-purple-700
              shadow-sm
              backdrop-blur-md
            "
          >
            <span className="h-2 w-2 rounded-full bg-purple-500" />
            Simple. Fast. Powerful.
          </div>

          {/* Main Heading */}
          <h1
            className="
              mx-auto
              max-w-4xl
              text-5xl
              font-bold
              tracking-tight
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
            "
          >
            Paste the Link.
            <br />

            <span
              className="
                bg-gradient-to-r
                from-purple-500
                via-fuchsia-500
                to-purple-700
                bg-clip-text
                text-transparent
              "
            >
              Get Your Desired File.
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-7
              max-w-2xl
              text-base
              leading-7
              text-neutral-600
              sm:text-lg
            "
          >
            Turn videos from your favorite platforms into the files you need.
            Paste a link, choose what you want, and let GIFLY handle the rest.
          </p>

          {/* URL INPUT */}
          <div
            className="
              mx-auto
              mt-10
              flex
              max-w-2xl
              flex-col
              gap-3
              rounded-2xl
              border
              border-purple-200/80
              bg-purple-50/70
              p-2
              shadow-[0_20px_60px_rgba(124,58,237,0.10)]
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-purple-300
              hover:shadow-[0_20px_70px_rgba(124,58,237,0.15)]
              sm:flex-row
            "
          >
            <div className="flex flex-1 items-center px-4">
              {/* Link Icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-3 text-purple-400"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>

              <input
                type="text"
                placeholder="Paste a video link..."
                className="
                  w-full
                  bg-transparent
                  py-3
                  text-sm
                  text-neutral-900
                  outline-none
                  placeholder:text-neutral-400
                "
              />
            </div>

            {/* Get Started */}
            <button
              type="button"
              className="
                rounded-xl
                bg-black
                px-7
                py-3
                text-sm
                font-semibold
                text-white
                transition-all
                duration-200
                hover:bg-purple-700
                hover:shadow-lg
                hover:shadow-purple-500/20
                active:scale-[0.98]
              "
            >
              Get Started
            </button>
          </div>

          {/* Supported Platforms */}
          <p className="mt-4 text-xs text-purple-600/70">
            YouTube · Instagram · Reddit · X
          </p>
        </div>

        {/* Scroll Indicator */}
        <div
          className="
            absolute
            bottom-8
            left-1/2
            -translate-x-1/2
            animate-bounce
            text-purple-400
          "
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PRICING SECTION */}
      {/* ===================================================== */}

      <section id="pricing" className="px-6 py-28 sm:py-32">
        <div className="mx-auto max-w-6xl">
          {/* Section Heading */}
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-purple-600">
              Simple Pricing
            </p>

            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Choose what works for you.
            </h2>

            <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
              Start for free or get more daily links when you need them.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* ================================================= */}
            {/* FREE PLAN */}
            {/* ================================================= */}

            <div
              className="
                group
                rounded-3xl
                border
                border-purple-100
                bg-white/70
                p-8
                shadow-sm
                backdrop-blur-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:scale-[1.03]
                hover:border-purple-300
                hover:bg-purple-50
                hover:shadow-[0_25px_60px_rgba(124,58,237,0.12)]
              "
            >
              <p className="text-sm font-medium text-neutral-500">
                Free
              </p>

              <div className="mt-5 flex items-end gap-2">
                <h3 className="text-5xl font-bold tracking-tight">
                  ৳0
                </h3>

                <span className="mb-2 text-sm text-neutral-500">
                  / day
                </span>
              </div>

              <p className="mt-5 text-sm leading-6 text-neutral-600">
                Perfect for trying GIFLY and occasional use.
              </p>

              <div className="my-8 h-px bg-purple-100" />

              <ul className="space-y-4 text-sm text-neutral-700">
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    ✓
                  </span>
                  1 link per day
                </li>

                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    ✓
                  </span>
                  Basic access
                </li>

                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    ✓
                  </span>
                  No subscription
                </li>
              </ul>
            </div>

            {/* ================================================= */}
            {/* 10 TAKA PLAN */}
            {/* ================================================= */}

            <div
              className="
                group
                rounded-3xl
                border
                border-purple-100
                bg-white/70
                p-8
                shadow-sm
                backdrop-blur-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:scale-[1.03]
                hover:border-purple-300
                hover:bg-purple-50
                hover:shadow-[0_25px_60px_rgba(124,58,237,0.12)]
              "
            >
              {/* Popular Badge */}
              <div className="mb-5 inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                Most Popular
              </div>

              <p className="text-sm font-medium text-neutral-500">
                Starter
              </p>

              <div className="mt-5 flex items-end gap-2">
                <h3 className="text-5xl font-bold tracking-tight">
                  ৳10
                </h3>

                <span className="mb-2 text-sm text-neutral-500">
                  / day
                </span>
              </div>

              <p className="mt-5 text-sm leading-6 text-neutral-600">
                More daily links for regular creators and users.
              </p>

              <div className="my-8 h-px bg-purple-100" />

              <ul className="space-y-4 text-sm text-neutral-700">
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    ✓
                  </span>
                  5 links per day
                </li>

                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    ✓
                  </span>
                  Faster processing
                </li>

                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    ✓
                  </span>
                  Great for regular use
                </li>
              </ul>
            </div>

            {/* ================================================= */}
            {/* 20 TAKA PLAN */}
            {/* ================================================= */}

            <div
              className="
                group
                rounded-3xl
                border
                border-purple-100
                bg-white/70
                p-8
                shadow-sm
                backdrop-blur-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:scale-[1.03]
                hover:border-purple-300
                hover:bg-purple-50
                hover:shadow-[0_25px_60px_rgba(124,58,237,0.12)]
              "
            >
              <p className="text-sm font-medium text-neutral-500">
                Pro
              </p>

              <div className="mt-5 flex items-end gap-2">
                <h3 className="text-5xl font-bold tracking-tight">
                  ৳20
                </h3>

                <span className="mb-2 text-sm text-neutral-500">
                  / day
                </span>
              </div>

              <p className="mt-5 text-sm leading-6 text-neutral-600">
                Best for users who need more links every day.
              </p>

              <div className="my-8 h-px bg-purple-100" />

              <ul className="space-y-4 text-sm text-neutral-700">
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    ✓
                  </span>
                  10 links per day
                </li>

                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    ✓
                  </span>
                  Faster processing
                </li>

                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    ✓
                  </span>
                  Best value
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* BUILT TO BE SIMPLE SECTION */}
      {/* ===================================================== */}

      <section className="flex min-h-screen items-center justify-center bg-[#f5f0ff] px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Small Label */}
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-purple-600">
            Built to be simple
          </p>

          {/* Heading */}
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
            GIFLY is designed around one simple idea: give us the link and
            we&apos;ll help you get the file you actually want.
          </p>

          {/* Read Docs */}
          <div className="mt-12">
            <button
              type="button"
              className="
                group
                relative
                inline-flex
                items-center
                gap-3
                overflow-hidden
                rounded-full
                border
                border-purple-200
                bg-white/80
                px-7
                py-3.5
                text-sm
                font-semibold
                text-neutral-900
                shadow-sm
                backdrop-blur-sm
                transition-all
                duration-300
                hover:scale-105
                hover:border-purple-400
                hover:shadow-lg
                hover:shadow-purple-500/10
              "
            >
              {/* Purple Hover Background */}
              <span
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-purple-500
                  via-fuchsia-500
                  to-purple-500
                  transition-transform
                  duration-500
                  group-hover:translate-x-0
                "
              />

              {/* Text */}
              <span
                className="
                  relative
                  z-10
                  transition-colors
                  duration-300
                  group-hover:text-white
                "
              >
                Read Docs
              </span>

              {/* Arrow */}
              <span
                className="
                  relative
                  z-10
                  transition-all
                  duration-300
                  group-hover:translate-x-1
                  group-hover:text-white
                "
              >
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <footer className="border-t border-purple-200/60 bg-[#eee7ff]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            {/* BRAND */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
                  <span className="text-sm font-bold">G</span>
                </div>

                <span className="text-lg font-semibold tracking-tight">
                  GIFLY
                </span>
              </div>

              <p className="mt-5 max-w-md text-sm leading-6 text-neutral-600">
                A simple way to turn your favorite online videos into the
                files you actually want.
              </p>
            </div>

            {/* PRODUCT */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">
                Product
              </h3>

              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                <li>
                  <a
                    href="#pricing"
                    className="transition-colors hover:text-purple-600"
                  >
                    Pricing
                  </a>
                </li>

                <li>
                  <a
                    href="/gif-maker"
                    className="transition-colors hover:text-purple-600"
                  >
                    GIF Maker
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-purple-600"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">
                Company
              </h3>

              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                <li>
                  <a
                    href="/contact"
                    className="transition-colors hover:text-purple-600"
                  >
                    Contact Us
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-purple-600"
                  >
                    Privacy Policy
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-purple-600"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* FOOTER BOTTOM */}
          <div className="mt-12 flex flex-col gap-4 border-t border-purple-200 pt-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} GIFLY. All rights reserved.
            </p>

            <p>Simple. Fast. Powerful.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}