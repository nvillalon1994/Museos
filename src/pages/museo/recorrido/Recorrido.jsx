import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Page from '../../../components/Page'
import { obtenerBienvenido } from '../../../features/bienvenido/bienvenidoSlice'
import { obtenerRecorridos } from '../../../features/recorrido/recorridoSlice'
import { updateRecorrido } from '../../../firebase'


export default function Bienvenida({idMuseo}) {
  const [open,setOpen] = useState(false)
  const [recorrido,setrecorrido] = useState({})
  const objetoIdMuseo = useParams(idMuseo)
  const id = objetoIdMuseo.idMuseo
  // console.log(id)
  const {bienvenido} = useSelector(state=>state.bienvenido)
  const {recorridos} = useSelector(state=>state.recorridos)
  console.log(recorridos)
  // console.log(bienvenido)
  // if(bienvenido){
  //   console.log("existe")
  // }

  const editarrecorrido =async (e)=>{
    e.preventDefault()
    const {audioreco,nombrereco,colorreco,colorreco2,colorreco3,colorreco4,colorreco5,idrecorrido}=e.target
    const recorridoEditado = {
      audioreco:audioreco.value,
      nombrereco:nombrereco.value,
      colorreco:colorreco.value,
      colorreco2:colorreco2.value,
      colorreco3:colorreco3.value,
      colorreco4:colorreco4.value,
      colorreco5:colorreco5.value,


    }
    // console.log(idrecorrido.value)
    

    
    await updateRecorrido(id,idrecorrido.value,recorridoEditado)
    dispatch(obtenerRecorridos(id))
    // dispatch(obtenerMuseos())
    // console.log("se ejecuta")
    setOpen(!open)
    // dispatch(obtenerMuseo(id))
  }
  const tomarrecorrido = (id)=>{
    recorridos.map((e)=>{
      if(e.id===id){
        
        setrecorrido(e)
        setOpen(true)
      }
    })
  }
  // console.log(recorrido)
  const dispatch = useDispatch()
  useEffect(()=>{
    // dispatch(obtenerBienvenido(id))
    dispatch(obtenerRecorridos(id))

},[dispatch])
  return (
    <Page>
      <div className='infoLayerContainer'>
        {open&&
                <div className='editFormDiv'>
                    
                {recorrido&&
                    <form  onSubmit={editarrecorrido} className='editForm form1'>
                        <h2 id='tituloForm'>Modifica a {recorrido.id}</h2>
                        
                        <div className=''>
                            
                                    
                                    <input type="hidden" name='idrecorrido' defaultValue={recorrido.id} />
                                    <input type="text" name='audioreco' defaultValue={recorrido.audioreco} />
                                    <input type="text" name='nombrereco' defaultValue={recorrido.nombrereco}/>
                                    <input type="text" name='colorreco' defaultValue={recorrido.colorreco}/>
                                    <input type="text" name='colorreco2' defaultValue={recorrido.colorreco2}/>
                                    <input type="text" name='colorreco3' defaultValue={recorrido.colorreco3}/>
                                    <input type="text" name='colorreco4' defaultValue={recorrido.colorreco4}/>
                                    <input type="text" name='colorreco5' defaultValue={recorrido.colorreco5}/>
                                    
                                    
                            
                        </div>
                        <button className='btn-Delete' onClick={()=>{setOpen(false)}}>X</button>
                        <button className=''  >Actualizar recorrido</button>
                
                    </form>}
                </div>
      }
      {recorridos?.map((e)=><div  key={e.nombrerecorrido} >

          <div className='infoLayer'>
              <p>{e.id}  de {id}</p>
              <p>Imgrecorrido:</p>
              <img className='' src={e.imgreco} alt="" />
              <button onClick={()=>{tomarrecorrido(e.id)}} className="btn-Edit2">✎</button>
              {/* <button onClick={()=>{setOpen(!open)}} className="btn-Edit2">✎</button> */}
              <p>Contenido de {e.nombrereco}</p>
              <p>nombrereco: {e.nombrereco}</p>
              
              <p>audioreco: {e.audioreco}</p>
              <p>colorreco: {e.colorreco}</p>
              <p>colorreco2: {e.colorreco2}</p>
              <p>colorreco3: {e.colorreco3}</p>
              <p>colorreco4: {e.colorreco4}</p>
              <p>colorreco5: {e.colorreco5}</p>
              
              
              
              
              <div className='btn-recorridos'>
                <Link className='btn-Ingresar' to={"/"+id+"/Recorrido/"+e.id+"/Recursos"}>Ingresar a Recursos de {e.id}</Link>
                <Link className='btn-Ingresar' to={"/"+id+"/Recorrido/"+e.id+"/muestras"}>Ingresar a muestras de {e.id}</Link>

              </div>
              
            
              
          
        </div>
        
        
    
    


      </div>)}
      </div>
      
        
    </Page>
  )
}
