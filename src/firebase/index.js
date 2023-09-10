import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {getAuth,createUserWithEmailAndPassword, onAuthStateChanged,signOut, signInWithEmailAndPassword } from 'firebase/auth'
import credentials from "./credentials"
import { getStorage } from "firebase/storage";

import {addDoc, collection,doc,getDocs ,setDoc,getDoc,updateDoc ,onSnapshot,deleteDoc} from 'firebase/firestore'
import {ref ,uploadBytes,getDownloadURL} from 'firebase/storage'
import { useNavigate } from 'react-router-dom';






export const app = initializeApp(credentials)
export const storage = getStorage(app)
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
export async function getMuseums(museos){
    console.log(typeof(museos))
    // const MuseosCol = collection(db,museo)
    const MuseosCol = collection(db,museos)
    const id = "Untref museo"
    console.log(MuseosCol)
    // const BienvenidaCol = collection(db,museosCol + '/'+id+"/bienvenido")
    // const BienvenidaCol = collection(db, "/"+museo+"/"+id+"/bienvenido")
    
    const snapshot = await getDocs(MuseosCol)
    console.log()
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}

export async function createLayer(id,idLayer,museosCol){
    const infoLayer={
        audiolayer:"https://firebasestorage.googleapis.com/v0/b/museum-view-test.appspot.com/o/audioguias%2FViaje%20videos%20marcelo%20tango.mp3?alt=media&token=813e2361-c6ed-493f-b016-82315f7c2e1a",
        es360:"si",
        imglayer:"https://images.unsplash.com/photo-1617257118084-339d30c49b02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        
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
    setDoc(doc(db,museosCol + '/'+id+'/bienvenido',idLayer),infoLayer)
    setDoc(doc(db,museosCol + '/'+id+'/bienvenido/'+idLayer+'/360',"1a_panorama1"),info360)
}

export async function deleteLayer(id,idLayer,museosCol){
    deleteDoc(doc(db, museosCol + '/'+id+"/bienvenido",idLayer))
}

export async function createPanorama(id,idLayer,idPan,museosCol){
    const info360 = {
        
        "360panorama":"https://images.unsplash.com/photo-1534445291134-f70b7a81f691?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"

    }
    setDoc(doc(db,museosCol + '/'+id+'/bienvenido/'+idLayer+'/360',idPan),info360)
}

export async function deletePan(id,idLayer,idPan,museosCol){
    deleteDoc(doc(db, museosCol + '/'+id+"/bienvenido/"+idLayer+"/360",idPan))
}



export async function createRecorrido(id,idRecorrido, nombre,museosCol){
    const infoColRecorrido={
        audioreco:"https://firebasestorage.googleapis.com/v0/b/museum-view-test.appspot.com/o/Audioguias%2FViaje%20videos%20marcelo%20tango.mp3?alt=media&token=813e2361-c6ed-493f-b016-82315f7c2e1a",
        colorreco:"colorreco",
        colorreco2:"colorreco2",
        colorreco3:"colorreco3",
        colorreco4:"colorreco4",
        colorreco5:"colorreco5",
        imgreco:"https://images.unsplash.com/photo-1617257118084-339d30c49b02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        nombrereco:nombre

    }
    const infoMuestra={
        audioobra:"https://firebasestorage.googleapis.com/v0/b/museum-view-test.appspot.com/o/audioguias%2FViaje%20videos%20marcelo%20tango.mp3?alt=media&token=813e2361-c6ed-493f-b016-82315f7c2e1a",
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
    setDoc(doc(db,museosCol + '/'+id+'/recorrido',idRecorrido),infoColRecorrido)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/'+idRecorrido+'/muestras',"1a_muestra1"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/'+idRecorrido+'/muestras/1a_muestra1/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/'+idRecorrido+'/recursos',"1a_recurso1"),infoRecurso)
}
export async function deleteRecorrido(id,idRecorrido,museosCol){
    deleteDoc(doc(db, museosCol + '/'+id+"/recorrido",idRecorrido))
}

export async function createMuestra(id,idRecorrido,idMuestra,nombre,museosCol){
    const infoMuestra={
        audioobra:"https://firebasestorage.googleapis.com/v0/b/museum-view-test.appspot.com/o/Audioguias%2FViaje%20videos%20marcelo%20tango.mp3?alt=media&token=813e2361-c6ed-493f-b016-82315f7c2e1a",
        auto:"autor",
        descmuestra1:"descmuestra1",
        descmuestra2:"descmuestra2",
        descmuestra3:"descmuestra3",
        descmuestra4:"descmuestra4",
        descmuestra5:"descmuestra5",
        gallery:false,
        historiadevida:false,
        imgautor:"https://images.unsplash.com/photo-1613483811459-1c4bb7a234f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        imgmuestra:"https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        infoautor:"infoautor",
        nombremuestra:nombre,
        vid:false

    }
    const infoObra ={
        nombreobra:"nombreobra",
        nombreobra2:"nombreobra2",
        nombreobra3:"nombreobra3",
        nombreobra4:"nombreobra4",
        nombreobra5:"nombreobra5",
        urlobra:"urlObra"
    }
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/'+idRecorrido+'/muestras',idMuestra),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/'+idRecorrido+'/muestras/'+idMuestra+'/obrasimg',"1a_obra1"),infoObra)
}
export async function deleteMuestra(id,idRecorrido,idMuestra,museosCol){
    deleteDoc(doc(db, museosCol + '/'+id+"/recorrido/"+idRecorrido+"/muestras/",idMuestra))
}

export async function createObra(id,idRecorrido,idMuestra,idObra,museosCol){
    const infoObra ={
        nombreobra:"nombreobra",
        nombreobra2:"nombreobra2",
        nombreobra3:"nombreobra3",
        nombreobra4:"nombreobra4",
        nombreobra5:"nombreobra5",
        urlobra:"urlObra"
    }
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/'+idRecorrido+'/muestras/'+idMuestra+'/obrasimg',idObra),infoObra)
}
export async function deleteObra(id,idRecorrido,idMuestra,idObra,museosCol){
    deleteDoc(doc(db, museosCol + '/'+id+"/recorrido/"+idRecorrido+"/muestras/"+idMuestra+'/obrasimg',idObra))
}

export async function createRecurso(id,idRecorrido,idRecurso,nombre,museosCol){
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
        recutitulo:nombre,
        
    }
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/'+idRecorrido+'/recursos',idRecurso),infoRecurso)
}
export async function deleteRecurso(id,idRecorrido,idRecurso,museosCol){
    deleteDoc(doc(db, museosCol + '/'+id+"/recorrido/"+idRecorrido+"/recursos/",idRecurso))
}


export async function createLink(id,idLink,museosCol){
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
        nlinksmp:"nlinksmp",
        urllinksmp:"urllinksmp"

    }
    setDoc(doc(db,museosCol + '/'+id+'/muntref_link',idLink),infoCollinks)
    setDoc(doc(db,museosCol + '/'+id+'/muntref_link/'+idLink+'/linksmp',"1a_link1"),infoColLinksMP)
}
export async function deleteLink(id,idLink,museosCol){
    deleteDoc(doc(db, museosCol + '/'+id+"/muntref_link",idLink))
}
export async function createlinksmp(id,idLink,idlinksmp,museosCol){
    const infoColLinksMP={
        nlinksmp:"nlinksmp",
        urllinksmp:"urllinksmp"

    }
    setDoc(doc(db,museosCol + '/'+id+'/muntref_link/'+idLink+'/linksmp',idlinksmp),infoColLinksMP)
}
export async function deletelinksmp(id,idLink,idlinksmp,museosCol){
    deleteDoc(doc(db, museosCol + '/'+id+"/muntref_link/"+idLink+"/linksmp",idlinksmp))
}





export async function createMuseums(id,museosCol){
    // bienvenida
    
    const infoMuseo ={
        acerca: true,
        descripcion:"Descripción",
        direccion:"direccion",
        horario:"9am a 4pm",
        imgmain:"https://images.unsplash.com/photo-1617257118084-339d30c49b02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        imgmuseo:"https://images.unsplash.com/photo-1566534491166-1c89d1e949f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1008&q=80",
        logomuseo:"LOGO",
        nombre:id,
        organizacion:"Untref",
        reco:true,
        tressesenta:true
    }
    
    // Muntref_Link
    
    //SE CREA EL MUSEO
    setDoc(doc(db,museosCol,id),
    infoMuseo)
    // setDoc(collection(db,museosCol + '/'+id+'/Bienvenido'),primerInfo)
    //RAMA BIENVENIDO
    const infoLayer={
        audiolayer:"https://firebasestorage.googleapis.com/v0/b/museum-view-test.appspot.com/o/Audioguias%2FViaje%20videos%20marcelo%20tango.mp3?alt=media&token=813e2361-c6ed-493f-b016-82315f7c2e1a",
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
    
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido',"1a_layer1"),infoLayer)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido',"1a_layer2"),infoLayer)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido',"1a_layer3"),infoLayer)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido',"1a_layer4"),infoLayer)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido',"1a_layer5"),infoLayer)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido',"1a_layer6"),infoLayer)
    
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer1/360',"1a_panorama1"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer1/360',"1a_panorama2"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer1/360',"1a_panorama3"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer1/360',"1a_panorama4"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer2/360',"1a_panorama1"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer2/360',"1a_panorama2"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer2/360',"1a_panorama3"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer2/360',"1a_panorama4"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer3/360',"1a_panorama1"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer3/360',"1a_panorama2"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer3/360',"1a_panorama3"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer3/360',"1a_panorama4"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer4/360',"1a_panorama1"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer4/360',"1a_panorama2"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer4/360',"1a_panorama3"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer4/360',"1a_panorama4"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer5/360',"1a_panorama1"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer5/360',"1a_panorama2"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer5/360',"1a_panorama3"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer5/360',"1a_panorama4"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer6/360',"1a_panorama1"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer6/360',"1a_panorama2"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer6/360',"1a_panorama3"),info360)
    setDoc(doc(db,museosCol+'/'+id+'/bienvenido/1a_layer6/360',"1a_panorama4"),info360)

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
        nlinksmp:"nlinksmp",
        urllinksmp:"urllinksmp"

    }
    setDoc(doc(db,museosCol + '/'+id+'/muntref_link',"1a_link1"),infoCollinks)
    setDoc(doc(db,museosCol + '/'+id+'/muntref_link',"1a_link2"),infoCollinks)
    setDoc(doc(db,museosCol + '/'+id+'/muntref_link',"1a_link3"),infoCollinks)

    

    setDoc(doc(db,museosCol + '/'+id+'/muntref_link/1a_link1/linksmp',"1a_link1"),infoColLinksMP)
    setDoc(doc(db,museosCol + '/'+id+'/muntref_link/1a_link2/linksmp',"1a_link1"),infoColLinksMP)
    setDoc(doc(db,museosCol + '/'+id+'/muntref_link/1a_link3/linksmp',"1a_link1"),infoColLinksMP)


    //RAMA RECORRIDO
    const infoColRecorrido={
        audioreco:"https://firebasestorage.googleapis.com/v0/b/museum-view-test.appspot.com/o/Audioguias%2FViaje%20videos%20marcelo%20tango.mp3?alt=media&token=813e2361-c6ed-493f-b016-82315f7c2e1a",
        colorreco:"colorreco",
        colorreco2:"colorreco2",
        colorreco3:"colorreco3",
        colorreco4:"colorreco4",
        colorreco5:"colorreco5",
        imgreco:"https://images.unsplash.com/photo-1617257118084-339d30c49b02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        nombrereco:"nombrereco"

    }
    const infoMuestra={
        audioobra:"https://firebasestorage.googleapis.com/v0/b/museum-view-test.appspot.com/o/Audioguias%2FViaje%20videos%20marcelo%20tango.mp3?alt=media&token=813e2361-c6ed-493f-b016-82315f7c2e1a",
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
        recuvid:"B9vekk79LNo"
    }
    

    setDoc(doc(db,museosCol + '/'+id+'/recorrido',"1a_viaje"),infoColRecorrido)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido',"1b_arribo"),infoColRecorrido)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido',"1c_insercion"),infoColRecorrido)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido',"1d_legado"),infoColRecorrido)
    //EL VIAJE
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras',"1a_muestra1"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras',"1a_muestra2"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras',"1a_muestra3"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras',"1a_muestra4"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras',"1a_muestra5"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras',"1a_muestra6"),infoMuestra)

    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras/1a_muestra1/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras/1a_muestra1/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras/1a_muestra2/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras/1a_muestra2/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras/1a_muestra3/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras/1a_muestra3/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras/1a_muestra4/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras/1a_muestra4/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras/1a_muestra5/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras/1a_muestra5/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras/1a_muestra6/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/muestras/1a_muestra6/obrasimg',"1a_obra2"),infoObra)

    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/recursos',"1a_recurso1"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/recursos',"1a_recurso2"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/recursos',"1a_recurso3"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/recursos',"1a_recurso4"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/recursos',"1a_recurso5"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1a_viaje/recursos',"1a_recurso6"),infoRecurso)
    //ARRIBO
    
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras',"1a_muestra1"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras',"1a_muestra2"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras',"1a_muestra3"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras',"1a_muestra4"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras',"1a_muestra5"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras',"1a_muestra6"),infoMuestra)

    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras/1a_muestra1/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras/1a_muestra1/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras/1a_muestra2/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras/1a_muestra2/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras/1a_muestra3/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras/1a_muestra3/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras/1a_muestra4/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras/1a_muestra4/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras/1a_muestra5/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras/1a_muestra5/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras/1a_muestra6/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/muestras/1a_muestra6/obrasimg',"1a_obra2"),infoObra)

    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/recursos',"1a_recurso1"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/recursos',"1a_recurso2"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/recursos',"1a_recurso3"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/recursos',"1a_recurso4"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/recursos',"1a_recurso5"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1b_arribo/recursos',"1a_recurso6"),infoRecurso)

    //INSERCION

    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras',"1a_muestra1"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras',"1a_muestra2"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras',"1a_muestra3"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras',"1a_muestra4"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras',"1a_muestra5"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras',"1a_muestra6"),infoMuestra)

    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras/1a_muestra1/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras/1a_muestra1/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras/1a_muestra2/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras/1a_muestra2/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras/1a_muestra3/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras/1a_muestra3/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras/1a_muestra4/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras/1a_muestra4/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras/1a_muestra5/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras/1a_muestra5/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras/1a_muestra6/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/muestras/1a_muestra6/obrasimg',"1a_obra2"),infoObra)

    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/recursos',"1a_recurso1"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/recursos',"1a_recurso2"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/recursos',"1a_recurso3"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/recursos',"1a_recurso4"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/recursos',"1a_recurso5"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1c_insercion/recursos',"1a_recurso6"),infoRecurso)

    //LEGADO

    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras',"1a_muestra1"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras',"1a_muestra2"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras',"1a_muestra3"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras',"1a_muestra4"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras',"1a_muestra5"),infoMuestra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras',"1a_muestra6"),infoMuestra)

    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras/1a_muestra1/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras/1a_muestra1/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras/1a_muestra2/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras/1a_muestra2/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras/1a_muestra3/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras/1a_muestra3/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras/1a_muestra4/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras/1a_muestra4/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras/1a_muestra5/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras/1a_muestra5/obrasimg',"1a_obra2"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras/1a_muestra6/obrasimg',"1a_obra1"),infoObra)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/muestras/1a_muestra6/obrasimg',"1a_obra2"),infoObra)

    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/recursos',"1a_recurso1"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/recursos',"1a_recurso2"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/recursos',"1a_recurso3"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/recursos',"1a_recurso4"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/recursos',"1a_recurso5"),infoRecurso)
    setDoc(doc(db,museosCol + '/'+id+'/recorrido/1d_legado/recursos',"1a_recurso6"),infoRecurso)

 
}


export const deleteMuseum = (id,museosCol)=> {
    deleteDoc(doc(db, museosCol ,id))
    
}

// export  const getMuseum =async(id)=>{
//    const museo = await getDoc(doc(db, "museos",id))
//    return museo
// } 
export  const getMuseum =async(id,museosCol)=>{
    console.log(museosCol)
   const museo = await getDoc(doc(db, museosCol,id))
   console.log(id)
   return {...museo.data(),id:id}
//    console.log(museo.data())
} 

export const updateMuseum = (id,newFields,museosCol)=> updateDoc(doc(db,museosCol,id),newFields)

export const onGetMuseum = (callback)=>{ 
    onSnapshot(collection(db,'museos'),callback)
    console.log("se ejecuto")
}

// BIENVENIDA 
export async function getBienvenido(id,museosCol){
    const BienvenidaCol = collection(db,museosCol+"/"+id+"/bienvenido")
    const snapshot = await getDocs(BienvenidaCol)
    console.log("estas aca")
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const updateBienvenidaLayer = (id,idLayer,newFields,museosCol)=> updateDoc(doc(db,museosCol + '/'+id+"/bienvenido/"+idLayer),newFields)
// BIENVENIDA/360
export async function get360(idMuseo,idLayer,museosCol){
    
    const PanoramasCol = collection(db,museosCol+"/"+idMuseo+"/bienvenido/"+idLayer+"/360")
    const snapshot = await getDocs(PanoramasCol)
    
    
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const update360Panorama = (idMuseo,idLayer,idPanorama,newFields,museosCol)=> updateDoc(doc(db,museosCol + '/'+idMuseo+"/bienvenido/"+idLayer+"/360/"+idPanorama),newFields)

//Muntref_link
export async function getMuntref_Link(id,museosCol){
    const Muntref_LinkCol = collection(db,museosCol+"/"+id+"/muntref_link")
    const snapshot = await getDocs(Muntref_LinkCol)
    
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const updateLink = (id,idLink,newFields,museosCol)=> updateDoc(doc(db,museosCol + '/'+id+"/muntref_link/"+idLink),newFields)

//Muntref_Link/linksmp

export async function getlinksmp(idMuseo,idLink,museosCol){
    console.log(idMuseo,idLink)
    const LinkCol = collection(db,museosCol+"/"+idMuseo+"/muntref_link/"+idLink+"/linksmp")
    const snapshot = await getDocs(LinkCol)
    
    // console.log(snapshot.docs.map((documento)=>({...documento.data(),id:documento.id})))
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const updatelinksmp = (idMuseo,idLink,idlinksmp,newFields,museosCol)=> updateDoc(doc(db,museosCol + '/'+idMuseo+"/muntref_link/"+idLink+"/linksmp/"+idlinksmp),newFields)
//Recorrido
export async function getRecorrido(id,museosCol){
    const RecorridoCol = collection(db,museosCol+"/"+id+"/recorrido")
    const snapshot = await getDocs(RecorridoCol)
    
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const updateRecorrido = (id,idRecorrido,newFields,museosCol)=> updateDoc(doc(db,museosCol + '/'+id+"/recorrido/"+idRecorrido),newFields)

//Recorrido/Recursos

export async function getRecursos(idMuseo,idRecorrido,museosCol){
    
    const recursosCol = collection(db,museosCol+"/"+idMuseo+"/recorrido/"+idRecorrido+"/recursos")
    const snapshot = await getDocs(recursosCol)
    // console.log(idRecorrido)
    // console.log(snapshot.docs.map((documento)=>({...documento.data(),id:documento.id})))
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const updateRecurso = (idMuseo,idRecorrido,idRecurso,newFields,museosCol)=> updateDoc(doc(db,museosCol + "/"+idMuseo+"/recorrido/"+idRecorrido+"/recursos/"+idRecurso),newFields)
// Recorrido/muestras
export async function getMuestras(idMuseo,idRecorrido,museosCol){
    
    const muestrasCol = collection(db,museosCol+"/"+idMuseo+"/recorrido/"+idRecorrido+"/muestras")
    const snapshot = await getDocs(muestrasCol)
    
    console.log(snapshot.docs.map((documento)=>({...documento.data(),id:documento.id})))
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const updateMuesta = (id,idRecorrido,idMuestra,newFields,museosCol)=> {
    console.log(id,idRecorrido,idMuestra,newFields)
    // updateDoc(doc(db,museosCol + '/'+id+"/recorrido/"+idRecorrido+"/muestras/"+idMuestra),newFields)
    updateDoc(doc(db,museosCol + '/'+id+"/recorrido/"+idRecorrido+"/muestras/"+idMuestra),newFields)
    
    console.log()
}

export async function getObras(idMuseo,idRecorrido,idMuestra,museosCol){
    
    const obrasCol = collection(db,museosCol+"/"+idMuseo+"/recorrido/"+idRecorrido+"/muestras/"+idMuestra+"/obrasimg")
    const snapshot = await getDocs(obrasCol)
    
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}
export const updateObra = (idMuseo,idRecorrido,idMuestra,idObra,newFields,museosCol)=> {
    console.log(idMuseo,idRecorrido,idMuestra,idObra,newFields)
    updateDoc(doc(db,museosCol + '/'+idMuseo+"/recorrido/"+idRecorrido+"/muestras/"+idMuestra+"/obrasimg/"+idObra),newFields)
}


export const updateMuseum2 = (id,newFields,museosCol)=> updateDoc(doc(db,museosCol,id),newFields)


export async function getHighlights(highCol){
    
    // const MuseosCol = collection(db,museo)
    const HighlightsCol = collection(db,highCol)
    
    // const BienvenidaCol = collection(db,museosCol + '/'+id+"/bienvenido")
    // const BienvenidaCol = collection(db, "/"+museo+"/"+id+"/bienvenido")
    
    const snapshot = await getDocs(HighlightsCol)
    console.log()
    return snapshot.docs.map((documento)=>({...documento.data(),id:documento.id}))
    
}



export const updateHighlight = (id,newFields,highCol)=>{ 
    console.log(highCol)
    updateDoc(doc(db,highCol,id),newFields)
}

export const createHighlight = (highCol,idHigh,infoHigh)=>{
    setDoc(doc(db,highCol,idHigh),infoHigh)
}
export const deleteHighlight = (highCol,idHigh)=>{
    deleteDoc(doc(db, highCol ,idHigh))
}

