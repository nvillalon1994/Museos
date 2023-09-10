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
    AiOutlineUpSquare,AiOutlineDelete
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
import { createLayer, createPanorama, deleteLayer, deletePan, update360Panorama, updateBienvenidaLayer } from '../../../firebase';
import { obtenerBienvenido } from '../../../features/bienvenido/bienvenidoSlice';

import { obtenerMuseo } from '../../../features/museo/museoSlice';
import { obtenerPanoramas } from '../../../features/360/360Slice';
import NavBar from '../../../components/NavBar';
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import PhoneCase from '../../../components/phonecase/PhoneCase';

export default function Bienvenido({idMuseo}) {
  const [open,setOpen] = useState(false)
  const [open2,setOpen2] = useState(true)
  const [openpan,setOpenpan] = useState(false)

  const [deleteLayerModal,setDeleteLayerModal] = useState(false)
  const [modalLayer,setModalLayer]= useState({})

  const [deletePanoramaModal,setDeletePanoramaModal] = useState(false)
  const [modalPanorama,setModalPanorama]= useState()
  

  const [urlFile,setUrlFile] = useState()
  const [progress,setProgress]=useState()

  
  const [layer,setLayer] = useState({})
  const [name,setName]=useState()
  
  const [pan,setPan] = useState({
    id:"",
    panorama:""
  })
  const [panoramas2,setPanoramas2] = useState([])

  const {museosCol} = useSelector(state=>state.museos)
  console.log(museosCol)

  
  const objetoIdMuseo = useParams(idMuseo)
  const id = objetoIdMuseo.idMuseo

  const {bienvenido} = useSelector(state=>state.bienvenido)
  const {museo} = useSelector(state=>state.museo)
  const {panoramas} =useSelector(state=>state.panoramas)
 
  const borrarLayer=(layer)=>{
    setDeleteLayerModal(true)
    console.log(layer)
    setModalLayer(layer)
}

  const editarLayer =async (e)=>{
    e.preventDefault()
    const {audiolayer,es360,imglayer,end,nombrelayer,textolayer,textolayer2,textolayer3,textolayer4,textolayer5,titulolayer,idLayer}=e.target
    const layerEditada = {
      audiolayer:audiolayer.value,
      es360:es360.value,
      imglayer:imglayer.value,
      nombrelayer:nombrelayer.value,
      textolayer:textolayer.value,
      textolayer2:textolayer2.value,
      textolayer3:textolayer3.value,
      textolayer4:textolayer4.value,
      textolayer5:textolayer5.value,
      titulolayer:titulolayer.value

    }

    await updateBienvenidaLayer(id,idLayer.value,layerEditada,museosCol)
    dispatch(obtenerBienvenido(id))
    const newLayer =layerEditada
    newLayer.id=idLayer.value
    setLayer(newLayer)
    // setOpen(false)
    // setOpen2(true)
    e.target.reset()
    
    
    
  }
  const tomarLayer = (id1)=>{
    
    dispatch(obtenerBienvenido(id))
    bienvenido.map((e)=>{
      if(e.id===id1){
        setLayer(e)
        
        // setOpen2(false)
        setOpen(true)
        
      }
    })
  }
  // const arrayPans =[]
  // panoramas.map((p)=>{
  //   const index =parseInt(p.id.substring(11))
  //   arrayPans.push(index)
    

  // })
  // console.log(arrayPans)
  // console.log(Math.max(...arrayPans))



  const crearLayer =()=>{
    
    if(bienvenido.length===0){
      const idLayer=`1a_layer1`
      createLayer(id,idLayer,museosCol)
      dispatch(obtenerBienvenido(id))
      // setOpenpan(true)
    }else{
      const arrayLayer =[]
      bienvenido.map((layer1)=>{
        const index =parseInt(layer1.id.substring(8))
        arrayLayer.push(index)
        
        

      })
      const index =Math.max(...arrayLayer)
      console.log(arrayLayer)
      const idLayer= `1a_layer${index+1}`
      createLayer(id,idLayer,museosCol)
      dispatch(obtenerBienvenido(id))
      // const idPan2 =`1a_panorama${index+1}`
      // createPanorama(id,layer.id,idPan2)
      
      // const idLayer2=layer.id
      // abrirPanoramas(id,idLayer2)
      // setOpenpan(true)

  }

  }
  const eliminarLayer=(idLayer)=>{
    console.log(idLayer)
    deleteLayer(id,idLayer,museosCol)
    setDeleteLayerModal(false)
    dispatch(obtenerBienvenido(id))
  }
  const crearPanorama=()=>{
    if(panoramas.length===0){
      const idPan=`1a_panorama1`
      createPanorama(id,layer.id,idPan,museosCol)
      
      const idLayer=layer.id
      abrirPanoramas(id,idLayer)
      setOpenpan(true)
    }else{
      const arrayPans =[]
      panoramas.map((p)=>{
        const index =parseInt(p.id.substring(11))
        arrayPans.push(index)
        

      })
      const index =Math.max(...arrayPans)
      console.log(index)
      const idPan2 =`1a_panorama${index+1}`
      createPanorama(id,layer.id,idPan2,museosCol)
      
      const idLayer2=layer.id
      abrirPanoramas(id,idLayer2)
      setOpenpan(true)

  }
    
  }
  const eliminarPanorama=(idPan)=>{
    deletePan(id,layer.id,modalPanorama.id,museosCol)
    const idLayer=layer.id
    abrirPanoramas(id,idLayer)
    setOpenpan(true)
    setDeletePanoramaModal(false)
    
  }
  const borrarPanorama=(panorama)=>{
    
    setDeletePanoramaModal(true)
    setModalPanorama(panorama)
}

  const subir =(e)=>{
    e.preventDefault()
    
    const file = e.target.files[0]
    console.log(file)
    uploadFiles(file)
    
    
  }
  
  const uploadFiles =(file)=>{
    if(!file)return
        const storageRef =ref(storage,`NewStorage//Museos/${museo.nombre}/Bienvenido/${layer.nombrelayer}/${file.name}`)
        const uploadTask= uploadBytesResumable(storageRef ,file)
        uploadTask.on("state_changed",(snapshot)=>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)
            setProgress(prog)
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
              const objeto={...layer,...newObject}
              console.log(objeto)
                            
              setLayer(objeto)
              
            })
        }
        )
        
        
    
  }

  const abrirPanoramas = (idMuseo,idLayer)=>{
    setOpenpan(true)
    
    dispatch(obtenerPanoramas({ idMuseo, idLayer }))
    
  }
  
  const tomarPanorama = (id) => {
    console.log(id)
    console.log(panoramas)

    setPan({
      id:"",
      panorama:""
    })
    setTimeout(() => {
      panoramas.map((e) => {
        if (e.id === id) {
          console.log("son iguales");
          
          setPan(e)
        }
      });
      
    }, 500);
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
      panoramaEditado,museosCol
    );
    setPan(panoramaEditado)
    
    abrirPanoramas(id,idLayer.value)
    // setOpenpan(true)
    // dispatch(obtenerPanoramas({id,idLayer}))
    // abrirPanoramas(id,idLayer.value)
    // tomarPanorama(idPanorama)
    // setPan({
    //   id:"",
    //   panorama:""
    // })
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
  setUrlFile()
  
  }
  const subirPan =(e)=>{
    e.preventDefault()
    
    const file = e.target.files[0]
    // console.log(file)
    uploadFilesPan(file)
    
    
  }
  
  const uploadFilesPan =(file)=>{
    if(!file)return
        const storageRef =ref(storage,`NewStorage//Museos/${museo.nombre}/Bienvenido/${layer.nombrelayer}/panoramas/${file.name}`)
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
                prop:url
              }
              newObject[name]= newObject["prop"]
              delete newObject["prop"]
              console.log(newObject)
              const objeto={...pan,...newObject}
              console.log(objeto)
                            
              setPan(objeto)
              
              // update360Panorama(id,layer.id,pan.id,objeto)
              
            })
        }
        )
        
        
    
  }
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(obtenerBienvenido(id))
    dispatch(obtenerMuseo(id))

},[dispatch])
  console.log(pan)
  return (
    <Page>
          
          {deleteLayerModal&&<div className=' flex items-center justify-center absolute w-[100%] h-[93vh] z-50 bg-black bg-opacity-80'>
            <div className='bg-slate-600 w-[20%] h-[30%] flex flex-col '>
              <p className='text-white m-auto px-8 text-lg'>¿Esta seguro que desea eliminar {modalLayer.nombre}?</p>
              <div className='flex m-auto gap-5'>
                
                <button className=' p-2 bg-red-500 rounded-md text-white' onClick={()=>{
                  setDeleteLayerModal(false)
                }}>Cancelar</button>
                <button className=' p-2 bg-green-500 rounded-md text-white 'onClick={()=>{
                  eliminarLayer(modalLayer.id)
                }} >Eliminar</button>
              </div>
            </div>
            
          </div>}
          
          {deletePanoramaModal&&<div className=' flex items-center justify-center absolute w-[100%] h-[93vh] z-[1000] bg-black bg-opacity-80'>
            <div className='bg-slate-600 w-[20%] h-[30%] flex flex-col '>
              <p className='text-white m-auto px-8 text-lg'>¿Esta seguro que desea eliminar {modalPanorama.id} ?</p>
              <div className='flex m-auto gap-5'>
                
                <button className=' p-2 bg-red-500 rounded-md text-white' onClick={()=>{
                  setDeletePanoramaModal(false)
                }}>Cancelar</button>
                <button className=' p-2 bg-green-500 rounded-md text-white 'onClick={()=>{
                  eliminarPanorama(modalPanorama.id)
                }} >Eliminar</button>
              </div>
            </div>
            
          </div>}



          {openpan&&
          <div className='absolute bg-black bg-opacity-70 h-[92vh] w-full  z-50 flex flex-col items-center justify-center '>
              <div className='flex flex-col bg-colo5-phone-gray w-full h-[92vh] relative rounded-lg gap-4 '>
              <button onClick={crearPanorama} className="text-white bg-emerald-500 w-1/5 mx-auto mt-4 rounded-md p-1 hover:bg-emerald-300">Nuevo</button>
                <div className='flex justify-center items-center flex-wrap'>
                    {panoramas.map((panorama)=>
                    
                    <div className=' h-4/5 min-w-[25%] max-w-[25%] relative flex flex-col ' >                     
                      <img className='border-[1px] h-[200px] object-fill' src={Object.values(panorama)[0]} alt="" />
                      <div className='text-colo6-phone-oringe border-[1px] font-semibold text-center bg-white flex justify-between px-2 py-1 items-center'>
                        <h1 className=' '>{panorama.id}</h1>
                        <button onClick={()=>{tomarPanorama(panorama.id)}} className=' bg-color1-nav bg-opacity-70 text-white p-1 rounded-md m-1 hover:bg-opacity-100 hover:font-semibold'>Cambiar</button>
                      </div>
                      <button onClick={(()=>{borrarPanorama({id:panorama.id,nombre:panorama})})} className=" absolute top-0 right-0 text-white bg-red-400 h-6 w-6 rounded-sm ">x</button>

                    </div>
                 
                  )}
                  </div>  
                  {(pan.panorama!=='')&&<div className='flex justify-around w-full gap-2 h-60 mt-10 '>
                    
                    <form onSubmit={editarPanorama} className="flex flex-col items-center bg-colo7-phone-dark w-1/2 h-full justify-center  rounded-lg" >
                      
                      <p className=' text-xl text-white text-center font-semibold  w-96'>Modifica {pan.id} Subir archivo desde el ordenador</p>
                      <div 
                        className='contenedor2 w-60 overflow-auto rounded-lg '>
                                    
                                    <input type="hidden" className='w-[1400px]  text-xs py-2 ' name='panorama' defaultValue={urlFile} />
                                    
                                    <input type="hidden" name='idPanorama' defaultValue={pan.id} />
                                    <input type="hidden" name='idLayer' defaultValue={layer.id} />
                        </div>
                      <input onChange={subirPan} onClick={()=>{setName("panorama")}} type="file" className='mx-auto w-40'  />
                      <button className='text-center w-60 mx-auto bg-emerald-400 p-4  text-shadow-xl rounded-xl my-2 text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300' >Subir {pan.id}</button>
                    </form>
                      
                  <form  
                  onSubmit={editarPanorama}
                   className='  flex flex-col items-center bg-colo7-phone-dark w-1/2 h-full justify-center rounded-lg '>
                        <p className='text-xl text-white text-center font-semibold  w-96 '>Modifica {pan.id} mediante un url</p>
                        
                        <div 
                        className='contenedor2 w-60 overflow-auto rounded-lg '
                        >
                            
                                    
                                    
                                    <input type="text" className='w-[1400px]  text-xs p-4 ' name='panorama' defaultValue={Object.values(pan)[0]} />
                                    
                                    <input type="hidden" name='idPanorama' defaultValue={pan.id} />
                                    <input type="hidden" name='idLayer' defaultValue={layer.id} />
                        </div>
                        
                        <button className='text-center w-60 mx-auto bg-emerald-400 p-4  text-shadow-xl rounded-xl my-2 text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300'  >Actualizar {pan.id}</button>
                
                    </form>
                  </div>}
                 <button className='text-white absolute top-0 right-0 bg-red-600 rounded-lg  h-8 w-8 ' onClick={cerrarPan}>X</button>
                 
              </div>
              

          </div>}
          


             <section className=' flex  justify-around items-center h-[92vh] max-w-full overflow-hidden'>

            {!open&&<div className="show-info-reco">
              
                <PhoneCase >
              
                  
                  
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
                      <li className="text-colo6-phone-oringe text-sm text-center w-1/2  border-2 border-transparent border-b-colo6-phone-oringe ">
                        <Link to={""}>Acerca del museo</Link> 
                      </li>
                      <li className="text-white text-sm w-1/2 text-center m-auto">
                      
                      <Link to={"/"+ id +"/Recorrido"}>Recorrido</Link> 
                      </li>
                  </ul>
                  </nav>
                  <div className='h-[600px] overflow-auto contenedor'>
                  <div className=" mb-2  flex  h-[200px] relative bg-opacity-60 z-50">
                    <Link to={"/phone_prueba/"+ id}><button className='text-colo6-phone-oringe absolute top-4 left-4'><FaArrowLeft/></button></Link>
                    <img className="" src={museo.imgmuseo}  alt="" />
                  </div>
                  
                  {bienvenido.map((layer)=>
                  <div   className="relative  bg-emerald-400 mt-2 mb-[10px] h-7 flex items-center justify-center rounded-sm">
                    
                    <h4 className="text-white text-xs " onClick={()=>{tomarLayer(layer.id)}}>{layer.nombrelayer}</h4>
                    <button className=' text-white'><IoMdArrowDropdown  onClick={()=>{tomarLayer(layer.id)}}/></button>
                    <button className='text-white  absolute right-0 z-90 text-md hover:text-red-500 p-1' onClick={()=>{borrarLayer({id:layer.id,nombre:layer.nombrelayer})}}><AiOutlineDelete/></button>
                    
                  </div>
                  
                  )}
                  <div onClick={crearLayer} className=" mx-2 bg-emerald-400 mt-2  h-7 flex items-center justify-center rounded-sm  ">
                    
                    <h4 className="text-white text-xs hover:text-colo6-phone-oringe hover:text-shadow text-shadow-xl hover:shadow-white ">Nuevo</h4>
                    <button className=' text-white'><IoMdArrowDropdown/></button>
                  </div>
                  </div>
                  
                  

                  
              

                </PhoneCase>
            </div>
              

            
            }
            {/* {!open&&<div className="show-info-reco scale-50 lg:scale-75 xl:scale-90 2xl:scale-100 relative flex justify-between w-1/4  ">
              
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
                <div className='h-[430px] overflow-auto contenedor'>
                <div className=" mb-2 px-1 flex  h-[200px] relative bg-opacity-60 z-50">
                  <Link to={"/phone_prueba/"+ id}><button className='text-colo6-phone-oringe absolute top-4 left-4'><FaArrowLeft/></button></Link>
                  <img className="" src={museo.imgmuseo}  alt="" />
                </div>
                
                {bienvenido.map((layer)=>
                <div   className="relative mx-2 bg-emerald-400 mt-2 mb-[10px] h-7 flex items-center justify-center rounded-sm">
                  
                  <h4 className="text-white text-xs " onClick={()=>{tomarLayer(layer.id)}}>{layer.nombrelayer}</h4>
                  <button className=' text-white'><IoMdArrowDropdown  onClick={()=>{tomarLayer(layer.id)}}/></button>
                  <button className='text-white  absolute right-0 z-90 text-md hover:text-red-500 p-1' onClick={()=>{borrarLayer({id:layer.id,nombre:layer.nombrelayer})}}><AiOutlineDelete/></button>
                  
                </div>
                
                )}
                <div onClick={crearLayer} className=" mx-2 bg-emerald-400 mt-2 mb-[10px] h-7 flex items-center justify-center rounded-sm  ">
                  
                  <h4 className="text-white text-xs hover:text-colo6-phone-oringe hover:text-shadow text-shadow-xl hover:shadow-white ">Nuevo</h4>
                  <button className=' text-white'><IoMdArrowDropdown/></button>
                </div>
                </div>
                
                

                <div className="h-14 bg-black rounded-b-[34px] "></div>
            </div>

            </div>} */}

            {/* {open&&<div className=" flex items-center text-3xl">
            <BsArrowRightSquareFill />
            </div>} */}
            

            
            {open&&<PhoneCase>
                  
                  
                
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
                    <li className="text-colo6-phone-oringe text-sm text-center w-1/2  border-2 border-transparent border-b-colo6-phone-oringe ">
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

                <div className=" relative mx-2 bg-emerald-400 mb-0 h-[330px] flex flex-col   rounded-md">
                  <div className=" mx-2 bg-emerald-400 mt-2 mb-[10px] h-7 flex items-center justify-center rounded-lg" onClick={()=>{setOpen(false)
                  setLayer({})}}>
                    
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
                

                
            
            </PhoneCase>
            }
            



            {/* {open&&<div className="scale-50 lg:scale-75 xl:scale-90 2xl:scale-100 relative flex justify-between w-1/4  ">
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

                <div className=" relative mx-2 bg-emerald-400 mb-0 h-[330px] flex flex-col   rounded-md">
                  <div className=" mx-2 bg-emerald-400 mt-2 mb-[10px] h-7 flex items-center justify-center rounded-lg" onClick={()=>{setOpen(false)
                  setLayer({})}}>
                    
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
                
                >
                  Vista 360°
                </button>
                </div>
               
                
                
                <div className=" flex justify-around  w-full my-2 h-20">
                    
                    
                    
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
                        
                        
                    </p>
                    <p className="text-white text-xs mx-2 text-justify mb-2">
                        {layer.textolayer2}
                        
                        
                    </p>
                    <p className="text-white text-xs mx-2 text-justify mb-2">
                        {layer.textolayer3}
                        
                        
                    </p>
                    <p className="text-white text-xs mx-2 text-justify mb-2">
                        {layer.textolayer4}
                        
                        
                    </p>
                    <p className="text-white text-xs mx-2 text-justify mb-2">
                        {layer.textolayer5}
                        
                        
                    </p>
                </div>
                
                </div>
                

                <div className="h-12 mt-10 bg-black rounded-b-[34px] w-[285px] "></div>
            </div>
            
            </div>} */}
            
            {(Object.keys(layer).length!==0)&&<form  onSubmit={editarLayer} className='lg:w-3/4 w-4/5 md:w-3/4    scale-75 lg:scale-75 xl:scale-90 2xl:scale-100 show-info-reco-form  flex flex-col '>
                        <h2 className='text-3xl text-center w-full m-auto  text-white mt-6 '>Modifica a {layer.nombrelayer}</h2>
                        
                        <div className='h-auto bg-colo7-phone-dark w-11/12 flex justify-around mx-auto rounded-t-xl shadow-xl shadow-black  pb-4 '>
                            <div className='  flex flex-col gap-6 mt-5 w-1/2 px-10'>
                                    {/* <label htmlFor="idLayer"></label> */}
                                    <input hidden type="text" name='idLayer' defaultValue={layer.id} />
                                    <div className='flex flex-col gap-1'>
                                      <label className='text-white py-1 font-semibold' htmlFor="es360">Imagen 360</label>
                                      <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='es360' defaultValue={layer.es360}/>
                                      
                                        <input type="file" onChange={subir} onClick={()=>{setName("es360")}}  />
                                        {!progress===100?<p className='text-white text-xl'>{progress}</p>:<></>}
                                      
                                      {/* <input type="file" onChange={()=>{subir("es360")}} /> */}
                                      
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                      <label className='text-white py-1 font-semibold' htmlFor="Audiolayer">Audio</label>
                                      <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='audiolayer' defaultValue={layer.audiolayer} />
                                      <input type="file" onChange={subir} onClick={()=>{setName("audiolayer")}}  />
                                    </div>
                                    
                                    <div className='flex flex-col gap-1 '>
                                      <label className='text-white py-1 font-semibold'  htmlFor="imglayer">Imagen de {layer.nombrelayer}</label>
                                      <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text" name='imglayer' defaultValue={layer.imglayer}/>
                                      <input type="file" onChange={subir} onClick={()=>{setName("imglayer")}}  />
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
                        
                        <button className='text-center mx-auto bg-emerald-400 p-4 w-11/12 text-shadow-xl rounded-b-xl text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300 '  >Actualizar Layer</button>
                
                    </form>}
                
            
        </section>
        
    </Page>
  )
}
