import { twMerge } from "tailwind-merge";

export function Slider({ className = "", ...props }) {
  return (
    <input
      {...props}
      type="range"
      className={twMerge(
        "min-h-11 w-full cursor-pointer accent-blue-light focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    />
  );
}
