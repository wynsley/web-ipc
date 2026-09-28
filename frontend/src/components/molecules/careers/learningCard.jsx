import { useId, useState } from "react";
import { Button } from "../../atoms/button";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { Image } from "../../atoms/image";

function LearningCard({ title, description, image, duplicate = false }) {
  const [expanded, setExpanded] = useState(false);
  const descriptionId = useId();

  return (
    <article
      className="learning-card relative isolate h-72 overflow-hidden rounded-sm border border-orange/30 bg-blue-dark shadow-soft sm:h-80"
      data-expanded={expanded}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <Image
          src={image}
          fill
          fallbackClassName="bg-linear-to-br from-blue-dark to-blue"
          overlayClassName="bg-linear-to-r from-neutral-black/80 via-neutral-black/50 to-neutral-black/25"
        />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t  via-blue-dark/40 to-transparent"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
        <Title
          level="h3"
          size="compact"
          variant="primary"
          weight="bold"
          className="font-hani leading-tight"
          text={title}
        />
        <div className="learning-card__description" id={descriptionId}>
          <div className="min-h-0 overflow-hidden">
            <Paragraph
              size="compact"
              variant="primary"
              className="pt-4 font-poppins leading-relaxed"
              text={description}
            />
          </div>
        </div>
      </div>
      <Button
        type="button"
        tabIndex={duplicate ? -1 : 0}
        aria-label={`Ver qué aprenderás sobre ${title}`}
        aria-expanded={expanded}
        aria-controls={descriptionId}
        onClick={() => setExpanded(true)}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        className="absolute inset-0 z-20 cursor-pointer rounded-xl2 focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-orange"
      >
        <span className="sr-only">Ver descripción</span>
      </Button>
    </article>
  );
}

export { LearningCard };
