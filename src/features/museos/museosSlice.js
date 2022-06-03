
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

import { getMuseums } from "../../firebase"

const initialState ={
    museos:[],
    loading:false
}

export const obtenerMuseos = createAsyncThunk("museos", async ()=>{
    const museos = await getMuseums()
    return museos
})


const museosSlice = createSlice({
    name:"museos",
    initialState,
    extraReducers(builder){
        builder.addCase(obtenerMuseos.pending,(state)=>{
            state.loading = true
        }).addCase(obtenerMuseos.fulfilled,(state,action)=>{
            state.museos = action.payload
            state.loading = false
        })
    }
})

export default museosSlice.reducer