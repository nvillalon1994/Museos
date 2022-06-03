import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

import { getMuntref_Link} from "../../firebase"

const initialState ={
    muntrefLinks:[],
    loading:false
}

export const obtenerMuntref_Links = createAsyncThunk("muntrefLinks", async (id)=>{
    const muntrefLinks = await getMuntref_Link(id)
    
    return muntrefLinks
})


const muntrefLinksSlice = createSlice({
    name:"muntrefLinks",
    initialState,
    extraReducers(builder){
        builder.addCase(obtenerMuntref_Links.pending,(state)=>{
            state.loading = true
        }).addCase(obtenerMuntref_Links.fulfilled,(state,action)=>{
            state.muntrefLinks = action.payload
            state.loading = false
        })
    }
})

export default muntrefLinksSlice.reducer