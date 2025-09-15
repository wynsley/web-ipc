import { Children } from "react"
import './businessCardDescription.css'

function BusinessCardDescription ({ children }) {
  return(
    <p className="business-area-card__description">{children}</p>
  )
}

export { BusinessCardDescription }