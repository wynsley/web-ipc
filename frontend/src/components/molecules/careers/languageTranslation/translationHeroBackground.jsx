import { Image } from "@/components/atoms/image";

function TranslationHeroBackground({ image }) {
  return (
    <>
      <div className="absolute inset-0 lg:left-[30%]">
        <Image
          src={image}
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          imageClassName="object-[65%_center]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blue-dark/85 lg:bg-transparent lg:bg-linear-to-r lg:from-blue-dark lg:via-blue-dark/75 lg:via-45% lg:to-blue-dark/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[64%] bg-blue-dark/60 [clip-path:polygon(0_0,100%_0,75%_100%,0_100%)] lg:block"
      />
    </>
  );
}

export { TranslationHeroBackground };
