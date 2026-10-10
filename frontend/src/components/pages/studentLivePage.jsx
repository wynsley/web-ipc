import { AnimatePresence, motion as Motion} from "motion/react";
import {StudentLifeActivities } from "../organisms/studentLife/studentLifeActivities";
import { StudentLifeHero } from "../organisms/studentLife/studentLifeHero";
import { MyTemplate } from "../templates/myTemplate";
import { ModalStudentLifeCareer } from "../modals/modalStudentLifeCareer";
import { useRef } from "react";
import { useHoverMenu } from "@/hooks/modal/useHoverMenu";
import { StudentLifeStats } from "../organisms/studentLife/studentLifeStats";
import { StudentLifeWellbeing } from "../organisms/studentLife/studentLifeWellbeing";

const MENU_WIDTH = 288 

function StudentLivePage() {
  const sectionRef = useRef(null)

  const careersMenu = useHoverMenu({
    containerRef: sectionRef,
    menuWidth: MENU_WIDTH,
  })
  return (
    <MyTemplate>
      <StudentLifeHero
        careersMenu={careersMenu}
      />
      <StudentLifeStats/>
      <StudentLifeWellbeing/>
      <StudentLifeActivities/>
      {/*Modal de carreras hero */}
      <AnimatePresence>
        {careersMenu.isOpen && (
          <Motion.div
            ref={careersMenu.menuRef}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            style={{
              top: careersMenu.position.top,
              left: careersMenu.position.left,
              width: MENU_WIDTH,
            }}
            // pt-2 en vez de margen: sin hueco entre el botón y el menú.
            className="absolute z-30 pt-2"
            onMouseEnter={careersMenu.cancelClose}
            onMouseLeave={careersMenu.scheduleClose}
          >
            <nav
              aria-label="Carreras"
              onClick={careersMenu.close}
              className="overflow-hidden rounded-xl border border-white/20 shadow-xl shadow-black/30"
            >
              <ModalStudentLifeCareer />
            </nav>
          </Motion.div>
        )}
      </AnimatePresence>
    </MyTemplate>
  )
}

export { StudentLivePage }