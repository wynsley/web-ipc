import { FaGraduationCap } from "react-icons/fa";
import { Paragraph } from "@/components/atoms/paragraph";

function PosterExamDate({ dateLabel }) {
  return (
    <div className="mb-[3cqw] flex items-center gap-[1cqw]">
      <Paragraph
        size="inherit"
        variant="inherit"
        weight="bold"
        className="whitespace-nowrap text-[9cqw] leading-none text-orange"
      >
        {dateLabel}
      </Paragraph>
      <FaGraduationCap
        aria-hidden="true"
        className="size-[7cqw] shrink-0 -rotate-12"
      />
    </div>
  );
}

export { PosterExamDate };
