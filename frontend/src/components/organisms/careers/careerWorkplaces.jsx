import { useId, useState } from "react";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { Button } from "../../atoms/button";
import { WorkplaceTile } from "../../molecules/careers/workplaceTile";

function CareerWorkplaces({ workplaces }) {
  const [expanded, setExpanded] = useState(false);
  const galleryId = useId();
  const visibleWorkplaces = expanded ? workplaces : workplaces.slice(0, 4);

  return (
    <section
      aria-labelledby="career-workplaces-title"
      className="bg-neutral-light px-4 py-12 sm:px-8 sm:py-16 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <Title
          id="career-workplaces-title"
          level="h2"
          text="Campo laboral"
          variant="institutional"
          weight="bold"
          className="font-hani"
        />
        <Paragraph
          text="Descubre dónde puedes desarrollar tu talento."
          size="compact"
          variant="danger"
          className="mt-2 font-poppins"
        />
        <div id={galleryId} className="workplace-gallery mt-6 sm:mt-8">
          {visibleWorkplaces.map((workplace) => (
            <WorkplaceTile key={workplace.layout} {...workplace} />
          ))}
        </div>
        {workplaces.length > 4 && (
          <Button
            type="button"
            aria-expanded={expanded}
            aria-controls={galleryId}
            onClick={() => setExpanded((value) => !value)}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-blue-dark px-7 py-3 font-poppins text-sm text-white transition-colors hover:bg-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-dark cursor-pointer"
            text={expanded ? "Ver menos" : "Ver toda la galería"}
          />
        )}
      </div>
    </section>
  );
}

export { CareerWorkplaces };
