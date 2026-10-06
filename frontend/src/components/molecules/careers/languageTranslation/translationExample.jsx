import { PiArrowRight } from "react-icons/pi";
import { Paragraph } from "@/components/atoms/paragraph";

function TranslationExample({ source, target, note }) {
  return (
    <div className="mt-7 border-l-2 border-orange bg-neutral-light p-5">
      <Paragraph
        as="span"
        className="font-poppins text-xs tracking-widest text-blue-dark uppercase"
      >
        Un ejemplo, dos formas de decirlo
      </Paragraph>
      <div className="mt-4 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div>
          <Paragraph as="span" className="font-poppins text-xs text-blue">
            EN
          </Paragraph>
          <Paragraph
            lang="en"
            size="comfortable"
            className="mt-1 font-hani"
            text={source}
          />
        </div>
        <PiArrowRight
          aria-hidden="true"
          className="size-5 rotate-90 text-blue sm:rotate-0"
        />
        <div>
          <Paragraph as="span" className="font-poppins text-xs text-blue">
            ES
          </Paragraph>
          <Paragraph
            size="comfortable"
            className="mt-1 font-hani"
            text={target}
          />
        </div>
      </div>
      <Paragraph
        size="compact"
        className="mt-4 font-poppins leading-relaxed"
        text={note}
      />
    </div>
  );
}
export { TranslationExample };
