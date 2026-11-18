import { useState } from "react";
import { twMerge } from "tailwind-merge";

function Image({
  src,
  crop,
  style,
  alt = "",
  className = "",
  fill = false,
  transparent = false,
  imageClassName = "",
  fallbackClassName = "",
  overlayClassName = "",
  loading = "lazy",
  fetchPriority = "auto",
  onLoad,
  onError,
  ...imageProps
}) {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [failedSrc, setFailedSrc] = useState(null);
  const hasImage = Boolean(src) && failedSrc !== src;
  const isLoaded = hasImage && loadedSrc === src;

  return (
    <span
      aria-hidden={alt ? undefined : true}
      role={!hasImage && alt ? "img" : undefined}
      aria-label={!hasImage && alt ? alt : undefined}
      className={`${fill ? "absolute inset-0" : "relative"} block overflow-hidden ${transparent && isLoaded ? "bg-transparent" : "bg-blue-dark"} ${fallbackClassName} ${className}`}
    >
      {hasImage && (
        <img
          {...imageProps}
          style={{
            ...(crop && {
              objectPosition: `${crop.x}% ${crop.y}%`,
              transformOrigin: `${crop.x}% ${crop.y}%`,
              transform: `scale(${crop.zoom})`,
            }),
            ...style,
          }}
          key={src}
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          className={twMerge(
            "block h-full w-full object-cover object-center",
            isLoaded ? "opacity-100" : "opacity-0",
            imageClassName,
          )}
          onLoad={(event) => {
            setLoadedSrc(src);
            if (onLoad) onLoad(event);
          }}
          onError={(event) => {
            setFailedSrc(src);
            if (onError) onError(event);
          }}
        />
      )}
      {isLoaded && overlayClassName && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 ${overlayClassName}`}
        />
      )}
    </span>
  );
}

export { Image };
