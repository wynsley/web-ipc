import { Image } from "@/components/atoms/image";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { TranslationExample } from "./translationExample";

function TranslationLearningPanel({ topic, selected, panelId, tabId }) {
  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      hidden={!selected}
      tabIndex={0}
      className={`${selected ? "grid" : "hidden"} bg-neutral-white focus-visible:outline-2 focus-visible:outline-blue-dark lg:grid-cols-[0.9fr_1.1fr]`}
    >
      <div className="relative min-h-72 sm:min-h-96">
        <Image
          src={topic.image}
          alt={topic.imageAlt}
          fill
          imageClassName="object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-blue-dark/90 via-transparent to-transparent"
        />
        <Paragraph
          as="span"
          aria-hidden="true"
          className="absolute bottom-6 left-6 font-hani text-6xl font-bold text-white sm:text-7xl"
        >
          {topic.word}
        </Paragraph>
      </div>
      <div className="p-6 sm:p-9 lg:p-10">
        <Title
          level="h3"
          variant="institutional"
          weight="bold"
          className="font-hani"
          text={topic.title}
        />
        <Paragraph
          size="compact"
          className="mt-4 font-poppins leading-relaxed"
          text={topic.description}
        />
        <TranslationExample {...topic.example} />
      </div>
    </div>
  );
}

export { TranslationLearningPanel };
