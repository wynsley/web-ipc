import { Button } from "../../atoms/button"
import { Title } from "../../atoms/titles"
import { ContactSteps } from "../../molecules/shared/contactSteps"

function HomeMessage() {
  return (
    <section
      className="
        my-10 md:my-20 p-4 grid grid-cols-1 md:grid-cols-[9em_1fr] lg:grid-cols-[12em_1fr] gap-5
        mx-auto w-[96%] md:w-[90%] md:max-w-7xl py-6
        bg-blue-deep
      "
    >
      <ContactSteps />
      <form className="grid grid-cols-2 grid-rows-2 sm:grid-rows-1 sm:grid-cols-3 gap-5">
        <div className="flex flex-col justify-around">
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="name" className="text-white font-hani text-[1.1em] font-bold">Nombre completo</label>
            <input 
              type="text" 
              className="h-10 bg-neutral-white text-black px-3 outline-none  transition-all duration-200 border border-transparent hover:border-orange"  
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastname" className="text-white font-hani text-[1.1em] font-bold">Email</label>
            <input
              type="email"
              className="h-10 bg-neutral-white text-black  px-3 outline-none transition-all duration-200 border border-transparent hover:border-orange" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastname" className="text-white font-hani text-[1.1em] font-bold">Teléfono</label>
            <input
              type="tel"
              className="h-10 bg-neutral-white text-black  px-3 outline-none transition-all duration-200 border border-transparent hover:border-orange" 
            />
          </div>
        </div>

        <div className="flex flex-col justify-around">
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="name" className="text-white font-hani text-[1.1em] font-bold">Dirección</label>
            <input 
              type="text" 
              className="h-10 bg-neutral-white text-black  px-3 outline-none  transition-all duration-200 border border-transparent hover:border-orange"  
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastname" className="text-white font-hani text-[1.1em] font-bold">Carreras</label>
            <select name="careers" className="h-10 bg-neutral-white text-black  px-3 outline-none  transition-all duration-200 border border-transparent hover:border-orange">
              <option value="0" disabled className=" font-bold font-hani bg-white">Carrera de interés</option>
              <option value="" className="text-black font-hani font-bold bg-white">Administración</option>
              <option value="" className="text-black font-hani font-bold bg-white">Contabilidad</option>
              <option value="" className="text-black font-hani font-bold bg-white">Informática</option>
              <option value="" className="text-black font-hani font-bold bg-white">Idiomas</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastname" className="text-white font-hani text-[1.1em] font-bold">Turno</label>
            <select name="careers" className="h-10 bg-neutral-white text-black  px-3 outline-none  transition-all duration-200 border border-transparent hover:border-orange">
              <option value="0" disabled className=" font-bold font-hani bg-white">Seleccione el turno</option>
              <option value="" className="text-black font-hani font-bold bg-white">Mañana</option>
              <option value="" className="text-black font-hani font-bold bg-white">Tarde</option>
              <option value="" className="text-black font-hani font-bold bg-white">Noche</option>
            </select>
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 sm:row-span-1 flex flex-col sm:justify-around">
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-white font-hani text-[1.1em] font-bold"> Mensaje</label>
            <textarea 
            name=""
            placeholder="Mensaje..."
            className="h-10 bg-neutral-white text-black  px-3 outline-none  w-full min-h-[5em] sm:min-h-[9em]
            transition-all duration-200 border border-transparent hover:border-orange"
          />
          </div>
          <Button
            text='Enviar'
            variant="danger"
            className="mx-auto"
          />

        </div>
      </form>
    </section>
  )
}

export { HomeMessage }