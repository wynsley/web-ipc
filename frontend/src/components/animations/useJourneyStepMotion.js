import { useTransform, transform } from "motion/react";

function useJourneyStepMotion(progress, index, total) {
  const start = index / total;
  const end = (index + 1) / total;
  const stops = [
    Math.max(0, start - 0.07),
    start + 0.05,
    end - 0.06,
    Math.min(1, end + 0.03),
  ];
  const first = index === 0;
  const last = index === total - 1;
  const opacity = useTransform(progress, (value) =>
    transform(value, stops, [first ? 1 : 0, 1, 1, last ? 1 : 0]),
  );
  const visibility = useTransform(opacity, (value) =>
    value < 0.01 ? "hidden" : "visible",
  );
  const y = useTransform(progress, (value) =>
    transform(value, stops, [
      first ? "0%" : "105%",
      "0%",
      "0%",
      last ? "0%" : "-105%",
    ]),
  );

  return { opacity, visibility, y };
}

export { useJourneyStepMotion };
