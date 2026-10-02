import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Paragraph } from "../../atoms/paragraph";

function ComputerScienceHeroIntro({ title, description, action }) {
  return (
    <div className="relative px-6 pt-8 sm:px-10 md:min-h-60 md:w-[54%] lg:px-14">
      <Paragraph size="compact" className="max-w-lg leading-8">
        {description} <strong>{title}.</strong>
      </Paragraph>
      <Link
        to={action.to}
        className="mt-6 inline-flex items-center gap-3 rounded-lg bg-blue-dark px-5 py-3 text-sm font-bold text-neutral-white transition-colors hover:bg-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-dark"
      >
        {action.label} <FiArrowUpRight aria-hidden="true" className="text-lg" />
      </Link>
    </div>
  );
}

export { ComputerScienceHeroIntro };
