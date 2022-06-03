import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Page from '../../../components/Page'
import { obtenerBienvenido } from '../../../features/bienvenido/bienvenidoSlice'
import { updateBienvenidaLayer } from '../../../firebase'

export default function Bienvenida({idMuseo}) {
  const [open,setOpen] = useState(false)
  const [layer,setLayer] = useState({})
  const objetoIdMuseo = useParams(idMuseo)
  const id = objetoIdMuseo.idMuseo
  console.log(id)
  const {bienvenido} = useSelector(state=>state.bienvenido)
  console.log(bienvenido)
  if(bienvenido){
    console.log("existe")
  }

  const editarLayer =async (e)=>{
    e.preventDefault()
    const {Audiolayer,es360,imglayer,end,nombrelayer,textolayer,textolayer2,textolayer3,textolayer4,textolayer5,titulolayer,idLayer}=e.target
    const layerEditada = {Audiolayer:Audiolayer.value,es360:es360.value,imglayer:imglayer.value,end:end.value,nombrelayer:nombrelayer.value,
      
      textolayer:textolayer.value,
      textolayer2:textolayer2.value,
      textolayer3:textolayer3.value,
      textolayer4:textolayer4.value,
      textolayer5:textolayer5.value,
      titulolayer:titulolayer.value

    }
    console.log(idLayer.value)
    

    
    await updateBienvenidaLayer(id,idLayer.value,layerEditada)
    dispatch(obtenerBienvenido(id))
    
    // dispatch(obtenerMuseos())
    // console.log("se ejecuta")
    
    // dispatch(obtenerMuseo(id))
  }
  const tomarLayer = (id)=>{
    bienvenido.map((e)=>{
      if(e.id===id){
        setLayer(e)
        setOpen(true)
      }
    })
  }
  console.log(layer)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(obtenerBienvenido(id))

},[dispatch])
  return (
    <Page>
      <div className='infoLayerContainer'>
        {open&&
                <div className='editFormDiv'>
                    
                {layer&&
                    <form  onSubmit={editarLayer} className='editForm form1'>
                        <h2 id='tituloForm'>Modifica a {layer.id}</h2>
                        
                        <div className=''>
                            <div className='inputs'>
                                    
                                    <input type="" name='idLayer' defaultValue={layer.id} />
                                    <input type="" name='Audiolayer' defaultValue={layer.Audiolayer} />
                                    <input type="text" name='es360' defaultValue={layer.es360}/>
                                    <input type="text" name='imglayer' defaultValue={layer.imglayer}/>
                                    <input type="text" name='end' defaultValue={layer.end}/>
                                    <input type="text" name='nombrelayer' defaultValue={layer.nombrelayer}/>
                                    <input type="text" name='titulolayer' defaultValue={layer.titulolayer}/>
                                    
                            </div>
                            <div className='inputs'>
                                    <input type="text" name='textolayer' defaultValue={layer.textolayer}/>
                                    <input type="text" name='textolayer2' defaultValue={layer.textolayer2}/>
                                    <input type="text" name='textolayer3' defaultValue={layer.textolayer3}/>
                                    <input type="text" name='textolayer4' defaultValue={layer.textolayer4}/>
                                    <input type="text" name='textolayer5' defaultValue={layer.textolayer5}/>
                                    
                            </div>
                        </div>
                        <button className='btn-Delete' onClick={()=>{setOpen(false)}}>X</button>
                        <button className=''  >Actualizar Layer</button>
                
                    </form>}
                </div>
      }
      {bienvenido?.map((e)=><div  key={e.nombrelayer} >

          <div className='infoLayer'>
              <p>{e.id}  de {id}</p>
              <p>ImgLayer:</p>
              <img className='' src={e.imglayer} alt="" />
              <button onClick={()=>{tomarLayer(e.id)}} className="btn-Edit2">✎</button>
              {/* <button onClick={()=>{setOpen(!open)}} className="btn-Edit2">✎</button> */}
              <p>Contenido de {e.nombrelayer}</p>
              
              <p>End: {e.end}</p>
              <p>Es360: {e.es360}</p>
              <p>AudioLayer: {e.Audiolayer}</p>
              <p>TextoLayer: {e.textolayer}</p>
              <p>TextoLayer2: {e.textolayer2}</p>
              <p>TextoLayer3: {e.textolayer3}</p>
              <p>TextoLayer4: {e.textolayer4}</p>
              <p>TextoLayer5: {e.textolayer5}</p>
              
              <p>TituloLayer: {e.titulolayer}</p>
              <button  ><Link className='btn-Ingresar' to={"/"+id+"/Bienvenida/"+e.id+"/360"}>Ingresar a 360 de {e.id}</Link> </button>
            
              
          
        </div>
        
        
    
    


      </div>)}
      </div>
      
        
    </Page>
  )
}
