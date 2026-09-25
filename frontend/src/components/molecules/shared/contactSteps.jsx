import { useState } from "react";
import { Title } from "../../atoms/titles";

const STEPS = [
  { number: 1, label: "Regístrate" },
  { number: 2, label: "Completa tus datos" },
  { number: 3, label: "Envía tu solicitud" },
  { number: 4, label: "Confirmación" },
];

function ContactSteps() {
  const [hovered, setHovered] = useState(null);

  return (
    <div>
      <Title
        level="h3"
        align="center"
        className="font-hani"
        text="Contáctanos"
        variant="primary"
        weight="bold"
      />

      <div className="mt-2 flex flex-row md:flex-col items-center gap-2">
        {STEPS.map((step, i) => (
          <div
            key={step.number}
          >
            <div className="flex flex-col md:flex-row items-center relative">
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
                    i === 0
                      ? "bg-blue border-blue text-white"
                      : "bg-transparent border-white/30 text-white/60 hover:border-white/60 hover:text-white"
                  }
                `}
              >
                {step.number}

                {/* Tooltip, aparece solo al hover */}
                <span
                  className={`
                    pointer-events-none absolute z-20
                    left-1/2 -translate-x-1/2 -top-9
                    sm:left-full sm:translate-x-0 sm:top-1/2 sm:-translate-y-1/2 sm:ml-3
                    whitespace-nowrap rounded-md bg-blue px-2.5 py-1
                    text-base font-medium text-white
                    shadow-medium
                    transition-all duration-200
                    ${
                      hovered === step.number
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-1 sm:translate-y-0"
                    }
                  `}
                >
                  {step.label}
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { ContactSteps };