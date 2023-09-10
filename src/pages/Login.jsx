import React, { useEffect, useState } from 'react'
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut} from "firebase/auth"
import{getFirestore,doc,getDoc,setDoc} from "firebase/firestore"
import { app, getRol, registrarUsuario, } from '../firebase'
import { obtenerUsuario } from '../features/usuario/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerMuseos } from '../features/museos/museosSlice'
import { useNavigate } from 'react-router-dom'

const auth= getAuth(app)
const db = getFirestore(app)
export default function Login() {
    const [user,setUser]= useState(null)
    const navigate = useNavigate();
    // esto se va a redux 
//   console.log(user)
//   function setUserWithFirebaseAndRol (usuarioFirebase){
//     getRol(usuarioFirebase.uid).then((rol)=>{
//       const userData = {
//         uid:usuarioFirebase.uid,
//         email:usuarioFirebase.email,
//         rol:rol
//       }
//       setUser(userData)
//     //   console.log("userData:",userData)
    
//     })
//   }
  
  const [isRegistrando,setIsRegistrando] = useState(false)
//   a firebase index
//   onAuthStateChanged(auth,(usuarioFirebase)=>{
//       obtenerUsuario(usuarioFirebase)
//   })
  
//   async function getRol(uid){
//     const docuRef = doc(db,`usuarios/${uid}`)
//     const docuCifrada = await getDoc(docuRef)
//     const docuFinal =docuCifrada.data().rol
//     return docuFinal
//   }
  // async function registrarUsuario (email,password,rol,museo){
  //     const infoUsuario = await createUserWithEmailAndPassword(auth,email,password).then((usuarioFirebase)=>{
  //         return usuarioFirebase
  //     })
  //     console.log(infoUsuario.user.uid)
  //     const docuRef = doc(db,`usuarios/${infoUsuario.user.uid}`)
  //     setDoc(docuRef,{correo:email,rol:rol,museo:museo})
  
  // }
//   esto se queda en login
  function submitHandler (e){
      e.preventDefault()
      const email = e.target.elements.email.value
      const password = e.target.elements.password.value
      console.log(email,password)
      
      
      if (isRegistrando){
        const rol = e.target.elements.rol.value
        const museo =e.target.elements.museo.value
          // register
          registrarUsuario(email,password,rol,museo)
      }else{
          signInWithEmailAndPassword(auth,email,password)
        //   if(usuario.rol==="user"){
        //     navigate("/" + usuario.museo)
            
        //     }else{
        //     if(usuario.rol==="admin"){
        //     navigate("/")}
        //     else{
                
        //     }
        // }
        
          
            
        
          console.log("ingreso")
      }
  }
  const logout = ()=>{
    signOut(auth)
    
    
  }
 

  const {museos} = useSelector(state=>state.museos)
  const {usuario} = useSelector(state=>state.usuario)
  console.log(usuario)
  const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(obtenerMuseos())
        onAuthStateChanged(auth,(usuarioFirebase)=>{
            if(usuarioFirebase){
              if(!user){
                // setUserWithFirebaseAndRol(usuarioFirebase)
                dispatch(obtenerUsuario(usuarioFirebase))
              }
          }}) 
         console.log("estuviste en login")
        
        
  
  
    },[dispatch])
    if(usuario.rol==="user"){
      navigate("/phone_prueba/" + usuario.museo)
      
      }else{
      if(usuario.rol==="admin"){
      navigate("/home")}
      else{
          if(usuario.rol===""){
            navigate("/login")  
          }
          
      }
  }
  
    
    
  return (
    <div className='formContainer flex items-center justify-center'>
        
          <img src="https://images.unsplash.com/photo-1599192148293-d315c45e7c86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="" />
          <form onSubmit={submitHandler} className="formLogin" >
                <legend>Inicia Sesión</legend>
                  
                  <input type="email" id='email' autoComplete='off' placeholder='Ingrese su email'/>
              
              
                  <input type="password" id='password' autoComplete='off' placeholder='Ingrese su Contaseña' />
             
              {isRegistrando&&
              <div>
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
              </div>}
              
              <input type="submit" value={isRegistrando? "Registrar" : "Iniciar Sesión"} />
              {/* <button onClick={()=>{setIsRegistrando(!isRegistrando)}}>
            {isRegistrando? "Ya tengo una cuenta": "Quiero Registrarme"}
        </button> */}
        {/* <button className='btn-Ingresar' onClick={logout}>Cerrar Sesión</button> */}
          </form>
        
        
    </div>
  )
}
