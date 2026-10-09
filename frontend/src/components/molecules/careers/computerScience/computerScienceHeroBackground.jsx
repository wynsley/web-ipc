import { Image } from "@/components/atoms/image";

function ComputerScienceHeroBackground({ image }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <Image src={image} alt="" fill loading="eager" overlayClassName="bg-linear-to-r from-blue-deep/95 via-blue-deep/85 to-blue-deep/65" />
    </div>
  );
}

export { ComputerScienceHeroBackground };
