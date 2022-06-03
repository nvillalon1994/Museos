import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Page from '../../../../components/Page'
import { obtenerMuestras } from '../../../../features/muestras/muestrasSlice'
import { updateMuesta } from '../../../../firebase'



// import { updateMuestra } from '../firebase'


export default function Tressesenta ({ids}) {
  const [open,setOpen] = useState(false)
  const [muestra,setMuestra] = useState({})
  
  // console.log(muestra)
  const objeto = useParams(ids)
  
  const idRecorrido=objeto.idRecorrido
  console.log(idRecorrido)
  
  const idMuseo=objeto.idMuseo
  
  
  const {muestras} = useSelector(state=>state.muestras)
  
  console.log(muestras)
  
  
  
 
  const editarmuestra =async (e)=>{
    e.preventDefault()
    const {idMuestra,audioObra,autor,descmuestra1,descmuestra2,descmuestra3,descmuestra4,descmuestra5,gallery,historiadevida,imgautor,imgmuestra,vid,nombremuestra}=e.target
    const muestraEditada = {
         audioObra:audioObra.value,
         autor:autor.value,
         descmuestra1:descmuestra1.value,
         descmuestra2:descmuestra2.value,
         descmuestra3:descmuestra3.value,
         descmuestra4:descmuestra4.value,
         descmuestra5:descmuestra5.value,
         gallery:gallery.value,
         historiadevida:historiadevida.value,
         imgautor:imgautor.value,
         imgmuestra:imgmuestra.value,
         vid:vid.value,
         nombremuestra:nombremuestra.value
    }

    console.log(idMuseo,idRecorrido,idMuestra.value,muestraEditada)
    console.log(muestraEditada)
    await updateMuesta(idMuseo,idRecorrido,idMuestra.value,muestraEditada)
    dispatch(obtenerMuestras({idMuseo,idRecorrido}))
    // dispatch(obtenerMuseos())
    // console.log("se ejecuta")
    setOpen(!open)
    // dispatch(obtenerMuseo(id))
  }

  const tomarmuestra = (id)=>{
    muestras.map((e)=>{
      if(e.id===id){
        console.log("son iguales")
        setMuestra(e)
        setOpen(true)
      }
    })
  }

  const dispatch = useDispatch()
  
  useEffect(()=>{
    
    
    
    dispatch(obtenerMuestras({idMuseo,idRecorrido}))
    
    
},[dispatch])
  
  
  return (
    <Page>
      <div className='infoLayerContainer'>
        {open&&
                <div className='editFormDiv'>
                    
                {muestra&&
                    <form  onSubmit={editarmuestra} className='editForm form1'>
                        <h2 id='tituloForm'>Modifica a {muestra.id}</h2>
                        
                        <div className=''>
                            <div className='inputs'>
                                    
                                    
                                    <input type="hidden"name='idMuestra' value={muestra.id} />
                                    
                                    <input type="text"name='audioObra' defaultValue={muestra.audioObra} />
                                    <input type="text"name='autor' defaultValue={muestra.autor} />
                                    <input type="text"name='gallery' defaultValue={muestra.gallery} />
                                    <input type="text"name='historiadevida' defaultValue={muestra.historiadevida} />
                                    <input type="text"name='imgautor' defaultValue={muestra.imgautor} />
                                    <input type="text"name='imgmuestra' defaultValue={muestra.imgmuestra} />
                                    <input type="text"name='infoautor' defaultValue={muestra.infoautor} />
                                    <input type="text"name='nombremuestra' defaultValue={muestra.nombremuestra} />
                                    <input type="text"name='vid' defaultValue={muestra.vid} />
                                    <input type="text"name='descmuestra1' defaultValue={muestra.descmuestra1} />
                                    <input type="text"name='descmuestra2' defaultValue={muestra.descmuestra2} />
                                    <input type="text"name='descmuestra3' defaultValue={muestra.descmuestra3} />
                                    <input type="text"name='descmuestra4' defaultValue={muestra.descmuestra4} />
                                    <input type="text"name='descmuestra5' defaultValue={muestra.descmuestra5} />
                                    
                                    
                            </div>
                            
                        </div>
                        <button className='btn-Delete' onClick={()=>{setOpen(false)}}>X</button>
                        <button className='btn-Ingresar'  >Actualizar muestra</button>
                
                    </form>}
                </div>
      }
      
        {muestras?.map((e)=><div  key={e.id} >

          <div className='infoLayer'>
              <p>{e.id}  de {idRecorrido}</p>
              <p>imgautor:</p>
              <img src={e.imgautor} alt="" />
              <p>imgmuestra:</p>
              <img src={e.imgmuestra} alt="" />
              
              <button onClick={()=>{tomarmuestra(e.id)}} className="btn-Edit2">✎</button>
              
              <p>Contenido de {e.id}</p>

              <p>gallery: {e.gallery}</p>
              <p>historiadevida: {e.historiadevida}</p>
              <p>audioObra: {e.audioObra}</p>
              <p>autor: {e.autor}</p>
              <p>descmuestra1: {e.descmuestra1}</p>
              <p>descmuestra2: {e.descmuestra2}</p>
              <p>descmuestra3: {e.descmuestra3}</p>
              <p>descmuestra4: {e.descmuestra4}</p>
              <p>descmuestra5: {e.descmuestra5}</p>
              <p>infoautor: {e.infoautor}</p>
              <p>nombremuestra: {e.nombremuestra}</p>
              <p>vid: {e.vid}</p>
              <Link className='btn-Ingresar' to={"/"+idMuseo+"/Recorrido/"+idRecorrido+"/muestras/"+e.id+"/obrasimg"}>Ingresar a obrasimg de {e.id}</Link>
              
              
  
        </div>

      </div>)}

        
        
      
      </div>
      
        
    </Page>
  )
}
