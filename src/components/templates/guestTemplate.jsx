import './guestTemplate.css'
import {Header} from "../organisms/header"
import { Navbar } from "../organisms/navbar";
import { Footer } from "../organisms/footer";
import { FooterDecoration } from "../organisms/footerDecoration";

function GuestTemplate({ children }){
  return (
    <>
      <Header/>
      <Navbar />
      <section>
        {children}
      </section>
      <FooterDecoration />
      <Footer />
    </>
  )
}

export { GuestTemplate }
