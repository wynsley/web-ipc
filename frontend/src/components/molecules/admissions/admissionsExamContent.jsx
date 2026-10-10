import { FiArrowUpRight, FiMessageCircle } from "react-icons/fi";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { Button } from "@/components/atoms/button";

function AdmissionsExamContent({ content, onRequest }) {
  return (
    <div className="font-poppins">
      <Paragraph
        as="span"
        className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-orange"
      >
        <span aria-hidden="true" className="h-px w-9 bg-orange" />
        {content.eyebrow}
      </Paragraph>
      <Title
        id="admissions-exam-title"
        level="h2"
        variant="primary"
        weight="bold"
        className="max-w-md font-hani leading-tight"
      >
        {content.title}
      </Title>
      <Paragraph
        size="comfortable"
        variant="primary"
        className="mt-6 max-w-lg leading-relaxed"
      >
        {content.introduction}
      </Paragraph>
      <Paragraph
        size="compact"
        variant="primary"
        className="mt-4 max-w-lg leading-relaxed"
      >
        {content.description}
      </Paragraph>
      <div className="mt-8 flex gap-4 border-l-2 border-orange py-2 pl-5 sm:mt-10">
        <FiMessageCircle
          aria-hidden="true"
          className="mt-1 size-6 shrink-0 text-orange"
        />
        <div>
          <Title
            level="h3"
            size="compact"
            variant="primary"
            weight="bold"
            className="font-hani"
          >
            {content.guidanceTitle}
          </Title>
          <Paragraph
            size="compact"
            variant="primary"
            className="mt-2 max-w-sm leading-relaxed"
          >
            {content.guidance}
          </Paragraph>
        </div>
      </div>
      <Button
        type="button"
        onClick={onRequest}
        className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-orange px-5 py-3 font-hani text-xl font-bold text-blue-dark transition-colors hover:bg-neutral-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-white"
      >
        {content.action}
        <FiArrowUpRight aria-hidden="true" className="size-5 shrink-0" />
      </Button>
    </div>
  );
}

export { AdmissionsExamContent };
