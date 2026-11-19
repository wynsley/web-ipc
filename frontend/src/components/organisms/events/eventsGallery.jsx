import { useCallback, useMemo, useRef, useState } from "react";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { Button } from "@/components/atoms/button";
import { Pagination } from "@/components/molecules/shared/pagination";
import { GalleryMosaic } from "../shared/galeryMosaic";
import { GalleryLightbox } from "@/components/molecules/shared/galleryLightBox";
import { useMotionPreference } from "@/hooks/globals/useMotionPreference";

import {
  EVENTS_MOSAIC,
  countCells,
} from "../../../../utils/galeryMosaicLayout";
import { eventToItem } from "../../../../utils/galleryAdapters";

// 6 eventos por página = 1 ciclo completo del mosaico EVENTS_MOSAIC.
const ITEMS_PER_PAGE = countCells(EVENTS_MOSAIC);

const TITLE = "Revive Nuestros Eventos";
const DESCRIPTION =
  "Recuerda las actividades de nuestra comunidad. Aquí aparecen los eventos publicados que ya finalizaron; abre una imagen para consultar sus detalles.";

function EventsGallery({ events = [] }) {
  const sectionRef = useRef(null);
  const reducedMotion = useMotionPreference();
  const items = useMemo(() => events.map(eventToItem), [events]);
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

  const openIndex = items.findIndex((item) => item.id === openId);
  const openGlobal = (index) => setOpenId(items[index]?.id ?? null);
  const openFromPage = (localIndex) => openGlobal(start + localIndex);
  const close = useCallback(() => setOpenId(null), []);

  function handlePageChange(nextPage) {
    setPage(nextPage);
    sectionRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  if (items.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 sm:py-18"
    >
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
            <Button variant="danger" onClick={() => openGlobal(start)}>
              Ver galería
            </Button>
          </div>
        </div>

        <GalleryMosaic
          key={safePage}
          items={pageItems}
          layout={EVENTS_MOSAIC}
          onOpen={openFromPage}
          cardProps={{ showDescription: false, titleSize: "xs" }}
        />

        <Pagination
          page={safePage}
          totalPages={totalPages}
          totalItems={items.length}
          pageSize={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
          label="Paginación de la galería de eventos"
        />
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
