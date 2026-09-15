import { Link } from "react-router-dom";

function FooterBrand() {
  return (
    <div className="relative mx-auto flex overflow-hidden min-h-44 w-full max-w-lg items-center bg-white px-6 py-6 sm:min-h-56 lg:ml-0 lg:min-h-0 lg:max-w-none lg:self-stretch lg:pl-[8%] lg:pr-[25%] [clip-path:polygon(0_0,80%_0,100%_50%,80%_100%,0_100%)]">
      <div className="relative z-10 flex w-full items-center gap-3 pr-8 lg:gap-4 lg:pr-0">
        <Link
          to="/"
          aria-label="Instituto Privado Celendín, inicio"
          className="min-w-0 flex-1 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-dark"
        >
          <img
            src="/LOGO.webp"
            alt="Instituto Privado Celendín"
            width="479"
            height="231"
            className="h-auto w-full"
          />
        </Link>

        <a
          href="https://site2.q10.com/login?ReturnUrl=%2F&aplentId=14592cc7-5820-4c56-a61c-35fdc90579ed"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Acceder a Q10 (abre en una pestaña nueva)"
          className="relative min-w-0 flex-1 overflow-hidden rounded-md ring-1 ring-inset ring-sky/20 transition-colors duration-150 hover:ring-sky/50 after:pointer-events-none after:absolute after:inset-0 after:bg-sky/0 after:transition-colors after:duration-150 hover:after:bg-sky/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-dark"
        >
          <img
            src="/LOGO_Q10.webp"
            alt="Q10"
            width="400"
            height="400"
            className="h-auto w-full"
          />
        </a>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[3%] top-1/2 flex -rotate-55 gap-2 opacity-50"
      >
        {[0, 1, 2].map((stripe) => (
          <span
            key={stripe}
            className="h-28 w-2 bg-linear-to-t from-sky to-transparent lg:h-40 lg:w-3"
          />
        ))}
      </div>
    </div>
  );
}

export { FooterBrand };
