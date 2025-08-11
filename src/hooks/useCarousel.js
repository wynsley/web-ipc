import { useState, useEffect } from "react"

/**
 * Hook personalizado para manejar la lógica del carrusel
 * @param {Array} items - Array de elementos (imágenes, componentes, etc.)
 * @param {number} interval - Intervalo en ms para autoplay
 * @param {boolean} autoPlay - Si debe reproducirse automáticamente
 * @returns {Object} - Objeto con estado y funciones del carrusel
 */
 const UseCarousel = (items = [], interval = 5000, autoPlay = true) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const total = items.length

    // Resetear el índice si cambian los items
    useEffect(() => {
        if (activeIndex >= total && total > 0) {
            setActiveIndex(0)
        }
    }, [items, total, activeIndex])

    // Autoplay automático
    useEffect(() => {
        if (!isPlaying || total <= 1) return

        const timer = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % total)
        }, interval)
        
        return () => clearInterval(timer)
    }, [interval, total, isPlaying])

    // Funciones de navegación
    const goToNext = () => {
        setActiveIndex(prev => (prev + 1) % total)
    }
    
    const goToPrev = () => {
        setActiveIndex(prev => (prev - 1 + total) % total)
    }
    
    const goToSlide = (index) => {
        if (index >= 0 && index < total) {
            setActiveIndex(index)
        }
    }

    // Funciones de control
    const pause = () => setIsPlaying(false)
    const play = () => setIsPlaying(true)
    const toggle = () => setIsPlaying(prev => !prev)

    return {
        // Estado
        activeIndex,
        total,
        isPlaying,
        currentItem: items[activeIndex] || null, // Añadir || null
        
        // Navegación
        goToNext,
        goToPrev,
        goToSlide,
        
        // Control
        pause,
        play,
        toggle,
        
        // Utilidades
        isFirst: activeIndex === 0,
        isLast: activeIndex === total - 1,
        hasMultiple: total > 1
    }
}

export default UseCarousel