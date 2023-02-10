
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

import { getMuseums } from "../../firebase"

const initialState ={
    museos:[],
    loading:false,
    museosCol:"museos",
    highCol:"highlight"
}

export const obtenerMuseos = createAsyncThunk("museos", async (museosCol)=>{
    console.log(museosCol)
    const museos = await getMuseums(museosCol)
    return {museos,museosCol}
})


const museosSlice = createSlice({
    name:"museos",
    initialState,
    extraReducers(builder){
        builder.addCase(obtenerMuseos.pending,(state)=>{
            state.loading = true
        }).addCase(obtenerMuseos.fulfilled,(state,action)=>{
            console.log(action.payload.museosCol)
            state.museos = action.payload.museos
            state.loading = false
            state.museosCol= action.payload.museosCol
            if(state.museosCol=="museos"){
                state.highCol="highlight"
            }else{
                state.highCol="highlightE"
            }

        })
    }
})

export default museosSlice.reducer