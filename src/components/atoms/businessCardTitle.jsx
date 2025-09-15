import './businessCardTitle.css'

function BusinessCardTitle({children}) {
  return(
    <h3 className="business-area-card__title">{children}</h3>
  )
}

export { BusinessCardTitle }