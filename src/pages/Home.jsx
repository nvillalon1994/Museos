import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Link, useNavigate } from 'react-router-dom'
import { obtenerMuseos } from '../features/museos/museosSlice'
import { createMuseums,deleteMuseum, registrarUsuario} from '../firebase'
import {getAuth,signOut,onAuthStateChanged} from "firebase/auth"
import { auth } from '../firebase'
import { logout, obtenerUsuario } from '../features/usuario/userSlice'
import NavBar from '../components/NavBar'
import Page from '../components/Page'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faTrash,faUserPlus} from '@fortawesome/free-solid-svg-icons'

export default function Home() {
    const [open,setOpen]= useState(false)
    const [open2,setOpen2]= useState(false)
    
    const crearMuseos = (e)=>{
        e.preventDefault()
        const {museo}= e.target
        // console.log(museo.value,info1.value,description.value)
        createMuseums(museo.value)
        setOpen(!open)
        dispatch(obtenerMuseos())
        console.log("se ejecuta")
    }
    const {museos} = useSelector(state=>state.museos)
    console.log(museos)
    
    const eliminarMuseo = (id)=>{
        deleteMuseum(id)
        dispatch(obtenerMuseos())
        console.log("se ejecuta")
    }
    // const [museo,setMuseo]= useState()
    // console.log(museo)

    
      let navigate = useNavigate();
    const tomarMuseo2 = async (id) => {

          // console.log(id)
          // const doc = await getMuseum(id);
          console.log("se ejecuta")
          // setMuseo({ ...doc.data(),id });
          
          navigate("/"+id)
          
        
      };
    const tomarMuseo1 = async (id) => {

          // console.log(id)
          // const doc = await getMuseum(id);
          console.log("se ejecuta")
          // setMuseo({ ...doc.data(),id });
          
          navigate("/phone_prueba/"+id)
          
        
      };
    
    
      
      
      
    
    const {usuario} = useSelector(state=>state.usuario)
    console.log(usuario)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(obtenerMuseos())
        onAuthStateChanged(auth,(usuarioFirebase)=>{
            if(usuarioFirebase){
              
                // setUserWithFirebaseAndRol(usuarioFirebase)
                dispatch(obtenerUsuario(usuarioFirebase))
              
          }}) 

    },[dispatch])
    
    
    function submitHandler (e){
        e.preventDefault()
        const email = e.target.elements.email.value
        const password = e.target.elements.password.value
        const rol = e.target.elements.rol.value
        const museo =e.target.elements.museo.value
        registrarUsuario(email,password,rol,museo)
        
        
        setTimeout(()=>{navigate("/")},3000)
        }
        const salir =async ()=>{
            // dispatch(logout()).then(navigate("/"))
            dispatch(logout())
            setTimeout(()=>{navigate("/")},1)
            // dispatch(obtenerUsuario())
             
        }
  return (
    <section>
        <nav className='navBar'>
            <p>Administrador</p>
            <div>
                {usuario.rol==="admin" && <button className='btn-Ingresar'   onClick={()=>setOpen(!open)}>Crear un Equipo</button>}
                
                
                {/* <Link  className='btn-Ingresar' onClick={signOut(auth)} to={"/"}>Cerrar Sesión1</Link> */}
                {/* <Link  className='btn-Ingresar' onClick={()=>{signOut(auth)}} to={"/"}>Cerrar Sesión2</Link> */}
                <button  className='btn-Ingresar' onClick={salir} >Cerrar Sesión</button>
                
                {/* <Link to={"/"}  className='btn-Ingresar' onClick={salir} >Cerrar Sesión3</Link> */}
                    
            </div>
        </nav>
        {open&&<div className='editFormDiv'>
            <form onSubmit={crearMuseos} className="editForm form1">
                <legend>Crea un Museo</legend>
                <input type="text" name='museo' placeholder='Nombre de Museo'/>
                <button className='btn-submitForm'>Crear Museo</button>
                <button className="btn-Delete" onClick={()=>setOpen(!open)}>X</button>
            </form>
        </div>}
        {open2&&<div className='editFormDiv'>
        <form onSubmit={submitHandler} className="editForm form1">
            <label htmlFor="">
                Correo electónico:
                <input type="email" id='email'/>
            </label>
            <label htmlFor="">
                Correo Contraseña:
                <input type="password" id='password' />
            </label>
            
                <label htmlFor="">
                Rol:
                <select name="" id="rol">
                    <option value="admin">Administrado</option>
                    <option value="user">Usuario</option>
                </select>
            </label>
            <label htmlFor="">
                Museo:
                <select name="" id="museo">
                    {museos.map((museo)=><option value={museo.id}>{museo.id}</option>)}
                </select>
            </label>
            
            
            <button>Agregar Miembro</button>
            <button className="btn-Delete" onClick={()=>setOpen2(!open2)}>X</button>
            
        </form>
        
        </div>}
        
        {/* <nav>
            <p>LogoTipo</p>
            <div>
                <button className='btn-Ingresar'   onClick={()=>setOpen(!open)}>Crear un Equipo</button>
                <Link to={"/"} className='btn-Ingresar' onClick={signOut(auth)}>Cerrar Sesión</Link>
                
            </div>
            
        </nav> */}
        <h1 id='titulo'>Museos</h1>
        
        {usuario.rol==="admin"&&
        <div className='grid grid-cols-3 gap-4 justify-around max-w-7xl m-auto mt-10 '>
            
            {museos?.map((e)=>
            
                <div  key={e.id} className='relative rounded-md bg-colo7-phone-dark p-2 shadow-lg shadow-black ' >
                    <img src={e.imgmuseo} alt="" />
                    <div className='flex justify-around items-center h-20'>
                        <h1 className='w-2/3 text-white font-bold '>{e.nombre}</h1>
                        {/* <button className='btn-Ingresar' onClick={()=>{tomarMuseo2(e.id)}}>Ingresar a museo</button> */}
                        <button className='text-center mx-auto bg-emerald-400  w-1/3 text-shadow-xl rounded-md py-2 text-white hover:text-shadow-none hover:bg-emerald-300' onClick={()=>{tomarMuseo1(e.id)}}>Ingresar a museo</button>
                    </div>
                    
                    <button onClick={()=>{eliminarMuseo(e.id)}} className="absolute top-2 right-2 text-white  bg-red-500 p-2 rounded"><FontAwesomeIcon className='' icon={faTrash} /></button>
                    <button onClick={()=>{setOpen2(!open2)}} className="absolute top-2 left-2 text-white  bg-cyan-600 p-2 rounded"><FontAwesomeIcon className='' icon={faUserPlus} /></button>
                    
                </div>)}
            
        </div>}
        
        
        
        
        
        
        
        
    </section>
  )
}
