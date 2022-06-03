import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Page from '../../../../components/Page'
import { obtenerPanoramas } from '../../../../features/360/360Slice'
import { obtenerBienvenido } from '../../../../features/bienvenido/bienvenidoSlice'
import { update360Panorama } from '../../../../firebase'

export default function Tressesenta ({ids}) {
  const [open,setOpen] = useState(false)
  const [pano,setPano] = useState(false)
  const [panorama,setPanorama] = useState({})
  // console.log(panorama)
  const objeto = useParams(ids)
  const idLayer=objeto.idLayer
  const idMuseo=objeto.idMuseo
  
  const {panoramas} = useSelector(state=>state.panoramas)
  
  console.log(panorama)
  
 
  const editarPanorama =async (e)=>{
    e.preventDefault()
    const {panorama,idPanorama}=e.target
    const panoramaEditado = {panorama:panorama.value}

    console.log(idMuseo,idLayer,idPanorama.value,panoramaEditado)
    console.log(panoramaEditado)
    await update360Panorama(idMuseo,idLayer,idPanorama.value,panoramaEditado)
    dispatch(obtenerPanoramas({idMuseo,idLayer}))
    // dispatch(obtenerMuseos())
    // console.log("se ejecuta")
    setOpen(!open)
    // dispatch(obtenerMuseo(id))
  }

  const tomarPanorama = (id)=>{
    panoramas.map((e)=>{
      if(e.id===id){
        console.log("son iguales")
        setPanorama(e)
        setOpen(true)
      }
    })
  }

  const dispatch = useDispatch()
  
  useEffect(()=>{
    
    dispatch(obtenerPanoramas({idMuseo,idLayer}))
    
},[dispatch])
  
  
  return (
    <Page>
      <div className='infoLayerContainer'>
        {open&&
                <div className='editFormDiv'>
                    
                {panorama&&
                    <form  onSubmit={editarPanorama} className='editForm form1'>
                        <h2 id='tituloForm'>Modifica a {panorama.id}</h2>
                        
                        <div className=''>
                            <div className='inputs'>
                                    
                                    
                                    <input type="text"  name='panorama' defaultValue={panorama.panorama} />
                                    {/* <input type="text"  name='panorama' defaultValue={"panorama.360"} /> */}
                                    <input type="hidden" name='idPanorama' defaultValue={panorama.id} />
                                    
                                    
                            </div>
                            
                        </div>
                        <button className='btn-Delete' onClick={()=>{setOpen(false)}}>X</button>
                        <button className='btn-Ingresar'  >Actualizar Panorama</button>
                
                    </form>}
                </div>
      }
      
        {panoramas?.map((e)=><div  key={e.id} >

          <div className='infoLayer'>
              <p>{e.id}  de {idLayer}</p>
              <p>ImgLayer:</p>
              
              <button onClick={()=>{tomarPanorama(e.id)}} className="btn-Edit2">✎</button>
              
              <p>Contenido de {e.id}</p>
              
              <p>Panorama: {e.panorama}</p>
  
        </div>

      </div>)}

        
        
      
      </div>
      
        
    </Page>
  )
}
