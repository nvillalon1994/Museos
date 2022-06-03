import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Page from '../../../../components/Page'


import { obtenerRecursos } from '../../../../features/recursos/recursosSlice'
import { updateRecurso } from '../../../../firebase'


export default function Tressesenta ({ids}) {
  const [open,setOpen] = useState(false)
  const [recurso,setRecurso] = useState({})
  
  // console.log(recurso)
  const objeto = useParams(ids)
  
  const idRecorrido=objeto.idRecorrido
  
  const idMuseo=objeto.idMuseo
  
  const {recursos} = useSelector(state=>state.recursos)
  
  console.log(recursos)
  
  
  
 
  const editarRecurso =async (e)=>{
    e.preventDefault()
    const {idRecurso,recuimg,recutitulo,recutexto, recutexto2,recutexto3,recutexto4,recutexto5,recutextobottom, recutextobottom2,recutextobottom3,recutextobottom4,recutextobottom5}=e.target
    const recursoEditado = {
        idRecurso:idRecurso.value,
        recuimg:recuimg.value,
        recutitulo:recutitulo.value,
        recutexto:recutexto.value, 
        recutexto2:recutexto2.value, 
        recutexto3:recutexto3.value, 
        recutexto4:recutexto4.value, 
        recutexto5:recutexto5.value, 
        recutextobottom:recutextobottom.value, 
        recutextobottom2:recutextobottom2.value, 
        recutextobottom3:recutextobottom3.value, 
        recutextobottom4:recutextobottom4.value, 
        recutextobottom5:recutextobottom5.value, 
    }

    console.log(idMuseo,idRecorrido,idRecurso.value,recursoEditado)
    console.log(recursoEditado)
    await updateRecurso(idMuseo,idRecorrido,idRecurso.value,recursoEditado)
    dispatch(obtenerRecursos({idMuseo,idRecorrido}))
    // dispatch(obtenerMuseos())
    // console.log("se ejecuta")
    setOpen(!open)
    // dispatch(obtenerMuseo(id))
  }

  const tomarRecurso = (id)=>{
    recursos.map((e)=>{
      if(e.id===id){
        console.log("son iguales")
        setRecurso(e)
        setOpen(true)
      }
    })
  }

  const dispatch = useDispatch()
  
  useEffect(()=>{
    
    
    dispatch(obtenerRecursos({idMuseo,idRecorrido}))
    
},[dispatch])
  
  
  return (
    <Page>
      <div className='infoLayerContainer'>
        {open&&
                <div className='editFormDiv'>
                    
                {recurso&&
                    <form  onSubmit={editarRecurso} className='editForm form1'>
                        <h2 id='tituloForm'>Modifica a {recurso.id}</h2>
                        
                        <div className=''>
                            <div className='inputs'>
                                    
                                    
                                    <input type="hidden"name='idRecurso' value={recurso.id} />
                                    
                                    <input type="text"name='recuimg' defaultValue={recurso.recuimg} />
                                    <input type="text"name='recutitulo' defaultValue={recurso.recutitulo} />
                                    <input type="text"name='recutexto' defaultValue={recurso.recutexto} />
                                    <input type="text"name='recutexto2' defaultValue={recurso.recutexto2} />
                                    <input type="text"name='recutexto3' defaultValue={recurso.recutexto3} />
                                    <input type="text"name='recutexto4' defaultValue={recurso.recutexto4} />
                                    <input type="text"name='recutexto5' defaultValue={recurso.recutexto5} />
                                    <input type="text"name='recutextobottom' defaultValue={recurso.recutextobottom} />
                                    <input type="text"name='recutextobottom2' defaultValue={recurso.recutextobottom2} />
                                    <input type="text"name='recutextobottom3' defaultValue={recurso.recutextobottom3} />
                                    <input type="text"name='recutextobottom4' defaultValue={recurso.recutextobottom4} />
                                    <input type="text"name='recutextobottom5' defaultValue={recurso.recutextobottom5} />
                                    
                                    
                            </div>
                            
                        </div>
                        <button className='btn-Delete' onClick={()=>{setOpen(false)}}>X</button>
                        <button className='btn-Ingresar'  >Actualizar recurso</button>
                
                    </form>}
                </div>
      }
      
        {recursos?.map((e)=><div  key={e.id} >

          <div className='infoLayer'>
              <p>{e.id}  de {idRecorrido}</p>
              <p>ImgLayer:</p>
              <img src={e.recuimg} alt="" />
              
              <button onClick={()=>{tomarRecurso(e.id)}} className="btn-Edit2">✎</button>
              
              <p>Contenido de {e.id}</p>

              <p>recutitulo: {e.recutitulo}</p>
              <p>recuvid: {e.recuvid}</p>
              <p>recutexto: {e.recutexto}</p>
              <p>recutexto2: {e.recutexto2}</p>
              <p>recutexto3: {e.recutexto3}</p>
              <p>recutexto4: {e.recutexto4}</p>
              <p>recutexto5: {e.recutexto5}</p>
              <p>recutextobottom: {e.recutextobottom}</p>
              <p>recutextobottom2: {e.recutextobottom2}</p>
              <p>recutextobottom3: {e.recutextobottom3}</p>
              <p>recutextobottom4: {e.recutextobottom4}</p>
              <p>recutextobottom5: {e.recutextobottom5}</p>
              
              
  
        </div>

      </div>)}

        
        
      
      </div>
      
        
    </Page>
  )
}
