import { AnimatePresence, motion as Motion} from "motion/react";
import {StudentLifeActivities } from "../organisms/studentLife/studentLifeActivities";
import { StudentLifeHero } from "../organisms/studentLife/studentLifeHero";
import { MyTemplate } from "../templates/myTemplate";
import { ModalStudentLifeCareer } from "../modals/modalStudentLifeCareer";
import { useHoverMenu } from "@/hooks/modal/useHoverMenu";
import { StudentLifeStats } from "../organisms/studentLife/studentLifeStats";
import { StudentLifeWellbeing } from "../organisms/studentLife/studentLifeWellbeing";
import { InfrastructureGallery } from "../organisms/studentLife/studentLifeGalery";

const MENU_WIDTH = 288 

function StudentLivePage() {
  const {
    isOpen,
    position,
    anchorRef,
    menuRef,
    open,
    close,
    scheduleClose,
    cancelClose,
  } = useHoverMenu({
    menuWidth: MENU_WIDTH,
  })
  return (
    <MyTemplate>
      <StudentLifeHero
        anchorRef={anchorRef}
        isMenuOpen={isOpen}
        onMenuOpen={open}
        onMenuLeave={scheduleClose}
      />
      <StudentLifeStats/>
      <StudentLifeWellbeing/>
      <StudentLifeActivities/>
      <InfrastructureGallery/>
      {/*Modal de carreras hero */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            style={{
              top: position.top,
              left: position.left,
              width: MENU_WIDTH,
            }}
            // pt-2 en vez de margen: sin hueco entre el botón y el menú.
            className="absolute z-30 pt-2"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <nav
              aria-label="Carreras"
              onClick={close}
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