export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 font-sans text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="space-y-4">
          <span className="inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            MAS Admin Frontend
          </span>
          <div className="space-y-3">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Clean Next.js admin starter with typed config and API helpers.
            </h1>
            <p className="max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
              The project is set up for App Router development under `src/`, with shared
              utilities, typed environment access, and a small API client ready for backend
              integration.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-medium">Project structure</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              App routes live in `src/app`, reusable code lives in `src/lib`, and feature or UI
              building blocks belong under `src/components`.
            </p>
          </article>
          <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-medium">Environment</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Configure `NEXT_PUBLIC_API_URL` in `.env.local` before wiring backend requests into
              screens or hooks.
            </p>
          </article>
          <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-medium">Next steps</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Add feature modules, connect auth and API flows, then expand the placeholder
              directories as the admin surface grows.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
