import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

import { getBienvenido, getMuseums } from "../../firebase"

const initialState ={
    bienvenido:[],
    loading:false
}

export const obtenerBienvenido = createAsyncThunk("bienvenido", async (id,thunkAPI)=>{
    const state =thunkAPI.getState()
    const museoscol = state.museos.museosCol
    
    const bienvenido = await getBienvenido(id,museoscol)
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