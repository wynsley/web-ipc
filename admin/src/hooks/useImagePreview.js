import { useEffect, useState } from "react";
import { loadPrivateImage } from "../services/images";

export function useImagePreview({ file, url }) {
  const needsAsync = Boolean(file || url?.startsWith("/api/v1/media/"));
  const sourceKey = file ?? (url || "");
  const [loaded, setLoaded] = useState({ key: "", src: "", error: "" });

  useEffect(() => {
    if (!needsAsync) return;
    const controller = new AbortController();
    let objectUrl;
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
      }
      if (!controller.signal.aborted) {
        setLoaded({ key: sourceKey, src, error: "" });
      }
    }
    load().catch(() => {
      if (!controller.signal.aborted) {
        setLoaded({
          key: sourceKey,
          src: "",
          error: "No se pudo cargar la imagen guardada.",
        });
      }
    });
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file, url, needsAsync, sourceKey]);

  if (!needsAsync) {
    return {
      src: url?.startsWith("https://") ? url : "",
      loading: false,
      error: "",
    };
  }
  if (loaded.key !== sourceKey) {
    return { src: "", loading: true, error: "" };
  }
  return { src: loaded.src, loading: false, error: loaded.error };
}
