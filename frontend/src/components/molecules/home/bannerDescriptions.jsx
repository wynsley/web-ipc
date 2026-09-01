import { Title } from "../../atoms/titles"
import { Paragraph } from "../../atoms/paragraph"

function BannerDescription({title, description,text2}) {
  return (
    <article
      className="
          absolute inset-0 
          flex flex-col 
          justify-center        
          items-start 
          px-4 sm:px-8 md:px-10 lg:px-15 xl:px-20 
          text-white 
          z-10 
          overflow-hidden
          mt-[5vh] sm:mt-[4vh] lg:mt-0
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
        variant="primary"
        size="medium"
        className=" text-shadow-[1px_5px_4px_black] w-[50%] font-poppins"
      >{description} 
        <span
          className="hidden sm:block font-poppins"
          >{text2}
        </span>   
      </Paragraph>
    </article>
  )
}

export { BannerDescription }