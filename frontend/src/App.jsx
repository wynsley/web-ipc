import { AnimatePresence } from "motion/react"
import { Route, Routes } from "react-router-dom"

//Animacion y trancicion
import { MainLayout } from "./components/layouts/mainLayout"

/* Páginas */
import { HomePage } from "./components/pages/homePage"
import { AlumniPage } from "./components/pages/alumniPage"
import { AboutUsPage } from "./components/pages/aboutUsPage"
import { EventsPage } from "./components/pages/eventsPage"
import { AdmissionPage } from "./components/pages/admissionsPage"
import { ContactPage } from "./components/pages/contactPage"

/* Carreras */
import { AdministrationPage } from "./components/pages/careers/businessAdministrationPage"
import { AccountingPage } from "./components/pages/careers/accountingPage"
import { ComputerSciencePage } from "./components/pages/careers/computerSciencePage"
import { LanguageTraslationPage } from "./components/pages/careers/languageTranslationPage"

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
    <AnimatePresence mode="whait" initial={false}>

      <Routes>
        <Route element={<MainLayout/>}>
          {pages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={page.element}
          />
        ))}
        </Route>
      </Routes>

    </AnimatePresence>
  )
}
export default App
