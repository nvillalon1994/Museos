import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Page from '../../../components/Page'
import { obtenerBienvenido } from '../../../features/bienvenido/bienvenidoSlice'
import { obtenerRecorridos } from '../../../features/recorrido/recorridoSlice'
import { createRecorrido, deleteRecorrido, updateRecorrido } from '../../../firebase'
import ReactAudioPlayer from 'react-audio-player';
import {FaArrowLeft} from 'react-icons/fa'
import Qrgenerator from '../../../components/qr generator/Qr-generator'
import {
    BiLogOutCircle,
    BiWorld,
    BiDotsVerticalRounded,
    BiBarChartSquare,
  } from "react-icons/bi";
import {
    AiOutlineBank,
    AiFillMediumSquare,
    AiOutlineUpSquare,
  } from "react-icons/ai";
import {
    BsFileText,
    BsThreeDotsVertical,
    BsArrowRightSquareFill,
  } from "react-icons/bs";
import {GoTriangleUp} from "react-icons/go"
import { obtenerMuseo } from '../../../features/museo/museoSlice'
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { text } from '@fortawesome/fontawesome-svg-core'
import Phonecase from '../../../components/phonecase/PhoneCase'
export default function Recorrido({idMuseo}) {
 



  

  const [open,setOpen] = useState(false)
  const [name,setName]=useState()
  const [recorrido,setrecorrido] = useState({})

  const [delRecorridoModal,setDelRecorridoModal] = useState(false)
  const [recorridoModal,setReacorridoModal]= useState({})


  const objetoIdMuseo = useParams(idMuseo)
  const id = objetoIdMuseo.idMuseo
  // console.log(id)
  
  const {recorridos} = useSelector(state=>state.recorridos)
  const {museo} = useSelector(state=>state.museo)
  const {museosCol} = useSelector(state=>state.museos)
  console.log(recorridos)
  

  const editarrecorrido =async (e)=>{
    e.preventDefault()
    const {audioreco,nombrereco,colorreco,colorreco2,colorreco3,colorreco4,colorreco5,idrecorrido,imgreco}=e.target
    const recorridoEditado = {
      audioreco:audioreco.value,
      nombrereco:nombrereco.value,
      colorreco:colorreco.value,
      colorreco2:colorreco2.value,
      colorreco3:colorreco3.value,
      colorreco4:colorreco4.value,
      colorreco5:colorreco5.value,
      imgreco:imgreco.value,
      


    }
    
    await updateRecorrido(id,idrecorrido.value,recorridoEditado,museosCol)
    dispatch(obtenerRecorridos(id))
    const newRecorrido =recorridoEditado
    newRecorrido.id=idrecorrido.value
    setrecorrido(newRecorrido)   
    e.target.reset()
  }
  const tomarrecorrido = (recorrido)=>{
      console.log(recorrido)
      setrecorrido(recorrido)
      setTimeout(() => {
        setOpen(true)
      }, 1000);
      
    //   recorridos.map((e)=>{
    //   if(e.id===id){
        
    //     setrecorrido(e)
    //     setOpen(true)
    //   }
    // })
  }
  const subir =(e)=>{
    e.preventDefault()
    
    const file = e.target.files[0]
    console.log(file)
    uploadFiles(file)
    
    
  }
  
  const uploadFiles =(file)=>{
    if(!file)return
        const storageRef =ref(storage,`NewStorage/Museos/${museo.nombre}/Recorridos/${recorrido.id}/${file.name}`)
        const uploadTask= uploadBytesResumable(storageRef ,file)
        uploadTask.on("state_changed",(snapshot)=>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)
            // setProgress(prog)
        },(err)=>console.log(err),
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref)
            .then((url)=>{
              
              
              const newObject ={
                prop:url
              }
              newObject[name]= newObject["prop"]
              delete newObject["prop"]
              console.log(newObject)
              const objeto={...recorrido,...newObject}
              console.log(objeto)
                              
              setrecorrido(objeto)
              
            })
        }
        )

  }

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
  // const letra = (recorridos[recorridos.length-1].id[1])
  // const letrasiguiente = reemplazarCaracteres(letra)
  // console.log(letra, letrasiguiente[0])
  // console.log(reemplazarCaracteres("a"))
  const crearRecorrido =(e)=>{
    e.preventDefault()
    const last = (recorridos[recorridos.length-1].id[1])
    const letra = reemplazarCaracteres(last)
    console.log(letra)
    const {name}= e.target
    console.log(name.value)
    const idRecorrido = `1${letra}_${(name.value).toLowerCase()}`
    console.log(idRecorrido)
    createRecorrido(id,idRecorrido,name.value,museosCol)
    dispatch(obtenerRecorridos(id))
  }
  const eliminarRecorrido=(idRecorrido)=>{
    console.log(idRecorrido, id)
    deleteRecorrido(id,idRecorrido,museosCol)
    dispatch(obtenerRecorridos(id))
    setDelRecorridoModal(false)
  }
  const delRecorrido=(recorrido)=>{
    
    setDelRecorridoModal(true)
    setReacorridoModal(recorrido)
    
  }
  
  // console.log(recorrido)
  console.log(recorrido)
  const dispatch = useDispatch()
  useEffect(()=>{
    
    dispatch(obtenerRecorridos(id))
    dispatch(obtenerMuseo(id))
    
},[dispatch])
  const [animate,setAnimate]= useState()
  return (
    <Page>
      <section className='flex justify-around w-screen max-w-full h-[93vh] overflow-hidden  items-center '>
            
            {delRecorridoModal&&<div className=' flex items-center justify-center absolute w-[100%] h-[93vh] z-[1000] bg-black bg-opacity-80'>
            <div className='bg-slate-600 w-[20%] h-[30%] flex flex-col '>
              <p className='text-white m-auto px-8 text-lg'>¿Esta seguro que desea eliminar {recorridoModal.id} ?</p>
              <div className='flex m-auto gap-5'>
                
                <button className=' p-2 bg-red-500 rounded-md text-white' onClick={()=>{
                  setDelRecorridoModal(false)
                }}>Cancelar</button>
                <button className=' p-2 bg-green-500 rounded-md text-white 'onClick={()=>{
                  eliminarRecorrido(recorridoModal.id)
                  
                }} >Eliminar</button>
              </div>
            </div>
            
          </div>}



            {!open&&<div className="show-info-reco fist-reco-phone  ">
              
                <Phonecase >
                    
                    <nav className="flex justify-between p-2 items-center">
                    <h1 className="text-white text-xs mt-[-2px]">MUSEUM VIEW</h1>
                    <ul className="flex gap-6">
                        <li className="text-colo6-phone-oringe text-lg ml-[-5px]">
                        <BsThreeDotsVertical />
                        </li>
                    </ul>
                    </nav>
                    <nav>
                    <ul className="flex justify-between items-center w-full">
                        <li className="text-white text-sm text-center w-1/2  ">
                        <Link to={"/"+ id +"/Bienvenido"}>Acerca del museo</Link> 
                        </li>
                        <li className="text-colo6-phone-oringe text-sm w-1/2 text-center m-auto border-2 border-b-colo6-phone-oringe border-transparent">
                        Recorrido
                        </li>
                    </ul>
                    </nav>
                    <div className='h-[424px] overflow-auto contenedor2 '>
                      <h2 className='text-white text-xs mt-2 mb-6 mx-9'>{museo.nombre}</h2>
                      <div className='grid grid-cols-2 gap-2 relative'>
                      <Link className='absolute top-[-40px] left-2' to={"/phone_prueba/"+ id}><button className='text-colo6-phone-oringe '><FaArrowLeft/></button></Link>
                          {recorridos.map((recorrido)=>
                          <div className='bg-emerald-400  relative h-[120px] overflow-hidden ' >
                              <div onClick={()=>{tomarrecorrido(recorrido)}}>
                                <p className='text-center text-white'>{recorrido.nombrereco}</p>
                                <img loading='lazy' className='' src={recorrido.imgreco} alt=""  />
                              </div>
                              
                              <button className='text-white bg-red-400 hover:bg-red-500 w-5 h-5  text-sm absolute top-0 right-0 z-40' onClick={()=>{delRecorrido(recorrido)}}>X</button>
                          </div>
                          )}
                          <form onSubmit={crearRecorrido} className='bg-emerald-400 mb-4 ' >
                              <input type="text" placeholder='Nombre del recorrido' className='w-32' name="name" /> 
                              <button className='text-center text-white '>Nuevo Recorrido</button>
                              
                          </form>
                          
                      </div>
                    </div>
                    
                    
                </Phonecase>

            </div>}
            {/* {!open&&<div className="show-info-reco scale-50 lg:scale-75 xl:scale-90 2xl:scale-100 fist-reco-phone  ">
              
                <div className="bg-colo5-phone-gray relative h-[590px]  m-auto  mt-10  w-[286px] rounded-[34px] z-0 border-[1px] border-black shadow-xl  shadow-black">
                    <div className="h-12 bg-black rounded-t-[34px] w-[285px]  "></div>
                    <nav className="flex justify-between p-2 items-center">
                    <h1 className="text-white text-xs mt-[-2px]">MUSEUM VIEW</h1>
                    <ul className="flex gap-6">
                        <li className="text-colo6-phone-oringe text-lg ml-[-5px]">
                        <BsThreeDotsVertical />
                        </li>
                    </ul>
                    </nav>
                    <nav>
                    <ul className="flex justify-between items-center w-full">
                        <li className="text-white text-sm text-center w-1/2  ">
                        <Link to={"/"+ id +"/Bienvenido"}>Acerca del museo</Link> 
                        </li>
                        <li className="text-colo6-phone-oringe text-sm w-1/2 text-center m-auto border-2 border-b-colo6-phone-oringe border-colo5-phone-gray">
                        Recorrido
                        </li>
                    </ul>
                    </nav>
                    <div className='h-[424px] overflow-auto contenedor2 '>
                      <h2 className='text-white text-xs mt-2 mb-6 mx-9'>{museo.nombre}</h2>
                      <div className='grid grid-cols-2 gap-2 relative'>
                      <Link className='absolute top-[-40px] left-2' to={"/phone_prueba/"+ id}><button className='text-colo6-phone-oringe '><FaArrowLeft/></button></Link>
                          {recorridos.map((recorrido)=>
                          <div className='bg-emerald-400  relative h-[120px] overflow-hidden ' >
                              <div onClick={()=>{tomarrecorrido(recorrido)}}>
                                <p className='text-center text-white'>{recorrido.nombrereco}</p>
                                <img loading='lazy' className='' src={recorrido.imgreco} alt=""  />
                              </div>
                              
                              <button className='text-white bg-red-400 hover:bg-red-500 w-5 h-5  text-sm absolute top-0 right-0 z-40' onClick={()=>{delRecorrido(recorrido)}}>X</button>
                          </div>
                          )}
                          <form onSubmit={crearRecorrido} className='bg-emerald-400 mb-4 ' >
                              <input type="text" placeholder='Nombre del recorrido' className='w-32' name="name" /> 
                              <button className='text-center text-white '>Nuevo Recorrido</button>
                              
                          </form>
                          
                      </div>
                    </div>
                    
                    <div className="h-14 bg-black rounded-b-[34px] w-[286px] absolute bottom-0 z-70"></div>
                </div>

            </div>} */}



            {/* {open&&<div className=" flex items-center text-3xl ">
            <BsArrowRightSquareFill />
            </div>} */}
            {/* SEGUNDA PANTALLA */}
            {open&&
            
                <Phonecase >
                    
                    <nav className="flex justify-between p-2 items-center">
                    <h1 className="text-white text-xs mt-[-2px]">MUSEUM VIEW</h1>
                    <ul className="flex gap-6">
                        <li className="text-colo6-phone-oringe text-lg ml-[-5px]">
                        <BsThreeDotsVertical />
                        </li>
                    </ul>
                    </nav>
                    <nav>
                    <ul className="flex justify-between items-center w-full ">
                        <li className="text-colo6-phone-oringe text-sm text-center w-1/2 border-2 border-b-colo6-phone-oringe border-transparent  ">
                        Muestas
                        </li>
                        <Link className='w-1/2' to={"/"+id+"/recorrido/"+recorrido.id+"/recursos"}><li className="text-white text-sm  text-center m-auto ">Amplía tu recorrido</li></Link>
                    </ul>
                    </nav>
                    
                    <div className='relative h-[426px]'>
                    <button className='text-colo6-phone-oringe absolute top-4 left-4 z-20' onClick={()=>{setOpen(false)
                    setrecorrido({})
                    }}><FaArrowLeft/></button>
                        <div className='max-h-[200px] h-[200px] overflow-hidden flex relative '>
                          
                          <img className='absolute top-[-40px] ' src={recorrido.imgreco} alt="" />
                        </div>
                        <div className=" flex justify-around  w-full my-1">
                            <ReactAudioPlayer
                            src={recorrido.audioreco}
                            autoPlay={false}
                            controls
                            style={{textEmphasisColor:"red"}}
                            />
                        </div>
                        <div className='overflow-auto h-[120px] contenedor '>
                            <p className='text-white font-semibold text-center text-sm my-2 '>{recorrido.nombrereco}</p>
                            <p className='text-white text-sm mx-2 mb-2 text-justify'>{recorrido.colorreco}</p>
                            <p className='text-white text-sm mx-2 mb-2 text-justify'>{recorrido.colorreco2}</p>
                            <p className='text-white text-sm mx-2 mb-2 text-justify'>{recorrido.colorreco3}</p>
                            <p className='text-white text-sm mx-2 mb-2 text-justify'>{recorrido.colorreco4}</p>
                            <p className='text-white text-sm mx-2 mb-2 text-justify'>{recorrido.colorreco5}</p>
                        </div>
                        <div>
                            <Link to={"/"+id+ "/recorrido/"+recorrido.id+"/muestras"}><button className='w-full '><GoTriangleUp className='text-center w-full text-white bg-colo6-phone-oringe'/></button></Link>
                            <p className='text-white text-sm'>Muestras:</p>
                        </div>
                    </div>
                    
                </Phonecase>

            
            }
            {/* {open&&<div className="scale-50 lg:scale-75 xl:scale-90 2xl:scale-100 relative flex justify-between w-1/4  ">
                <div className="bg-colo5-phone-gray relative h-[590px] m-auto  mt-10  w-[286px] rounded-[34px] z-0 border-[1px] border-black shadow-xl  shadow-black">
                    <div className="h-12 bg-black rounded-t-[34px] w-[285px]"></div>
                    <nav className="flex justify-between p-2 items-center">
                    <h1 className="text-white text-xs mt-[-2px]">MUSEUM VIEW</h1>
                    <ul className="flex gap-6">
                        <li className="text-colo6-phone-oringe text-lg ml-[-5px]">
                        <BsThreeDotsVertical />
                        </li>
                    </ul>
                    </nav>
                    <nav>
                    <ul className="flex justify-between items-center w-full ">
                        <li className="text-colo6-phone-oringe text-sm text-center w-1/2 border-2 border-b-colo6-phone-oringe border-colo5-phone-gray  ">
                        Muestas
                        </li>
                        <Link className='w-1/2' to={"/"+id+"/recorrido/"+recorrido.id+"/recursos"}><li className="text-white text-sm  text-center m-auto ">Amplía tu recorrido</li></Link>
                    </ul>
                    </nav>
                    
                    <div className='relative h-[426px]'>
                    <button className='text-colo6-phone-oringe absolute top-4 left-4 z-20' onClick={()=>{setOpen(false)
                    setrecorrido({})
                    }}><FaArrowLeft/></button>
                        <div className='max-h-[200px] h-[200px] overflow-hidden flex relative '>
                          
                          <img className='absolute top-[-40px] ' src={recorrido.imgreco} alt="" />
                        </div>
                        <div className=" flex justify-around  w-full my-1">
                            <ReactAudioPlayer
                            src={recorrido.audioreco}
                            autoPlay={false}
                            controls
                            style={{textEmphasisColor:"red"}}
                            />
                        </div>
                        <div className='overflow-auto h-[120px] contenedor '>
                            <p className='text-white font-semibold text-center text-sm my-2 '>{recorrido.nombrereco}</p>
                            <p className='text-white text-sm mx-2 mb-2 text-justify'>{recorrido.colorreco}</p>
                            <p className='text-white text-sm mx-2 mb-2 text-justify'>{recorrido.colorreco2}</p>
                            <p className='text-white text-sm mx-2 mb-2 text-justify'>{recorrido.colorreco3}</p>
                            <p className='text-white text-sm mx-2 mb-2 text-justify'>{recorrido.colorreco4}</p>
                            <p className='text-white text-sm mx-2 mb-2 text-justify'>{recorrido.colorreco5}</p>
                        </div>
                        <div>
                            <Link to={"/"+id+ "/recorrido/"+recorrido.id+"/muestras"}><button className='w-full '><GoTriangleUp className='text-center w-full text-white bg-colo6-phone-oringe'/></button></Link>
                            <p className='text-white text-sm'>Muestras:</p>
                        </div>
                    </div>
                    <div className="h-14 bg-black rounded-b-[34px] w-[286px]  bottom-0 z-70"></div>
                </div>

            </div>} */}
             
            
            <form  onSubmit={editarrecorrido} className={`flex flex-col lg:w-3/4 w-4/5 md:w-3/4    scale-75 lg:scale-75 xl:scale-90 2xl:scale-100 show-info-reco-form ${(Object.keys(recorrido).length===0)&&"hidden"}`}>
                        
                          <h2 className='text-3xl w-full m-auto text-center  text-white my-6'>Modifica a {recorrido.nombrereco}</h2>
                          
                          
                        
                        
                        <div className='h-[500px] bg-colo7-phone-dark w-11/12 flex justify-around mx-auto p-5 rounded-t-xl shadow-xl shadow-black '>
                            <div className='h-full  flex flex-col gap-12 mt-5 w-1/2 px-10'>
                                
                                <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="hidden" name='idrecorrido' defaultValue={recorrido.id} />
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white  font-semibold' htmlFor="audioreco">Audio del Recorrido</label>
                                    <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='audioreco' defaultValue={recorrido.audioreco} />
                                    <input type="file" onChange={subir} onClick={()=>{setName("audioreco")}}  />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white  font-semibold' htmlFor="nombrereco">Nombre del Recorrido</label>
                                    <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='nombrereco' defaultValue={recorrido.nombrereco}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white  font-semibold' htmlFor="imgreco">Imagen del Recorrido</label>
                                    <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='imgreco' defaultValue={recorrido.imgreco}/>
                                    <input type="file" onChange={subir} onClick={()=>{setName("imgreco")}}  />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white  font-semibold' htmlFor="colorreco">1° Parrafo</label>
                                    <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='colorreco' defaultValue={recorrido.colorreco}/>
                                </div>  
                            </div>
                            <div className='h-full  flex flex-col gap-12 mt-5 w-1/2 px-10 '>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white  font-semibold' htmlFor="colorreco2">2° Parrafo</label>
                                    <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='colorreco2' defaultValue={recorrido.colorreco2}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white  font-semibold' htmlFor="colorreco3">3° Parrafo</label>
                                    <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='colorreco3' defaultValue={recorrido.colorreco3}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white  font-semibold' htmlFor="colorreco4">4° Parrafo</label>
                                    <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='colorreco4' defaultValue={recorrido.colorreco4}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white  font-semibold' htmlFor="colorreco5">5° Parrafo</label>
                                    <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='colorreco5' defaultValue={recorrido.colorreco5}/>
                                </div>
                                
                                
                                
                                
                                
                            </div>   
                                    
                                    
                                    
                                    
                            
                        </div>
                        
                        <button className='text-center mx-auto bg-emerald-400 p-4 w-11/12 text-shadow-xl rounded-b-xl text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300'>Actualizar recorrido</button>
                
            </form>
      </section>
      
        
    </Page>
  )
}
