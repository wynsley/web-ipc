import { Image } from "@/components/atoms/image";
import { Paragraph } from "@/components/atoms/paragraph";
import accountingImage from "@assets/images/careers/accounting/CONTABILIDAD.webp";

function AccountingHeroVisual() {
  return (
    <figure className="relative aspect-4/3 overflow-hidden rounded-tl-[3rem] border-b-4 border-orange bg-blue-dark lg:aspect-4/5">
      <Image
        src={accountingImage}
        alt="Análisis de documentos contables con calculadora"
        fill
        loading="eager"
        fetchPriority="high"
        overlayClassName="bg-linear-to-t from-blue-dark via-blue-dark/10 to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <Paragraph
          as="span"
          className="text-xs uppercase tracking-[0.2em] text-orange"
        >
          Tu futuro profesional
        </Paragraph>
        <Paragraph
          variant="primary"
          className="mt-2 font-hani text-2xl font-bold leading-tight sm:text-3xl"
        >
          Información precisa.
          <br />
          Decisiones con visión.
        </Paragraph>
      </figcaption>
    </figure>
  );
}

export { AccountingHeroVisual };
