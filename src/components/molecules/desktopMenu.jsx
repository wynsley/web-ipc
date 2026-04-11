import { Button } from "../atoms/button"
import { NavbarLink } from "../atoms/navbarLink"
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
    { text: 'Sobre Nosotros', href: '/about-us' },
    { text: 'Eventos', href: '/events' },
    { text: 'Admisión', href: '/admissions' },
    { text: 'Contacto', href: '/contact' },
  ]

  const handleToggle = (text) => {
    setOpenDropdown(prev => prev === text ? null : text)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Desktop dropdown
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

    // 👇 usamos mousedown (mejor que click)
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        ref={hamburgerRef}
        className="md:hidden text-white text-2xl z-[200]"
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
            <li key={item.text} className="relative">
              {item.submenu ? (
                <div>
                  <Button
                    onClick={() => handleToggle(item.text)}
                    className="flex items-center text-[.8em] lg:text-[.9em] xl:text-[1em] gap-1 text-blue font-medium hover:text-orange-400"
                  >
                    {item.text}
                    <IoIosArrowDown
                      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </Button>

                  {isOpen && (
                    <ul className="absolute z-50 top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-2 min-w-55">
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