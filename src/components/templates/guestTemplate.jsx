import './guestTemplate.css'
import {Header} from "../organisms/header"
import { Navbar } from "../organisms/navbar.jsx";
import { CardList } from '../organisms/listEconomicService';
import { Footer } from "../organisms/footer";
import { FooterDecoration } from "../organisms/footerDecoration";
import { FloatingContactIcons } from "../organisms/floatingContactIcons";

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
      
      <FloatingContactIcons 
        whatsappNumber="+51946795283"
        whatsappMessage="¡Hola! Me interesa obtener más información sobre las carreras del Instituto Privado Celendín."
        messengerUrl="https://m.me/institutoprivadocelendin"
        showNotifications={true}
        allowMinimize={true}      
      />
    </>
  )
}

export { GuestTemplate }
