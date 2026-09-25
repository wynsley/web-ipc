import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";

function FooterSchedule() {
  return (
    <section
      aria-labelledby="footer-schedule-title"
      className="min-w-0 text-center md:text-left lg:self-start lg:pt-[1.2vw] flex flex-col items-center md:items-start gap-5"
    >
      <div>
        <Title
          level="h3"
          size="compact"
          text="HORARIOS:"
          className="mb-5 text-gray-400 font-hani lg:mb-7 text-center sm:text-left"
        />
        <Paragraph
          variant="primary"
          size="compact"
          className="font-poppins leading-snug text-center sm:text-left"
        >
          Lunes a Viernes
          <span className="mt-1 block">
            <time dateTime="08:30">8:30 a. m.</time>
            {" – "}
            <time dateTime="22:30">10:30 p. m.</time>
          </span>
        </Paragraph>
      </div>
      <div>
        <Title
          level="h3"
          align="center sm:left"
          size="compact"
          text="TURNOS:"
          className="mb-5 text-gray-400 font-hani text-center sm:text-left"
        />
        <Paragraph
          size="compact"
          text="Mañana, Tarde y Noche"
          className="font-poppins leading-snug text-gray-400 text-center sm:text-left"
        />
      </div>
    </section>
  );
}

export { FooterSchedule };