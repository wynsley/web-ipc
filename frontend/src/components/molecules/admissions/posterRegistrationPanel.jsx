import { FiPhone, FiMapPin, FiFileText, FiEdit3 } from "react-icons/fi";
import { Button } from "@/components/atoms/button";
import { PosterContactRow } from "./posterContactRow";

function PosterRegistrationPanel({ phone, address, onRegister }) {
  return (
    <div className="relative rounded-[1cqw] bg-blue-deep px-[2.5cqw] py-[2cqw] text-neutral-white">
      <Button
        type="button"
        onClick={onRegister}
        variant="danger"
        className="mb-[2cqw] min-h-8 px-[3cqw] py-[1cqw] text-[3cqw]"
      >
        Inscripciones
      </Button>
      <div
        aria-hidden="true"
        className="absolute top-[3cqw] right-[3cqw] flex items-center text-orange"
      >
        <FiFileText className="size-[8cqw] text-neutral-white" />
        <FiEdit3 className="size-[5cqw]" />
      </div>
      <PosterContactRow icon={FiPhone} className="text-[3cqw]">
        {phone}
      </PosterContactRow>
      <PosterContactRow icon={FiMapPin} className="mt-[1.5cqw] text-[2.5cqw]">
        {address}
      </PosterContactRow>
    </div>
  );
}

export { PosterRegistrationPanel };
