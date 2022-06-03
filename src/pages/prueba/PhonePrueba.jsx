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
export default function PhonePrueba({idMuseo}) {
    const objetoIdMuseo = useParams(idMuseo)
    const [open,setOpen]= useState(false)
    const [open2,setOpen2]= useState(false)
    
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
    const {highlights} = useSelector(state=>state.highlights)
    
    const {usuario} = useSelector(state=>state.usuario)
    const {museo,loading} = useSelector(state=>state.museo)
    console.log(loading)
    const crearMuseoEditado =async (e)=>{
        e.preventDefault()
        const {acerca,descripcion,direccion,horario,imgmain,imgmuseo,logomuseo,nombre,organizacion,reco,tressesenta}=e.target
        const museoEditado={descripcion:descripcion.value,direccion:direccion.value,horario:horario.value,imgmain:imgmain.value,imgmuseo:imgmuseo.value,logomuseo:logomuseo.value,nombre:nombre.value,organizacion:organizacion.value}
        console.log(museoEditado)
        await updateMuseum(museo.id,museoEditado)
        dispatch(obtenerMuseos())
        console.log("se ejecuta")
        
        dispatch(obtenerMuseo(id))
      }
    const tomarHigh=(id)=>{
      highlights.map((e)=>{
        if(e.id===id){
          setBanner(e)
        }
      })

    }
    const editarBanner=async(e)=>{
      e.preventDefault()
    const {idBanner, htext1,htext2,urlhighlight}=e.target
    const bannerEditado = {
      htext1:htext1.value,
      htext2:htext2.value,
      urlhighlight:urlhighlight.value,
      
      
     
    }
    
    await updateHighlight(idBanner.value,bannerEditado)
    dispatch(obtenerHighlights())
    const newBanner =bannerEditado
    newBanner.id=idBanner.value
    
    setBanner(
      newBanner
    )
    
    // setOpen(false)
    // setOpen2(true)
    e.target.reset()
    
    
    
  
    }
    console.log(museo)
    useEffect(()=>{
        dispatch(obtenerMuseos())
        
        dispatch(obtenerMuseo(id))
        dispatch(obtenerHighlights())
        
        setTimeout(function(){setOpen2(true)}, 2000)
        

    },[dispatch])

  return (
    <Page>
      {open&&
      <div className="absolute bg-black bg-opacity-70 h-screen w-full top-0 z-10 flex flex-col items-center justify-center " >
        <div className='flex justify-between bg-colo5-phone-gray w-4/5 h-[660px] overflow-auto contenedor relative rounded-lg '>
          <div className="p-2">
            {highlights.map((high)=><div className="flex flex-col my-2"  onClick={()=>{tomarHigh(high.id)}}>
              <img className="w-[300px]" src={high.urlhighlight} alt="" />
            </div>)}
          </div>
          
          {banner&&<form onSubmit={editarBanner} action="" className='w-1/3 flex flex-col fixed right-60 top-0'>
          <h2 className='text-3xl text-center w-full m-auto  text-white my-6'>Modifica a {banner.id}</h2>
                        
                         <div className='h-[480px] bg-colo7-phone-dark w-11/12 flex justify-around mx-auto p-5 rounded-t-xl shadow-xl shadow-black '>
                            <div className='h-full  flex flex-col gap-12 mt-5 '>
                                
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
                                
                            </div>      
                        </div>
                        
                        <button className='text-center mx-auto bg-emerald-400 p-4 w-11/12 text-shadow-xl rounded-b-xl text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300'>Actualizar Banner</button> 
          </form>}
        <button className='text-white absolute top-0 right-0 bg-red-600 rounded-lg  h-8 w-8 ' onClick={()=>{setOpen(false)}}>X</button>
        </div>
      </div>}
      {loading&&
      <div className="flex justify-center my-[15%] " >
       <div className="loading">
        <div className="dot">C</div>
        <div className="dot">A</div>
        <div className="dot">R</div>
        <div className="dot">G</div>
        <div className="dot">A</div>
        <div className="dot">N</div>
        <div className="dot">D</div>
        <div className="dot">O</div>
        
        <span className=" text text-white">Please wait...</span>
      </div>
     </div>
      }
      {!loading&&<section className=" flex justify-around ">
        
        <div className="relative flex justify-between  w-1/4 ">
          <div className="bg-colo5-phone-gray h-[590px] m-auto  mt-10 w-[286px] rounded-[34px] z-0   border-black border-[1px] shadow-xl shadow-black ">
            <div className="h-12 bg-black rounded-t-[34px] w-[285px]"></div>
            <nav className="flex justify-between p-2 items-center">
              <h1 className="text-white text-xs mt-[-2px]">MUSEUM VIEW</h1>
              <ul className="flex gap-6">
                <li className="text-colo6-phone-oringe text-lg">
                  <BiWorld />
                </li>
                <li className="text-colo6-phone-oringe text-lg">
                  <HiOutlineMail />
                </li>
                <li className="text-colo6-phone-oringe text-lg ml-[-5px]">
                  <BsThreeDotsVertical />
                </li>
              </ul>
            </nav>
            <nav className="w-full flex ">
              <ul className="flex justify-between  w-full ">
                <li className="text-colo6-phone-oringe text-2xl w-1/4  border-2 border-colo5-phone-gray border-b-colo6-phone-oringe ">
                  <RiHome2Line className="m-auto mb-1" />
                </li>
                <li className="text-colo6-phone-oringe text-2xl w-1/4 ">
                  <BsFileText className="m-auto" />
                </li>
                <li className="text-colo6-phone-oringe text-2xl w-1/4 ">
                  <AiOutlineBank className="m-auto" />
                </li>
                <li className="text-colo6-phone-oringe text-2xl  w-1/4 ">
                  <AiOutlineUpSquare className="m-auto" />
                </li>
              </ul>
            </nav>
            <div className="mt-1 mb-2 px-2 relative  ">
              <button className="absolute bottom-0 right-2 text-white p-2 text-sm bg-opacity-80 bg-emerald-400 rounded z-30" onClick={()=>{setOpen(!open)}}>Mofidicar Highlights</button>
              {/* <EmblaCarousel slides={highlights}/> */}
              <Carousel showArrows={true}  showStatus={false} showIndicators={false}  showThumbs={false} swipeable={true} infiniteLoop={true} autoPlay={true} transitionTime={1000} interval={2000}>
                {highlights.map((high)=><div>
                  <img src={high.urlhighlight} alt="" />
                </div>)}
              </Carousel>
                
              
            </div>
            <div className="mt-1  flex items-center  h-[160px] relative bg-opacity-60 z-50">
              <div className="absolute flex justify-between  gap-2  w-full px-3 bottom-2  z-20 ">
              <Link className="bg-emerald-400 bg-opacity-85 text-white text-[9px] flex items-center  rounded-md h-9 w-1/3"   to={"/"+ id +"/Bienvenido"}> 
                <button className=" text-center w-full">Acerca del Museo</button>
              </Link>
              <Link className="bg-colo6-phone-oringe bg-opacity-80 text-white text-[9px] flex items-center  rounded-md h-9 w-1/3"   to={"/"+ id +"/Recorrido"}> 
                <button className=" text-center w-full ">Recorrido</button>
              </Link>
              <Link className="bg-red-600 bg-opacity-85 text-white text-[9px] flex items-center  rounded-md h-9 w-1/3"   to={"/"+ id +"/MuntrefLink"}> 
                <button className=" text-center w-full ">Recorrido Virtual</button>
              </Link>

                {/* <button className=" bg-colo6-phone-oringe bg-opacity-85 text-white text-[9px] rounded-md h-10 w-1/3">
                  
                  Recorrido
                </button> */}
                {/* <button className=" bg-red-600 bg-opacity-85 text-white text-[9px] rounded-md h-10 w-1/3">
                  Recorrido Vitual
                </button> */}
              </div>

              {/* <img className=" border-2 border-emerald-400 w-[275px] h-[152px] m-auto " src={fondo}  alt="" /> */}
              <img className=" border-2 border-emerald-400 w-[275px] h-[152px] m-auto " src={museo.imgmain}  alt="" />
              
            </div>
            <div className="mx-2 bg-black mt-2 h-12 flex items-center gap-10 rounded-lg">
              <AiOutlineUpSquare className="text-colo6-phone-oringe text-3xl ml-10 " />
              <h4 className="text-white text-sm">Modo Museo</h4>
            </div>
            <div className="mx-2 bg-emerald-400 mt-2 mb-2 h-12 flex items-center gap-10 rounded-lg">
              <h4 className="text-white text-xs m-auto">
                Reservá tu visita al museo
              </h4>
            </div>
            
            <div className="h-12  bg-black rounded-b-[34px] w-[285px]"></div>
          </div>
          </div>
          <form 
           onSubmit={crearMuseoEditado}
            className='w-1/2 flex flex-col '>
                            <h2 className="text-3xl text-center text-white my-8">Modifica a {museo.nombre}</h2>
                            
                            <div className='h-[450px] bg-colo7-phone-dark w-4/5 flex justify-around mx-auto rounded-t-xl shadow-xl shadow-black '>
                                <div className='h-full  flex flex-col gap-6 mt-5'>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-white" htmlFor="nombre">Nombre del Museo</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='nombre' defaultValue={museo.nombre}/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-white" htmlFor="direccion">Direccion</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='direccion' defaultValue={museo.direccion}/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-white" htmlFor="horario">Horario</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='horario' defaultValue={museo.horario}/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-white" htmlFor="imgmain">ImgMain</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='imgmain' defaultValue={museo.imgmain}/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-white" htmlFor="imgmuseo">Img Museo</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='imgmuseo' defaultValue={museo.imgmuseo}/>
                                    </div>

                                        
                                </div>
                                <div className='h-full  flex flex-col gap-6 mt-5'>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-white" htmlFor="descripcion">Descripcion</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='descripcion' defaultValue={museo.descripcion}/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-white" htmlFor="logomuseo">Logo Museo</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='logomuseo' defaultValue={museo.logomuseo}/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-white" htmlFor="acerca">Acerca</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='acerca' defaultValue={museo.Acerca} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-white" htmlFor="organizacion">Organización</label>
                                        <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='organizacion' defaultValue={museo.organizacion}/>    
                                    </div>
                                
                                </div>
                            </div>
                            {/* <button className='btn-Delete' onClick={()=>{setOpen(false)}}>X</button> */}
                            <button className='text-center mx-auto bg-emerald-400 p-4 w-4/5 text-shadow-xl rounded-b-xl text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300'  >Actualizar Museo</button>
                    
                        </form>
        
        
        {/* <div className=" flex items-center text-3xl">
          <BsArrowRightSquareFill />
        </div> */}

        {/* Segundo  */}
        {/* <div className="relative ">
          <div className="bg-colo5-phone-gray h-[590px]  mt-14 left-52 w-[286px] rounded-[34px] z-0 border-2 border-black shadow-xl  shadow-black">
            <div className="h-12 bg-black rounded-t-[34px]"></div>
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
                <li className="text-colo6-phone-oringe text-sm text-center w-1/2  border-2 border-colo5-phone-gray border-b-colo6-phone-oringe ">
                  Acerca del museo
                </li>
                <li className="text-colo6-phone-oringe text-sm w-1/2 text-center m-auto">
                  Recorrido
                </li>
              </ul>
            </nav>

            <div className="my-2 mb-2 px-1 flex  h-[200px] relative bg-opacity-60 z-50">
              <img className="" src={fondo}  alt="" />
            </div>

            <div className="mx-2 bg-emerald-400 mt-2 mb-2 h-7 flex items-center gap-10 rounded-lg">
              <h4 className="text-white text-xs m-auto">Bienvenido </h4>
            </div>
            <div className="mx-2 bg-emerald-400 mt-2 mb-2 h-7 flex items-center gap-10 rounded-lg">
              <h4 className="text-white text-xs m-auto">Ingreso</h4>
            </div>
            <div className="mx-2 bg-emerald-400 mt-2 mb-2 h-7 flex items-center gap-10 rounded-lg">
              <h4 className="text-white text-xs m-auto">Jardin</h4>
            </div>
            <div className="mx-2 bg-emerald-400 mt-2 mb-2 h-7 flex items-center gap-10 rounded-lg">
              <h4 className="text-white text-xs m-auto">
                Breve historia del edificio
              </h4>
            </div>
            <div className="mx-2 bg-emerald-400 mt-2 mb-2 h-7 flex items-center gap-10 rounded-lg">
              <h4 className="text-white text-xs m-auto">
                Arquitectura del edificio y jardines
              </h4>
            </div>
            <div className="mx-2 bg-emerald-400 mt-2 mb-2 h-7 flex items-center gap-10 rounded-lg">
              <h4 className="text-white text-xs m-auto">Hall de entrada</h4>
            </div>

            <div className="h-14 bg-black rounded-b-[34px] w-"></div>
          </div>

        </div>
        <div className=" flex items-center text-3xl">
          <BsArrowRightSquareFill />
        </div>
        
        <div className="relative ">
          <div className="bg-colo5-phone-gray h-[590px]  mt-14 left-52 w-[286px] rounded-[34px] z-0 border-2 border-black shadow-xl  shadow-black">
            <div className="h-12 bg-black rounded-t-[34px]"></div>
            <nav className="flex justify-between p-2 items-center">
              <h1 className="text-white text-xs mt-[-2px]">MUSEUM VIEW</h1>
              <ul className="flex gap-6">
                <li className="text-colo6-phone-oringe text-lg ml-[-5px]">
                  <BsThreeDotsVertical />
                </li>
              </ul>
            </nav>
            <nav>
              <ul className="flex justify-between items-center">
                <li className="text-colo6-phone-oringe text-sm text-center w-1/2  border-2 border-colo5-phone-gray border-b-colo6-phone-oringe ">
                  Acerca del museo
                </li>
                <li className="text-colo6-phone-oringe text-sm w-1/2 text-center m-auto">
                  Recorrido
                </li>
              </ul>
            </nav>

            <div className=" mb-2 px-1 flex  h-20 overflow-hidden relative bg-opacity-60 ">
              <img
                className="h-[200px]"
                src={fondo}
                width={660}
                height={410}
                alt=""
              />
            </div>

            <div className="mx-2 bg-emerald-400 mb-2 h-[300px] flex flex-col   rounded-lg">
              <h4 className="text-white text-xs text-center w-full my-2">
                Bienvenido{" "}
              </h4>
              <img
                className="bg-white h-20"
                src={fondo}
                width={660}
                height={210}
                alt=""
              />
              <div className=" flex justify-around  w-full my-2">
                <audio className="bg-emerald-400 " controls>
                  <source src="https://firebasestorage.googleapis.com/v0/b/museum-view-test.appspot.com/o/Museos%2FMUNTREF_Inmigraci%C3%B3n%2FInglesVersion%2F1%20welcome.mp3?alt=media&token=f5df399b-e077-4979-bc71-82341599d34f" />
                </audio>
              </div>
              <p className="text-white text-xs mx-2 text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
                totam odio consectetur magni eos neque dolorem delectus porro
                nostrum accusantium quaerat, obcaecati, tempore qui culpa
                necessitatibus quis harum alias quisquam!
              </p>
            </div>
            <div className="mx-2 bg-emerald-400 mt-2 mb-2 h-7 flex items-center gap-10 rounded-lg">
              <h4 className="text-white text-xs m-auto">Ingreso</h4>
            </div>

            <div className="h-14 bg-black rounded-b-[34px] "></div>
          </div>
          
        </div>
         */}
        
        
      </section>}
    </Page>
  );
}
