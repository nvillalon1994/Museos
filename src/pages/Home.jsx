import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Link, useNavigate } from 'react-router-dom'
import { obtenerMuseos } from '../features/museos/museosSlice'
import { createHighlight, createMuseums,deleteHighlight,deleteMuseum, registrarUsuario, storage, updateHighlight} from '../firebase'
import {getAuth,signOut,onAuthStateChanged} from "firebase/auth"
import { auth } from '../firebase'
import { logout, obtenerUsuario } from '../features/usuario/userSlice'
import NavBar from '../components/NavBar'
import Page from '../components/Page'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faTrash,faUserPlus} from '@fortawesome/free-solid-svg-icons'
import { obtenerHighlights } from '../features/highligthts/highlightsSlice'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export default function Home() {
    const [open,setOpen]= useState(false)
    const [open2,setOpen2]= useState(false)
    const [openHigh,setOpenHigh]= useState(false)
    const [museums,setMuseums]= useState("museos")  

    const [delHighModal,setDelHighModal]= useState(false)
    const [idHigh,setIdHigh]= useState()

    const [urlFile,setUrlFile] = useState()

    const {museos,museosCol,highCol} = useSelector(state=>state.museos)
    console.log(museosCol,highCol)

    const {highlights} = useSelector(state=>state.highlights)

    const crearMuseos = (e)=>{
        e.preventDefault()
        const {museo}= e.target
        // console.log(museo.value,info1.value,description.value)
        createMuseums(museo.value,museosCol)
        setOpen(!open)
        dispatch(obtenerMuseos(museosCol))
        console.log("se ejecuta")
    }
    
    console.log(museosCol)
    console.log(museos)
    
    const eliminarMuseo = (id)=>{
        deleteMuseum(id,museosCol)
        dispatch(obtenerMuseos(museosCol))
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


    //todo: highlights control
    const reemplazarCaracteres=(texto)=>{
        texto =texto.split('')
        for(let i = 0;i< texto.length;++i){
          switch(texto[i]) {
            case "z":
              texto[i] ="a"
              break;
            case "Z":
              texto[i] ="A"
              break
            default:
              texto[i] = String.fromCharCode(texto[i].charCodeAt(0)+1)
          }
        }
        return texto
      }
      console.log(highCol)
    const crearHight=()=>{
        console.log(highCol)
        // e.preventDefault()
        const last = (highlights[highlights.length-1].id[1])
        const letra = reemplazarCaracteres(last)
        console.log(letra)
        // console.log(letra)
        // const {name}= e.target
        // console.log(name.value)
        const infoHigh={
            himg:"",
            himg10:"",
            himg11:"",
            himg12:"",
            himg13:"",
            himg14:"",
            himg15:"",
            himg16:"",
            himg17:"",
            himg2:"",
            himg3:"",
            himg4:"",
            himg5:"",
            himg6:"",
            himg7:"",
            himg8:"",
            himg9:"",
            hlink:"",
            hlink2:"",
            hlink3:"",
            hlink4:"",
            hlink5:"",
            htext1:"",
            htext2:"",
            htext3:"",
            htext4:"",
            htext5:"",
            htext6:"",
            hvid:"",
            hvid2:"",
            hvid3:"",
            hvid4:"",
            hvid5:"",
            hvid6:"",
            hvid7:"",
            hvid8:"",
            hvid9:"",
            p1:"",
            p2:"",
            p3:"",
            urlhighlight:"https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
        }
        const idHigh = `1${letra}_banner`
        console.log(idHigh,highCol)
        createHighlight(highCol,idHigh,infoHigh)
        dispatch(obtenerHighlights(highCol))
        
    }
    const eliminarHigh=(idHigh)=>{
        deleteHighlight(highCol,idHigh)
        dispatch(obtenerHighlights(highCol))
        setDelHighModal(false)
    }
    const [banner,setBanner] = useState({})
    const [imageBan,setImageBan]=useState({})
    const [fileBan,setFileBan]=useState()
    const tomarHigh=(id)=>{
        console.log(id)
        highlights.map((e)=>{
          if(e.id===id){
            setBanner(e)
            setImageBan(e.urlhighlight)
          }
        })
  
      }
    const subirHigh =(e)=>{
        e.preventDefault()
        
        const file = e.target.files[0]
        // console.log({filepreview:URL.createObjectURL(file)})
        uploadFilesHigh(file)
        setImageBan(URL.createObjectURL(file))
        setFileBan(file)
        
        
    }
    const uploadFilesHigh =(file)=>{
      
      if(!file)return
          
          const storageRef =ref(storage,`/Highlights/${file.name}`)
          const uploadTask= uploadBytesResumable(storageRef ,file)
          uploadTask.on("state_changed",(snapshot)=>{
              const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)
              // setProgress(prog)
          },(err)=>console.log(err),
          ()=>{
              getDownloadURL(uploadTask.snapshot.ref)
              .then((url)=>{
                setUrlFile(url)
                
                const newObject ={
                  urlhighlight:url
                }
                // newObject[name]= newObject["prop"]
                // delete newObject["prop"]
                // console.log(newObject)
                const objeto={...banner,...newObject}
                console.log(objeto)
                              
                setBanner(objeto)
                
                
                
              })
          }
          )
          
          
          
      
    }
    
    const editarBanner123=(e)=>{
      e.preventDefault()

      uploadFilesHigh(fileBan)
      setTimeout(() => {
        editarBanner(e)
      }, 1000);
    }
    const editarBanner=async(e)=>{
        e.preventDefault()
        const {idBanner, htext1,htext2,urlhighlight}=e.target
        if(fileBan){
        // uploadFilesHigh(fileBan)
          const bannerEditado = {
          htext1:htext1.value,
          htext2:htext2.value,
          urlhighlight:urlFile
          }
          await updateHighlight(idBanner.value,bannerEditado,highCol)
          
            
          setTimeout(() => {
            
            dispatch(obtenerHighlights(highCol))
          }, 1000); 
          
          setUrlFile()
          setImageBan(urlFile)
          // const newBanner =bannerEditado
          // newBanner.id=idBanner.value
          
          // setBanner(newBanner)
          // dispatch(obtenerHighlights(highCol))
          e.target.reset()

        
      }else{
        const bannerEditado = {
          htext1:htext1.value,
          htext2:htext2.value,
          urlhighlight:urlFile
          }
          await updateHighlight(idBanner.value,bannerEditado,highCol)
          
          setTimeout(() => {
            
            dispatch(obtenerHighlights(highCol))
          }, 1000);  
          
          // const newBanner =bannerEditado
          // newBanner.id=idBanner.value
          
          // setBanner(newBanner)
          // dispatch(obtenerHighlights(highCol))
          e.target.reset()
      }
        
    
        
    }    

    console.log("high",highlights)
    const dispatch = useDispatch()
    
    const changeMuseumsLanguage=(museoscol)=>{
        console.log(museoscol)
        dispatch(obtenerMuseos(museoscol))
    }

    useEffect(()=>{
        
        dispatch(obtenerHighlights(highCol))
        if(!museosCol){
            dispatch(obtenerMuseos(museums))
        }else{
            dispatch(obtenerMuseos(museosCol))

        }
        onAuthStateChanged(auth,(usuarioFirebase)=>{
            if(usuarioFirebase){
              
                // setUserWithFirebaseAndRol(usuarioFirebase)
                dispatch(obtenerUsuario(usuarioFirebase))
              
          }}) 

    },[dispatch])
    const traerHighs=()=>{
        setOpenHigh(true)
        dispatch(obtenerHighlights(highCol))
    }
    const closeHighs=()=>{
        setOpenHigh(false)
        setBanner({})
    }
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
        {delHighModal&&<div className=' flex items-center justify-center absolute w-[100%] h-[100%] z-50 bg-black bg-opacity-80'>
            <div className='bg-slate-600 w-[20%] h-[30%] flex flex-col '>
              <p className='text-white m-auto px-8 text-lg'>¿Esta seguro que desea eliminar {idHigh}?</p>
              <div className='flex m-auto gap-5'>
                
                <button className=' p-2 bg-red-500 rounded-md text-white' onClick={()=>{
                  setDelHighModal(false)
                }}>Cancelar</button>
                <button className=' p-2 bg-green-500 rounded-md text-white 'onClick={()=>{
                  eliminarHigh(idHigh)
                }} >Eliminar</button>
              </div>
            </div>
            
          </div>}
        {openHigh&&
      <div className="absolute bg-black bg-opacity-70 h-screen w-full top-0 z-10 flex flex-col items-center justify-center " >
        
        <div className=' flex justify-between bg-colo5-phone-gray w-full h-full overflow-auto contenedor relative rounded-lg '>
          <div className="p-2 m-2">
            
            {highlights.map((high)=><div className=" relative flex flex-col my-2"  >
                <button type="" className='text-white absolute top-0 right-0 bg-red-600 rounded-lg  h-8 w-8 z-[1000]' onClick={()=>{
                    setDelHighModal(true)
                    setIdHigh(high.id)
                }}>X</button>
                <button type="" className='text-white flex justify-center absolute bottom-0 right-0 bg-emerald-400 rounded-lg  p-2  z-[1000]' onClick={()=>{tomarHigh(high.id)}}>Modificar</button>
              <img className="w-[300px]" src={high.urlhighlight} alt="" />
            </div>)}
          
          <button className='text-white text-7xl btn-Ingresar z-[1000]' onClick={crearHight}>Agregar Highlight</button>

          </div>
          
          {banner&&<form onSubmit={editarBanner123} action="" className='w-3/5 flex flex-col fixed right-32 top-2 '>
          <h2 className='text-2xl text-center w-full m-auto  text-white my-6'>Modifica a {banner.id}</h2>
                        
                         <div className='h-[500px] bg-colo7-phone-dark w-11/12 flex justify-around mx-auto p-5 rounded-t-xl shadow-xl shadow-black '>
                            <div className='h-full  flex flex-col gap-4 mt-5 '>
                                
                                <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="hidden" name='idBanner' defaultValue={banner.id} />
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white  font-semibold' htmlFor="audioreco">Texto 1</label>
                                    <input className="bg-colo5-phone-gray text-white p-1 rounded-md w-60 " type="text" name='htext1' defaultValue={banner.htext1} />
                                </div>
                                
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white  font-semibold' htmlFor="nombrereco">Texto 2</label>
                                    <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='htext2' defaultValue={banner.htext2}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white  font-semibold' htmlFor="imgreco">Banner</label>
                                    <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='urlhighlight' defaultValue={banner.urlhighlight}/>
                                </div>
                                <div className='flex justify-center'>
                                  <img className='h-32 ' src={imageBan} alt=""/>
                                  
                                </div>
                                <div className='flex justify-around bg-gray-700 rounded-md p-2 w-[650px] '>
                                  <div>
                                    <p className='text-white text-center'>Subir archivo desde el ordenador</p>
                                    <input onChange={subirHigh}  type="file" className='mx-auto w-40'  />
                                    
                                  </div>
                                  <div>
                                    <p className='text-white text-center'>Cargar url</p>
                                    <input
                                     onChange={(e)=>{
                                      console.log(e.target.value);
                                      setImageBan(e.target.value)
                                      setUrlFile(e.target.value)
                                      }}
                                      onClick={()=>setImageBan()}
                                      className='mx-auto w-40'  />
                                    
                                  </div>
                                  
                                </div>
                      {/* <button className='text-center w-60 mx-auto bg-emerald-400 p-4  text-shadow-xl rounded-xl my-2 text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300' >Subir {banner.id}</button> */}
                                
                            </div>      
                        </div>
                        
                        <button className='text-center mx-auto bg-emerald-400 p-4 w-11/12 text-shadow-xl rounded-b-xl text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300'>Actualizar Banner</button> 
          </form>}
        <button className='text-white fixed top-0 right-0 bg-red-600 rounded-lg  h-8 w-8 ' onClick={closeHighs}>X</button>
        </div>
      </div>}
        <nav className='navBar '>
            <p>Administrador</p>
            <div className=" justify-between">
                
                {usuario.rol==="admin" && <button className='btn-Ingresar'   onClick={traerHighs}>Highlights</button>}
                {usuario.rol==="admin" && 
                <select className="btn-Ingresar " name="format" id="format" onChange={(event)=>{
                    changeMuseumsLanguage(event.target.value)
                    
                }}>
                    <option selected disabled>Idioma</option>
                    <option value="museos" onClick={()=>{
                        changeMuseumsLanguage("museos")
                    }}>Español</option>
                    <option value="museosE" >Inglés</option>
                    
                </select>
                }
                {usuario.rol==="admin" && <button className='btn-Ingresar'   onClick={()=>setOpen(!open)}>Crear un Museo</button>}
                
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
                    <img src={e.imgmain} alt="" />
                    <div className='flex justify-around items-center h-20'>
                        <h1 className='w-2/3 text-white font-bold '>{e.nombre}</h1>
                        {/* <button className='btn-Ingresar' onClick={()=>{tomarMuseo2(e.id)}}>Ingresar a museo</button> */}
                        <button className='text-center mx-auto bg-emerald-400  w-1/3 text-shadow-xl rounded-md py-2 text-white hover:text-shadow-none hover:bg-emerald-300' onClick={()=>{tomarMuseo1(e.id)}}>Ingresar a museo</button>
                    </div>
                    
                    {/* <button onClick={()=>{eliminarMuseo(e.id)}} className="absolute top-2 right-2 text-white  bg-red-500 p-2 rounded"><FontAwesomeIcon className='' icon={faTrash} /></button> */}
                    {/* <button onClick={()=>{setOpen2(!open2)}} className="absolute top-2 left-2 text-white  bg-cyan-600 p-2 rounded"><FontAwesomeIcon className='' icon={faUserPlus} /></button> */}
                    
                </div>)}
            
        </div>}
        
        
        
        
        
        
        
        
    </section>
  )
}
