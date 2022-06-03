import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {getAuth,createUserWithEmailAndPassword, onAuthStateChanged,signOut, signInWithEmailAndPassword } from 'firebase/auth'
import credentials from "./credentials"
import { getStorage } from "firebase/storage";

import {addDoc, collection,doc,getDocs ,setDoc,getDoc,updateDoc ,onSnapshot,deleteDoc} from 'firebase/firestore'
import {ref ,uploadBytes,getDownloadURL} from 'firebase/storage'
import { useNavigate } from 'react-router-dom';






export const app = initializeApp(credentials)

export const auth = getAuth(app)
export const db = getFirestore(app)


  export async function getRol(uid){
    const docuRef = doc(db,`usuarios/${uid}`)
    const docuCifrada = await getDoc(docuRef)
    const docuFinal ={rol:docuCifrada.data().rol,museo:docuCifrada.data().museo}
    return docuFinal
  }
  export async function registrarUsuario (email,password,rol,museo){
    const infoUsuario = await createUserWithEmailAndPassword(auth,email,password).then((usuarioFirebase)=>{
        return usuarioFirebase
    })
    console.log("esta en registro")
    const docuRef = doc(db,`usuarios/${infoUsuario.user.uid}`)
    setDoc(docuRef,{correo:email,rol:rol,museo:museo})
    

}

  

export function cambiarMuseo(museo1){
    let museo = "museosE"
    return museo
    
}
export async function getMuseums(){
    
    // const MuseosCol = collection(db,museo)
    const MuseosCol = collection(db,"MuseosPrueba")
    const id = "Untref museo"
    // const BienvenidaCol = collection(db,"MuseosPrueba/"+id+"/bienvenido")
    // const BienvenidaCol = collection(db, "/"+museo+"/"+id+"/bienvenido")
    
    const snapshot = await getDocs(MuseosCol)
    console.log()
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}


export async function createMuseums(id,info1,description){
    // bienvenida
    const infoMuseo ={
        Acerca: true,
        descripcion:"Descripción",
        direccion:"direccion",
        horario:"9am a 4pm",
        imgmain:"https://images.unsplash.com/photo-1617257118084-339d30c49b02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        imgmuseo:"https://images.unsplash.com/photo-1566534491166-1c89d1e949f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1008&q=80",
        logomuseo:"LOGO",
        nombre:id,
        organizacion:"Untref",
        reco:"reco",
        tressesenta:true
    }
    
    // Muntref_Link
    
    //SE CREA EL MUSEO
    setDoc(doc(db,'MuseosPrueba',id),
    infoMuseo)
    // setDoc(collection(db,'MuseosPrueba/'+id+'/Bienvenido'),primerInfo)
    //RAMA BIENVENIDO
    const infoLayer={
        Audiolayer:"audioLayer",
        es360:"si",
        imglayer:"https://images.unsplash.com/photo-1617257118084-339d30c49b02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        end:"end",
        nombrelayer:"nombrelayer",
        textolayer:"textolayer",
        textolayer2:"textolayer2",
        textolayer3:"textolayer3",
        textolayer4:"textolayer4",
        textolayer5:"textolayer5",
        titulolayer:"titulolayer"
    }
    const info360 = {
        
        "360panorama":"panorama"

    }
    
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido',"1a_layer1"),infoLayer)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido',"1a_layer2"),infoLayer)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido',"1a_layer3"),infoLayer)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido',"1a_layer4"),infoLayer)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido',"1a_layer5"),infoLayer)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido',"1a_layer6"),infoLayer)
    
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer1/360',"1a_panorama_1"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer1/360',"1a_panorama_2"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer1/360',"1a_panorama_3"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer1/360',"1a_panorama_4"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer2/360',"1a_panorama_1"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer2/360',"1a_panorama_2"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer2/360',"1a_panorama_3"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer2/360',"1a_panorama_4"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer3/360',"1a_panorama_1"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer3/360',"1a_panorama_2"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer3/360',"1a_panorama_3"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer3/360',"1a_panorama_4"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer4/360',"1a_panorama_1"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer4/360',"1a_panorama_2"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer4/360',"1a_panorama_3"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer4/360',"1a_panorama_4"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer5/360',"1a_panorama_1"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer5/360',"1a_panorama_2"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer5/360',"1a_panorama_3"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer5/360',"1a_panorama_4"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer6/360',"1a_panorama_1"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer6/360',"1a_panorama_2"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer6/360',"1a_panorama_3"),info360)
    setDoc(doc(db,'MuseosPrueba/'+id+'/bienvenido/1a_layer6/360',"1a_panorama_4"),info360)

    //RAMA MUNTREF_LINK
    
    const infoCollinks ={
        desclink:"descklink",
        imglink:"imglink",
        nboton:"nboton",
        nombrelink:"nombrelink",
        textlink:"textlink",
        textlink2:"textlink2",
        textlink3:"textlink3",
        textlink4:"textlink4",
        textlink5:"textlink5",
        urllink:"urllink"
    }
    const infoColLinksMP={
        nlinkmp:"nlinkmp",
        urllinkmp:"urllinkmp"

    }
    setDoc(doc(db,'MuseosPrueba/'+id+'/muntref_link',"1a_link1"),infoCollinks)
    setDoc(doc(db,'MuseosPrueba/'+id+'/muntref_link',"1a_link2"),infoCollinks)
    setDoc(doc(db,'MuseosPrueba/'+id+'/muntref_link',"1a_link3"),infoCollinks)

    

    setDoc(doc(db,'MuseosPrueba/'+id+'/muntref_link/1a_link1/linkmp',"1a_link1"),infoColLinksMP)
    setDoc(doc(db,'MuseosPrueba/'+id+'/muntref_link/1a_link2/linkmp',"1a_link1"),infoColLinksMP)
    setDoc(doc(db,'MuseosPrueba/'+id+'/muntref_link/1a_link3/linkmp',"1a_link1"),infoColLinksMP)


    //RAMA RECORRIDO
    const infoColRecorrido={
        audioreco:"audioreco",
        colorreco:"colorreco",
        colorreco2:"colorreco2",
        colorreco3:"colorreco3",
        colorreco4:"colorreco4",
        colorreco5:"colorreco5",
        imgreco:"https://images.unsplash.com/photo-1617257118084-339d30c49b02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        nombrereco:"nombrereco"

    }
    const infoMuestra={
        audioObra:"insertarAudio",
        auto:"autor",
        descmuestra1:"descmuestra1",
        descmuestra2:"descmuestra2",
        descmuestra3:"descmuestra3",
        descmuestra4:"descmuestra4",
        descmuestra5:"descmuestra5",
        gallery:true,
        historiadevida:true,
        imgautor:"https://images.unsplash.com/photo-1613483811459-1c4bb7a234f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        imgmuestra:"https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        infoautor:"infoautor",
        nombremuestra:"nombreMuestra",
        vid:"vid"

    }
    const infoObra ={
        nombreobra:"nombreobra",
        nombreobra2:"nombreobra2",
        nombreobra3:"nombreobra3",
        nombreobra4:"nombreobra4",
        nombreobra5:"nombreobra5",
        urlobra:"urlObra"
    }
    const infoRecurso ={
        recuimg:"https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        recutexto:"recutexto",
        recutexto2:"recutexto2",
        recutexto3:"recutexto3",
        recutexto4:"recutexto4",
        recutexto5:"recutexto5",
        recutextobottom:"recutextobottom",
        recutextobottom2:"recutextobottom2",
        recutextobottom3:"recutextobottom3",
        recutextobottom4:"recutextobottom4",
        recutextobottom5:"recutextobottom5",
        recutitulo:"recutitulo",
        recuvid:"recuvid"
    }
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido',"1a_Viaje"),infoColRecorrido)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido',"1b_Arribo"),infoColRecorrido)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido',"1c_Inserción"),infoColRecorrido)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido',"1d_Legado"),infoColRecorrido)
    //EL VIAJE
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras',"1a_muestra1"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras',"1a_muestra2"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras',"1a_muestra3"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras',"1a_muestra4"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras',"1a_muestra5"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras',"1a_muestra6"),infoMuestra)

    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras/1a_muestra1/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras/1a_muestra1/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras/1a_muestra2/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras/1a_muestra2/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras/1a_muestra3/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras/1a_muestra3/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras/1a_muestra4/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras/1a_muestra4/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras/1a_muestra5/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras/1a_muestra5/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras/1a_muestra6/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/muestras/1a_muestra6/obrasimg',"1a_obra2"),infoObra)

    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/recursos',"1a_recurso1"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/recursos',"1a_recurso2"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/recursos',"1a_recurso3"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/recursos',"1a_recurso4"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/recursos',"1a_recurso5"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1a_Viaje/recursos',"1a_recurso6"),infoRecurso)
    //ARRIBO
    
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras',"1a_muestra1"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras',"1a_muestra2"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras',"1a_muestra3"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras',"1a_muestra4"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras',"1a_muestra5"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras',"1a_muestra6"),infoMuestra)

    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras/1a_muestra1/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras/1a_muestra1/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras/1a_muestra2/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras/1a_muestra2/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras/1a_muestra3/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras/1a_muestra3/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras/1a_muestra4/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras/1a_muestra4/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras/1a_muestra5/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras/1a_muestra5/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras/1a_muestra6/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/muestras/1a_muestra6/obrasimg',"1a_obra2"),infoObra)

    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/recursos',"1a_recurso1"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/recursos',"1a_recurso2"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/recursos',"1a_recurso3"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/recursos',"1a_recurso4"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/recursos',"1a_recurso5"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1b_Arribo/recursos',"1a_recurso6"),infoRecurso)

    //INSERCION

    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras',"1a_muestra1"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras',"1a_muestra2"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras',"1a_muestra3"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras',"1a_muestra4"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras',"1a_muestra5"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras',"1a_muestra6"),infoMuestra)

    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras/1a_muestra1/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras/1a_muestra1/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras/1a_muestra2/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras/1a_muestra2/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras/1a_muestra3/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras/1a_muestra3/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras/1a_muestra4/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras/1a_muestra4/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras/1a_muestra5/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras/1a_muestra5/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras/1a_muestra6/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/muestras/1a_muestra6/obrasimg',"1a_obra2"),infoObra)

    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/recursos',"1a_recurso1"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/recursos',"1a_recurso2"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/recursos',"1a_recurso3"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/recursos',"1a_recurso4"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/recursos',"1a_recurso5"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1c_Inserción/recursos',"1a_recurso6"),infoRecurso)

    //LEGADO

    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras',"1a_muestra1"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras',"1a_muestra2"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras',"1a_muestra3"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras',"1a_muestra4"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras',"1a_muestra5"),infoMuestra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras',"1a_muestra6"),infoMuestra)

    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras/1a_muestra1/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras/1a_muestra1/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras/1a_muestra2/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras/1a_muestra2/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras/1a_muestra3/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras/1a_muestra3/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras/1a_muestra4/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras/1a_muestra4/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras/1a_muestra5/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras/1a_muestra5/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras/1a_muestra6/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/muestras/1a_muestra6/obrasimg',"1a_obra2"),infoObra)

    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/recursos',"1a_recurso1"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/recursos',"1a_recurso2"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/recursos',"1a_recurso3"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/recursos',"1a_recurso4"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/recursos',"1a_recurso5"),infoRecurso)
    setDoc(doc(db,'MuseosPrueba/'+id+'/recorrido/1d_Legado/recursos',"1a_recurso6"),infoRecurso)

 
}

export const deleteMuseum = (id)=> {
    deleteDoc(doc(db, "MuseosPrueba",id))
    
}

// export  const getMuseum =async(id)=>{
//    const museo = await getDoc(doc(db, "MuseosPrueba",id))
//    return museo
// } 
export  const getMuseum =async(id)=>{
   const museo = await getDoc(doc(db, "MuseosPrueba",id))
   console.log(id)
   return {...museo.data(),id:id}
//    console.log(museo.data())
} 

export const updateMuseum = (id,newFields)=> updateDoc(doc(db,"MuseosPrueba",id),newFields)

export const onGetMuseum = (callback)=>{ 
    onSnapshot(collection(db,'MuseosPrueba'),callback)
    console.log("se ejecuto")
}

// BIENVENIDA 
export async function getBienvenido(id){
    const BienvenidaCol = collection(db,"MuseosPrueba/"+id+"/bienvenido")
    const snapshot = await getDocs(BienvenidaCol)
    console.log("estas aca")
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const updateBienvenidaLayer = (id,idLayer,newFields)=> updateDoc(doc(db,"MuseosPrueba/"+id+"/bienvenido/"+idLayer),newFields)
// BIENVENIDA/360
export async function get360(idMuseo,idLayer){
    
    const PanoramasCol = collection(db,"MuseosPrueba/"+idMuseo+"/bienvenido/"+idLayer+"/360")
    const snapshot = await getDocs(PanoramasCol)
    
    
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const update360Panorama = (idMuseo,idLayer,idPanorama,newFields)=> updateDoc(doc(db,"MuseosPrueba/"+idMuseo+"/bienvenido/"+idLayer+"/360/"+idPanorama),newFields)

//Muntref_link
export async function getMuntref_Link(id){
    const Muntref_LinkCol = collection(db,"MuseosPrueba/"+id+"/muntref_link")
    const snapshot = await getDocs(Muntref_LinkCol)
    
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const updateLink = (id,idLink,newFields)=> updateDoc(doc(db,"MuseosPrueba/"+id+"/muntref_link/"+idLink),newFields)

//Muntref_Link/Linkmp

export async function getLinkmp(idMuseo,idLink){
    console.log(idMuseo,idLink)
    const LinkCol = collection(db,"MuseosPrueba/"+idMuseo+"/muntref_link/"+idLink+"/linksmp")
    const snapshot = await getDocs(LinkCol)
    
    // console.log(snapshot.docs.map((documento)=>({...documento.data(),id:documento.id})))
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const updateLinkmp = (idMuseo,idLink,idLinkmp,newFields)=> updateDoc(doc(db,"MuseosPrueba/"+idMuseo+"/muntref_link/"+idLink+"/linksmp/"+idLinkmp),newFields)
//Recorrido
export async function getRecorrido(id){
    const RecorridoCol = collection(db,"MuseosPrueba/"+id+"/recorrido")
    const snapshot = await getDocs(RecorridoCol)
    
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const updateRecorrido = (id,idRecorrido,newFields)=> updateDoc(doc(db,"MuseosPrueba/"+id+"/recorrido/"+idRecorrido),newFields)

//Recorrido/Recursos

export async function getRecursos(idMuseo,idRecorrido){
    
    const recursosCol = collection(db,"MuseosPrueba/"+idMuseo+"/recorrido/"+idRecorrido+"/recursos")
    const snapshot = await getDocs(recursosCol)
    // console.log(idRecorrido)
    // console.log(snapshot.docs.map((documento)=>({...documento.data(),id:documento.id})))
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const updateRecurso = (idMuseo,idRecorrido,idRecurso,newFields)=> updateDoc(doc(db,"MuseosPrueba/"+idMuseo+"/recorrido/"+idRecorrido+"/recursos/"+idRecurso),newFields)
// Recorrido/muestras
export async function getMuestras(idMuseo,idRecorrido){
    
    const muestrasCol = collection(db,"MuseosPrueba/"+idMuseo+"/recorrido/"+idRecorrido+"/muestras")
    const snapshot = await getDocs(muestrasCol)
    
    console.log(snapshot.docs.map((documento)=>({...documento.data(),id:documento.id})))
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const updateMuesta = (id,idRecorrido,idMuestra,newFields)=> {
    console.log(id,idRecorrido,idMuestra,newFields)
    // updateDoc(doc(db,"MuseosPrueba/"+id+"/recorrido/"+idRecorrido+"/muestras/"+idMuestra),newFields)
    updateDoc(doc(db,"MuseosPrueba/"+id+"/recorrido/"+idRecorrido+"/muestras/"+idMuestra),newFields)
    
    console.log()
}

export async function getObras(idMuseo,idRecorrido,idMuestra){
    
    const obrasCol = collection(db,"MuseosPrueba/"+idMuseo+"/recorrido/"+idRecorrido+"/muestras/"+idMuestra+"/obrasimg")
    const snapshot = await getDocs(obrasCol)
    
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const updateObra = (idMuseo,idRecorrido,idMuestra,idObra,newFields)=> {
    console.log(idMuseo,idRecorrido,idMuestra,idObra,newFields)
    updateDoc(doc(db,"MuseosPrueba/"+idMuseo+"/recorrido/"+idRecorrido+"/muestras/"+idMuestra+"/obrasimg/"+idObra),newFields)
}


export async function getHighlights(){
    
    // const MuseosCol = collection(db,museo)
    const HighlightsCol = collection(db,"highlight")
    
    // const BienvenidaCol = collection(db,"MuseosPrueba/"+id+"/bienvenido")
    // const BienvenidaCol = collection(db, "/"+museo+"/"+id+"/bienvenido")
    
    const snapshot = await getDocs(HighlightsCol)
    console.log()
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}



export const updateHighlight = (id,newFields)=> updateDoc(doc(db,"highlight",id),newFields)



export const updateMuseum2 = (id,newFields)=> updateDoc(doc(db,"MuseosPrueba",id),newFields)