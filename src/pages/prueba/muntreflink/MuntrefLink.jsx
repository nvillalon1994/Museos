import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Page from '../../../components/Page'
import { obtenerBienvenido } from '../../../features/bienvenido/bienvenidoSlice'
import { obtenerMuntref_Links } from '../../../features/Muntref_Link/muntrefLink'
import { updateBienvenidaLayer, updateLink, updateLinkmp } from '../../../firebase'
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

export default function Bienvenida({idMuseo}) {
  const [open,setOpen] = useState(false)
  const [openlink,setOpenlink] = useState(false)
  const [color,setCorlor] = useState(false)
  const [link,setLink] = useState({})
  const [boton,setBoton] = useState(false)
  const [linkmp,setLinkmp]=useState({})
  
  const objetoIdMuseo = useParams(idMuseo)
  const id = objetoIdMuseo.idMuseo
  // console.log(id)
  const {muntrefLinks} = useSelector(state=>state.muntrefLinks)
  const {museo} = useSelector(state=>state.museo)
  const {linksmp} = useSelector(state=>state.linksmp)
  

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
      id:idLink.value
    }
    

    console.log(linkEditado)
    await updateLink(id,idLink.value,linkEditado)
    dispatch(obtenerMuntref_Links(id))
    setLink(linkEditado)
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
  
  console.log(linksmp)

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
      id:idlink.value}
    console.log(link.id)
    // console.log(linkEditado)
    console.log(id,link.id,idlink.value,linkEditado)
    await updateLinkmp(id,link.id,idlink.value,linkEditado)
    
    dispatch(obtenerLinksmp({id,idLink:link.id}))
    setLinkmp(linkEditado)
    e.target.reset()
    // dispatch(obtenerMuseo(id))
  }

  // console.log(link)
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
            {linksmp.map((linkmp)=><div className='bg-colo7-phone-dark  text-white  flex flex-col  p-2 max-h-40'>
              <p className=''>ulinkmp:  <span className='font-bold'>{linkmp.ulinkmp}</span></p>
              <p className=''>ulinkmp:  <span className='font-bold'>{linkmp.urllinkmp}</span></p>
              <button className='bg-emerald-400 p-1  rounded' onClick={()=>tomarLinkmp(linkmp.id)}>modificar</button>
            </div>)}
          </div>
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
                    <div className='relative w-full'onClick={()=>{tomarLink(link.id)}} >
                      <img className='h-40' src={link.imglink} alt="" />
                      
                      <p className='absolute w-full bottom-0 bg-black text-white bg-opacity-80 text-center py-3'>{link.nombrelink}</p>
                      
                     
                    </div>)}
                  </div>
                    
                  
  
                  <div className="h-14 bg-black rounded-b-[34px] "></div>
              </div>
  
              </div>}
                
                    
                  {link&&<form  onSubmit={editarLink} className='w-2/4 flex flex-col '>
                        <h2 className='text-3xl text-center w-full mx-auto  text-white mt-6 '>Modifica a {link.nombrelink}</h2>
                        
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
                            {boton&&<button className='absolute w-1/3 top-0 right-0 bg-emerald-400 text-white text-xs bg-opacity-80 text-center py-1 ' 
                            onClick={()=>{cargarLinkmp(link.id)}} >Ver link del recorrido</button>}
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