import { Image } from "@/components/atoms/image";

function CareerImageCaption({ image, imageAlt, caption }) {
  return (
    <figure className="relative min-h-80">
      <Image src={image} alt={imageAlt} fill className="rounded-sm" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-blue-dark via-transparent to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-7 font-hani text-3xl font-bold text-white">
        {caption}
      </figcaption>
    </figure>
  );
}

export { CareerImageCaption };
