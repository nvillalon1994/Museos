import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

import {getlinksmp } from "../../firebase"

const initialState ={
    linksmp:[],
    loading:false
}

export const obtenerLinksmp = createAsyncThunk("linksmp", async (info,thunkAPI)=>{
    
    const state =thunkAPI.getState()
    const museoscol = state.museos.museosCol
    
    const idMuseo = info.id
    
    const idLink = info.idLink
    console.log(idMuseo,idLink)
    const linksmp = await getlinksmp(idMuseo,idLink,museoscol)
    console.log(linksmp)
    
    return linksmp
})


const linksmpSlice = createSlice({
    name:"linksmp",
    initialState,
    extraReducers(builder){
        builder.addCase(obtenerLinksmp.pending,(state)=>{
            state.loading = true
        }).addCase(obtenerLinksmp.fulfilled,(state,action)=>{
            state.linksmp = action.payload
            state.loading = false
        })
    }
})

export default linksmpSlice.reducer