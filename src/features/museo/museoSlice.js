
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

import { getMuseum } from "../../firebase"

const initialState ={
    museo:{},
    bienvenida:[],
    loading:false
}

export const obtenerMuseo = createAsyncThunk("museo", async (id,thunkAPI)=>{
    const state = thunkAPI.getState()
    const museoscol =state.museos.museosCol
    const museo = await getMuseum(id,museoscol)
    console.log("se ejecuta")
    return museo
    
})



const museoSlice = createSlice({
    name:"museo",
    
    initialState,
    extraReducers(builder){
        builder.addCase(obtenerMuseo.pending,(state)=>{
            state.loading = true
        }).addCase(obtenerMuseo.fulfilled,(state,action)=>{
            state.museo = action.payload
            state.loading = false
        })
    }
})

export default museoSlice.reducer