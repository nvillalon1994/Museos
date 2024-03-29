import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Page from '../../../../components/Page'
import { obtenerMuestras } from '../../../../features/muestras/muestrasSlice'
import { createMuestra, createObra, deleteMuestra, deleteObra, updateMuesta, updateObra } from '../../../../firebase'
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
import {GoTriangleUp} from "react-icons/go"
import { obtenerMuseo } from '../../../../features/museo/museoSlice' 
import ReactAudioPlayer from 'react-audio-player'
import { obtenerObras } from '../../../../features/obras/obrasSlice'
import { storage } from '../../../../firebase' 
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Qrgenerator from '../../../../components/qr generator/Qr-generator'
import PhoneCase from '../../../../components/phonecase/PhoneCase'
// import { updateMuestra } from '../firebase'


export default function Tressesenta ({ids}) {
    const [openObra,setOpenObra]= useState(true)
    const [singleObra,setSigleObra]= useState({})
    
   //QR CODE
   const [openQrAll,setOpenQrAll]= useState(false)
   const [openQr,setOpenQR]= useState(false)


  const [urlFile,setUrlFile] = useState()
  const [progress,setProgress]=useState()
  const [name,setName]=useState()
  const [obra,setObra] = useState({
    id:"",
    urlObra:""
  })
  const [obraModal,setObraModal] = useState({})
  const[modalDelObra,setModalDelObra]= useState(false)

  const [modalDelMuestras,setModalDelMuestras] = useState(false)
  const [muestraModal,setMuestraModal] = useState({})

  
  const [open,setOpen] = useState(false)
  const [muestra,setMuestra] = useState({})
  const [open2,setOpen2] = useState(false)
  
  // console.log(muestra)
  const objeto = useParams(ids)
  console.log(objeto)
  const idRecorrido=objeto.idRecorrido
  
  
  const id=objeto.idMuseo
  console.log(id)
  
  const{museosCol}= useSelector(state=>state.museos)
  const {muestras} = useSelector(state=>state.muestras)
  const {obras} = useSelector(state=>state.obras)
  const {museo} = useSelector(state=>state.museo)
  
  
  
  
 
  const editarmuestra =async (e)=>{
    e.preventDefault()
    const {idMuestra,audioObra,autor,descmuestra1,descmuestra2,descmuestra3,descmuestra4,descmuestra5,gallery,historiadevida,imgautor,imgmuestra,vid,nombremuestra}=e.target
    const muestraEditada = {
         audioobra:audioObra.value,
         autor:autor.value,
         descmuestra:descmuestra1.value,
         descmuestra2:descmuestra2.value,
         descmuestra3:descmuestra3.value,
         descmuestra4:descmuestra4.value,
         descmuestra5:descmuestra5.value,
        //  gallery:new Boolean(gallery.value),
        //  historiadevida:new Boolean(historiadevida.value),
        //  imgautor:imgautor.value,
         imgmuestra:imgmuestra.value,
         vid:vid.value,
         nombremuestra:nombremuestra.value,
         
    }
    console.log(muestraEditada)
    console.log(id,idRecorrido,idMuestra.value)
    await updateMuesta(id,idRecorrido,idMuestra.value,muestraEditada,museosCol)
    dispatch(obtenerMuestras({id,idRecorrido}))
    const newMuestra =muestraEditada
    newMuestra.id=idMuestra.value
    setMuestra(newMuestra)
    e.target.reset()
    // dispatch(obtenerMuseos())
    // console.log("se ejecuta")
    
    // dispatch(obtenerMuseo(id))
  }

  const tomarmuestra = (id)=>{
    muestras.map((e)=>{
      if(e.id===id){
        console.log("son iguales")
        setMuestra(e)
        setOpen(true)
      }
    })
  }

  const dispatch = useDispatch()
  const cerrarPan =()=>{
    setOpen2(false)
    setObra({
    id:"",
    urlObra:""
  })
  }
  const traerObras=(idObras)=>{
    dispatch(obtenerObras({id,idRecorrido,idObras}))
    setOpen2(true)
  }
  const tomarObra =(id)=>{
    console.log(id)
    obras.map((e)=>{
      if(e.id===id){
        console.log(e)
        setSigleObra(e.urlobra)
        setObra(e)
        setUrlFile(e.urlobra)
        setOpen(true)
      }
    })
  }
  const editarObra = async (e) => {
    e.preventDefault();
    
    const { urlobra, idObra } = e.target;
    console.log(urlobra)
    const obraEditada = { 
      urlobra: urlobra.value 
    };
    
    console.log(obraEditada)
    
    updateObra(id,idRecorrido,muestra.id,idObra.value,obraEditada,museosCol);
    traerObras(muestra.id)
    setSigleObra(urlobra.value)
    
    
    e.target.reset()
    
  };
  const crearObra =()=>{
    if(obras.length===0){
      const idObra = `1a_obra1`
      createObra(id,idRecorrido,muestra.id,idObra,museosCol)
      const idMuestra = muestra.id
      dispatch(obtenerObras({id,idRecorrido,idMuestra}))
      traerObras(idMuestra)
    }else{
      const a = obras[obras.length-1]
      const index =parseInt(a.id.substring(7))
      console.log(index)
      const idObra = `1a_obra${index+1}`
      createObra(id,idRecorrido,muestra.id,idObra,museosCol)
      const idMuestra = muestra.id
      dispatch(obtenerObras({id,idRecorrido,idMuestra}))
      traerObras(idMuestra)
    }
  }
  const eliminarObra =(idObra)=>{
    const idMuestra = muestra.id
    deleteObra(id,idRecorrido,idMuestra,idObra,museosCol)
    dispatch(obtenerObras({id,idRecorrido,idMuestra}))
    traerObras(idMuestra)
    setModalDelObra(false)
  }
  const borrarObra =(obra)=>{
    setObraModal(obra)
    setModalDelObra(true)
  }

  const crearMuestra =(e)=>{
    e.preventDefault()
    const {name} = e.target
    if(muestras.length===0){
      createMuestra(id,idRecorrido,"1a_muestra1",name.value,museosCol) 
      dispatch(obtenerMuestras({id,idRecorrido}))
      
    }
    else{
      // const a = muestras[muestras.length-1]
      // const index =parseInt(a.id.substring(10))
      // console.error(index+1)
      // createMuestra(id,idRecorrido,`1i_muestra${index+1}`,name.value,museosCol)
      // dispatch(obtenerMuestras({id,idRecorrido}))
      if(muestras.length<9){
        const a = muestras[muestras.length-1]
        const index =parseInt(a.id.substring(10))
        console.error(index+1)
        createMuestra(id,idRecorrido,`1i_muestra${index+1}`,name.value,museosCol)
        dispatch(obtenerMuestras({id,idRecorrido}))
        
      }else{
        const a = muestras[muestras.length-1]
        const index =parseInt(a.id.substring(10))
        if(index===9){
          createMuestra(id,idRecorrido,`1j_muestra${index+1}`,name.value,museosCol)
          dispatch(obtenerMuestras({id,idRecorrido}))
        }else{
          if(muestras.length>9 && muestras.length<=19){
            const a = muestras[muestras.length-1]
            const index =parseInt(a.id.substring(10))
            console.error(index+1)
            createMuestra(id,idRecorrido,`1j_muestra${index+1}`,name.value,museosCol)
            dispatch(obtenerMuestras({id,idRecorrido}))
          }else{
            const a = muestras[muestras.length-1]
            const index =parseInt(a.id.substring(10))
            console.error(index+1)
            createMuestra(id,idRecorrido,`1k_muestra${index+1}`,name.value,museosCol)
            dispatch(obtenerMuestras({id,idRecorrido}))
          }
        }
        
        
      }
      
    }
    
  }
  const eliminarMuestra = (idMuestra)=>{
    deleteMuestra(id,idRecorrido,idMuestra,museosCol)
    dispatch(obtenerMuestras({id,idRecorrido}))
    setModalDelMuestras(false)
  }
  const borrarMuestraModal=(muestra)=>{
    setModalDelMuestras(true)
    setMuestraModal(muestra)
  }

  const subir =(e)=>{
    e.preventDefault()
    
    const file = e.target.files[0]
    console.log(file)
    uploadFiles(file)
    
    
  }
  
  const uploadFiles =(file)=>{
    if(!file)return
        const storageRef =ref(storage,`/NewStorage/Museos/${museo.nombre}/Recorridos/${idRecorrido}/Muestras/${muestra.id}/${file.name}`)
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
              const objeto={...muestra,...newObject}
              console.log(objeto)
                            
              setMuestra(objeto)
              
            })
        }
        )
        
        
    
  }
  const subirObra =(e)=>{
    e.preventDefault()
    
    const file = e.target.files[0]
    // console.log(file)
    uploadFilesObra(file)
    
    
  }
  
  const uploadFilesObra =(file)=>{
    if(!file)return
        const storageRef =ref(storage,`NewStorage/Museos/${museo.nombre}/Recorridos/${idRecorrido}/Muestras/${muestra.id}/Obras/${obra.id}/${file.name}`)
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
              const objeto={...obra,...newObject}
              console.log(objeto)
                            
              setObra(objeto)
              
              // update360Panorama(id,layer.id,pan.id,objeto)
              
            })
        }
        )
        
        
    
  }

  useEffect(()=>{
    
    
    dispatch(obtenerMuseo(id))
    dispatch(obtenerMuestras({id,idRecorrido}))
    
    
},[dispatch])
  console.log(typeof(muestra.gallery))
  
  return (
    <Page>
      {openQrAll&&<div className="model">
      
      <div className="QR-background-all" >
        <button onClick={()=>{setOpenQrAll(false)}}className="close-qr">X</button>
        {muestras.map((muestra)=>
          <Qrgenerator 
          nombremuestra={muestra.nombremuestra}
          museo={objeto.idMuseo} 
          recorrido={objeto.idRecorrido} 
          muestra={muestra.id}
          acerca={museo.acerca}
          modoMuseo={true}
          reco={museo.reco}
          tressesenta={museo.tressesenta}
          historiadevida={muestra.historiadevida}
          gallery={muestra.gallery}
          />
          
        )}
          
        </div>
      </div>
        
      }
      {openQr&&<div className="model">
        
        <div className="QR-background" >
          <button onClick={()=>{setOpenQR(false)}}className="close-qr">X</button>
            <Qrgenerator
            nombremuestra={muestra.nombremuestra}
            museo={objeto.idMuseo} recorrido={objeto.idRecorrido} muestra={muestra.id} acerca={museo.acerca}
            modoMuseo={true}
            reco={museo.reco}
            tressesenta={museo.tressesenta}/>
          </div>
        </div>
        }
      {modalDelMuestras&&<div className=' flex items-center justify-center absolute w-[100%] h-[93vh] z-50 bg-black bg-opacity-80'>
            <div className='bg-slate-600 w-[20%] h-[30%] flex flex-col '>
              <p className='text-white m-auto px-8 text-lg'>¿Esta seguro que desea eliminar {muestraModal.nombremuestra}?</p>
              <div className='flex m-auto gap-5'>
                
                <button className=' p-2 bg-red-500 rounded-md text-white' onClick={()=>{
                  setModalDelMuestras(false)
                }}>Cancelar</button>
                <button className=' p-2 bg-green-500 rounded-md text-white 'onClick={()=>{
                  eliminarMuestra(muestraModal.id)
                  console.log(muestraModal)
                }} >Eliminar</button>
              </div>
            </div>
            
          </div>}


      {modalDelObra&&<div className=' flex items-center justify-center absolute w-[100%] h-[93vh] z-[1000] bg-black bg-opacity-80'>
            <div className='bg-slate-600 w-[20%] h-[30%] flex flex-col '>
              <p className='text-white m-auto px-8 text-lg'>¿Esta seguro que desea eliminar {obraModal.id}?</p>
              <div className='flex m-auto gap-5'>
                
                <button className=' p-2 bg-red-500 rounded-md text-white' onClick={()=>{
                  setModalDelObra(false)
                }}>Cancelar</button>
                <button className=' p-2 bg-green-500 rounded-md text-white 'onClick={()=>{
                  // eliminarObra(modalLayer.id)
                  eliminarObra(obraModal.id)
                }} >Eliminar</button>
              </div>
            </div>
            
      </div>}




      {open2&&<div className='absolute bg-black bg-opacity-90 h-[92vh] w-full  z-50 flex items-center justify-center  '>
              <div className='flex flex-col justify-between bg-colo5-phone-gray w-full h-[92vh] relative m-auto  '>
              {obra.urlObra===""&&<p onClick={crearObra} className='bg-emerald-500 w-1/5 p-2 text-center text-white rounded-md font-semibold m-auto mt-2'>Crear obra</p>}
              {obra.urlObra===""&&<div className='flex flex-wrap gap-4 justify-center items-center  overflow-auto contenedor  w-full h-full p-8 rounded-md'>
                     {obras.map((obra)=>

                    <div className=' h-4/5  max-h-[100%] relative flex flex-col rounded-md'>                     
                      <img className='border-[1px] h-[300px] w-[400px] object-cover hover:object-scale-down rounded-t-md ' src={obra.urlobra} alt="" />
                      <div className='text-colo6-phone-oringe border-[1px] font-semibold text-center bg-white flex justify-between items-center p-2 px-4 rounded-b-md'>
                        
                        <h1 className=' '>{obra.id}</h1>
                        <button onClick={()=>{tomarObra(obra.id)}} className=' bg-color1-nav bg-opacity-70 text-white p-1 rounded-md  hover:bg-opacity-100 hover:font-semibold '>Cambiar</button>
                      </div>
                      <button className='text-white bg-red-600 absolute top-0 right-0 h-6 w-6 rounded-md ' onClick={()=>{borrarObra(obra)}}>X</button>
                    </div>
                 
                    )}
                  
              </div> }
              {obra.urlObra!==""&&<div className='flex flex-col justify-around items-center w-full gap-2 h-full px-2 pb-2 bg-neutral-800 z-20'>
                  {openObra&&<div className=' h-4/5  max-h-[100%] relative flex flex-col rounded-md mt-4'>                     
                      <img className='border-[1px] h-[300px] w-[400px] object-cover hover:object-scale-down rounded-t-md' src={singleObra} alt="" />
                      <div className=' w-[400px] text-colo6-phone-oringe border-[1px] font-semibold text-center bg-white flex justify-between items-center p-2 px-4 rounded-b-md'>
                        
                        <h1 className=' '>{obra.id}</h1>
                        
                      </div>
                      
                    </div>}
                    <div className='flex w-full gap-2'>
                    <form onSubmit={editarObra} className="flex flex-col items-center bg-colo7-phone-dark w-1/2 h-full   rounded-lg " >
                      
                      <p className=' text-2xl text-white text-center font-semibold mt-3 w-96'>Modifica {obra.id} Subir archivo desde el ordenador</p>
                      <div 
                        className='contenedor2 w-60 overflow-auto rounded-lg '>
                                    
                                    <input type="text" className='w-[1400px]  text-xs py-2 ' name='urlobra' defaultValue={urlFile} />
                                    
                                    <input type="hidden" name='idObra' defaultValue={obra.id} />
                                    
                        </div>
                      <input onChange={subirObra} onClick={()=>{setName("")}} type="file" className='mx-auto w-40'  />
                      <button className={`text-center w-60 mx-auto ${(urlFile===undefined||urlFile==="")?"bg-gray-200":"bg-emerald-400 hover:bg-emerald-300"}  p-4  text-shadow-xl rounded-xl my-2 text-white text-lg font-semibold hover:text-shadow-none  `} disabled={(urlFile===undefined||urlFile==="")} >Subir {obra.id}</button>
                  </form>
                  {obra&&<form  
                      onSubmit={editarObra}
                      className=' m-auto flex flex-col items-center bg-colo7-phone-dark w-1/2 h-full justify-center rounded-lg mb-4'>
                        <h2 className='text-2xl text-white text-center font-semibold mb-2 w-96 '>Modifica el url de {obra.nombreobra}</h2>
                        
                        <div 
                        className='contenedor2 w-60 overflow-auto rounded-lg '
                        >
                            
                                    
                                    
                                    <input type="text" className='w-[1400px]  text-xs p-4 ' name='urlobra' defaultValue={obra.urlobra} />
                                    
                                    <input type="hidden" name='idObra' defaultValue={obra.id} />
                                    
                        </div>
                        
                        <button className={`text-center w-60 mx-auto bg-emerald-400 p-4  text-shadow-xl rounded-xl my-2 text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300`}  >Actualizar {obra.id}</button> 
                
                  </form>}
                  </div>
                  <button className='text-white absolute flex justify-center items-center top-0 left-0 bg-orange-500 rounded-lg  h-8 w-8 z-30 ' onClick={()=>{
                    setObra({id:"",urlObra:""})
                    cerrarPan()
                    setTimeout(() => {
                      setOpen2(true)
                    }, 500);
                  }}><FaArrowLeft/></button>  
                </div> }
                  
                
                  
                 <button className='text-white absolute top-0 right-0 bg-red-600 rounded-lg  h-8 w-8 z-10 ' onClick={cerrarPan}>X</button>
                 
              </div>
              

      </div>}
      <section className={`flex justify-around items-center h-[92vh] overflow-hidden ${(Object.keys(muestra).length===0)&&' justify-center gap-2 m-auto items-center'}  `}>



          
      {!open&&<div className="show-info-all-muestras">
              
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
                        <li className="text-colo6-phone-oringe text-sm text-center w-1/2 border-2 border-b-colo6-phone-oringe border-transparent ">
                        Muestras
                        </li>
                        
                        <Link className='w-1/2' to={"/"+id+"/recorrido/"+idRecorrido+"/recursos"}><li className="text-white text-sm  text-center m-auto ">Amplía tu recorrido</li></Link>
                        
                    </ul>
                    </nav>
                    <Link to={"/"+id+ "/recorrido/"}><button className='w-full '><GoTriangleUp className='text-center w-full text-white bg-colo6-phone-oringe'/></button></Link>
                    <div className='h-[400px]  overflow-auto contenedor'>
                      <p className='text-white text-sm'>Muestras:</p>

                      <div className='grid grid-cols-2 gap-1  relative w-full  '>
                        {muestras.map((muestra)=>
                        <div className=' relative flex flex-col items-center z-10 h-28 overflow-hidden' >
                          <img className='max-h-56 h-56' src={muestra.imgmuestra} alt="" onClick={()=>{tomarmuestra(muestra.id)}} />
                          <p className='text-white text-[9px] absolute bottom-[7px] bg-black py-2 w-full text-center bg-opacity-60'>{muestra.nombremuestra}</p>
                          <button className='text white bg-red-400 hover:bg-red-500 w-5 h-5 absolute top-0 right-0' onClick={()=>{borrarMuestraModal(muestra)}}>X</button>
                        </div>
                        )}
                        <form action="" onSubmit={crearMuestra}>
                          <input className='w-32' type="text" name="name" placeholder='Nombre de la muestra'/>
                          <button>Nueva muestra</button>
                        </form>
                      </div>
                    </div>
                    
                    
                    
                </PhoneCase>

      </div>}
      {/* {!open&&<div className="show-info-all-muestras scale-50 lg:scale-75 xl:scale-90 2xl:scale-100">
              
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
                    <ul className="flex justify-between items-center w-full">
                        <li className="text-colo6-phone-oringe text-sm text-center w-1/2 border-2 border-b-colo6-phone-oringe border-colo5-phone-gray ">
                        Muestras
                        </li>
                        
                        <Link className='w-1/2' to={"/"+id+"/recorrido/"+idRecorrido+"/recursos"}><li className="text-white text-sm  text-center m-auto ">Amplía tu recorrido</li></Link>
                        
                    </ul>
                    </nav>
                    <Link to={"/"+id+ "/recorrido/"}><button className='w-full '><GoTriangleUp className='text-center w-full text-white bg-colo6-phone-oringe'/></button></Link>
                    <div className='h-[400px]  overflow-auto contenedor'>
                      <p className='text-white text-sm'>Muestras:</p>

                      <div className='grid grid-cols-2 gap-1  relative w-full  '>
                        {muestras.map((muestra)=>
                        <div className=' relative flex flex-col items-center z-10 h-28 overflow-hidden' >
                          <img className='max-h-56 h-56' src={muestra.imgmuestra} alt="" onClick={()=>{tomarmuestra(muestra.id)}} />
                          <p className='text-white text-[9px] absolute bottom-[7px] bg-black py-2 w-full text-center bg-opacity-60'>{muestra.nombremuestra}</p>
                          <button className='text white bg-red-400 hover:bg-red-500 w-5 h-5 absolute top-0 right-0' onClick={()=>{borrarMuestraModal(muestra)}}>X</button>
                        </div>
                        )}
                        <form action="" onSubmit={crearMuestra}>
                          <input className='w-32' type="text" name="name" placeholder='Nombre de la muestra'/>
                          <button>Nueva muestra</button>
                        </form>
                      </div>
                    </div>
                    
                    
                    <div className="h-14 bg-black rounded-b-[34px] w-[286px] absolute bottom-0 z-70"></div>
                </div>

      </div>} */}
      {(Object.keys(muestra).length===0)&& <button className=' mt-20 bg-emerald-300 w-40 h-10 p-2 rounded-md text-white' onClick={()=>{setOpenQrAll(true)}}>Ver Todos los QRS</button> } 
            
            
      {open&&<div className="show-info-muestra relative   ">
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
                    <ul className="flex justify-between items-center w-full ">
                        <li className="text-colo6-phone-oringe text-sm text-center w-1/2 border-2 border-b-colo6-phone-oringe border-transparent  ">
                        Muestas
                        </li>
                        <li className="text-white text-sm w-1/2 text-center m-auto ">
                        <button onClick={()=>{traerObras(muestra.id)}}>Más</button>
                        </li>
                    </ul>
                    </nav>
                    <div className='relative overflow-auto  '>
                      <button className='text-colo6-phone-oringe absolute top-4 left-4' onClick={()=>{setOpen(false)
                            setMuestra({})
                      }}><FaArrowLeft/></button>
                        <div className=' overflow-hidden h-[200px] '>
                           <img className='' src={muestra.imgmuestra} alt="" />
                        </div>
                        <div className='contenedor h-[350px] overflow-auto pb-0'>
                            <div className='w-full  bg-emerald-400 text-white text-center  '>
                              <p className='pt-4 text-xs'>{muestra.nombremuestra}</p>
                              <p className='pt-4 pb-1 text-xs'>{muestra.autor}</p>
                            </div>
                            
                            <div className=" flex justify-around overflow-auto w-full my-1">
                                <ReactAudioPlayer
                                src={muestra.audioobra}
                                autoPlay={false}
                                controls
                                style={{textEmphasisColor:"red"}}
                                />
                            </div>
                            <div className=' h-[100px] overflow-auto contenedor mb-0 '>
                                
                                <p className='text-white text-sm mx-2 mb-2 text-justify'>{muestra.descmuestra}</p>
                                <p className='text-white text-sm mx-2 mb-2 text-justify'>{muestra.descmuestra2}</p>
                                <p className='text-white text-sm mx-2 mb-2 text-justify'>{muestra.descmuestra3}</p>
                                <p className='text-white text-sm mx-2 mb-2 text-justify'>{muestra.descmuestra4}</p>
                                <p className='text-white text-sm mx-2 mb-2 text-justify'>{muestra.descmuestra5}</p>
                            </div>
                    
                        </div>
                        
                        
                    </div>
                    
                </PhoneCase>

      </div>} 
      {/* {open&&<div className="scale-50 lg:scale-75 xl:scale-90 2xl:scale-100 show-info-muestra relative flex justify-between w-1/4  ">
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
                        <li className="text-colo6-phone-oringe text-sm w-1/2 text-center m-auto ">
                        <button onClick={()=>{traerObras(muestra.id)}}>Más</button>
                        </li>
                    </ul>
                    </nav>
                    <div className='relative overflow-auto  '>
                      <button className='text-colo6-phone-oringe absolute top-4 left-4' onClick={()=>{setOpen(false)
                            setMuestra({})
                      }}><FaArrowLeft/></button>
                        <div className=' overflow-hidden h-[200px] '>
                           <img className='' src={muestra.imgmuestra} alt="" />
                        </div>
                        <div className='contenedor h-[350px] overflow-auto pb-0'>
                            <div className='w-full  bg-emerald-400 text-white text-center  '>
                              <p className='pt-4 text-xs'>{muestra.nombremuestra}</p>
                              <p className='pt-4 pb-1 text-xs'>{muestra.autor}</p>
                            </div>
                            
                            <div className=" flex justify-around overflow-auto w-full my-1">
                                <ReactAudioPlayer
                                src={muestra.audioobra}
                                autoPlay={false}
                                controls
                                style={{textEmphasisColor:"red"}}
                                />
                            </div>
                            <div className=' h-[100px] overflow-auto contenedor mb-0 '>
                                
                                <p className='text-white text-sm mx-2 mb-2 text-justify'>{muestra.descmuestra}</p>
                                <p className='text-white text-sm mx-2 mb-2 text-justify'>{muestra.descmuestra2}</p>
                                <p className='text-white text-sm mx-2 mb-2 text-justify'>{muestra.descmuestra3}</p>
                                <p className='text-white text-sm mx-2 mb-2 text-justify'>{muestra.descmuestra4}</p>
                                <p className='text-white text-sm mx-2 mb-2 text-justify'>{muestra.descmuestra5}</p>
                            </div>
                    <div className="h-14 bg-black rounded-b-[34px] w-[284px]   z-70"></div>
                        </div>
                        
                        
                    </div>
                    
                </div>

      </div>}  */}
          
      {(Object.keys(muestra).length!==0)&&<form  onSubmit={editarmuestra} className=' flex flex-col  show-info-muestra-form lg:w-3/4 w-4/5 md:w-3/4    scale-75 lg:scale-75 xl:scale-90 2xl:scale-100'>
                  <div className='flex items-center   gap-3'>
                    <h2 className='text-3xl text-center w-full m-auto  text-white my-6'>Modifica a "{muestra.nombremuestra}"</h2>
                    <button className='bg-emerald-300  w-1/3 h-10 p-2 rounded-md text-white' onClick={()=>{setOpenQR(true)}}>Ver QR</button>

                  </div>
                    <div className='h-4/5 bg-colo7-phone-dark w-11/12 flex justify-around mx-auto p-5 rounded-t-xl shadow-xl shadow-black '>
                        <div className='h-full  flex flex-col gap-4  w-1/2 px-10'>
                            <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="hidden"name='idMuestra' value={muestra.id} />
                            
                                
                                {/* <input  className="bg-colo5-phone-gray text-white p-1 rounded-md" type="hidden"name='gallery' defaultValue={muestra.gallery} /> */}
                            
                            <div className='flex flex-col gap-1'>
                                <label className='text-white  font-semibold' htmlFor="audiObra">Nombre de la Obra</label>
                                <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text"name='nombremuestra' defaultValue={muestra.nombremuestra} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-white  font-semibold' htmlFor="audiObra">Audio de la obra</label>
                                <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text"name='audioObra' defaultValue={muestra.audioobra} />
                                <input type="file" onChange={subir} onClick={()=>{setName("audioobra")}}  />
                            </div>
                            
                            
                            {/* <div className='flex flex-col gap-1'>
                                <label className='text-white  font-semibold' htmlFor="historiadevida">Historia de Vida</label>
                                <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text"name='historiadevida' defaultValue={muestra.historiadevida} />
                            </div> */}
                            <div className='flex flex-col gap-1'>
                                <label className='text-white  font-semibold' htmlFor="autor">Autor</label>
                                <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text"name='autor' defaultValue={muestra.autor} />
                            </div>
                            {/* <div className='flex flex-col gap-1'>
                                <label className='text-white  font-semibold' htmlFor="imgautor">Imagen del autor</label>
                                <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text"name='imgautor' defaultValue={muestra.imgautor} />
                            </div> */}
                            {/* <div className='flex flex-col gap-1'>
                                <label className='text-white  font-semibold' htmlFor="audioreco">Información del autor</label>
                                <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text"name='infoautor' defaultValue={muestra.infoautor} />
                            </div> */}
                            <div className='flex flex-col gap-1'>
                                <label className='text-white  font-semibold' htmlFor="imgmuestra">Imagen de la muestra</label>
                                <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text"name='imgmuestra' defaultValue={muestra.imgmuestra} />
                                <input type="file" onChange={subir} onClick={()=>{setName("imgmuestra")}}  />
                            </div>
                            
                            
                        </div>
                        <div className='h-full  flex flex-col  gap-4 w-1/2 px-10'>
                            

                            
                                  
                                <input type="hidden"className="bg-colo5-phone-gray text-white p-1 rounded-md" name='vid' defaultValue={muestra.vid} />
                            
                            <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audioreco">1° Párrafo</label>
                                  <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text"name='descmuestra1' defaultValue={muestra.descmuestra} />
                            </div>
                            
                            <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audioreco">2° Párrafo</label>
                                  <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text"name='descmuestra2' defaultValue={muestra.descmuestra2} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audioreco">3° Párrafo</label>
                                  <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text"name='descmuestra3' defaultValue={muestra.descmuestra3} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audioreco">4° Párrafo</label>
                                  <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text"name='descmuestra4' defaultValue={muestra.descmuestra4} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audioreco">5° Párrafo</label>
                                  <input className="bg-colo5-phone-gray text-white p-1 rounded-md" type="text"name='descmuestra5' defaultValue={muestra.descmuestra5} />
                            </div>
         
                        </div>
                            
                    </div>
                        
                    <button className='text-center mx-auto bg-emerald-400 p-4 w-11/12 text-shadow-xl rounded-b-xl text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300'  >Actualizar muestra</button>
                
          </form>}
            
      
      
       

        
        
      
      </section>
            
      
        
    </Page>
  )
}
