import { useEffect, useId, useRef, useState } from "react";
import { PiDownloadSimple, PiX } from "react-icons/pi";
import { Image } from "../../atoms/image";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { Button } from "../../atoms/button";
import { Link } from "../../atoms/links";

function DocumentModal({ document, onClose }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const [resource, setResource] = useState({ status: "loading", url: "" });

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = window.document.activeElement;
    const previousOverflow = window.document.body.style.overflow;
    dialog.showModal();
    window.document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      window.document.body.style.overflow = previousOverflow;
      if (opener && opener.isConnected) opener.focus();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl;
    fetch(document.pdfUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("PDF unavailable");
        return response.blob();
      })
      .then((blob) =>
        blob
          .slice(0, 5)
          .text()
          .then((signature) => {
            if (signature !== "%PDF-") throw new Error("Invalid PDF");
            return blob;
          }),
      )
      .then((blob) => {
        if (controller.signal.aborted) return;
        objectUrl = URL.createObjectURL(
          new Blob([blob], { type: "application/pdf" }),
        );
        setResource({ status: "ready", url: objectUrl });
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setResource({ status: "error", url: "" });
      });
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [document.pdfUrl]);

  const handleBackdropClick = (event) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      dialogRef.current.close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={(event) => {
        if (!event.currentTarget.open) onClose();
      }}
      onClick={handleBackdropClick}
      className="m-auto h-[90dvh] max-h-[90dvh] w-[calc(100%-2rem)] max-w-5xl flex-col overflow-hidden open:flex rounded-xl2 bg-neutral-white p-0 text-blue-dark shadow-medium backdrop:bg-neutral-black/70"
    >
      <div className="flex shrink-0 items-start justify-between gap-4 border-b border-blue-light/20 p-4 sm:p-5">
        <div>
          <Title
            id={titleId}
            level="h2"
            size="compact"
            variant="institutional"
            weight="bold"
            text={document.title}
            className="font-hani"
          />
          {document.isReference && (
            <Paragraph
              size="compact"
              variant="danger"
              text="Documento de referencia. No constituye el plan ni la malla oficial del instituto."
              className="mt-2 font-poppins"
            />
          )}
        </div>
        <Button
          type="button"
          autoFocus
          aria-label="Cerrar documento"
          onClick={() => dialogRef.current.close()}
          className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral-light text-blue-dark transition-colors hover:bg-blue-light/20 focus-visible:outline-2 focus-visible:outline-blue-dark"
        >
          <PiX aria-hidden="true" className="size-5" />
        </Button>
      </div>
      <div
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-neutral-light p-3 sm:p-5"
        role="region"
        aria-label={`Vista previa: ${document.title}`}
        tabIndex={0}
      >
        {resource.status === "ready" ? (
          document.previewImage ? (
            <div className="overflow-hidden rounded-lg">
              <Image
                src={document.previewImage}
                alt={`Vista previa de ${document.title}. El contenido completo está disponible en el PDF descargable.`}
                loading="eager"
                className="min-h-56 w-full"
              />
            </div>
          ) : (
            <iframe
              src={resource.url}
              title={`Vista previa: ${document.title}`}
              className="h-full min-h-0 w-full rounded-lg border-0 bg-white"
            />
          )
        ) : (
          <div
            className="flex min-h-full items-center justify-center p-4"
            role="status"
          >
            <Paragraph
              size="base"
              variant="danger"
              align="center"
              text={
                resource.status === "loading"
                  ? "Cargando documento…"
                  : "No se pudo cargar el PDF. Cierra esta ventana e inténtalo de nuevo."
              }
              className="font-poppins"
            />
          </div>
        )}
      </div>
      <div className="flex shrink-0 flex-col gap-3 border-t border-blue-light/20 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <Paragraph
          size="compact"
          variant="danger"
          text="Da el siguiente paso: descarga el documento y revísalo a tu ritmo."
          className="max-w-lg font-poppins"
        />
        {resource.status === "ready" ? (
          <Link
            href={resource.url}
            download={document.fileName}
            variant="download"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 font-poppins text-sm"
          >
            <PiDownloadSimple aria-hidden="true" className="size-5" /> Descargar
            PDF
          </Link>
        ) : (
          <Button
            type="button"
            disabled
            text="Descargar PDF"
            className="min-h-11 shrink-0 rounded-full bg-blue-dark/40 px-6 py-3 font-poppins text-sm text-white"
          />
        )}
      </div>
    </dialog>
  );
}

export { DocumentModal };
