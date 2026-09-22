import { Title } from "../../atoms/titles";
import { WorkplaceTile } from "../../molecules/careers/workplaceTile";

function CareerWorkplaces({ workplaces }) {
  return (
    <section
      aria-labelledby="career-workplaces-title"
      className="bg-neutral-light px-4 py-12 sm:px-8 sm:py-16 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <Title
          id="career-workplaces-title"
          level="h2"
          text="Campo laboral"
          variant="danger"
          weight="bold"
          align="center"
          className="font-hani"
        />
        <div className="workplace-gallery mt-8 sm:mt-10">
          {workplaces.map((workplace) => (
            <WorkplaceTile key={workplace.layout} {...workplace} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { CareerWorkplaces };
