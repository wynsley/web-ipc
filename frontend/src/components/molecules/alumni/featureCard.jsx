import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";

const VARIANTS = {
  white: {
    card: "bg-white text-neutral-black border border-neutral-200",
    iconWrap: "bg-blue-deep/10 text-blue-deep",
    link: "text-blue-deep hover:text-orange",
  },
  "blue-deep": {
    card: "bg-blue-deep text-white",
    iconWrap: "bg-white/10 text-white",
    link: "text-white hover:text-orange",
  },
  "blue-dark": {
    card: "bg-blue-dark text-white",
    iconWrap: "bg-white/10 text-white",
    link: "text-white hover:text-orange",
  },
};

function FeatureCard({
  icon: Icon,
  title,
  description,
  linkText = "Ver más",
  href = "#",
  variant = "white",
  raised = false,
  className = "",
}) {
  const styles = VARIANTS[variant] || VARIANTS.white;

  return (
    <div
      className={`
        flex flex-col justify-between gap-8
        rounded-2xl p-6 sm:p-7
        transition-transform duration-300
        ${styles.card}
        ${raised ? "lg:-translate-y-6" : ""}
        ${className}
      `}
    >
      <div className="flex flex-col gap-5">
        {Icon && (
          <span
            className={`
              flex items-center justify-center
              size-12 sm:size-14 rounded-xl
              ${styles.iconWrap}
            `}
          >
            <Icon className="size-6 sm:size-7" />
          </span>
        )}

        <h3 className="font-hani text-lg sm:text-xl font-bold">{title}</h3>

        <p className="font-poppins text-sm sm:text-[.95em] leading-relaxed opacity-80">
          {description}
        </p>
      </div>

      <Link
        to={href}
        className={`
          inline-flex items-center gap-1.5 w-fit
          font-hani text-sm font-bold
          transition-colors duration-200
          ${styles.link}
        `}
      >
        {linkText}
        <HiArrowRight className="size-4" />
      </Link>
    </div>
  );
}

export { FeatureCard };