import { useId } from "react";
import { FiUpload } from "react-icons/fi";
import { Input } from "../../atoms/input";
import { Label } from "../../atoms/label";
import { Paragraph } from "../../atoms/paragraph";

export function LocalImageInput({ file, saved, disabled, onSelect, onError }) {
  const id = useId();
  function select(event) {
    const chosen = event.target.files[0];
    if (!chosen) return;
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(chosen.type) ||
      !chosen.size ||
      chosen.size > 5 * 1024 * 1024
    ) {
      onError("Elige una imagen JPG, PNG o WebP de hasta 5 MB.");
    } else onSelect(chosen);
    event.target.value = "";
  }
  return (
    <div className="grid justify-items-center gap-3 rounded-lg border border-dashed border-blue-light bg-surface px-4 py-6 text-center">
      <FiUpload aria-hidden="true" className="text-2xl text-blue-dark" />
      <div className="relative">
        <Input
          id={id}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={disabled}
          onChange={select}
          className="peer sr-only"
        />
        <Label
          htmlFor={id}
          variant="light"
          text={file || saved ? "Cambiar archivo" : "Seleccionar imagen"}
          className="inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-blue-dark px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-deep peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-focus peer-disabled:cursor-wait peer-disabled:opacity-60"
        />
      </div>
      <Paragraph
        size="small"
        className="max-w-full break-all"
        text={
          file
            ? file.name
            : saved
              ? "Imagen guardada del evento"
              : "JPG, PNG o WebP · Máximo 5 MB"
        }
      />
    </div>
  );
}
