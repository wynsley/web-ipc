import { Button } from "../atoms/button"
import { NavbarLink } from "../atoms/navbarLink"
import { IoIosArrowDown } from "react-icons/io"
import { useState, useRef, useEffect } from "react"

function NavbarMenu() {
  const [openDropdown, setOpenDropdown] = useState(null)
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

  // 🔥 Cerrar dropdown al hacer click fuera
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
    <ul className="flex items-center justify-center gap-11">
      {menu.map((item) => {
        const isOpen = openDropdown === item.text

        return (
          <li key={item.text} className="relative">

            {item.submenu ? (
              <div ref={isOpen ? dropdownRef : null}>

                <Button
                  onClick={() => toggleDropdown(item.text)}
                  className="flex items-center gap-1 text-[#2073AA] font-medium
                  hover:text-orange-400 
                  "
                >
                  {item.text}
                  <IoIosArrowDown
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                      }`}
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
              <NavbarLink
                href={item.href}
                text={item.text}
              />
            )}

          </li>
        )
      })}
    </ul>
  )
}

export { NavbarMenu }