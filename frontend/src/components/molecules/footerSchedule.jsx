import { Title } from "../atoms/titles";
import { Paragraph } from "../atoms/paragraph";

function FooterSchedule() {
  return (
    <section
      aria-labelledby="footer-schedule-title"
      className="min-w-0 text-center font-hani lg:self-start lg:pt-[1.2vw]"
    >
      <Title
        id="footer-schedule-title"
        level="h2"
        variant="primary"
        align="center"
        text="HORARIOS"
        className="mb-5 lg:mb-7 lg:text-[clamp(1.5rem,2vw,2.5rem)]!"
      />
      <Paragraph
        variant="primary"
        align="center"
        size="base"
        text="Lunes a Viernes"
        className="text-xl! italic sm:text-2xl! lg:text-[clamp(1.1rem,1.65vw,2.1rem)]!"
      />
      <Title
        level="h2"
        variant="primary"
        align="center"
        text="TURNOS"
        className="mb-3 mt-6 lg:mt-5 lg:text-[clamp(1.5rem,2vw,2.5rem)]!"
      />
      <Paragraph
        variant="primary"
        align="center"
        size="base"
        text="Mañana, Tarde y Noche"
        className="text-xl! italic sm:text-2xl! lg:text-[clamp(1.1rem,1.65vw,2.1rem)]!"
      />
    </section>
  );
}

export { FooterSchedule };
