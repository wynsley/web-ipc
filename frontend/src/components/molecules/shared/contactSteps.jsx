import { useState } from "react";
import { Title } from "../../atoms/titles";

const STEPS = [
  { number: 1, label: "Regístrate" },
  { number: 2, label: "Completa tus datos" },
  { number: 3, label: "Envía tu solicitud" },
  { number: 4, label: "Confirmación" },
];

const CONTAINER_LAYOUT = {
  horizontal: "flex-row",
  vertical: "flex-col",
  responsive: "flex-row md:flex-col",
};

const TOOLTIP_LAYOUT = {
  horizontal: "left-1/2 -translate-x-1/2 -top-9",
  vertical: "left-full translate-x-0 top-1/2 -translate-y-1/2 ml-3",
  responsive:
    "left-1/2 -translate-x-1/2 -top-9 md:left-full md:-top-1/2 md:translate-x-0 md:top-1/2 md:-translate-y-1/2 md:ml-3",
};

function ContactSteps({
  activeStep = 1,
  errorStep = null,
  orientation = "responsive",
  title = "Contáctanos",
}) {
  const [hovered, setHovered] = useState(null);

  return (
    <div>
      {title && (
        <Title
          level="h3"
          align="center"
          className="font-hani"
          text={title}
          variant="primary"
          weight="bold"
        />
      )}

      <div className={`mt-2 flex ${CONTAINER_LAYOUT[orientation]} items-center gap-2`}>
        {STEPS.map((step) => {
          const isError = step.number === errorStep;
          const isDone = !isError && step.number <= activeStep;

          return (
            <div key={step.number} className="flex flex-col md:flex-row items-center relative">
              <div
                onMouseEnter={() => setHovered(step.number)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  relative flex items-center justify-center shrink-0
                  size-9 sm:size-11 rounded-full border-2
                  text-sm sm:text-base font-bold font-hani
                  cursor-default
                  transition-colors duration-300
                  ${
                    isError
                      ? "bg-red-600 border-red-600 text-white"
                      : isDone
                      ? "bg-blue border-blue text-white"
                      : "bg-transparent border-white/30 text-white/60 hover:border-white/60 hover:text-white"
                  }
                `}
              >
                {step.number}

                <span
                  className={`
                    pointer-events-none absolute z-20
                    ${TOOLTIP_LAYOUT[orientation]}
                    whitespace-nowrap rounded-md px-2.5 py-1
                    text-base font-medium text-white
                    shadow-medium
                    transition-all duration-200
                    ${isError ? "bg-red-600" : "bg-blue"}
                    ${
                      hovered === step.number
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-1"
                    }
                  `}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ContactSteps };