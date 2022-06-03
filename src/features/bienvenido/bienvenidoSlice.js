import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

import { getBienvenido, getMuseums } from "../../firebase"

const initialState ={
    bienvenido:[],
    loading:false
}

export const obtenerBienvenido = createAsyncThunk("bienvenido", async (id)=>{
    const bienvenido = await getBienvenido(id)
    console.log("se ejecuta")
    return bienvenido
})


const bienvenidoSlice = createSlice({
    name:"bienvenido",
    initialState,
    extraReducers(builder){
        builder.addCase(obtenerBienvenido.pending,(state)=>{
            state.loading = true
        }).addCase(obtenerBienvenido.fulfilled,(state,action)=>{
            state.bienvenido = action.payload
            state.loading = false
        })
    }
})

export default bienvenidoSlice.reducer