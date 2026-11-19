import { Link } from "react-router-dom";
import { Image } from "@/components/atoms/image";
import { Link as ExternalLink } from "../../atoms/links";

function FooterBrand() {
  return (
    <div className="flex max-w-lg bg-neutral-black items-center justify-between gap-4 px-4 py-4 sm:max-w-none sm:justify-start sm:gap-6 sm:px-6 lg:px-8">
      <Link
        to="/"
        aria-label="Instituto Privado Celendín, inicio"
        className="min-w-0 flex-1 sm:flex-initial sm:w-48 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-dark"
      >
        <Image
          src="/LOGO.webp"
          alt="Instituto Privado Celendín"
          className="aspect-[479/231] w-[12em] transition-transform duration-300 hover:scale-105"
          imageClassName="object-contain"
        />
      </Link>

      <ExternalLink
        href="https://site2.q10.com/login?ReturnUrl=%2F&aplentId=14592cc7-5820-4c56-a61c-35fdc90579ed"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Acceder a Q10 (abre en una pestaña nueva)"
        className="w-20 transition-transform duration-300 hover:scale-110"
      >
        <Image
          transparent
          src="/LOGO_Q10.webp"
          alt="Q10"
          className="aspect-square w-full"
          imageClassName="object-contain"
        />
      </ExternalLink>
    </div>
  );
}

export { FooterBrand };