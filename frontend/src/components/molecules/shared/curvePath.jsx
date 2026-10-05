import { twMerge } from "tailwind-merge";

const curveDesigns = {
  1: { path: "M0,100C190,260 440,220 690,150C940,80 1050,0 1440,100V600H0Z" },
  2: { path: "M0,100C390,0 500,80 750,150C1000,220 1250,260 1440,100V600H0Z" },
  3: { path: "M0,200L100,180C200,160,400,140,600,180C800,220,1000,280,1200,240C1400,200,1440,220,1440,220V0H0Z" },
  4: { path: "M0,220C300,140 600,60 900,140C1200,220 1350,260 1440,250V600H0Z" },
  5: { path: "M0,140 C420,20 1020,220 1440,60 L1440,220 L0,220 Z" },
  6: {
    viewBox: "0 0 1200 100",
    path: "M0 56C300 155 780 -58 1200 70V100H0Z",
    accentPath: "M0 42C300 145 780 -75 1200 55V100H0Z",
  },
};

function BannerBgCurve({
  design = 1,
  color = "#ffffff",
  accentColor = "",
  height = "h-24 sm:h-28 md:h-32 lg:h-40 xl:h-48",
  position = "bottom",
  className = "",
}) {
  const curve = curveDesigns[design] || curveDesigns[1];

  return (
    <div
      aria-hidden="true"
      className={twMerge(
        "pointer-events-none absolute w-full left-0 overflow-hidden leading-none",
        position === "top" ? "top-0" : "bottom-0",
        className,
      )}
    >
      <svg
        className={`block w-full ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={curve.viewBox || "0 0 1440 320"}
        preserveAspectRatio="none"
        focusable="false"
        fill={color}
      >
        {accentColor && curve.accentPath && (
          <path d={curve.accentPath} fill={accentColor} />
        )}
        <path d={curve.path} />
      </svg>
    </div>
  );
}

export { BannerBgCurve };
