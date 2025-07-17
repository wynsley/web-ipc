import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './components/pages/homePage'
import { MajorsPage } from './components/pages/majorsPage'
import { GraduatesPage } from './components/pages/graduatesPage'
import { AcademicServicesPage } from './components/pages/academicServicesPage'
import { AboutUsPage } from './components/pages/aboutUsPage'
import { ContactPage } from './components/pages/contactPage'
import { AdmissionPage } from './components/pages/admissionPage'
import { GuestTemplate } from './components/templates/guestTemplate'

function App() {

  const routes = [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/majors',
      component: MajorsPage
    },
    {
      path: '/graduates',
      component: GraduatesPage
    },
    {
      path: '/academic-services',
      component: AcademicServicesPage
    },
    {
      path: '/about-us',
      component: AboutUsPage
    },
    {
      path: '/contact',
      component: ContactPage
    },
    {
      path: '/admission',
      component: AdmissionPage
    },
  ]

  return (
    <GuestTemplate>
      <Routes>
        {
          routes.map(
            (route) => {
              return (
                <Route path={route.path} Component={route.component} />
              )
            }
          )
        }
      </Routes>
    </GuestTemplate>
  )
}

export default App
