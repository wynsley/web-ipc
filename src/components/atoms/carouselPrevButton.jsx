/**
 * boton para avanzar en un carrusel
 * @param {function} onClick - es una funcion que se ejecuta al hacer click.
 * @param {string} className -  las clases para hacer estilos personalizados.
 * @param {ReactNode} children - los elementos hijos.
 */

const CarouselPrevButton = ({ onClick, className, children }) => (
    <button
        type="button"
        className={className}
        onClick={onClick}
        aria-label="Anterior"
    >
        {children}
    </button>
)

export default CarouselPrevButton