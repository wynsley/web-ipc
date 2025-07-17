import './guestTemplate.css'
import { Navbar } from "../organisms/navbar";

function GuestTemplate({ children }){
  return (
    <>
      <Navbar />
      <section>
        {children}
      </section>
    </>
  )
}

export { GuestTemplate }
