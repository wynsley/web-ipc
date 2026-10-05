import { Paragraph } from "@/components/atoms/paragraph";
import { Title } from "@/components/atoms/titles";

function Values({ value }) {
  const Icon = value.icon
  return (
      <li key={value.title} className="flex items-start gap-5">
        <div className="flex h-17 w-17 shrink-0 items-center justify-center rounded-full bg-blue-deep text-white">
          <Icon className="h-10 w-10" aria-hidden="true" />
        </div>
        <div className="pt-1">
          <Title
            level="h4"
            text={value.title}
            weight="bold"
            className="font-hani"
          />
          <Paragraph
            text={value.text}
            className="font-euro"
            variant="secondary"
          />
        </div>
      </li>
  )
}

export { Values }