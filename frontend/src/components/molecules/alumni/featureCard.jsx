import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";

const VARIANTS = {
  white: {
    card: "bg-blue-light/30 text-neutral-black",
    iconWrap: "bg-blue-deep/10 text-blue-deep",
    link: "bg-blue-light/30 text-blue-deep hover:bg-blue-deep hover:text-white",
  },
  "blue-deep": {
    card: "bg-blue-deep text-white",
    iconWrap: "bg-white/10 text-white",
    link: "bg-blue-deep text-white hover:bg-orange hover:text-white",
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
        relative flex flex-col justify-between gap-8
        rounded-2xl p-6 sm:p-7 pb-16 sm:pb-18
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

      {/* Parche del color de fondo de la página, con curva cóncava hacia la card */}
      <div
        className="
          absolute bottom-0 left-0
          h-12 sm:h-14 w-32 sm:w-36
          rounded-tr-[28px] sm:rounded-tr-[32px] rounded-bl-xl
          bg-white
        "
      >
        <div className="absolute flex items-end pt-4 pr-2">
          <Link
            to={href}
            className={`
              inline-flex items-center gap-1.5 w-fit
              rounded-tr-2xl  px-4 py-2
              font-hani text-xs sm:text-sm font-bold
              transition-colors duration-200
              animate-float
              ${styles.link}
            `}
          >
            {linkText}
            <HiArrowRight className="size-3.5 sm:size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export { FeatureCard };