import React, { useEffect, useState } from 'react'
import Page from '../../../components/Page'
import phone from "../../images/phone2.png"
import banner from "../../images/banners.jpg";
import fondo from "../../images/fondo 2.jpg";
import ReactAudioPlayer from 'react-audio-player';

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

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { update360Panorama, updateBienvenidaLayer } from '../../../firebase';
import { obtenerBienvenido } from '../../../features/bienvenido/bienvenidoSlice';

import { obtenerMuseo } from '../../../features/museo/museoSlice';
import { obtenerPanoramas } from '../../../features/360/360Slice';
import NavBar from '../../../components/NavBar';



export default function Bienvenido({idMuseo}) {
    const [open,setOpen] = useState(false)
    const [open2,setOpen2] = useState(true)
    const [openpan,setOpenpan] = useState(false)
  const [layer,setLayer] = useState({})
  const [formu,setFormu] = useState({})
  const [pan,setPan] = useState({
    id:"",
    panorama:""
  })
  
  const objetoIdMuseo = useParams(idMuseo)
  const id = objetoIdMuseo.idMuseo

  const {bienvenido} = useSelector(state=>state.bienvenido)
  const {museo} = useSelector(state=>state.museo)
  const {panoramas} =useSelector(state=>state.panoramas)
 
  

  const editarLayer =async (e)=>{
    e.preventDefault()
    const {audiolayer,es360,imglayer,end,nombrelayer,textolayer,textolayer2,textolayer3,textolayer4,textolayer5,titulolayer,idLayer}=e.target
    const layerEditada = {audiolayer:audiolayer.value,es360:es360.value,imglayer:imglayer.value,nombrelayer:nombrelayer.value,
      
      textolayer:textolayer.value,
      textolayer2:textolayer2.value,
      textolayer3:textolayer3.value,
      textolayer4:textolayer4.value,
      textolayer5:textolayer5.value,
      titulolayer:titulolayer.value

    }
  
    

    
    await updateBienvenidaLayer(id,idLayer.value,layerEditada)
    dispatch(obtenerBienvenido(id))
    setFormu({})
    setLayer({
      audiolayer:audiolayer.value,
      es360:es360.value,
      imglayer:imglayer.value,
      nombrelayer:nombrelayer.value,
      textolayer:textolayer.value,
      textolayer2:textolayer2.value,
      textolayer3:textolayer3.value,
      textolayer4:textolayer4.value,
      textolayer5:textolayer5.value,
      titulolayer:titulolayer.value,
      id:idLayer.value
    })
    // setOpen(false)
    // setOpen2(true)
    e.target.reset()
    
    
    
  }
  const tomarLayer = (id1)=>{
    
    dispatch(obtenerBienvenido(id))
    bienvenido.map((e)=>{
      if(e.id===id1){
        setLayer(e)
        setFormu(e)
        // setOpen2(false)
        setOpen(!open)
        
      }
    })
  }
  const abrirPanoramas = (idMuseo,idLayer)=>{
    setOpenpan(true)
    dispatch(obtenerPanoramas({ idMuseo, idLayer }));
  }
  const tomarPanorama = (id) => {
    console.log(id)
    console.log(panoramas)
    panoramas.map((e) => {
      if (e.id === id) {
        console.log("son iguales");
        console.log(e)
        setPan(e)
      }
    });
  };
  
  
  const editarPanorama = async (e) => {
    e.preventDefault();
    const { panorama, idPanorama,idLayer } = e.target;
    
    const panoramaEditado = { "360panorama": panorama.value };
    
    console.log(id, idLayer.value, idPanorama.value, panoramaEditado);
    console.log(panoramaEditado);
    await update360Panorama(
      id,
      idLayer.value,
      idPanorama.value,
      panoramaEditado
    );
    setPan({
      id:"",
      panorama:""
    })
    abrirPanoramas(id,idLayer.value)
    e.target.reset()
    // dispatch(obtenerPanoramas({ id, idLayer1 }));
    // dispatch(obtenerMuseos())
    // console.log("se ejecuta")
    
    // dispatch(obtenerMuseo(id))
  };
  const cerrarPan =()=>{
    setOpenpan(false)
    setPan({
    id:"",
    panorama:""
  })
  }
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(obtenerBienvenido(id))
    dispatch(obtenerMuseo(id))

},[dispatch])
  return (
    <Page>
          
          
          {openpan&&
          <div className='absolute bg-black bg-opacity-70 h-screen w-full top-0 z-50 flex flex-col items-center justify-center '>
              <div className='flex flex-col justify-between bg-colo5-phone-gray w-4/5 h-5/6 relative rounded-lg '>
                 <div className='flex justify-center items-center mb-8'>
                    {panoramas.map((panorama)=>
                 
                    <div className=' h-4/5  relative flex flex-col' >                     
                      <img className='border-[1px] h-[200px]' src={Object.values(panorama)[0]} alt="" />
                      
                      <h1 className='text-colo6-phone-oringe border-[1px] font-semibold text-center bg-white '>{panorama.id}</h1>
                      <button onClick={()=>{tomarPanorama(panorama.id)}} className='absolute bottom-[-20px] right-0 bg-color1-nav bg-opacity-70 text-white p-1 rounded-md m-1 hover:bg-opacity-100 hover:font-semibold'>Cambiar</button>
                    </div>
                 
                  )}
                  </div>  
                  {pan&&<form  
                  onSubmit={editarPanorama}
                   className=' m-auto flex flex-col items-center bg-colo7-phone-dark w-1/2 h-full justify-center rounded-lg my-4'>
                        <h2 className='text-2xl text-white text-center font-semibold mb-2 w-96 '>Modifica {pan.id}</h2>
                        
                        <div 
                        className='contenedor2 w-60 overflow-auto rounded-lg '
                        >
                            
                                    
                                    
                                    <input type="text" className='w-[1400px]  text-xs p-4 ' name='panorama' defaultValue={Object.values(pan)[0]} />
                                    
                                    <input type="hidden" name='idPanorama' defaultValue={pan.id} />
                                    <input type="hidden" name='idLayer' defaultValue={layer.id} />
                        </div>
                        
                        <button className='text-center w-60 mx-auto bg-emerald-400 p-4  text-shadow-xl rounded-xl my-2 text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300'  >Actualizar {pan.id}</button>
                
                    </form>}
                 <button className='text-white absolute top-0 right-0 bg-red-600 rounded-lg  h-8 w-8 ' onClick={cerrarPan}>X</button>
                 
              </div>
              

          </div>}
          
             <section className=' flex  justify-around'>
            {!open&&<div className="relative flex justify-between w-1/4  ">
              
            <div className="bg-colo5-phone-gray  h-[590px] m-auto relative mt-10  w-[286px] rounded-[34px] z-0 border-[1px] border-black shadow-xl  shadow-black">
                <div className="h-12 bg-black rounded-t-[34px] w-[285px] "></div>
                
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
                      <Link to={""}>Acerca del museo</Link> 
                    </li>
                    <li className="text-white text-sm w-1/2 text-center m-auto">
                    
                    <Link to={"/"+ id +"/Recorrido"}>Recorrido</Link> 
                    </li>
                </ul>
                </nav>

                <div className=" mb-2 px-1 flex  h-[200px] relative bg-opacity-60 z-50">
                  <Link to={"/phone_prueba/"+ id}><button className='text-colo6-phone-oringe absolute top-4 left-4'><FaArrowLeft/></button></Link>
                  <img className="" src={museo.imgmuseo}  alt="" />
                </div>
                {bienvenido.map((layer)=>
                <div onClick={()=>{tomarLayer(layer.id)}} className=" mx-2 bg-emerald-400 mt-2 mb-[10px] h-7 flex items-center justify-center rounded-sm">
                  
                  <h4 className="text-white text-xs ">{layer.nombrelayer}</h4>
                  <button className=' text-white'><IoMdArrowDropdown/></button>
                </div>
                )}
                
                

                <div className="h-14 bg-black rounded-b-[34px] "></div>
            </div>

            </div>}

            {/* {open&&<div className=" flex items-center text-3xl">
            <BsArrowRightSquareFill />
            </div>} */}
            

            {open?<div className="relative flex justify-between w-1/4  ">
            <div className="bg-colo5-phone-gray h-[590px]  mt-10 m-auto left-52 w-[286px] rounded-[34px] z-0 border-[1px] border-black shadow-xl  shadow-black">
                <div className="h-12 bg-black rounded-t-[34px] w-[285]"></div>
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
                      <Link to={""}>Acerca del museo</Link> 
                    </li>
                    <li className="text-white text-sm w-1/2 text-center m-auto">
                    
                    <Link to={"/"+ id +"/Recorrido"}>Recorrido</Link> 
                    </li>
                </ul>
                </nav>

                <div className=" mb-2 px-1 flex  h-20 overflow-hidden relative bg-opacity-60 ">
                <Link to={"/phone_prueba/"+ id}><button className='text-colo6-phone-oringe absolute top-4 left-4'><FaArrowLeft/></button></Link>
                <img
                    className="h-[200px]"
                    src={museo.imgmuseo}
                    
                    alt=""
                />
                </div>

                <div className=" relative mx-2 bg-emerald-400 mb-2 h-[309px] flex flex-col   rounded-md">
                  <div className=" mx-2 bg-emerald-400 mt-2 mb-[10px] h-7 flex items-center justify-center rounded-lg" onClick={()=>{setOpen(false)}}>
                    
                    <h4 className="text-white text-xs text-center  my-2" >
                      
                      {layer.nombrelayer}
                    </h4>
                    <button className=' text-white'><IoMdArrowDropup/></button>
                  </div>
                  
                  <div className='relative'>
                  <img
                    className="h-[80px] w-full"
                    src={layer.es360}
                    
                    alt=""
                  />
                  <button className='absolute bg-black bg-opacity-80 text-sm bottom-0 right-1 w-32 text-center text-white' onClick={()=>{abrirPanoramas(id,layer.id)}} 
                // to={"/"+id+"/Bienvenida/"+layer.id+"/360"}
                >
                  Vista 360°
                </button>
                </div>
               
                
                
                <div className=" flex justify-around  w-full my-2 h-20">
                    {/* <audio className="bg-emerald-400 " controls>
                    <source src={layer.audiolayer} />
                    
                    </audio> */}
                    <ReactAudioPlayer
                      src={layer.audiolayer}
                      autoPlay={false}
                      controls
                      style={{textEmphasisColor:"red"}}
                    />
                    
                </div>
                <div className='h-fit overflow-auto contenedor mb-[10px]'>
                    <p className="text-white text-xs mx-2 text-justify mb-2">
                        {layer.textolayer}
                        {/* <p>{layer.audiolayer}</p> */}
                        
                    </p>
                    <p className="text-white text-xs mx-2 text-justify mb-2">
                        {layer.textolayer2}
                        {/* <p>{layer.audiolayer}</p> */}
                        
                    </p>
                    <p className="text-white text-xs mx-2 text-justify mb-2">
                        {layer.textolayer3}
                        {/* <p>{layer.audiolayer}</p> */}
                        
                    </p>
                    <p className="text-white text-xs mx-2 text-justify mb-2">
                        {layer.textolayer4}
                        {/* <p>{layer.audiolayer}</p> */}
                        
                    </p>
                    <p className="text-white text-xs mx-2 text-justify mb-2">
                        {layer.textolayer5}
                        {/* <p>{layer.audiolayer}</p> */}
                        
                    </p>
                </div>
                
                </div>
                

                <div className="h-12 mt-10 bg-black rounded-b-[34px] w-[285px] "></div>
            </div>
            
            </div>:<></>}
            
            {layer?<form  onSubmit={editarLayer} className='w-2/4 flex flex-col '>
                        <h2 className='text-3xl text-center w-full m-auto  text-white mt-6 '>Modifica a {layer.nombrelayer}</h2>
                        
                        <div className='h-[500px] bg-colo7-phone-dark w-11/12 flex justify-around mx-auto rounded-t-xl shadow-xl shadow-black '>
                            <div className='h-full  flex flex-col gap-6 mt-5 w-1/2 px-10'>
                                    {/* <label htmlFor="idLayer"></label> */}
                                    <input hidden type="text" name='idLayer' defaultValue={layer.id} />
                                    <div className='flex flex-col gap-1'>
                                      <label className='text-white py-1 font-semibold' htmlFor="es360">Imagen 360</label>
                                      <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='es360' defaultValue={layer.es360}/>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                      <label className='text-white py-1 font-semibold' htmlFor="Audiolayer">Audio</label>
                                      <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='audiolayer' defaultValue={layer.audiolayer} />
                                    </div>
                                    
                                    <div className='flex flex-col gap-1 '>
                                      <label className='text-white py-1 font-semibold'  htmlFor="imglayer">Imagen de {layer.nombrelayer}</label>
                                      <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='imglayer' defaultValue={layer.imglayer}/>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                      <label className='text-white py-1 font-semibold' htmlFor="nombrelayer">Nombre de la sección</label>
                                      <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='nombrelayer' defaultValue={layer.nombrelayer}/>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                      <label className='text-white py-1 font-semibold' htmlFor="titulolayer">Titulo</label>
                                      <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='titulolayer' defaultValue={layer.titulolayer}/>
                                    </div>
                                    {/* <input type="text" name='end' defaultValue={layer.ind}/> */}
                                    
                                    
                                    
                            </div>
                            <div className='h-full  flex flex-col gap-6 mt-5 w-1/2 px-10 '>
                              <div className='flex flex-col gap-1'>
                                <label className='text-white py-1 font-semibold' htmlFor="textolayer">Parrafo 1</label>
                                <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='textolayer' defaultValue={layer.textolayer}/>
                              </div >
                              <div className='flex flex-col gap-1'>
                                <label className='text-white py-1 font-semibold' htmlFor="textolayer2">Parrafo 2</label>
                                <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='textolayer2' defaultValue={layer.textolayer2}/>
                              </div>
                              <div className='flex flex-col gap-1'>
                                <label className='text-white py-1 font-semibold' htmlFor="textolayer3">Parrafo 3</label>
                                <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='textolayer3' defaultValue={layer.textolayer3}/>
                              </div>
                              <div className='flex flex-col gap-1'>
                                <label className='text-white py-1 font-semibold' htmlFor="textolayer4">Parrafo 4</label>
                                <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='textolayer4' defaultValue={layer.textolayer4}/>
                              </div>
                              <div className='flex flex-col gap-1'>
                                <label className='text-white py-1 font-semibold' htmlFor="textolayer5">Parrafo 5</label>
                                <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='textolayer5' defaultValue={layer.textolayer5}/>
                              </div>
                                    
                                    
                                    
                                    
                                    
                                    
                            </div>
                        </div>
                        
                        <button className='text-center mx-auto bg-emerald-400 p-4 w-11/12 text-shadow-xl rounded-b-xl text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300'  >Actualizar Layer</button>
                
                    </form>:<></>}
                
            
        </section>
        
    </Page>
  )
}
