import { useContext } from "react";
import { PdfViewerContext } from "./pdfViewersContext";

function usePdfViewer() {
  const ctx = useContext(PdfViewerContext);
  if (!ctx) {
    throw new Error("usePdfViewer debe usarse dentro de <PdfViewerProvider>");
  }
  return ctx;
}

export { usePdfViewer };