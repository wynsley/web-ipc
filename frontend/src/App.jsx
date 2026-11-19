import { lazy } from "react"
import { AnimatePresence } from "motion/react"
import { Route, Routes } from "react-router-dom"
//compoennte de carga
import { PageLoader } from "./components/molecules/shared/pageLoader"

//Animacion y trancicion
import { MainLayout } from "./components/layouts/mainLayout"

/* Páginas */
import { HomePage } from "./components/pages/homePage"
import { SocialFloatings } from "./components/molecules/shared/SocialsFloatings"

const lazyPage = (loader, name) =>
  lazy(() => loader().then((module) => ({ default: module[name] })))

const AlumniPage = lazyPage(() => import("./components/pages/alumniPage"), "AlumniPage")
const AboutUsPage = lazyPage(() => import("./components/pages/aboutUsPage"), "AboutUsPage")
const EventsPage = lazyPage(() => import("./components/pages/eventsPage"), "EventsPage")
const AdmissionPage = lazyPage(() => import("./components/pages/admissionsPage"), "AdmissionPage")
const PrivacyPage = lazyPage(() => import("./components/pages/privacyPage"), "PrivacyPage")
const StudentLivePage = lazyPage(() => import("./components/pages/studentLivePage"), "StudentLivePage")

/* Carreras */
const AdministrationPage = lazyPage(
  () => import("@/components/pages/careers/administration/businessAdministrationPage"),
  "AdministrationPage",
)
const AccountingPage = lazyPage(
  () => import("./components/pages/careers/accounting/accountingPage"),
  "AccountingPage",
)
const ComputerSciencePage = lazyPage(
  () => import("@/components/pages/careers/computerScience/computerSciencePage"),
  "ComputerSciencePage",
)
const LanguageTranslationPage = lazyPage(
  () => import("@/components/pages/careers/languageTranslation/languageTranslationPage"),
  "LanguageTranslationPage",
)

function App() {


  const pages = [
    { path: '/', element: <HomePage /> },
    { path: '/alumni', element: <AlumniPage /> },
    { path: '/about-us', element: <AboutUsPage /> },
    { path: '/events', element: <EventsPage /> },
    { path: '/admissions', element: <AdmissionPage /> },
    { path: '/privacy', element: <PrivacyPage /> },
    { path: '/student-life', element: <StudentLivePage /> },

    // Carreras
    { path: '/career/administration', element: <AdministrationPage /> },
    { path: '/career/accounting', element: <AccountingPage /> },
    { path: '/career/computer-science', element: <ComputerSciencePage /> },
    { path: '/career/language-translation', element: <LanguageTranslationPage /> },
  ]

  return (
    <>
      <PageLoader/>
      <SocialFloatings />
      <AnimatePresence mode="wait" initial={false}>
        <Routes>
          <Route element={<MainLayout />}>
            {pages.map((page, p) => (
              <Route
                key={p}
                path={page.path}
                element={page.element}
              />
            ))}
          </Route>
        </Routes>

      </AnimatePresence></>
  )
}
export default App
