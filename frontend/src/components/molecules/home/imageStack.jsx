import { CardStats } from "../../organisms/home/cardStats";
import { ScrollReveal } from "../../layouts/scrollReveal";
import { stats } from "../../../data/home/statsCards";

function ImageStack() {
  return (
    <div className="relative w-full mx-auto max-w-[30em]">
      <ScrollReveal y={40}>
        <div className="relative overflow-hidden rounded-xl">
          <img
            src="/INFRAESTRUCTURA.webp"
            alt="Infraestructura"
            className="block w-full h-auto min-h-[280px] sm:min-h-[380px] object-cover"
          />
        </div>
      </ScrollReveal>

      <CardStats stats={stats} />
    </div>
  );
}

export { ImageStack };