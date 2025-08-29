import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/pages/homePage";
import { MajorsPage } from "./components/pages/majorsPage";
import { GraduatesPage } from "./components/pages/graduatesPage";
import { AcademicServicesPage } from "./components/pages/academicServicesPage";
import { AboutUsPage } from "./components/pages/aboutUsPage";
import { ContactPage } from "./components/pages/contactPage";
import { AdmissionPage } from "./components/pages/admissionPage";
import { GuestTemplate } from "./components/templates/guestTemplate";
import { AccountingPage } from "./components/pages/accountingPage";
import { BusinessAdministrationPage } from "./components/pages/businessAdministrationPage";
import { ComputingITPage } from "./components/pages/ComputingITPage";
import { LanguageTranslationPage } from "./components/pages/languageTranslationPage";

function App() {
  const routes = [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/majors",
      component: MajorsPage,
    },
    {
      path: "/graduates",
      component: GraduatesPage,
    },
    {
      path: "/academic-services",
      component: AcademicServicesPage,
    },
    {
      path: "/about-us",
      component: AboutUsPage,
    },
    {
      path: "/contact",
      component: ContactPage,
    },
    {
      path: "/admission",
      component: AdmissionPage,
    },
    {
      path: "/majors/accounting",
      component: AccountingPage,
    },
    {
      path: "/majors/bussiness-administration",
      component: BusinessAdministrationPage,
    },
    {
      path: "/majors/computing-it",
      component: ComputingITPage,
    },
    {
      path: "/majors/language-translation",
      component: LanguageTranslationPage,
    },
  ];

  return (
    <GuestTemplate>
      <Routes>
        {routes.map((route) => {
          return <Route path={route.path} Component={route.component} />;
        })}
      </Routes>
    </GuestTemplate>
  );
}

export default App;
