import { useEffect, useState } from "react";
import { loadPrivateImage } from "../services/images";

export function useImagePreview({ file, url }) {
  const [preview, setPreview] = useState({
    src: "",
    loading: false,
    error: "",
  });
  useEffect(() => {
    const controller = new AbortController();
    let objectUrl;
    setPreview({ src: "", loading: Boolean(file || url), error: "" });
    async function load() {
      let src = "";
      if (file) {
        objectUrl = URL.createObjectURL(file);
        src = objectUrl;
      } else if (url?.startsWith("/api/v1/media/")) {
        const blob = await loadPrivateImage(url, controller.signal);
        if (controller.signal.aborted) return;
        objectUrl = URL.createObjectURL(blob);
        src = objectUrl;
      } else if (url?.startsWith("https://")) src = url;
      if (!controller.signal.aborted)
        setPreview({ src, loading: false, error: "" });
    }
    load().catch(() => {
      if (!controller.signal.aborted)
        setPreview({
          src: "",
          loading: false,
          error: "No se pudo cargar la imagen guardada.",
        });
    });
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file, url]);
  return preview;
}
