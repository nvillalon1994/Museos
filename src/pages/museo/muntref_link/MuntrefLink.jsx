import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Page from '../../../components/Page'
import { obtenerBienvenido } from '../../../features/bienvenido/bienvenidoSlice'
import { obtenerMuntref_Links } from '../../../features/Muntref_Link/muntrefLink'
import { updateBienvenidaLayer, updateLink } from '../../../firebase'

export default function Bienvenida({idMuseo}) {
  const [open,setOpen] = useState(false)
  const [link,setLink] = useState({})
  const objetoIdMuseo = useParams(idMuseo)
  const id = objetoIdMuseo.idMuseo
  // console.log(id)
  const {muntrefLinks} = useSelector(state=>state.muntrefLinks)
  // console.log(muntrefLinks)
  

  const editarLink =async (e)=>{
    e.preventDefault()
    const {idLink,desclink,imglink,nboton,nombrelink,textlink,textlink2,textlink3,textlink4,textlink5,urllink}=e.target
    const linkEditado = {
      desclink:desclink.value,imglink:imglink.value,nboton:nboton.value,nombrelink:nombrelink.value,
      textlink:textlink.value,
      textlink2:textlink2.value,
      textlink3:textlink3.value,
      textlink4:textlink4.value,
      textlink5:textlink5.value,
      urllink:urllink.value
    }
    

    console.log(linkEditado)
    await updateLink(id,idLink.value,linkEditado)
    dispatch(obtenerMuntref_Links(id))
    // dispatch(obtenerMuseos())
    // console.log("se ejecuta")
    setOpen(!open)
    // dispatch(obtenerMuseo(id))
  }
  const tomarLink = (id)=>{
    
    muntrefLinks.map((e)=>{
      if(e.id===id){
        setLink(e)
        setOpen(true)
      }
    })
  }
  // console.log(link)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(obtenerMuntref_Links(id))

},[dispatch])
  return (
    <Page>
      muntref
      <div className='infoLayerContainer'>
        {open&&
                <div className='editFormDiv'>
                    
                {link&&
                    <form  onSubmit={editarLink} className='editForm form1'>
                        <h2 id='tituloForm'>Modifica a {link.id}</h2>
                        
                        <div className=''>
                            <div className='inputs'>
                                    
                                    <input type="hidden" name='idLink' defaultValue={link.id} />
                                    <input type="text" name='desclink' defaultValue={link.desclink} />
                                    <input type="text" name='imglink' defaultValue={link.imglink} />
                                    <input type="text" name='nboton' defaultValue={link.nboton}/>
                                    <input type="text" name='nombrelink' defaultValue={link.nombrelink}/>    
                                    <input type="text" name='urllink' defaultValue={link.urllink}/>
                                    <input type="text" name='textlink' defaultValue={link.textlink}/>
                                    <input type="text" name='textlink2' defaultValue={link.textlink2}/>
                                    <input type="text" name='textlink3' defaultValue={link.textlink3}/>
                                    <input type="text" name='textlink4' defaultValue={link.textlink4}/>
                                    <input type="text" name='textlink5' defaultValue={link.textlink5}/>
                                    
                            </div>
                        </div>
                        <button className='btn-Delete' onClick={()=>{setOpen(false)}}>X</button>
                        <button className='btn-Ingresar'  >Actualizar Layer</button>
                
                    </form>}
                </div>
          }
      {muntrefLinks?.map((e)=><div  key={e.nombrelayer} >

          <div className='infoLayer'>
              <p>{e.id}  de {id}</p>
              <p>ImgLayer:</p>
              <img className='' src={e.imglayer} alt="" />
              <button onClick={()=>{tomarLink(e.id)}} className="btn-Edit2">✎</button>
              
              <p>Contenido de {e.id}</p>
              
              <p>desclink: {e.desclink}</p>
              <p>imglink: {e.imglink}</p>
              <p>nboton: {e.nboton}</p>
              <p>nombrelink: {e.nombrelink}</p>
              <p>textlink: {e.textlink}</p>
              <p>Textlink2: {e.textlink2}</p>
              <p>Textlink3: {e.textlink3}</p>
              <p>TextLink4: {e.textlink4}</p>
              <p>TextLink5: {e.textlink5}</p>
              <p>Urllink: {e.urllink}</p>
              
              
              <button  ><Link className='btn-Ingresar' to={"/"+id+"/MuntrefLink/"+e.id+"/Linkmp"}>Ingresar a Linkmp de {e.id}</Link> </button>
            
              
          
        </div>
        
        
    
    


      </div>)}
      </div>
      
        
    </Page>
  )
}
