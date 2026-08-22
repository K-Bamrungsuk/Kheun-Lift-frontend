import { Link } from "react-router-dom";

function AuthLayout({
  title,
  description,
  footerText,
  footerLinkText,
  footerTo,
  children,
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md">
        <header className="mb-6 text-center sm:mb-8">
          <h1 className="text-3xl font-black tracking-widest text-white sm:text-4xl">
            KHEUN <span className="text-yellow-500">LIFT</span>
          </h1>

          <p className="mt-2 text-sm text-zinc-500 sm:text-base">
            Build your strength. Prove your rank.
          </p>
        </header>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl sm:p-8">
          <div className="mb-6 sm:mb-7">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              {title}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">{description}</p>
          </div>

          {children}

          <p className="mt-6 text-center text-sm text-zinc-400">
            {footerText}

            <Link
              to={footerTo}
              className="ml-1 font-semibold text-yellow-500 transition hover:text-yellow-200"
            >
              {footerLinkText}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default AuthLayout;
