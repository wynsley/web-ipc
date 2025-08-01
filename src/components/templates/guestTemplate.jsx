import './guestTemplate.css'
import {Header} from "../organisms/header"
import { Navbar } from "../organisms/navbar";

function GuestTemplate({ children }){
  return (
    <>
      <Header/>
      <Navbar />
      <section>
        {children}
      </section>
    </>
  )
}

export { GuestTemplate }
