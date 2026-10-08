import { CloseIcon } from "@/components/atoms/galeryIcons";
import { IconButton } from "@/components/atoms/iconButton";

function LightboxTopBar({ position, total, onClose }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-white">
      <span className="font-poppins text-sm tabular-nums text-white/80">
        {position} / {total}
      </span>
      <IconButton
        label="Cerrar galería"
        onClick={onClose}
        className="hover:bg-white/15"
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
}

export { LightboxTopBar };