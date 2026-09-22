import { Image } from "../../atoms/image";

function WorkplaceTile({ title, image }) {
  return (
    <figure className="workplace-tile relative isolate min-w-0 overflow-hidden bg-blue-dark">
      <Image
        src={image}
        alt={title}
        fill
        imageClassName="workplace-tile__image"
        decoding="async"
      />
    </figure>
  );
}

export { WorkplaceTile };
