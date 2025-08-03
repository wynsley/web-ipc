import { useState, useEffect } from "react"
import "./logicaCarousel.css"


const AsideCarousel = ({ images = [], interval = 5000, children }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const total = images.length

    //el carrucel avanza automaticamente cada 5 segundos
    useEffect(() =>{
        const timer = setInterval(() =>{
            setActiveIndex(prev => (prev + 1 ) % total)
        }, interval )
        return () => clearInterval(timer)
    }, [interval, total])

    const goToNext = () => setActiveIndex(prev => (prev + 1) % total)
    const goToPrev = () => setActiveIndex(prev => (prev - 1 + total) % total)

    //pasar botones personalizados
    return (
        <aside className="aside">
                {/*boton para retroceder*/}
                {children && children.prev ? children.prev(goToPrev) : null}

                <div className="carousel__aside__images">
                    {/*imgs actualizables*/}
                    {images.length > 0 && (
                        <img src={images[activeIndex].src} alt={images[activeIndex].alt} className="carousel__img" />
                    )}
                </div>

                {/*boton para avanzar*/}
                {children && children.next ? children.next(goToNext) : null}
        </aside>
    )
}



export {AsideCarousel}