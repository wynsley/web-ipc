import { useEffect, useRef, useState } from "react";

function Toast({ type = "error", message, visible, onClose, duration = 4000 }) {
  const [animateIn, setAnimateIn] = useState(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!visible) {
      setAnimateIn((prev) => (prev ? false : prev));
      return;
    }

    const raf = requestAnimationFrame(() => setAnimateIn(true));
    const timer = setTimeout(() => onCloseRef.current?.(), duration);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [visible, duration]);

  if (!visible) return null;

  const isSuccess = type === "success";

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`
        absolute top-3 right-3 left-3 sm:left-auto z-50 flex items-start gap-3
        sm:w-full sm:max-w-sm rounded-lg bg-white px-4 py-3 shadow-xl
        border transition-all duration-300
        ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}
        ${isSuccess ? "border-green-200" : "border-red-200"}
      `}
    >
      {isSuccess ? (
        <svg viewBox="0 0 52 52" className="size-9 shrink-0">
          <circle
            cx="26"
            cy="26"
            r="24"
            style={{ strokeDasharray: 152 }}
            className={`
              fill-none stroke-green-500 stroke-[3]
              transition-[stroke-dashoffset] duration-500 ease-out
              ${animateIn ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:152]"}
            `}
          />
          <path
            d="M14.5 27.2l7.1 7.2 16.5-16.8"
            style={{ strokeDasharray: 48 }}
            className={`
              fill-none stroke-green-500 stroke-[4]
              transition-[stroke-dashoffset] duration-300 delay-500 ease-out
              ${animateIn ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:48]"}
            `}
          />
        </svg>
      ) : (
        <div className="flex items-center justify-center size-9 shrink-0 rounded-full bg-red-100 text-red-600">
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.75 5.25a.75.75 0 0 1 1.5 0v5a.75.75 0 0 1-1.5 0v-5Zm.75 8.5a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className={`font-hani font-bold text-sm ${isSuccess ? "text-green-700" : "text-red-700"}`}>
          {isSuccess ? "¡Enviado con éxito!" : "No se pudo enviar"}
        </p>
        <p className="text-sm text-gray-600 leading-snug">{message}</p>
      </div>

      <button
        type="button"
        onClick={() => onCloseRef.current?.()}
        aria-label="Cerrar"
        className="shrink-0 text-gray-400 transition-colors hover:text-gray-600"
      >
        ✕
      </button>
    </div>
  );
}

export { Toast };