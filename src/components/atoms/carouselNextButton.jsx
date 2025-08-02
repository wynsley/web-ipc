/**
 * boton para avanzar en un carrusel
 * @param {function} onClick - es una funcion que se ejecuta al hacer click.
 * @param {string} className -  las clases para hacer estilos personalizados.
 * @param {ReactNode} children - los elementos hijos.
 */

const CarouselNextButton = ({ onClick, className, children }) => (
    <button 
        type="button"
        className={className}
        onClick={onClick}
        aria-label="Siguiente"
    >
        {children}
    </button>

)

export default CarouselNextButton