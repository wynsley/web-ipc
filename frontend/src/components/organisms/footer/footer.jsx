import { Paragraph } from "../../atoms/paragraph";
import { FooterBrand } from "../../molecules/footer/footerBrand";
import { FooterCareers } from "../../molecules/footer/footerCareers";
import { FooterSchedule } from "../../molecules/footer/footerSchedule";

function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-blue-dark text-white">
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1986 590"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full lg:block"
      >
        <path d="M 610 0 H 958 L 804 254 Z" fill="white" />
      </svg>

      <div className="relative grid items-center gap-10 px-5 py-10 sm:grid-cols-2 sm:gap-x-6 lg:min-h-[25.5vw] lg:grid-cols-[45%_30%_25%] lg:gap-0 lg:pt-[4.9vw] lg:pb-[2.1vw] lg:pl-[1.5%] lg:pr-[3%]">
        <div className="sm:col-span-2 lg:col-span-1 lg:h-[18.5vw] lg:pr-[15%] flex">
          <FooterBrand />
        </div>
        <FooterCareers />
        <FooterSchedule />
      </div>

      <div className="relative border-t border-white/90 px-5 py-4 lg:py-3">
        <Paragraph
          variant="primary"
          align="center"
          weight="bold"
          size="comfortable"
          className="font-hani leading-snug text-shadow-sm"
          text="Instituto de Educación Superior Tecnológico Privado Celendín"
        />
      </div>
    </footer>
  );
}

export { Footer };
