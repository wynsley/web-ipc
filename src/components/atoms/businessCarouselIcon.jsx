import './businessCarouselIcon.css'

function BusinessCarouselIcon ({ icon }) {
  return(
    <div className="business-area-card__icon">
      <div className="business-area-card__icon-wrapper">
        {icon}
      </div>
    </div>
  )
}

export { BusinessCarouselIcon }