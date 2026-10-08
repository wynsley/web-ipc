import { Button } from "../../atoms/button"
import { NavbarLink } from "../../atoms/navbarLink"
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"
import { useState, useRef, useEffect } from "react"
import { MobileMenu } from "./mobileMenu"
import { IoIosArrowDown } from "react-icons/io"

function NavbarMenu() {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const hamburgerRef = useRef(null)

  const menu = [
    {
      text: 'Carreras',
      submenu: [
        { text: 'Administración de Empresas', href: '/career/administration' },
        { text: 'Contabilidad', href: '/career/accounting' },
        { text: 'Computación e Informática', href: '/career/computer-science' },
        { text: 'Traducción de Idiomas', href: '/career/language-translation' }
      ]
    },
    { text: 'Egresados', href: '/alumni' },
    { text: 'Nosotros', href: '/about-us' },
    { text: 'Eventos', href: '/events' },
    { text: 'Admisión', href: '/admissions' },
    { text: 'Vida Estudiantil', href: '/student-life' },
  ]

  // Se sigue usando en el menú móvil (acordeón por clic).
  const handleToggle = (text) => {
    setOpenDropdown(prev => prev === text ? null : text)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Desktop dropdown (sigue sirviendo en tablets táctiles sin hover)
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }

      // Mobile menu
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setMobileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        ref={hamburgerRef}
        className="md:hidden text-white text-2xl z-200"
        onClick={(e) => {
          e.stopPropagation()
          setMobileOpen(prev => !prev)
        }}
      >
        {mobileOpen ? <RiCloseLine /> : <RiMenu3Line />}
      </button>

      {/* Desktop */}
      <ul
        ref={navRef}
        className="hidden md:flex items-center justify-center md:gap-6 lg:gap-[3.5vw] z-10"
      >
        {menu.map((item) => {
          const isOpen = openDropdown === item.text

          return (
            <li
              key={item.text}
              className="relative"
              // Hover: abre al entrar y cierra al salir del <li> (botón + submenú)
              onMouseEnter={item.submenu ? () => setOpenDropdown(item.text) : undefined}
              onMouseLeave={item.submenu ? () => setOpenDropdown(null) : undefined}
              // Teclado: Esc cierra el submenú
              onKeyDown={
                item.submenu
                  ? (e) => { if (e.key === "Escape") setOpenDropdown(null) }
                  : undefined
              }
            >
              {item.submenu ? (
                <div>
                  <Button
                    // Clic/Enter/toque solo ABRE (no alterna), así no se cierra
                    // justo después de abrirse con el hover.
                    onClick={() => setOpenDropdown(item.text)}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    className="flex items-center text-[1em]
                    gap-1 text-[#193F81] font-medium hover:text-orange-400"
                  >
                    {item.text}
                    <IoIosArrowDown
                      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </Button>

                  {isOpen && (
                    // pt-2 (en vez de mt-2) para que no haya hueco entre el botón
                    // y el submenú; si hay hueco, el mouse "sale" y se cierra.
                    <div className="absolute top-full left-7 z-50 pt-2 w-[18em]">
                      <ul className="flex flex-col gap-3 bg-neutral-white shadow-lg p-2">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.href}>
                            <NavbarLink
                              href={subItem.href}
                              text={subItem.text}
                              onClick={() => setOpenDropdown(null)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <NavbarLink href={item.href} text={item.text} />
              )}
            </li>
          )
        })}
      </ul>

      {/* Mobile */}
      <MobileMenu
        ref={mobileMenuRef}
        menu={menu}
        mobileOpen={mobileOpen}
        openDropdown={openDropdown}
        handleToggle={handleToggle}
        setOpenDropdown={setOpenDropdown}
        setMobileOpen={setMobileOpen}
      />
    </>
  )
}

export { NavbarMenu }