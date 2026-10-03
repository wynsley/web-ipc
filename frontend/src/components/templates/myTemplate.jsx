import { twMerge } from "tailwind-merge";

function MyTemplate({ children, className = "", classmame = "" }) {
  return (
    <div className={twMerge("overflow-x-hidden pt-[3em] md:pt-[6em]", classmame, className)}>
      {children}
    </div>
  );
}

export { MyTemplate };
