import { Image } from "@/components/atoms/image";
import { CardStats } from "../../organisms/home/cardStats";
import { ScrollReveal } from "../../layouts/scrollReveal";
import { stats } from "../../../data/home/statsCards";

function ImageStack() {
  return (
    <div className="relative w-full mx-auto max-w-[30em]">
      <ScrollReveal y={40}>
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src="/INFRAESTRUCTURA.webp"
            alt="Infraestructura del Instituto Privado Celendín"
            className="aspect-square min-h-[280px] w-full sm:min-h-[380px]"
          />
        </div>
      </ScrollReveal>

      <CardStats stats={stats} />
    </div>
  );
}

export { ImageStack };