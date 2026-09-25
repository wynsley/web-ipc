import { GiSlicingArrow } from "react-icons/gi";
import { FooterBrand } from "../../molecules/footer/footerBrand";
import { FooterCareers } from "../../molecules/footer/footerCareers";
import { FooterSchedule } from "../../molecules/footer/footerSchedule";
import { FooterSocial } from "../../molecules/footer/footerSocial";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative isolate overflow-hidden bg-[#232E42] text-white">
      {/* Botón scroll-to-top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Volver al inicio"
        className="
          absolute top-4 right-4 z-10
          flex items-center justify-center size-15
          rounded-full border border-white/30
          text-white/80
          transition-all duration-200
          hover:bg-white hover:text-[#232E42] hover:border-white hover:-translate-y-0.5
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
        "
      >
        <GiSlicingArrow className="size-9 -rotate-139 animate-float" />
      </button>

      <div className="relative grid gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-[3%] lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <FooterBrand />
        </div>
        <FooterCareers />
        <FooterSchedule />
        <FooterSocial />
      </div>

      <div className="flex items-center justify-between relative border-t border-white/90 px-5 py-4 lg:py-3">
        <small className="font-euro space-1 text-sm"><i>© 2026 Instituto Privado Celendín · Todos los derechos reservados.</i></small>
        <small className="text-blue/30 font-hani text-sm"><i>Desarrolladores: Wynsley & Yerson</i></small>
      </div>
    </footer>
  );
}

export { Footer };