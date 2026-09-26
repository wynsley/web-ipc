import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";

function FooterSchedule() {
  return (
    <section
      aria-labelledby="footer-schedule-title"
      className="flex min-w-0 flex-col items-center gap-5 text-center sm:items-start sm:text-left lg:self-start lg:pt-[1.2vw]"
    >
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
        <Title
          level="h3"
          size="compact"
          text="HORARIOS:"
          className="mb-5 text-gray-400 font-hani lg:mb-7"
        />
        <Paragraph
          variant="primary"
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
      </div>

      <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
        <Title
          level="h3"
          size="compact"
          text="TURNOS:"
          className="mb-5 text-gray-400 font-hani"
        />
        <Paragraph
          size="compact"
          text="Mañana, Tarde y Noche"
          className="font-poppins leading-snug text-gray-400"
        />
      </div>
    </section>
  );
}

export { FooterSchedule };