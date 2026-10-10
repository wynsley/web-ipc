import { useId } from "react";
import { Image } from "@/components/atoms/image";
import { twMerge } from "tailwind-merge";

function BrandedHeroFrame({
  image,
  children,
  variant = "default",
  className = "",
}) {
  const patternId = useId();
  const institutional = variant === "institutional";

  return (
    <div
      className={twMerge(
        "relative h-[45vh] min-h-72 overflow-hidden rounded-bl-[70px] sm:h-[55vh] sm:rounded-bl-[110px] md:h-[62vh] md:rounded-bl-[150px] xl:h-[68vh]",
        institutional ? "bg-blue-dark" : "bg-blue-deep",
        className,
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        className={institutional ? "opacity-15" : "opacity-30"}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-linear-to-r ${institutional ? "from-blue-dark via-blue-dark/70 to-blue/30" : "from-blue-deep via-blue-deep/10 to-blue-deep/10"}`}
      />
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-[.12]"
      >
        <defs>
          <pattern
            id={patternId}
            width="120"
            height="104"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 104 L60 0 L120 104 M0 0 H120"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-neutral-white"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <div
        aria-hidden="true"
        className={`absolute top-1/2 left-0 h-[55%] w-[92%] -translate-y-1/2 bg-linear-to-r [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)] sm:w-[68%] ${institutional ? "from-blue-dark to-blue/50" : "from-blue-deep to-blue/40"}`}
      />
      {children}
    </div>
  );
}

export { BrandedHeroFrame };
