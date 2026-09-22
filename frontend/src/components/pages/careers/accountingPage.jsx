import { MyTemplate } from "../../templates/myTemplate";
import { HeroBackground } from "../../atoms/heroBackground";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";

function AccountingHero() {
  return (
    <div className="relative h-[380px] overflow-hidden sm:h-[420px] md:h-[450px]">
      <HeroBackground src="https://i.pinimg.com/736x/4c/64/37/4c64377c9b12f7366351808649b16f5c.jpg" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-8 md:px-12">
        <div className="max-w-[550px]">
          <Title
            level="h1"
            text="Contabilidad"
            variant="primary"
            weight="bold"
            align="left"
            className="!text-[32px] sm:!text-[40px] md:!text-[46px] mb-3 drop-shadow-lg"
          />

          <Paragraph
            variant="primary"
            size="small"
            align="left"
            className="!text-[12px] sm:!text-[14px] md:!text-[15px] leading-[1.5] drop-shadow-md"
          >
            Conviértete en un experto en gestión financiera y contable. Domina las
            herramientas más importantes del mundo empresarial y desarrolla habilidades
            para el análisis, control y toma de decisiones financieras estratégicas.
          </Paragraph>
        </div>
      </div>
    </div>
  );
}

function InfoStat({ title, description, border = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center px-5 py-7 text-center ${
        border ? "border-x border-white/60" : ""
      }`}
    >
      <Title
        level="h2"
        text={title}
        variant="primary"
        weight="bold"
        align="center"
        className="!text-[14px] sm:!text-[18px] md:!text-[19px] mb-2"
      />

      <Paragraph
        variant="primary"
        size="small"
        align="center"
        className="!text-[9px] sm:!text-[11px] leading-[1.4]"
      >
        {description}
      </Paragraph>
    </div>
  );
}

function AccountingStats() {
  const stats = [
    {
      title: "3 Años",
      description: "Título profesional en contabilidad",
    },
    {
      title: "100% presencial",
      description: "Te garantizamos una formación práctica, directa y de alta calidad.",
      border: true,
    },
    {
      title: "Alta Empleabilidad",
      description: "Inserción inmediata en empresas.",
    },
  ];

  return (
    <div className="relative z-20 mx-auto -mt-[45px] flex justify-center">
      <div className="grid w-[85%] max-w-[950px] grid-cols-3 overflow-hidden rounded-sm bg-black">
        {stats.map((stat) => (
          <InfoStat
            key={stat.title}
            title={stat.title}
            description={stat.description}
            border={stat.border}
          />
        ))}
      </div>
    </div>
  );
}

function AccountingPage() {
  return (
    <MyTemplate>
      <section className="relative bg-white">
        <AccountingHero />
        <AccountingStats />
        <div className="h-12 bg-white" />
      </section>
    </MyTemplate>
  );
}

export { AccountingPage };