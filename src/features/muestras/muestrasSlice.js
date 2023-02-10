import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

import { getMuestras } from "../../firebase"

const initialState ={
    muestras:[],
    loading:false
}

export const obtenerMuestras = createAsyncThunk("muestras", async (info,thunkAPI)=>{
    const state =thunkAPI.getState()
    const museoscol = state.museos.museosCol
    
    console.log(info)
    const idMuseo = info.id
    const idRecorrido = info.idRecorrido
    console.log("estas en muestra")
    const muestras = await getMuestras(idMuseo,idRecorrido,museoscol)
    
    
    return muestras
})


const muestrasSlice = createSlice({
    name:"muestras",
    initialState,
    extraReducers(builder){
        builder.addCase(obtenerMuestras.pending,(state)=>{
            state.loading = true
        }).addCase(obtenerMuestras.fulfilled,(state,action)=>{
            state.muestras = action.payload
            state.loading = false
        })
    }
})

export default muestrasSlice.reducer