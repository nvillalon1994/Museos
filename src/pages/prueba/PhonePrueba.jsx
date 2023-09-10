import React, { useCallback, useEffect, useRef, useState } from "react";
import phone from "../images/phone2.png"
import banner from "../images/banners.jpg";
import fondo from "../images/fondo 2.jpg";
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
import { RiHome2Line } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import Page from "../../components/Page";
import { useDispatch, useSelector } from "react-redux";
import { obtenerMuseos } from "../../features/museos/museosSlice";
import { obtenerMuseo } from "../../features/museo/museoSlice";
import { Link, useParams } from "react-router-dom";
import { updateHighlight, updateMuseum } from "../../firebase";
import { obtenerHighlights } from "../../features/highligthts/highlightsSlice";
import useEmblaCarousel from 'embla-carousel-react'
import EmblaCarousel from "../../components/EmblaCarousel";
import Autoplay from 'embla-carousel-autoplay';
import { NextButton, PrevButton } from "../../components/EmblaCarouselButons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import LoadingAnimation from "../../components/Loading";
import PhoneCase from "../../components/phonecase/PhoneCase";



export default function PhonePrueba({idMuseo}) {
    const objetoIdMuseo = useParams(idMuseo)
    const [open,setOpen]= useState(false)
    const [open2,setOpen2]= useState(false)
    const [name,setName]= useState()
    
    const id = objetoIdMuseo.idMuseo
    const [banner,setBanner] = useState({})
    // carousel 
    const autoplay = useRef(
      Autoplay(
        { delay: 3000, stopOnInteraction: false },
        (emblaRoot) => emblaRoot.parentElement
      )
    );
    const options = { loop: false } 
    
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay.current]);
    
    
    const dispatch = useDispatch()
    const {museos} = useSelector(state=>state.museos)
    const {museosCol} = useSelector(state=>state.museos)
    const {highlights} = useSelector(state=>state.highlights)
    
    const {usuario} = useSelector(state=>state.usuario)
    const {museo,loading} = useSelector(state=>state.museo)
    console.log(loading)
    const crearMuseoEditado =async (e)=>{
        e.preventDefault()
        const {acerca,descripcion,direccion,horario,imgmain,imgmuseo,logomuseo,nombre,organizacion,reco,tressesenta}=e.target
        const museoEditado={descripcion:descripcion.value,direccion:direccion.value,horario:horario.value,imgmain:imgmain.value,imgmuseo:imgmuseo.value,logomuseo:logomuseo.value,nombre:nombre.value,organizacion:organizacion.value}
        console.log(museoEditado)
        await updateMuseum(museo.id,museoEditado,museosCol)
        // dispatch(obtenerMuseos())
        console.log("se ejecuta")
        
        dispatch(obtenerMuseo(id))
    }

    const subir =(e)=>{
        e.preventDefault()
        
        const file = e.target.files[0]
        console.log(file)
        uploadFiles(file)
        
        
    }
      
    const uploadFiles =(file)=>{
        if(!file)return
            const storageRef =ref(storage,`/NewStorage/Museos/${museo.nombre}/${file.name}`)
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
                  const objeto={...museo,...newObject}
                  console.log(objeto)

                  updateMuseum(museo.id,objeto,museosCol)
                  dispatch(obtenerMuseo(id))        
                  
                  
                })
            }
            )
            
            
        
    }
    const tomarHigh=(id)=>{
      highlights.map((e)=>{
        if(e.id===id){
          setBanner(e)
        }
      })

    }
    // const editarBanner=async(e)=>{
    //   e.preventDefault()
    // const {idBanner, htext1,htext2,urlhighlight}=e.target
    // const bannerEditado = {
    //   htext1:htext1.value,
    //   htext2:htext2.value,
    //   urlhighlight:urlhighlight.value,
      
      
     
    // }
    
    // await updateHighlight(idBanner.value,bannerEditado)
    // dispatch(obtenerHighlights())
    // const newBanner =bannerEditado
    // newBanner.id=idBanner.value
    
    // setBanner(
    //   newBanner
    // )
    
    // // setOpen(false)
    // // setOpen2(true)
    // e.target.reset()
    
    
    
  
    // }
    console.log(museo)
    useEffect(()=>{
        dispatch(obtenerMuseos())
        
        dispatch(obtenerMuseo(id))
        dispatch(obtenerHighlights())
        
        setTimeout(function(){setOpen2(true)}, 2000)
        

    },[dispatch])

  return (
    <Page>
      
      {loading&&
        <LoadingAnimation/>
      }
      
      {!loading&&<section className=" flex justify-around  items-center h-[92vh]">
        
        {/* <div className="relative flex justify-between  w-1/4 scale-50 lg:scale-75 xl:scale-90 2xl:scale-100 items-center ">
          <div className="bg-colo5-phone-gray h-[590px] m-auto  mt-10 w-[286px] rounded-[34px] z-0   border-black border-[1px] shadow-xl shadow-black ">
            <div className="h-12 bg-black rounded-t-[34px] w-[285px]"></div>
            <nav className="flex justify-between p-2 items-center">
              <h1 className="text-white text-xs mt-[-2px]">MUSEUM VIEW</h1>
              <ul className="flex gap-6">
                
                <li className="text-colo6-phone-oringe text-lg ml-[-5px]">
                  <BsThreeDotsVertical />
                </li>
              </ul>
            </nav>
            
            
            <div className="max-h-10">
              <Link to={"/home"}> 
                <FaArrowLeft className="text-orange-400 m-4" />
              </Link>
              
            </div>
            <div className="">
              
              <img className=" border-2  w-[275px] h-[152px] mx-auto " src={museo.imgmuseo}  alt="" />
            </div>
            <div className="h-[200px]">
              <p className="text-sm text-white text-bold text-center">{museo.nombre}</p>
              <p className="text-sm text-white">{museo.descripcion}</p>
              <p className="text-sm text-white">Dirección: {museo.direccion}</p>
              <p className="text-sm text-white">Horario: {museo.horario}</p>
              
            </div>
            <div className="mt-1  flex items-center   pb-8 relative bg-opacity-60 z-50">
              <div className=" flex justify-between  gap-2  w-full px-3 bottom-2  z-20 ">
              <Link className={"bg-emerald-400 bg-opacity-85 text-white text-[9px] flex items-center  rounded-md h-9 w-[100%]"}   to={"/"+ id +"/Bienvenido"}> 
                <button className=" text-center w-full">Acerca del Museo</button>
              </Link>
              <Link className="bg-colo6-phone-oringe bg-opacity-80 text-white text-[9px] flex items-center  rounded-md h-9 w-[100%]"   to={"/"+ id +"/Recorrido"}> 
                <button className=" text-center w-full ">Recorrido</button>
              </Link>
              {museo.tressesenta&&<Link className="bg-red-600 bg-opacity-85 text-white text-[9px] flex items-center  rounded-md h-9 w-[100%]"   to={"/"+ id +"/MuntrefLink"}> 
                <button className=" text-center w-full ">Recorrido Virtual</button>
              </Link>}

                
              </div>

              
              
            </div>
            
            
            <div className="h-12  bg-black rounded-b-[34px] w-[285px]"></div>
          
          
          
          </div>
        </div> */}
        <PhoneCase>
            <nav className="flex justify-between p-1 items-center border-t-2 border-t-colo5-phone-gray">
              <h1 className="text-white text-xs mt-[-2px]">MUSEUM VIEW</h1>
              <ul className="flex gap-6">
                
                <li className="text-colo6-phone-oringe text-lg ml-[-5px]">
                  <BsThreeDotsVertical />
                </li>
              </ul>
            </nav>
            
            
            <div className="max-h-10">
              <Link to={"/home"}> 
                <FaArrowLeft className="text-orange-400 m-4" />
              </Link>
              
            </div>
            <div className="">
              
              <img className="  w-[275px] h-[152px] mx-auto " src={museo.imgmuseo}  alt="" />
            </div>
            <div className="h-[150px]  overflow-y-auto" >
              <p className="text-sm text-white font-medium tracking-normal">{museo.nombre}</p>
              {/* <p className="text-sm text-white">{museo.descripcion}</p> */}
              <p className="text-[12px] text-white font-mono tracking-wide">Dirección: {museo.direccion}</p>
              <p className="text-[12px] text-white font-mono tracking-wide">Horario: {museo.horario}</p>
              
            </div>
            <div className="mt-1  flex items-center   py-8 relative bg-opacity-60 z-50">
              <div className=" flex justify-between  gap-2  w-full px-2 bottom-2  z-20 ">
              <Link className={"border-emerald-400 border text-emerald-400 bg-opacity-85  text-[9px] flex items-center  rounded-md h-9 w-[100%]"}   to={"/"+ id +"/Bienvenido"}> 
                <button className=" text-center w-full">Acerca del Museo</button>
              </Link>
              <Link className="border-colo6-phone-oringe border text-colo6-phone-oringe   bg-opacity-80  text-[9px] flex items-center  rounded-md h-9 w-[100%]"   to={"/"+ id +"/Recorrido"}> 
                <button className=" text-center w-full ">Recorrido</button>
              </Link>
              {museo.tressesenta&&<Link className="border-white border text-white  bg-opacity-85  text-[9px] flex items-center  rounded-md h-9 w-[100%]"   to={"/"+ id +"/MuntrefLink"}> 
                <button className=" text-center w-full ">Recorrido Virtual</button>
              </Link>}

                
              </div>

              
              
            </div>
            
        </PhoneCase>
          <form 
           onSubmit={crearMuseoEditado}
            className='lg:w-3/4 w-4/5 md:w-/6 flex flex-col scale-75 lg:scale-75 xl:scale-90 2xl:scale-100 '>
                            <h2 className="text-3xl text-center text-white my-8">Modifica a {museo.nombre}</h2>
                            
                            <div className='h-[450px] bg-colo7-phone-dark w-4/5 flex justify-around mx-auto rounded-t-xl shadow-xl shadow-black  gap-10'>
                                <div className='h-full  flex flex-col gap-6 mt-5 w-1/2 px-4'>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="text-white" htmlFor="nombre">Nombre del Museo</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md w-full " type="text" name='nombre' defaultValue={museo.nombre}/>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="text-white" htmlFor="direccion">Direccion</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md w-full" type="text" name='direccion' defaultValue={museo.direccion}/>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="text-white" htmlFor="horario">Horario</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md w-full" type="text" name='horario' defaultValue={museo.horario}/>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="text-white" htmlFor="imgmain">ImgMain</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md w-full" type="text" name='imgmain' defaultValue={museo.imgmain}/>
                                        <div className="relative h-5">
                                          <div className="absolute z-[0] top-[1px] left-[0px] bg-cyan-400 bg-opacity-70 px-2 py-[2px] text-white">Seleccionar archivo</div>
                                          <input className=" absolute z-[1] top-[1px] left-[0px] w-40 opacity-0" type="file" onChange={subir} onClick={()=>{setName("imgmain")}}  />
                                        </div>
                                    </div>
                                    

                                        
                                </div>
                                <div className='h-full  flex flex-col gap-6 mt-5 w-1/2 px-4'>
                                <div className="flex flex-col gap-1 w-full ">
                                        <label className="text-white" htmlFor="imgmuseo">Img Museo</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md w-full" type="text" name='imgmuseo' defaultValue={museo.imgmuseo}/>
                                        <div className="relative h-5">
                                          <div className="absolute z-[0] top-[1px] left-[0px] bg-cyan-400 bg-opacity-70 px-2 py-[2px] text-white">Seleccionar archivo</div>
                                          <input className=" absolute z-[1] top-[1px] left-[0px] w-40 opacity-0" type="file" onChange={subir} onClick={()=>{setName("imgmuseo")}}  />
                                        </div>
                                        
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-white" htmlFor="descripcion">Descripcion</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md w-full" type="text" name='descripcion' defaultValue={museo.descripcion}/>
                                    </div>
                                    {/* <div className="flex flex-col gap-1">
                                        <label className="text-white" htmlFor="logomuseo">Logo Museo</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='logomuseo' defaultValue={museo.logomuseo}/>
                                    </div> */}
                                    {/* <div className="flex flex-col gap-1">
                                        <label className="text-white" htmlFor="acerca">Acerca</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='acerca' defaultValue={museo.Acerca} />
                                    </div> */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-white" htmlFor="organizacion">Organización</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md w-full" type="text" name='organizacion' defaultValue={museo.organizacion}/>    
                                    </div>
                                
                                </div>
                            </div>
                            
                            <button className='text-center mx-auto bg-emerald-400 p-4 w-4/5 text-shadow-xl rounded-b-xl text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300'  >Actualizar Museo</button>
                    
                        </form>
        
        
        
        
      </section>}
    </Page>
  );
}