import { Title } from "../../atoms/titles"
import { Paragraph } from "../../atoms/paragraph"

function BannerDescription({title, description}) {
  return (
    <article
      className="
          absolute inset-0 
          flex flex-col 
          justify-start        
          items-start 
          px-4 sm:px-8 md:px-10 lg:px-15 xl:px-20 
          text-white 
          z-10 
          pt-20 sm:pt-30 md:pt-[12em] 
          overflow-hidden
        "
    >
      <Title
        text={title}
        level="h1"
        weight="bold"
        variant="primary"
        className=" font-poppins mb-2 md:mb-5  text-shadow-[0px_6px_5px_black]"
      />
      <Paragraph
        text={description}
        variant="primary"
        size="medium"
        className=" text-shadow-[0px_6px_5px_black] w-[60%] lg-w-xl xl:w-2xl  font-poppins"
      />
    </article>
  )
}

export { BannerDescription }