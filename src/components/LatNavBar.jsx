import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faTrash,faUserPlus,faWindowMaximize} from '@fortawesome/free-solid-svg-icons'
export default function LatNavBar({museo,id}) {
  return (
    <section className='collections'>
              <img src={museo.imgmain} alt="" />
              <h3>{museo.id}</h3>
              <p className='navegation-text'>NAVEGATION</p>
              <article className='collection'>
                  <Link to={"/"+id + "/Bienvenida"} className="collection-link"><FontAwesomeIcon className="collection-icon" icon={faWindowMaximize}  />Bienvenida</Link>
              </article>
              <article className='collection'>
                  <Link to={"/"+id + "/MuntrefLink"}className="collection-link"><FontAwesomeIcon className="collection-icon" icon={faWindowMaximize}  />Muntref_Link</Link>
              </article>
              <article className='collection'>
                  <Link to={"/"+id + "/Recorrido"}className="collection-link"><FontAwesomeIcon className="collection-icon" icon={faWindowMaximize}  />Recorrido</Link>
              </article>
              
              
          </section> 
  )
}
