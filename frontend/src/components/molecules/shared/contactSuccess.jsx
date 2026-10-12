import { useEffect, useState } from "react";
import { Button } from "../../atoms/button";

function ContactSuccess({
  appearance = "dark",
  title = "¡Enviado con éxito!",
  message = "Tu solicitud fue enviada. Pronto nos pondremos en contacto contigo.",
  onClose,
  onAnother,
}) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setAnimateIn(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const light = appearance === "light";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center gap-4 px-2 py-8 text-center transition-all duration-500 sm:py-12 ${
        animateIn ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      {/* Check animado (el mismo del Toast) */}
      <svg viewBox="0 0 52 52" className="size-20 shrink-0">
        <circle
          cx="26"
          cy="26"
          r="24"
          style={{ strokeDasharray: 152 }}
          className={`fill-none stroke-green-500 stroke-[3] transition-[stroke-dashoffset] duration-700 ease-out ${
            animateIn ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:152]"
          }`}
        />
        <path
          d="M14.5 27.2l7.1 7.2 16.5-16.8"
          style={{ strokeDasharray: 48 }}
          className={`fill-none stroke-green-500 stroke-[4] transition-[stroke-dashoffset] delay-500 duration-300 ease-out ${
            animateIn ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:48]"
          }`}
        />
      </svg>

      <h3
        className={`font-hani text-xl font-bold sm:text-2xl ${
          light ? "text-blue-deep" : "text-white"
        }`}
      >
        {title}
      </h3>

      <p
        className={`max-w-sm font-poppins text-sm leading-relaxed ${
          light ? "text-gray-600" : "text-white/75"
        }`}
      >
        {message}
      </p>

      <div className="mt-2 flex flex-wrap justify-center gap-3">
        {onAnother && (
          <Button
            type="button"
            text="Enviar otro mensaje"
            variant="secondary"
            onClick={onAnother}
          />
        )}
        {onClose && (
          <Button
            type="button"
            text="Cerrar"
            variant="danger"
            onClick={onClose}
          />
        )}
      </div>
    </div>
  );
}

export { ContactSuccess };