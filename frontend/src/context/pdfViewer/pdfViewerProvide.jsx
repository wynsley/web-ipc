import { useState, useCallback } from "react";
import { PdfViewerContext } from "./pdfViewersContext";
import { PdfViewerModal } from "../../components/organisms/shared/pdfViewerModal";

/**
 * Provider global. Se coloca UNA sola vez en el árbol (main.jsx)
 * y desde cualquier componente hijo se abre el modal con
 * el hook usePdfViewer(), sin importar en qué parte de la página esté.
 */
function PdfViewerProvider({ children }) {
  const [state, setState] = useState({
    isOpen: false,
    pdfUrl: null,
    title: "",
  });

  const openPdf = useCallback((pdfUrl, title = "Documento") => {
    if (!pdfUrl) {
      console.warn("PdfViewerProvider: no se recibió una URL de PDF válida.");
      return;
    }
    setState({ isOpen: true, pdfUrl, title });
  }, []);

  const closePdf = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <PdfViewerContext.Provider value={{ openPdf, closePdf }}>
      {children}
      <PdfViewerModal
        isOpen={state.isOpen}
        pdfUrl={state.pdfUrl}
        title={state.title}
        onClose={closePdf}
      />
    </PdfViewerContext.Provider>
  );
}

export { PdfViewerProvider };