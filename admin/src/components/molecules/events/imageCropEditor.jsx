import { useRef, useState } from "react";
import { Image } from "@ipc/image";
import { Button } from "../../atoms/button";
import { Slider } from "../../atoms/slider";
import { Label } from "../../atoms/label";
import { Paragraph } from "../../atoms/paragraph";

const centered = { x: 50, y: 50, zoom: 1 };
const clamp = (value) => Math.max(0, Math.min(100, value));
export function ImageCropEditor({
  src,
  crop = centered,
  onChange,
  onError,
  disabled,
}) {
  const [portrait, setPortrait] = useState(false);
  const [size, setSize] = useState(null);
  const drag = useRef(null);
  function start(event) {
    if (disabled || !size || event.button !== 0) return;
    const box = event.currentTarget.getBoundingClientRect();
    const scale =
      Math.max(box.width / size.width, box.height / size.height) * crop.zoom;
    drag.current = {
      clientX: event.clientX,
      clientY: event.clientY,
      crop,
      overflowX: size.width * scale - box.width,
      overflowY: size.height * scale - box.height,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event) {
    const origin = drag.current;
    if (!origin || disabled) return;
    onChange({
      ...origin.crop,
      x:
        origin.overflowX > 0
          ? clamp(
              origin.crop.x -
                ((event.clientX - origin.clientX) / origin.overflowX) * 100,
            )
          : origin.crop.x,
      y:
        origin.overflowY > 0
          ? clamp(
              origin.crop.y -
                ((event.clientY - origin.clientY) / origin.overflowY) * 100,
            )
          : origin.crop.y,
    });
  }
  return (
    <div className="grid gap-3">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Formato de vista previa"
      >
        <Button
          variant={portrait ? "secondary" : "primary"}
          size="sm"
          className="mt-0 min-h-11"
          text="Horizontal"
          aria-pressed={!portrait}
          disabled={disabled}
          onClick={() => setPortrait(false)}
        />
        <Button
          variant={portrait ? "primary" : "secondary"}
          size="sm"
          className="mt-0 min-h-11"
          text="Destacados"
          aria-pressed={portrait}
          disabled={disabled}
          onClick={() => setPortrait(true)}
        />
      </div>
      <div className={portrait ? "mx-auto w-full max-w-64" : "w-full"}>
        <div
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={() => {
            drag.current = null;
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
          onLostPointerCapture={() => {
            drag.current = null;
          }}
          className={`relative touch-none select-none overflow-hidden rounded-lg bg-blue-dark ${portrait ? "aspect-3/4" : "aspect-video"} ${disabled ? "" : "cursor-grab active:cursor-grabbing"}`}
        >
          <Image
            fill
            src={src}
            crop={crop}
            alt=""
            draggable={false}
            onLoad={(event) =>
              setSize({
                width: event.target.naturalWidth,
                height: event.target.naturalHeight,
              })
            }
            onError={onError}
          />
          {size && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[33.333%] border border-white/50"
            />
          )}
        </div>
      </div>
      {size && (
        <>
          <Paragraph
            size="small"
            text="Arrastra la foto para encuadrarla. Puedes ajustar también los controles."
          />
          <Label className="grid gap-1 text-sm font-bold">
            Acercamiento · {crop.zoom.toFixed(2)}×
            <Slider
              name="imageZoom"
              aria-valuetext={`${crop.zoom.toFixed(2)} veces`}
              min="1"
              max="3"
              step="0.05"
              value={crop.zoom}
              disabled={disabled}
              onChange={(event) =>
                onChange({ ...crop, zoom: Number(event.target.value) })
              }
            />
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <Label className="grid gap-1 text-sm">
              Horizontal
              <Slider
                min="0"
                max="100"
                step="1"
                name="imagePositionX"
                aria-valuetext={`${Math.round(crop.x)} %`}
                value={crop.x}
                disabled={disabled}
                onChange={(event) =>
                  onChange({ ...crop, x: Number(event.target.value) })
                }
              />
            </Label>
            <Label className="grid gap-1 text-sm">
              Vertical
              <Slider
                min="0"
                max="100"
                step="1"
                name="imagePositionY"
                aria-valuetext={`${Math.round(crop.y)} %`}
                value={crop.y}
                disabled={disabled}
                onChange={(event) =>
                  onChange({ ...crop, y: Number(event.target.value) })
                }
              />
            </Label>
          </div>
          <Button
            variant="link"
            text="Restablecer encuadre"
            className="min-h-11"
            disabled={disabled}
            onClick={() => onChange(centered)}
          />
          <Paragraph
            size="small"
            className="text-muted"
            text="El encuadre se adapta al espacio de cada tarjeta y al tamaño de la pantalla."
          />
        </>
      )}
    </div>
  );
}
