import React, { useEffect, useState } from 'react'
import {getAuth,signOut,onAuthStateChanged} from "firebase/auth"
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, obtenerUsuario } from '../features/usuario/userSlice'
import { obtenerMuseo } from '../features/museo/museoSlice'

export default function NavBar() {
    const [open,setOpen]= useState(false)
    const {usuario} = useSelector(state=>state.usuario)
    
    const {museo} = useSelector(state=>state.museo)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(()=>{
      dispatch(obtenerMuseo(usuario.museo))
        onAuthStateChanged(auth,(usuarioFirebase)=>{
            if(usuarioFirebase){
              
                // setUserWithFirebaseAndRol(usuarioFirebase)
                dispatch(obtenerUsuario(usuarioFirebase))
                
          }else{
            //   navigate("/")
            // dispatch(logout())
          }}) 

    },[dispatch])
    const salir =async ()=>{
        // dispatch(logout()).then(navigate("/"))
        dispatch(logout())
        setTimeout(()=>{navigate("/")},1)
        // dispatch(obtenerUsuario())
         
    }
    console.log(museo)
  return (
    <nav className=' flex   h-12 bg-colo7-phone-dark shadow '>
      <div className='flex  justify-between items-center max-w-7xl w-full m-auto  '>
      <Link to={"/phone_Prueba/"+museo.id}><p className='text-white font-semibold text-shadow-xl'>{museo.nombre}</p></Link>
        <div className='flex items-center gap-2 '>
            {usuario.rol==="admin"&&<Link to={"/home"}  className='text-colo6-phone-oringe bg-colo5-phone-gray p-1 rounded-md shadow-gray-500 shadow-sm ' > Home</Link>}
            
            {/* <Link  className='btn-Ingresar' onClick={signOut(auth)} to={"/"}>Cerrar Sesión1</Link> */}
            {/* <Link  className='btn-Ingresar' onClick={()=>{signOut(auth)}} to={"/"}>Cerrar Sesión2</Link> */}
            <button  className='text-colo6-phone-oringe bg-colo5-phone-gray p-1 rounded-md shadow-gray-500 shadow-sm ' onClick={salir} >Cerrar Sesión</button>
            
            {/* <Link to={"/"}  className='btn-Ingresar' onClick={salir} >Cerrar Sesión3</Link> */}
                
        </div>
      </div>
        
    </nav>
  )
}
