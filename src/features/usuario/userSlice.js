import { async } from "@firebase/util"
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { signOut } from "firebase/auth"

import { auth, get360,getRol } from "../../firebase"

const initialState ={
    usuario:{},
    loading:false
}

export const obtenerUsuario = createAsyncThunk("usuario", async (usuarioFirebase)=>{
    
     const objeto =await getRol(usuarioFirebase.uid)
     
     
     const usuario = {
         email:usuarioFirebase.email,
         rol:objeto.rol,
         museo:objeto.museo
     }
     
     return usuario
     
    // const user=getRol(usuarioFirebase.uid)
    
    
})
export const logout = createAsyncThunk("usuario/logout",async ()=>{
    console.log("se deslogue")
    signOut(auth)
    // const usuario = {}
    // return usuario
})


const usuarioSlice = createSlice({
    name:"usuario",
    initialState,
    extraReducers(builder){
        builder.addCase(obtenerUsuario.pending,(state)=>{
            state.loading = true
        }).addCase(obtenerUsuario.fulfilled,(state,action)=>{
            state.usuario = action.payload
            state.loading = false
        })
        builder.addCase(logout.pending,(state)=>{
            state.loading = true
        }).addCase(logout.fulfilled,(state,action)=>{
            state.usuario = {}
            state.loading = false
        })
    }
})

export default usuarioSlice.reducer