import { forwardRef } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { NavbarLink } from "../atoms/navbarLink"

const MobileMenu = forwardRef(function MobileMenu({
  menu,
  mobileOpen,
  openDropdown,
  handleToggle,
  setOpenDropdown,
  setMobileOpen,
}, ref) {
  return (
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation()} // 🔥 IMPORTANTE
      className={`
        md:hidden absolute top-[4em] left-0 w-full
        bg-white shadow-md z-[150] px-6 py-4
        flex flex-col gap-2
        transition-all duration-300
        ${mobileOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-5 pointer-events-none"}
      `}
    >
      {menu.map((item) => {
        const isOpen = openDropdown === item.text

        return (
          <div key={item.text}>
            {item.submenu ? (
              <>
                <button
                  onClick={() => handleToggle(item.text)}
                  className="flex items-center justify-between w-full text-blue font-medium py-2 border-b border-gray-100"
                >
                  {item.text}
                  <IoIosArrowDown
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <ul
                  className={`
                    overflow-hidden transition-all duration-300
                    ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  {item.submenu.map((subItem) => (
                    <li key={subItem.href} className="pl-4 py-1">
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
  )
})

export { MobileMenu }