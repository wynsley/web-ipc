import { useState } from "react";

function WorkplaceTile({ title, image, layout }) {
  const [failedImage, setFailedImage] = useState(null);
  const hasImage = Boolean(image) && failedImage !== image;

  return (
    <figure
      aria-label={hasImage ? undefined : title}
      className={`workplace-tile workplace-tile--${layout} relative isolate min-w-0 overflow-hidden rounded-xl2 bg-blue-dark`}
    >
      {hasImage && (
        <img
          key={image}
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="workplace-tile__image absolute inset-0 h-full w-full object-cover"
          onError={() => setFailedImage(image)}
        />
      )}
    </figure>
  );
}

export { WorkplaceTile };
