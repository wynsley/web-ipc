import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";

import { Navbar } from "../organisms/navigation/navbar";
import { Header } from "../organisms/navigation/header";
import { TransitionPage } from "./transitionPage";

import { useScrollTop } from "../../hooks/globals/useScrollTop";
import { Footer } from "../organisms/footer/footer";

function MainLayout() {
  const location = useLocation();

  useScrollTop();

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <TransitionPage key={location.pathname}>
            <Outlet />
          </TransitionPage>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export { MainLayout };