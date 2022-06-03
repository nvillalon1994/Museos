import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { obtenerMuseo } from '../../features/museo/museoSlice'
import { obtenerMuseos } from '../../features/museos/museosSlice'
import { getMuseum, updateMuseum ,onGetMuseum, auth} from '../../firebase'
import {getAuth,signOut,onAuthStateChanged} from "firebase/auth"
import Page from '../../components/Page'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faTrash,faUserPlus,faWindowMaximize} from '@fortawesome/free-solid-svg-icons'
import LatNavBar from '../../components/LatNavBar'

export default function Museo ({idMuseo}) {
    const [open2,setOpen2]= useState(false)
    const [open,setOpen]= useState(false)
    const objetoIdMuseo = useParams(idMuseo)
    const id = objetoIdMuseo.idMuseo

    console.log(id)
    
    
    // const dispatch = useDispatch()
    // const [museo,setMuseo]= useState()
    const {museo} = useSelector(state=>state.museo)
    console.log(museo)
    // const {museos} = useSelector(state=>state.museos)
    
    // console.log(museo1)
    // const tomarMuseo = async (id) => {

    //       console.log("se ejecuta")
    //       const doc = await getMuseum(id);
          
    //       setMuseo({ ...doc.data(),id });
          
    //     //   onGetMuseum(tomarMuseo(id))
          
        
    //   };
    
    // const tomarMuseo2 = async (id) => {

    //       // console.log(id)
    //       console.log("se ejecuta")
    //       const doc = await getMuseum(id);
          
    //       setMuseo({ ...doc.data(),id });
          
    //       setOpen(true)
          
          
          
        
    //   };
      const dispatch = useDispatch()
      const crearMuseoEditado =async (e)=>{
        e.preventDefault()
        const {acerca,descripcion,direccion,horario,imgmain,imgmuseo,logomuseo,nombre,organizacion,reco,tressesenta}=e.target
        const museoEditado={Acerca:acerca.value,descripcion:descripcion.value,direccion:direccion.value,horario:horario.value,imgmain:imgmain.value,imgmuseo:imgmuseo.value,logomuseo:logomuseo.value,nombre:nombre.value,organizacion:organizacion.value,reco:reco.value,tressesenta:tressesenta.value}
        
        await updateMuseum(museo.id,museoEditado)
        dispatch(obtenerMuseos())
        console.log("se ejecuta")
        setOpen(!open)
        dispatch(obtenerMuseo(id))
      }
      const navigate = useNavigate();
     
    useEffect(()=>{
        // if(id){
        //     tomarMuseo(id)
        // }
          
        dispatch(obtenerMuseo(id))
        // dispatch(obtenerMuseos())
        
  
  
    },[dispatch])
  return (
    <Page>
      <div className='contenedorMuseo'>
      
          <LatNavBar museo={museo} id={id}/>
          <Link to={"/"+id + "/Bienvenida"}>acac</Link>
          <div className='museoInfo'>
            {open&&
                    <div className='editFormDiv'>
                        
                    {museo&&
                        <form  onSubmit={crearMuseoEditado} className='editForm form1'>
                            <h2 id='tituloForm'>Modifica a {museo.nombre}</h2>
                            
                            <div className=''>
                                <div className='inputs'>
                                        
                                  <input type="" name='acerca' defaultValue={museo.Acerca} />
                                  <input type="text" name='descripcion' defaultValue={museo.descripcion}/>
                                  <input type="text" name='direccion' defaultValue={museo.direccion}/>
                                  <input type="text" name='horario' defaultValue={museo.horario}/>
                                  <input type="text" name='imgmain' defaultValue={museo.imgmain}/>
                                  <input type="text" name='imgmuseo' defaultValue={museo.imgmuseo}/>
                                        
                                </div>
                                <div className='inputs'>
                                  <input type="text" name='logomuseo' defaultValue={museo.logomuseo}/>
                                  <input type="text" name='nombre' defaultValue={museo.nombre}/>
                                  <input type="text" name='organizacion' defaultValue={museo.organizacion}/>
                                  <input type="text" name='reco' defaultValue={museo.reco}/>
                                  <input type="text" name='tressesenta' defaultValue={museo.tressesenta}/>
                                </div>
                            </div>
                            <button className='btn-Delete' onClick={()=>{setOpen(false)}}>X</button>
                            <button className=''  >Actualizar Museo</button>
                    
                        </form>}
                    </div>
            }
            {museo&&
            <div  key={museo.id} className='museoInfoContainer'>
              <div className='heroMuseo'>
                  <h1 id='titulo2'>{museo.nombre}</h1>
                  <img src={museo.imgmuseo} alt=""/>
                  
              </div>
              
              <div className='museoInfo2'>
                
                
                {/* <button onClick={()=>{tomarMuseo2(museo.id)}}>Editar {museo.id}</button> */}
                
                <img className='imgMain' src={museo.imgmain} alt="" />
                <div className='infoMuseo'>
                    {/* <button onClick={()=>{tomarMuseo2(museo.id)}} className="btn-Edit2">✎</button> */}
                    <button onClick={()=>{setOpen(!open)}} className="btn-Edit2">✎</button>
                    <p>Contenido de {museo.id}</p>
                    
                    <p>Descripción: {museo.descripcion}</p>
                    <p>Dirección: {museo.direccion}</p>
                    <p>Horario: {museo.horario}</p>
                    <p>Logomuseo: {museo.logomuseo}</p>
                    <p>Nombre: {museo.nombre}</p>
                    <p>Organizacion: {museo.organizacion}</p>
                    <p>Reco: {museo.reco}</p>
                  
                    
                </div>
                </div>
              
              
        
        


          </div>}
        </div>
        
        </div>
    </Page>
  )
}
