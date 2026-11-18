import { useCallback, useMemo, useState } from "react";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { Button } from "@/components/atoms/button";
import { GalleryMosaic } from "../shared/galeryMosaic";
import { GalleryLightbox } from "@/components/molecules/shared/galleryLightBox";

import { EVENTS_MOSAIC } from "../../../../utils/galeryMosaicLayout";
import { eventToItem } from "../../../../utils/galleryAdapters";

const MAX_ITEMS = 20;

const TITLE = "Revive Nuestros Eventos";
const DESCRIPTION =
  "Recuerda las actividades de nuestra comunidad. Aquí aparecen los eventos publicados que ya finalizaron; abre una imagen para consultar sus detalles.";

function EventsGallery({ events = [] }) {
  const items = useMemo(() => events.map(eventToItem), [events]);
  const [visibleCount, setVisibleCount] = useState(MAX_ITEMS);
  const [openId, setOpenId] = useState(null);
  const openIndex = items.findIndex((item) => item.id === openId);
  const setOpenIndex = (index) => setOpenId(items[index]?.id ?? null);
  const close = useCallback(() => setOpenId(null), []);

  if (items.length === 0) return null;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-18">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-xl sm:mb-14">
          <Title level="h2" text={TITLE} weight="bold" className="font-hani" />
          <Paragraph
            text={DESCRIPTION}
            variant="inherit"
            size="base"
            className="font-poppins text-blue-dark"
          />
          <div className="mt-6">
            <Button variant="danger" onClick={() => setOpenIndex(0)}>
              Ver galería
            </Button>
          </div>
        </div>

        <GalleryMosaic
          items={items.slice(0, visibleCount)}
          layout={EVENTS_MOSAIC}
          onOpen={setOpenIndex}
          cardProps={{ showDescription: false, titleSize: "xs" }}
        />
        {visibleCount < items.length && (
          <Button
            variant="ternary"
            onClick={() => setVisibleCount((count) => count + MAX_ITEMS)}
            text="Ver más eventos"
            className="mt-6"
          />
        )}
      </div>

      {openIndex >= 0 && (
        <GalleryLightbox
          key={items.map((item) => item.id).join(",") + openId}
          items={items}
          startIndex={openIndex}
          onClose={close}
          label="Galería de eventos"
        />
      )}
    </section>
  );
}

export { EventsGallery };
