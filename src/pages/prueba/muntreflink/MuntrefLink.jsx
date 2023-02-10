import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Page from '../../../components/Page'
import { obtenerBienvenido } from '../../../features/bienvenido/bienvenidoSlice'
import { obtenerMuntref_Links } from '../../../features/Muntref_Link/muntrefLink'
import { createLink, createlinksmp, deleteLink, deletelinksmp, updateBienvenidaLayer, updateLink, updatelinksmp } from '../../../firebase'
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
import {FaArrowLeft} from 'react-icons/fa'
import {IoMdArrowDropdown,IoMdArrowDropup} from 'react-icons/io'
import { obtenerMuseo } from '../../../features/museo/museoSlice'
import { obtenerLinksmp } from '../../../features/Linksmp/linksmpSlice'
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export default function Bienvenida({idMuseo}) {
  const [open,setOpen] = useState(false)
  const [openlink,setOpenlink] = useState(false)
  const [color,setCorlor] = useState(false)
  const [link,setLink] = useState({})
  const [name,setName]=useState()
  const [boton,setBoton] = useState(false)
  const [linkmp,setLinkmp]=useState({})
  
  const [modalDelLink,setModalDelLink] = useState(false)
  const [modalLink,setModalLink]= useState({})
  
  const [modalDelLinkmp,setModalDelLinkmp] = useState(false)
  const [modalLinkmp,setModalLinkmp]= useState({})

  const objetoIdMuseo = useParams(idMuseo)
  const id = objetoIdMuseo.idMuseo
  // console.log(id)
  const {muntrefLinks} = useSelector(state=>state.muntrefLinks)
  const {museo} = useSelector(state=>state.museo)
  const {linksmp} = useSelector(state=>state.linksmp)
  const {museosCol} = useSelector(state=>state.museos)

  const editarLink =async (e)=>{
    e.preventDefault()
    const {idLink,desclink,imglink,nboton,nombrelink,textlink,textlink2,textlink3,textlink4,textlink5,urllink}=e.target
    const linkEditado = {
      desclink:desclink.value,imglink:imglink.value,nboton:nboton.value,nombrelink:nombrelink.value,
      textlink:textlink.value,
      textlink2:textlink2.value,
      textlink3:textlink3.value,
      textlink4:textlink4.value,
      textlink5:textlink5.value,
      urllink:urllink.value,
      
    }
    

    console.log(linkEditado)
    await updateLink(id,idLink.value,linkEditado,museosCol)
    dispatch(obtenerMuntref_Links(id))
    const newLink =linkEditado
    newLink.id=idLink.value
    setLink(newLink)
    e.target.reset()
    // dispatch(obtenerMuseos())
    // console.log("se ejecuta")
    
    // dispatch(obtenerMuseo(id))
  }
  const tomarLink = (id)=>{
    
    muntrefLinks.map((e)=>{
      if(e.id===id){
        setLink(e)
        setBoton(true)
        
      }
    })
  }
  
  // console.log(linksmp)

  const subir =(e)=>{
    e.preventDefault()
    
    const file = e.target.files[0]
    console.log(file)
    uploadFiles(file)
    
    
  }
  
  const uploadFiles =(file)=>{
    if(!file)return
        const storageRef =ref(storage,`NewStorage/Museos/${museo.nombre}/MuntrefLinks/${link.nombrelink}/${file.name}`)
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
              const objeto={...link,...newObject}
              console.log(objeto)

              setLink(objeto)
              
            })
        }
        )
        
        
    
  }


  const cargarLinkmp=(idLink)=>{
    console.log(idLink)
    dispatch(obtenerLinksmp({id,idLink}))
    setOpenlink(true)
    
  }
  const tomarLinkmp = (idLinkmp)=>{
    
    linksmp.map((e)=>{
      if(e.id===idLinkmp){
        setLinkmp(e)
        
      }  
  })}
  const editarlinkmp =async (e)=>{
    e.preventDefault()
    const {ulinkmp,urllinkmp,idlink}=e.target
    const linkEditado = {
      ulinkmp:ulinkmp.value,
      urllinkmp:urllinkmp.value,
      }
    console.log(link.id)
    // console.log(linkEditado)
    console.log(id,link.id,idlink.value,linkEditado)
    await updatelinksmp(id,link.id,idlink.value,linkEditado,museosCol)
    
    dispatch(obtenerLinksmp({id,idLink:link.id}))
    const newLinkmp =linkEditado
    newLinkmp.id=idlink.value
    setLinkmp(newLinkmp)
    e.target.reset()
    // dispatch(obtenerMuseo(id))
  }

  // console.log(link)

  const crearLink=()=>{
    if(muntrefLinks.length===0){
      const idLink = "1a_link1"
      createLink(id,idLink,museosCol)
      dispatch(obtenerMuntref_Links(id))

    }
    else{
      const a = muntrefLinks[muntrefLinks.length-1]
      const index =parseInt(a.id.substring(7))
      console.log(index)
      const idLink = `1a_link${index+1}`
      createLink(id,idLink)
      dispatch(obtenerMuntref_Links(id))
    }
    // createLink()
  }  
  const eliminarLink=(idLink)=>{
    deleteLink(id,idLink,museosCol)
    dispatch(obtenerMuntref_Links(id))
    setModalDelLink(false)
  }  
  const borrarLink=(link)=>{
    console.log(link)
    setModalLink(link)
    setModalDelLink(true)
  }
  

  const crearLinkmp=()=>{
    
    const idLink = link.id
    console.log(linksmp)
    if(linksmp.length===0){
      const idLinkmp = "1a_link1"
      createlinksmp(id,idLink,idLinkmp,museosCol)
      dispatch(obtenerLinksmp({id,idLink}))
    }else{
      const a = linksmp[linksmp.length-1]
      const index =parseInt(a.id.substring(7))
      console.log(index)
      const idLinkmp = `1a_link${index+1}`
    //   console.log(index,idLinkmp)
      createlinksmp(id,idLink,idLinkmp,museosCol)
      dispatch(obtenerLinksmp({id,idLink}))
    }
    
  }
  const eliminarLinkmp=(idLinkmp)=>{
    const idLink = link.id
    deletelinksmp(id,idLink,idLinkmp,museosCol)
    dispatch(obtenerLinksmp({id,idLink}))
    setModalDelLinkmp(false)
  }  
  const borrarLinkmp=(linkmp)=>{

    console.log(linkmp)
    setModalLinkmp(linkmp)
    setModalDelLinkmp(true)
  }

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(obtenerMuntref_Links(id))
    dispatch(obtenerMuseo(id))
    

},[dispatch])
  return (
    <Page>
        {openlink&&<div className='absolute bg-black bg-opacity-70 h-screen w-full top-0 z-50 flex  items-center justify-center '>
          <div className='flex w-3/4 h-3/4 bg-colo5-phone-gray p-3 gap-10 '>
          <div className='  text-white w-2/3 grid grid-cols-2 gap-4 rounded-sm '>
            {linksmp.map((linkmp)=><div className='bg-colo7-phone-dark  text-white  flex flex-col  p-2 max-h-40 relative'>
              <p className=''>ulinkmp:  <span className='font-bold'>{linkmp.ulinkmp}</span></p>
              <p className=''>ulinkmp:  <span className='font-bold'>{linkmp.urllinkmp}</span></p>
              <button className='bg-emerald-400 p-1  rounded' onClick={()=>tomarLinkmp(linkmp.id)}>modificar</button>
              <button className='text-white bg-red-500 absolute top-0 right-0' onClick={()=>{borrarLinkmp(linkmp)}}> X</button>
            </div>)}
            
              <button onClick={crearLinkmp}>nuevoa</button>
              
            
          </div>
          {modalDelLinkmp&&<div className=' flex items-center justify-center absolute w-[100%] h-[90%] z-50 bg-black bg-opacity-80'>
            <div className='bg-slate-600 w-[20%] h-[30%] flex flex-col '>
              <p className='text-white m-auto px-8 text-lg'>¿Esta seguro que desea eliminar {modalLinkmp.id} ?</p>
              <div className='flex m-auto gap-5'>
                
                <button className=' p-2 bg-red-500 rounded-md text-white' onClick={()=>{
                  setModalDelLinkmp(false)
                }}>Cancelar</button>
                <button className=' p-2 bg-green-500 rounded-md text-white 'onClick={()=>{
                  eliminarLinkmp(modalLinkmp.id)
                  // console.log(modalLink)
                }} >Eliminar</button>
              </div>
            </div>
            
          </div>}
          {linkmp&&
          <form  onSubmit={editarlinkmp} className='w-1/3 flex flex-col  '>
              <h2 className='text-3xl text-center w-full mb-6  text-white '>Modifica a {linkmp.id}</h2>
              
              <div className=' h-60 bg-colo7-phone-dark w-11/12 flex justify-around mx-auto rounded-t-xl shadow-xl shadow-black '>
                  <div className='h-full  flex flex-col gap-6 mt-5 w-1/2  '>
                    <input type="hidden" name='idlink' defaultValue={linkmp.id} />
                    <div className='flex flex-col gap-1'>
                          <label className='text-white py-1 font-semibold' htmlFor="es360">ulinkmp</label>
                          <input className='' type="text"  name='ulinkmp' defaultValue={linkmp.ulinkmp} />
                    </div>
                    <div className='flex flex-col gap-1'>
                          <label className='text-white py-1 font-semibold' htmlFor="es360">ulinkmp</label>
                          <input type="text"  name='urllinkmp' defaultValue={linkmp.urllinkmp} />
                    </div>
                  </div>
                  
              </div>
          
          <button className='text-center mx-auto bg-emerald-400 p-4 w-11/12 text-shadow-xl rounded-b-xl text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300'  >Actualizar {linkmp.id}</button>
  
          </form> 
          }
        </div>
        


        <button className='text-white absolute top-0 right-0 bg-red-600 rounded-lg  h-8 w-8 ' onClick={()=>{setOpenlink(false)}}>X</button>
          </div>}


        {modalDelLink&&<div className=' flex items-center justify-center absolute w-[100%] h-[90%] z-50 bg-black bg-opacity-80'>
            <div className='bg-slate-600 w-[20%] h-[30%] flex flex-col '>
              <p className='text-white m-auto px-8 text-lg'>¿Esta seguro que desea eliminar {modalLink.nombrelink} ?</p>
              <div className='flex m-auto gap-5'>
                
                <button className=' p-2 bg-red-500 rounded-md text-white' onClick={()=>{
                  setModalDelLink(false)
                }}>Cancelar</button>
                <button className=' p-2 bg-green-500 rounded-md text-white 'onClick={()=>{
                  eliminarLink(modalLink.id)
                  // console.log(modalLink)
                }} >Eliminar</button>
              </div>
            </div>
            
          </div>}
        <section className=' flex  justify-around '>
        {!open&&<div className="relative flex  justify-between w-1/4 " >
              
              <div className="bg-colo5-phone-gray  h-[590px] m-auto relative mt-10  w-[286px] rounded-[34px] z-0 border-[1px] border-black shadow-xl  shadow-black">
                  <div className="h-12 bg-black rounded-t-[34px] w-[285px] "></div>
                  
                  <nav className="flex justify-between p-2 items-center ">
                  <h1 className="text-white text-xs mt-[-2px]">MUSEUM VIEW</h1>
                  <ul className="flex gap-6">
                      <li className="text-colo6-phone-oringe text-lg ml-[-5px]">
                      <BsThreeDotsVertical />
                      </li>
                  </ul>
                  </nav>
                  <div className=' h-6 relative'>
                  <Link to={"/phone_prueba/"+ id}><button className='text-colo6-phone-oringe absolute top-1 left-0'><FaArrowLeft/></button></Link>
                  </div>

                  <div className='h-[430px] overflow-auto contenedor bg-white'>
                    <h1 className='bg-colo6-phone-oringe text-xs text-center text-white py-2 font-semibold '>RECORRIDO VIRTUAL DEL MUSEO 360°</h1>
                    <p className='text-xs text-red-900 text-justify m-1'>Ingresando aqui, podrás recorrer virtualmente el {museo.nombre}. En cada imagen podrás descubrir el entorno simplemente deslizando tu dedo en cualquier dirección, y podrás entrar en los hotspots que cada lugar ofrece.</p>
                    {muntrefLinks.map((link)=>
                    <div className='relative w-full 'onClick={()=>{tomarLink(link.id)}} >
                      <div className='h-40 overflow-hidden relative flex justify-center'>
                        <img className='w-full absolute m-auto' src={link.imglink} alt="" />
                        
                      </div>
                      
                      <p className='absolute w-full bottom-0 bg-black text-white bg-opacity-80 text-center py-3'>{link.nombrelink}</p>
                      
                     <button className='bg-red-500 text-white absolute right-0 top-0' onClick={()=>{borrarLink(link)}}>X</button>
                    </div>)}
                    <button className='' onClick={crearLink}>Nuevo</button>
                  </div>
                    
                  
  
                  <div className="h-14 bg-black rounded-b-[34px] "></div>
              </div>
  
              </div>}
                
              {boton&&<button className='absolute w-1/6 top-20 right-16 bg-emerald-400 text-white text-xs bg-opacity-80 text-center py-1 z-40 ' 
                            onClick={()=>{cargarLinkmp(link.id)}} >Ver link del recorrido</button>}
                  {link&&<form  onSubmit={editarLink} className='w-2/4 flex flex-col relative '>
                        <h2 className='text-3xl text-center w-full mx-auto   text-white mt-6 '>Modifica a {link.nombrelink}</h2>
                        
                        <div className=' relative h-[480px] bg-colo7-phone-dark w-11/12 flex justify-around mx-auto p-5 rounded-t-xl shadow-xl shadow-black mt-8'>
                            <div className='h-full  flex flex-col gap-8 mt-4  w-1/2 px-10'> 
                                    <input type="hidden" name='idLink' defaultValue={link.id} />
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="">DescLink</label>
                                  <input type="text" name='desclink' defaultValue={link.desclink} />
                                  
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="">Imagen del recorrido</label>
                                  <input type="text" name='imglink' defaultValue={link.imglink} />
                                  <input type="file" onChange={subir} onClick={()=>{setName("imglink")}}  />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="">Nboton</label>
                                  <input type="text" name='nboton' defaultValue={link.nboton}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="">Nombre del recorrido</label>
                                  <input type="text" name='nombrelink' defaultValue={link.nombrelink}/> 
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="">Url Link</label>
                                  <input type="text" name='urllink' defaultValue={link.urllink}/>
                                </div>
                            </div>
                            <div className='h-full  flex flex-col gap-8 mt-4  w-1/2 px-10'>
                                
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="">1° Parrafo</label>
                                  <input type="text" name='textlink' defaultValue={link.textlink}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="">2° Parrafo</label>
                                  <input type="text" name='textlink2' defaultValue={link.textlink2}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="">3° Parrafo</label>
                                  <input type="text" name='textlink3' defaultValue={link.textlink3}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="">4° Parrafo</label>
                                  <input type="text" name='textlink4' defaultValue={link.textlink4}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="">5° Parrafo</label>
                                  <input type="text" name='textlink5' defaultValue={link.textlink5}/>
                                </div>      
                            </div>
                            
                        </div>
                        
                        <button className='text-center mx-auto z-10 bg-emerald-400 p-4 w-11/12 text-shadow-xl rounded-b-xl text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300'  >Actualizar Recorrido</button>
                
                    </form>}
               
          
      {/* {muntrefLinks?.map((e)=><div  key={e.nombrelayer} >

          <div className='infoLayer'>
              <p>{e.id}  de {id}</p>
              <p>ImgLayer:</p>
              <img className='' src={e.imglayer} alt="" />
              <button onClick={()=>{tomarLink(e.id)}} className="btn-Edit2">✎</button>
              
              <p>Contenido de {e.id}</p>
              
              <p>desclink: {e.desclink}</p>
              <p>imglink: {e.imglink}</p>
              <p>nboton: {e.nboton}</p>
              <p>nombrelink: {e.nombrelink}</p>
              <p>textlink: {e.textlink}</p>
              <p>Textlink2: {e.textlink2}</p>
              <p>Textlink3: {e.textlink3}</p>
              <p>TextLink4: {e.textlink4}</p>
              <p>TextLink5: {e.textlink5}</p>
              <p>Urllink: {e.urllink}</p>
              
              
              <button  ><Link className='btn-Ingresar' to={"/"+id+"/MuntrefLink/"+e.id+"/Linkmp"}>Ingresar a Linkmp de {e.id}</Link> </button>
            
              
          
        </div>
        
        
    
    


      </div>)} */}
      
      
      </section>
    </Page>
  )
}
