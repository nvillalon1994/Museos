import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Page from '../../../../components/Page'
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
import {MdKeyboardArrowDown,MdKeyboardArrowUp} from "react-icons/md"
import { obtenerMuseo } from '../../../../features/museo/museoSlice' 

import { obtenerRecursos } from '../../../../features/recursos/recursosSlice'
import { createRecurso, deleteRecurso, updateRecurso } from '../../../../firebase'
import PhoneCase from '../../../../components/phonecase/PhoneCase';


export default function Tressesenta ({ids}) {
  const [open,setOpen] = useState(false)
  const [recurso,setRecurso] = useState({})
  
  // console.log(recurso)
  const objeto = useParams(ids)
  
  const idRecorrido=objeto.idRecorrido
  
  const id=objeto.idMuseo
  
  const {recursos} = useSelector(state=>state.recursos)
  const {museosCol} = useSelector(state=>state.museos)
  
  
  const [modalDelRecurso,setModalDelRecurso] = useState(false)
  const [modalRecurso,setModalRecurso] = useState({})
  
 
  const editarRecurso =async (e)=>{
    e.preventDefault()
    const {idRecurso,recuimg,recutitulo,recutexto, recutexto2,recutexto3,recutexto4,recutexto5,recutextobottom, recutextobottom2,recutextobottom3,recutextobottom4,recutextobottom5,recuvid}=e.target
    const youtubeLink = link1(recuvid.value)

    
    const recursoEditado = {
        
        recuimg:recuimg.value,
        recutitulo:recutitulo.value,
        recutexto:recutexto.value, 
        // recutexto2:recutexto2.value, 
        recutexto3:recutexto3.value, 
        recutexto4:recutexto4.value, 
        recutexto5:recutexto5.value, 
        recutextobottom:recutextobottom.value, 
        recutextobottom2:recutextobottom2.value, 
        recutextobottom3:recutextobottom3.value, 
        recutextobottom4:recutextobottom4.value, 
        recutextobottom5:recutextobottom5.value,
        // recuvid:recuvid.value,
        recuvid:youtubeLink,
        
    }
    console.log(recursoEditado)
    // console.log(id,idRecorrido,idRecurso.value,recursoEditado)
    // console.log(recursoEditado)
    await updateRecurso(id,idRecorrido,idRecurso.value,recursoEditado,museosCol)
    dispatch(obtenerRecursos({id,idRecorrido}))
    const newRecurso =recursoEditado
    const obj = new Object
    obj.recuvid= `https://www.youtube.com/watch?v=${youtubeLink}&t=3s`

    newRecurso.id=idRecurso.value
    const recursoNew={...newRecurso,...obj}
    console.log(recursoNew)
    setRecurso(recursoNew)
    // dispatch(obtenerMuseos())
    // console.log("se ejecuta")
    
    e.target.reset()
    // dispatch(obtenerMuseo(id))
  }

  const tomarRecurso = (id)=>{
    recursos.map((e)=>{
      if(e.id===id){
        let link = new Object
        link.recuvid=`https://www.youtube.com/watch?v=${e.recuvid}&t=3s`
        console.log(link)
        let link2={...e,...link}
        console.log(link2)
        
        
        
        setRecurso(link2)
        setOpen(!open)
      }
    })
  }

  const dispatch = useDispatch()
  
  const link1 =(link)=>{
    
    
    if(link.includes("&")){
        
        const codigo = link.slice(32,-(link.length-link.indexOf("&")))
        console.log(codigo)
        // const codigo1=codigo.slice(index,)
        // console.log(codigo1)
        return codigo

    }
  }
  
  const crearRecurso = (e)=>{
    
    e.preventDefault()
    const {name} = e.target
    if(recursos.length===0){
      createRecurso(id,idRecorrido,"1a_recurso1",name.value,museosCol) 
      dispatch(obtenerRecursos({id,idRecorrido}))
      
    }
    else{
      const a = recursos[recursos.length-1]
      const index =parseInt(a.id.substring(10))
      console.log(name.value,index)
      
      createRecurso(id,idRecorrido,`1a_recurso${index+1}`,name.value,museosCol)
      dispatch(obtenerRecursos({id,idRecorrido}))
    }
    
  }
  const eliminarRecurso =(idRecurso)=>{
    deleteRecurso(id,idRecorrido,idRecurso,museosCol)
    dispatch(obtenerRecursos({id,idRecorrido}))
    setModalDelRecurso(false)
  }
  const borrarRecurso =(recurso)=>{
    setModalRecurso(recurso)
    setModalDelRecurso(true)
  }
  
  


  useEffect(()=>{
    
    dispatch(obtenerMuseo(id))
    dispatch(obtenerRecursos({id,idRecorrido}))
    
},[dispatch])
  
  
  return (
    <Page>
      {modalDelRecurso&&<div className=' flex items-center justify-center absolute w-[100%] h-[93vh] z-50 bg-black bg-opacity-80'>
            <div className='bg-slate-600 w-[20%] h-[30%] flex flex-col '>
              <p className='text-white m-auto px-8 text-lg'>¿Esta seguro que desea eliminar {modalRecurso.recutitulo}?</p>
              <div className='flex m-auto gap-5'>
                
                <button className=' p-2 bg-red-500 rounded-md text-white' onClick={()=>{
                  setModalDelRecurso(false)
                }}>Cancelar</button>
                <button className=' p-2 bg-green-500 rounded-md text-white 'onClick={()=>{
                  eliminarRecurso(modalRecurso.id)
                }} >Eliminar</button>
              </div>
            </div>
            
          </div>}
        
      <section className='flex justify-around items-center max-w-full overflow-hidden h-[92vh]'>

              {!open&&<div className="show-info-all-muestras ">
                <PhoneCase >

                    
                    <nav className="flex justify-between p-2 items-center">
                    <h1 className="text-white text-xs mt-[-2px]">MUSEUM VIEW2</h1>
                    <ul className="flex gap-6">
                        <li className="text-colo6-phone-oringe text-lg ml-[-5px]">
                        <BsThreeDotsVertical />
                        </li>
                    </ul>
                    </nav>
                    <nav>
                    <ul className="flex justify-between items-center w-full">
                        <Link className='w-1/2' to={"/"+id+ "/recorrido/"+idRecorrido+"/muestras"}><li className="text-white text-sm text-center  ">Muestras</li></Link>
                        <li className=" text-colo6-phone-oringe text-sm  text-center m-auto border-2 border-b-colo6-phone-oringe border-transparent ">Amplía tu recorrido</li>
                        
                    </ul>
                    </nav>
                    
                    <div className='flex gap-2  flex-col  pb-4 mx-2 items-center '>
                      {recursos.map((recurso)=>
                      <div className='w-full  bg-colo7-phone-dark py-2 flex '>
                        <div className=' flex justify-between w-full  text-white  rounded-md  px-1 relative' onClick={()=>{tomarRecurso(recurso.id)}}>
                          <p className='text-xs pt-[3px] pb-1'>{recurso.recutitulo}</p>
                          
                          <button className='text-colo5-phone-gray ' ><MdKeyboardArrowDown/></button>
                          
                        </div>
                        <button className='text-white bg-red-500 px-1 w-1/6 ml-4 ' onClick={()=>{borrarRecurso(recurso)}}>X</button>
                      </div>
                      )}
                      <form action="" onSubmit={crearRecurso}>
                        <input type="text" placeholder='Nombre del recurso' name="name" />
                        <button>Nuevo Recurso</button>
                      </form>
                      
                    </div>
                    
                    
                </PhoneCase>

              </div>}
              {/* {!open&&<div className=" scale-50 lg:scale-75 xl:scale-90 2xl:scale-100 show-info-all-muestras relative flex justify-between w-1/4 ">
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
                        <Link className='w-1/2' to={"/"+id+ "/recorrido/"+idRecorrido+"/muestras"}><li className="text-white text-sm text-center  ">Muestras</li></Link>
                        <li className=" text-colo6-phone-oringe text-sm  text-center m-auto border-2 border-b-colo6-phone-oringe border-colo5-phone-gray ">Amplía tu recorrido</li>
                        
                    </ul>
                    </nav>
                    
                    <div className='flex gap-2  flex-col  pb-4 mx-2 items-center '>
                      {recursos.map((recurso)=>
                      <div className='w-full  bg-colo7-phone-dark py-2 flex '>
                        <div className=' flex justify-between w-full  text-white  rounded-md  px-1 relative' onClick={()=>{tomarRecurso(recurso.id)}}>
                          <p className='text-xs pt-[3px] pb-1'>{recurso.recutitulo}</p>
                          
                          <button className='text-colo5-phone-gray ' ><MdKeyboardArrowDown/></button>
                          
                        </div>
                        <button className='text-white bg-red-500 px-1 w-1/6 ml-4 ' onClick={()=>{borrarRecurso(recurso)}}>X</button>
                      </div>
                      )}
                      <form action="" onSubmit={crearRecurso}>
                        <input type="text" placeholder='Nombre del recurso' name="name" />
                        <button>Nuevo Recurso</button>
                      </form>
                      
                    </div>
                    
                    <div className="h-14 bg-black rounded-b-[34px] w-[286px] absolute bottom-0 z-70"></div>
                </div>

              </div>} */}
              
              {open&& 
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
                        <Link className='w-1/2' to={"/"+id+ "/recorrido/"+idRecorrido+"/muestras"}><li className="text-white text-sm text-center  ">Muestras</li></Link>
                        <li className=" text-colo6-phone-oringe text-sm  text-center m-auto border-2 border-b-colo6-phone-oringe border-transparent ">Amplía tu recorrido</li>
                        {/* '/:idMuseo/Recorrido/:idRecorrido/Recursos */}
                    </ul>
                    </nav>
                    
                    <div className='flex flex-col gap-2  bg-colo7-phone-dark pb-4 mx-2 py-2' onClick={()=>{setOpen(false)}}>
                      
                      <div className=' flex justify-between  text-white w-full  rounded-md px-1 '>
                        <p className='text-xs pt-[3px] pb-1 '>{recurso.recutitulo}</p>
                        <button className='text-cyan-600' onClick={()=>{setOpen(false)
                        setRecurso({})}}><MdKeyboardArrowUp/></button>
                      </div>

                      <iframe className=" m-auto" width="260" height="146" src={"https://www.youtube.com/embed/"+recurso.recuvid.slice(32,-(recurso.recuvid.length-recurso.recuvid.indexOf("&")))} title="YouTube video player" frameBorder="0"  ></iframe>
                      <div className='h-[220px] overflow-auto contenedor'>
                        <p className='text-sm text-justify mx-1 text-white' >{recurso.recutextobottom}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutextobottom2}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutextobottom3}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutextobottom4}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutextobottom5}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutexto}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutexto2}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutexto3}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutexto4}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutexto5}</p>
                      </div>
                      
                      
                    </div>
                    
                    
                </PhoneCase>

              } 
              {/* {open&& <div className=" scale-50 lg:scale-75 xl:scale-90 2xl:scale-100 show-info-muestra relative flex justify-between w-1/4 ">
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
                        <Link className='w-1/2' to={"/"+id+ "/recorrido/"+idRecorrido+"/muestras"}><li className="text-white text-sm text-center  ">Muestras</li></Link>
                        <li className=" text-colo6-phone-oringe text-sm  text-center m-auto border-2 border-b-colo6-phone-oringe border-colo5-phone-gray ">Amplía tu recorrido</li>
                        
                    </ul>
                    </nav>
                    
                    <div className='flex flex-col gap-2  bg-colo7-phone-dark pb-4 mx-2 py-2' onClick={()=>{setOpen(false)}}>
                      
                      <div className=' flex justify-between  text-white w-full  rounded-md px-1 '>
                        <p className='text-xs pt-[3px] pb-1 '>{recurso.recutitulo}</p>
                        <button className='text-cyan-600' onClick={()=>{setOpen(false)
                        setRecurso({})}}><MdKeyboardArrowUp/></button>
                      </div>

                      <iframe className=" m-auto" width="260" height="146" src={"https://www.youtube.com/embed/"+recurso.recuvid.slice(32,-(recurso.recuvid.length-recurso.recuvid.indexOf("&")))} title="YouTube video player" frameBorder="0"  ></iframe>
                      <div className='h-[220px] overflow-auto contenedor'>
                        <p className='text-sm text-justify mx-1 text-white' >{recurso.recutextobottom}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutextobottom2}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutextobottom3}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutextobottom4}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutextobottom5}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutexto}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutexto2}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutexto3}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutexto4}</p>
                        <p className='text-sm text-justify mx-1 text-white'>{recurso.recutexto5}</p>
                      </div>
                      
                      
                    </div>
                    
                    <div className="h-14 bg-black rounded-b-[34px] w-[286px] absolute bottom-0 z-70"></div>
                </div>

              </div>}  */}

                {(Object.keys(recurso).length!==0)&&
                    <form  onSubmit={editarRecurso} className='show-info-muestra-form lg:w-3/4 w-4/5 md:w-3/4    scale-75 lg:scale-75 xl:scale-90 2xl:scale-100 flex flex-col'>
                        <h2 className='text-3xl text-center w-full m-auto  text-white mt-6 '>Modifica a {recurso.recutitulo}</h2>
                        
                        <div className='h-[500px] bg-colo7-phone-dark w-11/12 flex justify-around mx-auto p-5 rounded-t-xl shadow-xl shadow-black '>
                            <div className='h-full  flex flex-col gap-4  w-1/2 px-10'>
                                    
                                    
                                  <input type="hidden"name='idRecurso' value={recurso.id} />
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audiObra">Url de Youtube</label>
                                  <input type="text" name='recuvid' defaultValue= {recurso.recuvid} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audiObra">Imagen</label>
                                  <input type="text"name='recuimg' defaultValue={recurso.recuimg} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audiObra">1° Parrafo</label>
                                  <input type="text"name='recutextobottom' defaultValue={recurso.recutextobottom} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audiObra">2° Parrafo</label>
                                  <input type="text"name='recutextobottom2' defaultValue={recurso.recutextobottom2} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audiObra">3° Parrafo</label>
                                  <input type="text"name='recutextobottom3' defaultValue={recurso.recutextobottom3} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audiObra">4° Parrafo</label>
                                  <input type="text"name='recutextobottom4' defaultValue={recurso.recutextobottom4} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audiObra">5° Parrafo</label>
                                  <input type="text"name='recutextobottom5' defaultValue={recurso.recutextobottom5} />
                                </div>
  
                              </div>
                              <div className='h-full  flex flex-col gap-4  w-1/2 px-10'>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audiObra">Titulo</label>
                                  <input type="text"name='recutitulo' defaultValue={recurso.recutitulo} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audiObra">Recutexto</label>
                                  <input type="text"name='recutexto' defaultValue={recurso.recutexto} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audiObra">Recutexto 2</label>
                                  <input type="text"name='recutexto2' defaultValue={recurso.recutexto2} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audiObra">Recutexto 3</label>
                                  <input type="text"name='recutexto3' defaultValue={recurso.recutexto3} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audiObra">Recutexto 4</label>
                                  <input type="text"name='recutexto4' defaultValue={recurso.recutexto4} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <label className='text-white  font-semibold' htmlFor="audiObra">Recutexto 5</label>
                                  <input type="text"name='recutexto5' defaultValue={recurso.recutexto5} />
                                </div>
                                  
                                  
                                  
                                  
                                    
                            </div>
                            
                        </div>
                        
                        <button className='text-center mx-auto bg-emerald-400 p-4 w-11/12 text-shadow-xl rounded-b-xl text-white text-lg font-semibold hover:text-shadow-none hover:bg-emerald-300'>Actualizar {recurso.recutitulo}</button>
                
                    </form>}
                
      
      
        {/* {recursos?.map((e)=><div  key={e.id} >

          <div className='infoLayer'>
              <p>{e.id}  de {idRecorrido}</p>
              <p>ImgLayer:</p>
              <img src={e.recuimg} alt="" />
              
              <button onClick={()=>{tomarRecurso(e.id)}} className="btn-Edit2">✎</button>
              
              <p>Contenido de {e.id}</p>

              <p>recutitulo: {e.recutitulo}</p>
              <p>recuvid: {e.recuvid}</p>
              <p>recutexto: {e.recutexto}</p>
              <p>recutexto2: {e.recutexto2}</p>
              <p>recutexto3: {e.recutexto3}</p>
              <p>recutexto4: {e.recutexto4}</p>
              <p>recutexto5: {e.recutexto5}</p>
              <p>recutextobottom: {e.recutextobottom}</p>
              <p>recutextobottom2: {e.recutextobottom2}</p>
              <p>recutextobottom3: {e.recutextobottom3}</p>
              <p>recutextobottom4: {e.recutextobottom4}</p>
              <p>recutextobottom5: {e.recutextobottom5}</p>
              
              
  
        </div>

      </div>)} */}

        
        
      
      </section>
      
        
    </Page>
  )
}
