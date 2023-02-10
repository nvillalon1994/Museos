import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Page from '../../../../components/Page'

import { obtenerLinksmp } from '../../../../features/Linksmp/linksmpSlice'

import { update360link, updateLinkmp, updatelinksmp } from '../../../../firebase'

export default function Linkmp ({ids}) {
  const [open,setOpen] = useState(false)
 
  const [link,setLink] = useState({})
  console.log(link)
  
  const objeto = useParams(ids)
//   console.log(objeto)
  const idLink=objeto.idLink
  const idMuseo=objeto.idMuseo
  
  const {linksmp} = useSelector(state=>state.linksmp)
  
  
//   console.log(linksmp)
  
 
  const editarlink =async (e)=>{
    e.preventDefault()
    const {nlinkmp,urllinkmp,idlink2}=e.target
    const linkEditado = {nlinkmp:nlinkmp.value,urllinkmp:urllinkmp.value}

    // console.log(linkEditado)
    await updatelinksmp(idMuseo,idLink,idlink2.value,linkEditado)
    dispatch(obtenerLinksmp({idMuseo,idLink}))
    
    setOpen(!open)
    // dispatch(obtenerMuseo(id))
  }

  const tomarlink = (id)=>{
    linksmp.map((e)=>{
      if(e.id===id){
        console.log("son iguales")
        setLink(e)
        setOpen(true)
      }
    })
  }

  const dispatch = useDispatch()
  
  useEffect(()=>{
    
    dispatch(obtenerLinksmp({idMuseo,idLink}))
    
},[dispatch])
  
  
  return (
    <Page>
        hola
      <div className='infoLayerContainer'>
        {open&&
                <div className='editFormDiv'>
                    
                {link&&
                    <form  onSubmit={editarlink} className='editForm form1'>
                        <h2 id='tituloForm'>Modifica a {link.id}</h2>
                        
                        <div className=''>
                            <div className='inputs'>
                                    
                                    
                                    <input type="text"  name='nlinkmp' defaultValue={link.nlinkmp} />
                                    <input type="text"  name='urllinkmp' defaultValue={link.urllinkmp} />
                                    {/* <input type="text"  name='link' defaultValue={link.360} /> */}
                                    <input type="hidden" name='idlink2' defaultValue={link.id} />
                                    
                                    
                            </div>
                            
                        </div>
                        <button className='btn-Delete' onClick={()=>{setOpen(false)}}>X</button>
                        <button className='btn-Ingresar'  >Actualizar link</button>
                
                    </form>}
                </div>
      }
      
        {linksmp?.map((e)=><div  key={e.id} >

          <div className='infoLayer'>
              {/* <p>{e.id}  de {idLayer}</p> */}
              
              
              <button onClick={()=>{tomarlink(e.id)}} className="btn-Edit2">✎</button>
              
              <p>Contenido de {e.id}</p>
              
              <p>nlinkmp: {e.nlinkmp}</p>
              <p>urllinkmp: {e.urllinkmp}</p>
  
        </div>

      </div>)}

        
        
      
      </div>
      
        
    </Page>
  )
}
