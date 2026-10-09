import { useId, useState } from "react";
import { Button } from "@/components/atoms/button";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { Image } from "@/components/atoms/image";

function LearningCard({
  title,
  description,
  image,
  imageAlt = "",
  Icon,
  digital = false,
  presentation = "interactive",
  duplicate = false,
}) {
  const [expanded, setExpanded] = useState(false);
  const descriptionId = useId();

  if (presentation === "static") {
    return (
      <article tabIndex={duplicate ? -1 : 0} className="learning-card learning-card-static focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange h-full overflow-hidden rounded-xl2 border border-blue-dark/10 bg-neutral-white">
        <Image src={image} alt={imageAlt} className="aspect-video" />
        <div className="p-6">
          <div className="flex items-center gap-3">
            {Icon && <Icon aria-hidden="true" className="size-5 shrink-0 text-blue-dark" />}
            <Title level="h3" size="compact" variant="institutional" weight="bold" className="font-hani" text={title} />
          </div>
          <Paragraph size="compact" className="mt-4 leading-relaxed" text={description} />
        </div>
      </article>
    );
  }

  return (
    <article
      className={`learning-card relative isolate overflow-hidden border border-orange/30 bg-blue-dark shadow-soft ${digital ? "h-104 rounded-xl2 sm:h-120" : "h-72 rounded-sm sm:h-80"}`}
      data-expanded={expanded}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <Image
        src={image}
        alt={imageAlt}
        draggable={false}
        imageClassName={
          digital
            ? `transition-transform duration-700 ease-out motion-reduce:transition-none ${expanded ? "scale-110 motion-reduce:scale-100" : "scale-100"}`
            : ""
        }
        fill
        fallbackClassName="bg-linear-to-br from-blue-dark to-blue"
        overlayClassName={
          digital
            ? "bg-linear-to-t from-blue-deep via-blue-deep/15 to-transparent"
            : "bg-linear-to-r from-neutral-black/80 via-neutral-black/50 to-neutral-black/25"
        }
      />
      {digital && Icon && (
        <Icon
          aria-hidden="true"
          className="absolute left-5 top-5 size-10 rounded-xl border border-neutral-white/20 bg-blue-deep/50 p-2 text-orange backdrop-blur-md"
        />
      )}
      <div
        aria-hidden="true"
        className={
          digital
            ? "absolute inset-0 bg-linear-to-t from-blue-deep/80 via-transparent to-transparent"
            : "absolute inset-0 bg-linear-to-t via-blue-dark/40 to-transparent"
        }
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
        <Paragraph as="span" className="sr-only">
          Ver descripción
        </Paragraph>
      </Button>
    </article>
  );
}

export { LearningCard };
