import {
  BackgroundLines,
  ThreeDMarquee,
} from "../_components/ContactAnimations";

export default function ContactPage() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#faf7ff] text-neutral-950 dark:bg-[#111014] dark:text-white">
      <section className="relative isolate overflow-hidden">
        <BackgroundLines className="absolute inset-0 -z-10 h-full min-h-[720px] opacity-70" />

        <div className="mx-auto grid min-h-[720px] max-w-[1400px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.85fr] lg:gap-20 lg:py-28">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-purple-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.05] dark:text-purple-300">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              Contact GIFLY
            </span>

            <h1 className="mt-7 text-5xl font-bold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Let&apos;s create something{" "}
              <span className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                worth sharing.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-neutral-500 dark:text-neutral-400 sm:text-lg">
              Have a question about GIFLY, need help with a download, or want
              to share an idea? Reach out and we&apos;ll be happy to help.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <ContactCard
                label="Email"
                value="ismailhossain.creates@gmail.com"
                href="mailto:ismailhossain.creates@gmail.com"
              />
              <ContactCard
                label="Phone"
                value="01989771737"
                href="tel:01989771737"
              />
            </div>
          </div>

          <div className="relative z-10 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-[0_20px_70px_rgba(120,80,180,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] dark:shadow-black/20 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600 dark:text-purple-300">
              Get in touch
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
              We&apos;re here to help.
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
              Choose the easiest way to reach us. We&apos;ll get back to you as
              soon as possible.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href="mailto:ismailhossain.creates@gmail.com"
                className="group flex items-center justify-between rounded-2xl border border-purple-200/60 bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
              >
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                    Send an email
                  </span>
                  <span className="mt-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    ismailhossain.creates@gmail.com
                  </span>
                </span>
                <span className="text-xl text-purple-500 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="tel:01989771737"
                className="group flex items-center justify-between rounded-2xl border border-purple-200/60 bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
              >
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                    Call us
                  </span>
                  <span className="mt-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    01989771737
                  </span>
                </span>
                <span className="text-xl text-purple-500 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-purple-200/50 bg-white/40 py-20 dark:border-white/[0.06] dark:bg-white/[0.02]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600 dark:text-purple-300">
              Built for creators
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">
              Download, remix, and share.
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-500 dark:text-neutral-400">
              GIFLY keeps your favorite moments moving.
            </p>
          </div>

          <div className="mt-12">
            <ThreeDMarquee
              images={[
                "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=970&q=80",
                "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=970&q=80",
                "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=970&q=80",
                "https://images.unsplash.com/photo-1611162617263-4ec3060a058e?auto=format&fit=crop&w=970&q=80",
                "https://images.unsplash.com/photo-1611162618479-ee3d24aaef0b?auto=format&fit=crop&w=970&q=80",
                "https://images.unsplash.com/photo-1611162616315-c69b3fa7fbe0?auto=format&fit=crop&w=970&q=80",
                "https://images.unsplash.com/photo-1611162617295-7a3d8b8b7f4e?auto=format&fit=crop&w=970&q=80",
                "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=970&q=80",
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="rounded-2xl border border-purple-200/60 bg-white/60 p-5 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
        {label}
      </span>
      <span className="mt-2 block break-all text-sm font-medium text-neutral-800 dark:text-neutral-200">
        {value}
      </span>
    </a>
  );
}
