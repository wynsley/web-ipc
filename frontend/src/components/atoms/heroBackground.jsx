import { useState } from "react";

function HeroBackground({ src }) {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [failedSrc, setFailedSrc] = useState(null);
  const hasImage = Boolean(src) && failedSrc !== src;
  const isLoaded = hasImage && loadedSrc === src;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-blue-dark bg-linear-to-br from-blue-dark to-blue"
    >
      {hasImage && (
        <img
          key={src}
          src={src}
          alt=""
          fetchPriority="high"
          className={`h-full w-full object-cover object-center ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoadedSrc(src)}
          onError={() => setFailedSrc(src)}
        />
      )}
      {isLoaded && (
        <div className="absolute inset-0 bg-linear-to-r from-neutral-black/80 via-neutral-black/50 to-neutral-black/25" />
      )}
    </div>
  );
}

export { HeroBackground };
