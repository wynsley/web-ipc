import { useCallback, useMemo, useState } from "react";
import { GalleryCollage } from "./galleryCollage";
import { GalleryLightbox } from "./galleryLightBox";
import { Title } from "@/components/atoms/titles";
import { Button } from "@/components/atoms/button";
import { getPastEvents } from "@/data/events/evenst";
import { MAX_ITEMS } from "../../../../utils/galeryLayout";
import { motion as Motion } from "motion/react";
import { staggerContainer } from "@/components/animations/animation";
import { Paragraph } from "@/components/atoms/paragraph";

function EventsGallery() {
  const events = useMemo(() => getPastEvents().slice(0, MAX_ITEMS), []);
  const [openIndex, setOpenIndex] = useState(null);
  const close = useCallback(() => setOpenIndex(null), []);

  if (events.length === 0) return null;
  const title = `Revive Nuestros Eventos`
  const description = `Un recorrido por los momentos que hicieron especiales nuestras
            charlas, simposios y encuentros. Toca cualquier foto para verla en
            grande y seguir pasando a la siguiente.`

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-18 ">
      <div className="mx-auto max-w-6xl">
        <Motion.div 
          variants={staggerContainer}
          initial = "hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.2}}
          className="mb-10 max-w-xl sm:mb-14">
          <Title
            level="h2"
            text={title}
            weight="bold"
            className="font-hani"
          />
          <Paragraph
            text={description}
            variant="secondary"
            size="base"
            className="font-poppins"
          />
          <div className="mt-6">
            <Button 
              variant="danger" 
              onClick={() => setOpenIndex(0)}>
              Ver galería
            </Button>
          </div>
        </Motion.div>

        <GalleryCollage events={events} onOpen={setOpenIndex} />
      </div>

      {openIndex !== null && (
        <GalleryLightbox
          events={events}
          startIndex={openIndex}
          onClose={close}
        />
      )}
    </section>
  );
}

export { EventsGallery };