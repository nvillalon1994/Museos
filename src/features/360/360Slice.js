import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

import { get360 } from "../../firebase"

const initialState ={
    panoramas:[],
    loading:false
}

export const obtenerPanoramas = createAsyncThunk("panoramas", async (info,thunkAPI)=>{
    const state =thunkAPI.getState()
    const museoscol = state.museos.museosCol
    
    
    const idMuseo = info.idMuseo
    const idLayer = info.idLayer
    const panoramas = await get360(idMuseo,idLayer,museoscol)
    
    return panoramas
})


const panoramasSlice = createSlice({
    name:"panoramas",
    initialState,
    extraReducers(builder){
        builder.addCase(obtenerPanoramas.pending,(state)=>{
            state.loading = true
        }).addCase(obtenerPanoramas.fulfilled,(state,action)=>{
            state.panoramas = action.payload
            state.loading = false
        })
    }
})

export default panoramasSlice.reducer