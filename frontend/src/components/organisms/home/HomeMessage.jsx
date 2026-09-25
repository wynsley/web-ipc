import { Title } from "../../atoms/titles"

function HomeMessage () {
  return(
    <section
      className="
        my-10 md:my-20 
        mx-auto w-[96%] md:w-[90%] md:max-w-7xl py-6
        bg-[#232E42]
      "
    >
      <div>
        <Title
        level="h3"
        className="font-hani"
        text='Contáctanos'
        variant="primary"
        weight="bold"
      />
      </div>
    </section>
  )
}

export {HomeMessage}