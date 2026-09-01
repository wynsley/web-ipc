import { Navbar } from "./components/organisms/navbar"
import { Header } from "./components/organisms/header"
import { Footer } from "./components/organisms/footer"
import { Route, Routes } from "react-router-dom"

/* Páginas */
import { HomePage } from "./pages/homePage"
import { AlumniPage } from "./pages/alumniPage"
import { AboutUsPage } from "./pages/aboutUsPage"
import { EventsPage } from "./pages/eventsPage"
import { AdmissionPage } from "./pages/admissionsPage"
import { ContactPage } from "./pages/contactPage"

/* Carreras */
import { AdministrationPage } from "./pages/careers/businessAdministrationPage"
import { AccountingPage } from "./pages/careers/accountingPage"
import { ComputerSciencePage } from "./pages/careers/computerSciencePage"
import { LanguageTraslationPage } from "./pages/careers/languageTraslationPage"

function App() {
  const pages = [
    { path: '/', element: <HomePage /> },
    { path: '/alumni', element: <AlumniPage /> },
    { path: '/about-us', element: <AboutUsPage /> },
    { path: '/events', element: <EventsPage /> },
    { path: '/admissions', element: <AdmissionPage /> },
    { path: '/contact', element: <ContactPage /> },

    // Carreras
    { path: '/career/administration', element: <AdministrationPage /> },
    { path: '/career/accounting', element: <AccountingPage /> },
    { path: '/career/computer-science', element: <ComputerSciencePage /> },
    { path: '/career/language-translation', element: <LanguageTraslationPage /> },
  ]

  return (
    <>
      <Header />
      <Navbar />

      <Routes>
        {pages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={page.element}
          />
        ))}
      </Routes>

      <Footer />
    </>
  )
}
export default App
