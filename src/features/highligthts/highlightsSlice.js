
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

import { getHighlights } from "../../firebase"

const initialState ={
    highlights:[],
    loading:false
}

export const obtenerHighlights = createAsyncThunk("highlights", async (data)=>{
    const highlights = await getHighlights(data)
    return highlights
})


const highlightsSlice = createSlice({
    name:"highlights",
    initialState,
    extraReducers(builder){
        builder.addCase(obtenerHighlights.pending,(state)=>{
            state.loading = true
        }).addCase(obtenerHighlights.fulfilled,(state,action)=>{
            state.highlights = action.payload
            state.loading = false
        })
    }
})

export default highlightsSlice.reducer