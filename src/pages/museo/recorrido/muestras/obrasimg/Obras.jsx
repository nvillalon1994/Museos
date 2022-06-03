import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Page from '../../../../../components/Page'
import { obtenerObras } from '../../../../../features/obras/obrasSlice'
import { updateObra } from '../../../../../firebase'






export default function Tressesenta ({ids}) {
  const [open,setOpen] = useState(false)
  const [obra,setobra] = useState({})
  
  // console.log(obra)
  const objeto = useParams(ids)
  
  const idRecorrido=objeto.idRecorrido
  const idMuestra=objeto.idMuestra
  console.log(idMuestra)
  const idMuseo=objeto.idMuseo
//   console.log(objeto)
  const {obras} = useSelector(state=>state.obras)
  
  console.log(obras)
  
  
  
 
  const editarobra =async (e)=>{
    e.preventDefault()
    const {idObra,urlobra,nombreobra,nombreobra2,nombreobra3,nombreobra4,nombreobra5}=e.target
    const obraEditado = {
        nombreobra:nombreobra.value,
        nombreobra2:nombreobra2.value,
        nombreobra3:nombreobra3.value,
        nombreobra4:nombreobra4.value,
        nombreobra5:nombreobra5.value,
        urlobra:urlobra.value
    }

    console.log(idMuseo,idRecorrido,idObra.value,obraEditado)
    console.log(obraEditado)
    await updateObra(idMuseo,idRecorrido,idMuestra,idObra.value,obraEditado)
    dispatch(obtenerObras({idMuseo,idRecorrido,idMuestra}))
    // dispatch(obtenerMuseos())
    // console.log("se ejecuta")
    setOpen(!open)
    // dispatch(obtenerMuseo(id))
  }

  const tomarobra = (id)=>{
    obras.map((e)=>{
      if(e.id===id){
        console.log("son iguales")
        setobra(e)
        setOpen(true)
      }
    })
  }

  const dispatch = useDispatch()
  
  useEffect(()=>{
    
    
    // dispatch(obtenerobras({idMuseo,idRecorrido}))
    dispatch(obtenerObras({idMuseo,idRecorrido,idMuestra}))
    
},[dispatch])
  
  
  return (
    <Page>
      <div className='infoLayerContainer'>
        {open&&
                <div className='editFormDiv'>
                    
                {obra&&
                    <form  onSubmit={editarobra} className='editForm form1'>
                        <h2 id='tituloForm'>Modifica a {obra.id}</h2>
                        
                        <div className=''>
                            <div className='inputs'>
                                    
                                    
                                    <input type="hidden"name='idObra' value={obra.id} />
                                    
                                    
                                    <input type="text"name='nombreobra' defaultValue={obra.nombreobra} />
                                    <input type="text"name='nombreobra2' defaultValue={obra.nombreobra2} />
                                    <input type="text"name='nombreobra3' defaultValue={obra.nombreobra3} />
                                    <input type="text"name='nombreobra4' defaultValue={obra.nombreobra4} />
                                    <input type="text"name='nombreobra5' defaultValue={obra.nombreobra5} />
                                    <input type="text"name='urlobra' defaultValue={obra.urlobra} />
                                    
                                    
                                    
                            </div>
                            
                        </div>
                        <button className='btn-Delete' onClick={()=>{setOpen(false)}}>X</button>
                        <button className='btn-Ingresar'  >Actualizar obra</button>
                
                    </form>}
                </div>
      }
      
        {obras?.map((e)=><div  key={e.id} >

          <div className='infoLayer'>
              <p>{e.id}  de {idMuestra}</p>
              
              
              <button onClick={()=>{tomarobra(e.id)}} className="btn-Edit2">✎</button>
              
              <p>Contenido de {e.id}</p>

              
              <p>nombreobra: {e.nombreobra}</p>
              <p>nombreobra2: {e.nombreobra2}</p>
              <p>nombreobra3: {e.nombreobra3}</p>
              <p>nombreobra4: {e.nombreobra4}</p>
              <p>nombreobra5: {e.nombreobra5}</p>
              <p>urlobra: {e.urlobra}</p>
              
              
              
  
        </div>

      </div>)}

        
        
      
      </div>
      
        
    </Page>
  )
}
