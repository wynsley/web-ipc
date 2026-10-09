import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { AdmissionsPosterPhoto } from "./admissionsPosterPhoto";

function AdmissionsPosterHeader({ image, imageAlt }) {
  return (
    <div className="relative">
      <AdmissionsPosterPhoto src={image} alt={imageAlt} />
      <div className="absolute bottom-[1cqw] left-[2.5cqw] w-[58%]">
        <Paragraph
          size="inherit"
          variant="inherit"
          weight="bold"
          className="max-w-[43cqw] text-[2cqw] uppercase leading-tight"
        >
          Instituto de Educación Superior Tecnológico Privado Celendín
        </Paragraph>
        <Title
          level="h3"
          size="hero"
          weight="bold"
          className="mt-[2cqw] leading-none"
          style={{ fontSize: "9.5cqw", color: "inherit" }}
        >
          ADMISIÓN
        </Title>
      </div>
    </div>
  );
}

export { AdmissionsPosterHeader };
