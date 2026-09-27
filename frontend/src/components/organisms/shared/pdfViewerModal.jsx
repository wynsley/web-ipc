import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  HiXMark,
  HiArrowDownTray,
  HiChevronLeft,
  HiChevronRight,
  HiMagnifyingGlassPlus,
  HiMagnifyingGlassMinus,
} from "react-icons/hi2";

// Worker de pdf.js (necesario para que react-pdf renderice).
// El sufijo ?url le dice a Vite: "trátalo como asset y dame su URL final",
// evitando el problema de resolución de `new URL(..., import.meta.url)`.
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

function PdfViewerModal({ isOpen, pdfUrl, title, onClose }) {
  const [containerWidth, setContainerWidth] = useState(
    typeof window !== "undefined" ? Math.min(window.innerWidth * 0.9, 800) : 800
  );

  // Bloquea el scroll del body mientras el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Ajusta el ancho del PDF según el tamaño de pantalla (responsive)
  useEffect(() => {
    function handleResize() {
      const isMobile = window.innerWidth < 640;
      setContainerWidth(isMobile ? window.innerWidth - 32 : Math.min(window.innerWidth * 0.8, 800));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative flex flex-col
          w-full h-full sm:h-[90vh] sm:max-w-3xl
          overflow-hidden
          bg-white shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 bg-[#38383D] px-4 sm:px-6 py-3 sm:py-4 text-white">
          <h2 className="font-hani text-sm sm:text-lg font-bold truncate">
            {title}
          </h2>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              title="Descargar PDF"
              className="
                flex items-center justify-center size-8 sm:size-9 rounded-full
                bg-white/10 hover:bg-orange transition-colors duration-200
              "
            >
              <HiArrowDownTray className="size-4 sm:size-5" />
            </a>

            <button
              type="button"
              onClick={onClose}
              title="Cerrar"
              className="
                flex items-center justify-center size-8 sm:size-9 rounded-full
                bg-white/10 hover:bg-white/20 transition-colors duration-200
              "
            >
              <HiXMark className="size-4 sm:size-5" />
            </button>
          </div>
        </div>

        {/* key={pdfUrl}: al cambiar de documento, React remonta este bloque
            desde cero, así pageNumber/numPages nacen limpios sin usar un
            efecto para "resetear" estado (patrón recomendado por React). */}
        <PdfDocumentView
          key={pdfUrl}
          pdfUrl={pdfUrl}
          containerWidth={containerWidth}
        />
      </div>
    </div>
  );
}

/**
 * Cuerpo + paginación del PDF. Vive en un componente aparte para que,
 * remontado por el `key={pdfUrl}` del padre, su estado (pageNumber,
 * numPages) siempre arranque en los valores iniciales al abrir un
 * documento distinto.
 */
function PdfDocumentView({ pdfUrl, containerWidth }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [zoom, setZoom] = useState(1);
  const scrollRef = useRef(null);
  const pageRefs = useRef([]);
  const [renderKey, setRenderKey] = useState(0);

  // Workaround para un bug conocido de react-pdf + StrictMode: en
  // desarrollo, React monta cada componente dos veces para detectar
  // efectos mal hechos. Con varias páginas renderizando <canvas> a la
  // vez, esa doble pasada deja los canvas en blanco. Forzamos un
  // remount adicional del <Document> justo después de que StrictMode
  // termine su doble pasada, así el render final nunca queda a medias.
  // (No afecta producción: ahí no hay doble montaje, este remount extra
  // es inofensivo).
  useEffect(() => {
    const id = setTimeout(() => setRenderKey((k) => k + 1), 0);
    return () => clearTimeout(id);
  }, []);

  // Patrón recomendado por React para "sincronizar" un estado con otro:
  // ajustarlo durante el render (no en un efecto). Evita el warning de
  // "Calling setState synchronously within an effect can trigger
  // cascading renders" que salía antes.
  const [prevPageNumber, setPrevPageNumber] = useState(pageNumber);
  if (pageNumber !== prevPageNumber) {
    setPrevPageNumber(pageNumber);
    setPageInput(String(pageNumber));
  }

  const zoomIn = () => setZoom((z) => Math.min(z + 0.2, 2.5));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));

  // Zoom con Ctrl + scroll del mouse, o con el gesto de pellizco del
  // touchpad (el navegador lo reporta como un evento "wheel" con
  // ctrlKey: true). El scroll normal (sin Ctrl) sigue haciendo scroll
  // de las páginas como siempre.
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    function handleWheel(e) {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const delta = -e.deltaY * 0.0015;
      setZoom((z) => Math.min(Math.max(z + delta, 0.5), 2.5));
    }

    node.addEventListener("wheel", handleWheel, { passive: false });
    return () => node.removeEventListener("wheel", handleWheel);
  }, []);

  function scrollToPage(n) {
    const el = pageRefs.current[n - 1];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToPage(value) {
    const n = Number(value);
    if (!numPages || Number.isNaN(n)) {
      setPageInput(String(pageNumber));
      return;
    }
    const clamped = Math.min(Math.max(n, 1), numPages);
    setPageNumber(clamped);
    scrollToPage(clamped);
  }

  function goToPrev() {
    if (pageNumber <= 1) return;
    const n = pageNumber - 1;
    setPageNumber(n);
    scrollToPage(n);
  }

  function goToNext() {
    if (pageNumber >= numPages) return;
    const n = pageNumber + 1;
    setPageNumber(n);
    scrollToPage(n);
  }

  return (
    <>
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto bg-neutral-100 p-3 sm:p-6"
      >
        <Document
          key={renderKey}
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={
            <p className="font-poppins text-sm text-neutral-500 mt-10 text-center">
              Cargando documento...
            </p>
          }
          error={
            <p className="font-poppins text-sm text-red-500 mt-10 text-center">
              No se pudo cargar el PDF.
            </p>
          }
          className="flex flex-col items-center gap-4"
        >
          {numPages &&
            Array.from({ length: numPages }, (_, index) => {
              const num = index + 1;
              return (
                <div key={num} ref={(el) => (pageRefs.current[index] = el)}>
                  <Page
                    pageNumber={num}
                    width={containerWidth * zoom}
                    renderAnnotationLayer={false}
                    className="shadow-md"
                  />
                </div>
              );
            })}
        </Document>
      </div>

      {/* Pie: un poco más oscuro que el cuerpo (bg-neutral-100) para separarlo visualmente */}
      <div
        className="
          flex flex-wrap items-center justify-center gap-x-6 gap-y-2
          border-t border-neutral-300 bg-neutral-200 px-4 py-3
        "
      >
        {/* Zoom */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={zoom <= 0.5}
            onClick={zoomOut}
            title="Alejar"
            className="
              flex items-center justify-center size-8 rounded-full
              bg-blue-deep/10 text-blue-deep
              disabled:opacity-30 disabled:cursor-not-allowed
              hover:bg-blue-deep hover:text-white transition-colors
            "
          >
            <HiMagnifyingGlassMinus className="size-4" />
          </button>

          <span className="font-poppins text-xs sm:text-sm text-neutral-black w-11 text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            type="button"
            disabled={zoom >= 2.5}
            onClick={zoomIn}
            title="Acercar"
            className="
              flex items-center justify-center size-8 rounded-full
              bg-blue-deep/10 text-blue-deep
              disabled:opacity-30 disabled:cursor-not-allowed
              hover:bg-blue-deep hover:text-white transition-colors
            "
          >
            <HiMagnifyingGlassPlus className="size-4" />
          </button>
        </div>

        {/* Paginación: navega haciendo scroll a la página elegida
            (todas las páginas ya están renderizadas y visibles) */}
        {numPages > 1 && (
          <div className="flex items-center gap-4">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={goToPrev}
              className="
                flex items-center justify-center size-8 rounded-full
                bg-blue-deep/10 text-blue-deep
                disabled:opacity-30 disabled:cursor-not-allowed
                hover:bg-blue-deep hover:text-white transition-colors
              "
            >
              <HiChevronLeft className="size-4" />
            </button>

            <span className="font-poppins text-xs sm:text-sm text-neutral-black">
              Página
            </span>

            <input
              type="number"
              min={1}
              max={numPages}
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onBlur={(e) => goToPage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  goToPage(e.target.value);
                  e.currentTarget.blur();
                }
              }}
              className="
                w-12 text-center rounded-md border border-neutral-400
                bg-white text-neutral-black
                font-poppins text-xs sm:text-sm py-1
                focus:outline-none focus:ring-2 focus:ring-blue-deep
              "
            />

            <span className="font-poppins text-xs sm:text-sm text-neutral-black">
              de {numPages}
            </span>

            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={goToNext}
              className="
                flex items-center justify-center size-8 rounded-full
                bg-blue-deep/10 text-blue-deep
                disabled:opacity-30 disabled:cursor-not-allowed
                hover:bg-blue-deep hover:text-white transition-colors
              "
            >
              <HiChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export { PdfViewerModal };