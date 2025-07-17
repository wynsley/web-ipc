import { Link } from "react-router-dom"
import { GuestTemplate } from "../templates/guestTemplate"

function HomePage(){

  return (
    <>
      <h1>Inicio</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id impedit reiciendis officia? Aliquam sapiente porro error eius accusamus ab iure id harum officia officiis tenetur asperiores, numquam vero amet cum unde? Officiis, qui ipsa repellendus, at vero cumque iste sunt iure neque quas nesciunt reiciendis, molestiae culpa aliquid ipsum exercitationem illo. Ex voluptatem quasi explicabo perspiciatis nulla inventore enim, est, expedita ipsam saepe vitae, corporis magni maxime. Est esse rerum corrupti eligendi officia omnis eos voluptates delectus labore cupiditate laborum temporibus, eum, neque nesciunt obcaecati. Ullam autem eos, sequi error, pariatur et ut voluptate commodi, tempora odio soluta. Ut, accusantium?</p>
      <Link to={'/contact'}>ir a  contacto</Link>
    </>
  )
}

export { HomePage }