import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";

function FooterSchedule() {
  return (
    <section
      aria-labelledby="footer-schedule-title"
      className="min-w-0 text-center lg:self-start lg:pt-[1.2vw]"
    >
      <Title
        id="footer-schedule-title"
        level="h2"
        size="compact"
        variant="primary"
        align="center"
        text="HORARIOS"
        className="mb-5 font-hani lg:mb-7"
      />
      <Paragraph
        variant="primary"
        align="center"
        size="compact"
        className="font-poppins leading-snug"
      >
        Lunes a Viernes
        <span className="mt-1 block">
          <time dateTime="08:30">8:30 a. m.</time>
          {" – "}
          <time dateTime="22:30">10:30 p. m.</time>
        </span>
      </Paragraph>
      <Title
        level="h2"
        size="compact"
        variant="primary"
        align="center"
        text="TURNOS"
        className="mb-3 mt-6 font-hani lg:mt-5"
      />
      <Paragraph
        variant="primary"
        align="center"
        size="compact"
        text="Mañana, Tarde y Noche"
        className="font-poppins leading-snug"
      />
    </section>
  );
}

export { FooterSchedule };
