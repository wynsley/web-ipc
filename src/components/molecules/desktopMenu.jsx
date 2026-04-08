import { Button } from "../atoms/button"
import { NavbarLink } from "../atoms/navbarLink"
import { IoIosArrowDown } from "react-icons/io"
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"
import { useState, useRef, useEffect } from "react"

function NavbarMenu() {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef(null)

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

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      {/* Botón hamburguesa - solo visible en mobile */}
      <button
        className="md:hidden text-[#FBFCFC] text-2xl"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <RiCloseLine /> : <RiMenu3Line />}
      </button>

      {/* Menú desktop */}
      <ul className="hidden md:flex items-center justify-center md:gap-6 lg:gap-[3.5vw] xl-gap-12 z-10">
        {menu.map((item) => {
          const isOpen = openDropdown === item.text
          return (
            <li key={item.text} className="relative">
              {item.submenu ? (
                <div ref={isOpen ? dropdownRef : null}>
                  <Button
                    onClick={() => toggleDropdown(item.text)}
                    className="flex items-center gap-1 text-[#2073AA] font-medium hover:text-orange-400
                      md:text-[.8em] lg:text-[.9em] xl:text-[1em]
                    "
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

      {/* Menú mobile */}
      {mobileOpen && (
        <div className="md:hidden absolute top-[4em] left-0 w-full bg-[#FBFCFC] shadow-md z-50 px-6 py-4 flex flex-col gap-2">
          {menu.map((item) => {
            const isOpen = openDropdown === item.text
            return (
              <div key={item.text}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.text)}
                      className="flex items-center justify-between w-full text-[#2073AA] font-medium py-2 border-b border-gray-100"
                    >
                      {item.text}
                      <IoIosArrowDown
                        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <ul className="pl-4 flex flex-col gap-1 ">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.href}>
                            <NavbarLink
                              href={subItem.href}
                              text={subItem.text}
                              onClick={() => {
                                setOpenDropdown(null)
                                setMobileOpen(false)
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <div className="border-b border-gray-100 py-2">
                    <NavbarLink
                      href={item.href}
                      text={item.text}
                      onClick={() => setMobileOpen(false)}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export { NavbarMenu }