import { Button } from "../../atoms/button";
import { Paragraph } from "../../atoms/paragraph";

export function EventDeleteConfirm({ event, busy, onConfirm, onCancel }) {
  return (
    <div
      role="region"
      aria-label={`Confirmar eliminación de ${event.title}`}
      className="flex flex-wrap items-center justify-between gap-3 border-t border-[#f87171]/30 bg-[#ef4444]/10 px-5 py-4 sm:px-6"
    >
      <div className="min-w-0 flex-1">
        <Paragraph size="sm" variant="ink">
          ¿Eliminar definitivamente{" "}
          <Paragraph
            as="strong"
            variant="ink"
            weight="bold"
            text={`«${event.title}»`}
          />
          ?
        </Paragraph>
        <Paragraph size="small" className="mt-0.5">
          Se borrarán el borrador y su historial de cambios. Si la imagen no se
          usa en otros eventos, se depurará automáticamente tras el plazo de
          retención.
        </Paragraph>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="danger"
          size="sm"
          disabled={busy}
          onClick={onConfirm}
          text={busy ? "Eliminando…" : "Eliminar definitivamente"}
        />
        <Button
          variant="link"
          size="sm"
          disabled={busy}
          onClick={onCancel}
          text="Cancelar"
        />
      </div>
    </div>
  );
}
