import { useState, useEffect } from 'react'
import './imageGalleryCarousel.css'

/**
 * Carrusel automático de galería de imágenes - Molécula
 * @param {Array} images - Array de imágenes
 * @param {number} interval - Intervalo entre cambios (ms)
 * @param {boolean} autoPlay - Reproducción automática
 * @param {boolean} pauseOnHover - Pausar al hacer hover
 * @param {boolean} showIndicators - Mostrar indicadores
 * @param {boolean} showProgress - Mostrar barra de progreso
 * @param {string} className - Clases CSS adicionales
 */
const ImageGalleryCarousel = ({
    images = [],
    interval = 4000,
    autoPlay = true,
    pauseOnHover = true,
    showIndicators = true,
    showProgress = true,
    className = ''
}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const [progress, setProgress] = useState(0)

    // Auto-play functionality
    useEffect(() => {
        if (!isPlaying || images.length <= 1) return

        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length)
            setProgress(0)
        }, interval)

        return () => clearInterval(timer)
    }, [currentIndex, isPlaying, images.length, interval])

    // Progress bar animation
    
    useEffect(() => {
        if (!isPlaying || images.length <= 1) return

        const progressTimer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    return 0
                }
                return prev + (100 / (interval / 100))
            })
        }, 100)

        return () => clearInterval(progressTimer)
    }, [currentIndex, isPlaying, interval, images.length])

    //resetear barra de progreso
    useEffect(() => {
        if (!isPlaying) {
            setProgress(0)
        }
    }, [isPlaying])

    const handleMouseEnter = () => {
        if (pauseOnHover) {
            setIsPlaying(false)
        }
    }

    const handleMouseLeave = () => {
        if (pauseOnHover && autoPlay) {
            setIsPlaying(true)
        }
    }

    // Handle indicator click
    const handleIndicatorClick = (index) => {
        setCurrentIndex(index)
        setProgress(0)
    }

    // Calculate transform value
    const getTransformValue = () => {
        return `translateX(-${currentIndex * 20}%)`
    }

    if (!images || images.length === 0) {
        return (
            <div className={`image-gallery ${className}`}>
                <div className="image-gallery__empty">
                    <p>No hay imágenes disponibles</p>
                </div>
            </div>
        )
    }

    return (
        <div 
            className={`image-gallery ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="image-gallery__container">
                <div 
                    className="image-gallery__track"
                    style={{ transform: getTransformValue() }}
                >
                    {images.map((image, index) => (
                        <div 
                            key={index}
                            className={`
                                image-gallery__slide 
                                ${index === currentIndex ? 'image-gallery__slide--active' : ''}
                            `}
                        >
                            <img
                                src={image.src}
                                alt={image.alt || `Imagen ${index + 1}`}
                                className="image-gallery__image"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                {/* Indicadores */}
                {showIndicators && images.length > 1 && (
                    <div className="image-gallery__indicators">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`
                                    image-gallery__indicator
                                    ${index === currentIndex ? 'image-gallery__indicator--active' : ''}
                                `}
                                onClick={() => handleIndicatorClick(index)}
                                aria-label={`Ir a imagen ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Barra de progreso */}
                {showProgress && isPlaying && images.length > 1 && (
                    <div className="image-gallery__progress">
                        <div 
                            className="image-gallery__progress-bar"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export { ImageGalleryCarousel }