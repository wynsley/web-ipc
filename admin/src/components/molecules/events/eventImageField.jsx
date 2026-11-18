import { useId, useRef, useState } from "react";
import { FiLink, FiMonitor } from "react-icons/fi";
import { ImageCropEditor } from "./imageCropEditor";
import { Field } from "../field";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import { Label } from "../../atoms/label";
import { Paragraph } from "../../atoms/paragraph";
import { LocalImageInput } from "./localImageInput";
import { useImagePreview } from "../../../hooks/useImagePreview";

const options = [
  { value: "link", label: "URL", Icon: FiLink },
  { value: "file", label: "Desde el equipo", Icon: FiMonitor },
];

export function EventImageField({ value, onChange, disabled, errorMessage }) {
  const group = useId();
  const [mode, setMode] = useState(
    value.file || value.url?.startsWith("/api/") ? "file" : "link",
  );
  const sources = useRef({
    link: { url: "", file: null },
    file: { url: "", file: null },
  });
  const [error, setError] = useState("");
  const preview = useImagePreview(value);
  function change(next) {
    setError("");
    onChange(next);
  }
  function switchMode(next) {
    sources.current[mode] = value;
    setMode(next);
    change(sources.current[next]);
  }
  return (
    <fieldset
      disabled={disabled}
      className="min-w-0 rounded-xl border border-line bg-white p-4 sm:p-5"
    >
      <legend className="px-2 text-base font-bold text-blue-dark">
        Foto del evento
      </legend>
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-soft p-1.5">
        {options.map(({ value: option, label, Icon }) => (
          <Label key={option} className="relative min-w-0 cursor-pointer">
            <Input
              type="radio"
              name={group}
              value={option}
              checked={mode === option}
              onChange={() => switchMode(option)}
              className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0"
            />
            <Paragraph
              as="span"
              className="flex h-full items-center justify-center gap-2 rounded-md border border-transparent px-2 py-3 text-sm font-bold text-muted transition-colors peer-checked:border-line peer-checked:bg-white peer-checked:text-blue-dark peer-checked:shadow-sm peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus peer-disabled:opacity-60"
            >
              <Icon aria-hidden="true" className="shrink-0 text-lg" />
              {label}
            </Paragraph>
          </Label>
        ))}
      </div>
      <div className="mt-4 grid gap-3">
        {mode === "link" ? (
          <>
            <Field
              label="Enlace de la imagen"
              errorMessage={errorMessage}
              name="imageUrl"
              autoComplete="off"
              spellCheck={false}
              type="url"
              pattern="https://.+"
              value={value.url ?? ""}
              placeholder="https://sitio.com/imagen.jpg"
              onChange={(e) => change({ url: e.target.value, file: null })}
              maxLength={2048}
            />
            <Paragraph
              size="small"
              text="Pega el enlace HTTPS directo a la imagen."
              className="text-muted"
            />
          </>
        ) : (
          <LocalImageInput
            file={value.file}
            saved={Boolean(value.url)}
            disabled={disabled}
            onSelect={(file) => change({ file, url: "" })}
            onError={setError}
          />
        )}
        {(value.file || value.url) && (
          <div className="mt-1">
            <div className="mb-2 flex items-center justify-between gap-3">
              <Paragraph
                size="small"
                text="Vista previa"
                className="font-bold"
              />
              <Button
                variant="link"
                text="Quitar imagen"
                className="min-h-11"
                onClick={() => change({ url: "", file: null })}
              />
            </div>
            <ImageCropEditor
              key={preview.src}
              src={preview.src}
              crop={value.crop}
              disabled={disabled}
              onChange={(crop) => onChange({ ...value, crop })}
              onError={() =>
                setError(
                  "No se pudo mostrar la imagen. Revisa el enlace o selecciona otro archivo.",
                )
              }
            />
          </div>
        )}
        {preview.loading && (
          <Paragraph size="small" role="status" text="Cargando vista previa…" />
        )}
        {(error || preview.error || (mode === "file" && errorMessage)) && (
          <Paragraph
            size="small"
            role="alert"
            variant="danger"
            text={error || preview.error || errorMessage}
          />
        )}
      </div>
    </fieldset>
  );
}
