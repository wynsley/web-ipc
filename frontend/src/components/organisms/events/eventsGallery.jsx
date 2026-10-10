import { useCallback, useMemo, useState } from "react"
import { motion as Motion } from "motion/react"
import { staggerContainer } from "@/components/animations/animation"
import { Title } from "@/components/atoms/titles"
import { Paragraph } from "@/components/atoms/paragraph"
import { Button } from "@/components/atoms/button"
import { GalleryMosaic } from "../shared/galeryMosaic"
import { GalleryLightbox } from "@/components/molecules/shared/galleryLightBox"
import { getPastEvents } from "@/data/events/evenst"
import { EVENTS_MOSAIC } from "../../../../utils/galeryMosaicLayout"
import { eventToItem } from "../../../../utils/galleryAdapters"

const MAX_ITEMS = 20

const TITLE = "Revive Nuestros Eventos"
const DESCRIPTION =
  "Un recorrido por los momentos que hicieron especiales nuestras charlas, simposios y encuentros. Toca cualquier foto para verla en grande y seguir pasando a la siguiente."

function EventsGallery() {
  const items = useMemo(
    () => getPastEvents().slice(0, MAX_ITEMS).map(eventToItem),
    []
  )
  const [openIndex, setOpenIndex] = useState(null)
  const close = useCallback(() => setOpenIndex(null), [])

  if (items.length === 0) return null

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-18">
      <div className="mx-auto max-w-6xl">
        <Motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 max-w-xl sm:mb-14"
        >
          <Title level="h2" text={TITLE} weight="bold" className="font-hani" />
          <Paragraph
            text={DESCRIPTION}
            variant="secondary"
            size="base"
            className="font-poppins"
          />
          <div className="mt-6">
            <Button variant="danger" onClick={() => setOpenIndex(0)}>
              Ver galería
            </Button>
          </div>
        </Motion.div>

        <GalleryMosaic
          items={items}
          layout={EVENTS_MOSAIC}
          onOpen={setOpenIndex}
          cardProps={{ showDescription: false }}
        />
      </div>

      {openIndex !== null && (
        <GalleryLightbox
          key={openIndex}
          items={items}
          startIndex={openIndex}
          onClose={close}
          label="Galería de eventos"
        />
      )}
    </section>
  )
}

export { EventsGallery }