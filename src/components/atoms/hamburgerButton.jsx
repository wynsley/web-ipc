import React from "react"
import { FaBars, FaXmark }  from "react-icons/fa6"

import "./hamburgerButton.css"

function HamburgerButton ({open, toggle, className = ""}) {
    return (
        <button
            className={`hamburger__btn ${className}`}
            onClick={toggle}
            aria-label={open ? "Cerrar menú" : "Abrir Menú"}
            type="button"
        >
            {open ? <FaXmark /> : <FaBars />}
        </button>
    )
}

export { HamburgerButton }