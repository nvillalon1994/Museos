import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

import { getObras } from "../../firebase"

const initialState ={
    obras:[],
    loading:false
}

export const obtenerObras = createAsyncThunk("obras", async (info)=>{
    
    
    const idMuseo = info.id
    const idRecorrido = info.idRecorrido
    const idMuestra = info.idObras
    
    const obras = await getObras(idMuseo,idRecorrido,idMuestra)
    console.log(obras)
    
    return obras
})


const obrasSlice = createSlice({
    name:"obras",
    initialState,
    extraReducers(builder){
        builder.addCase(obtenerObras.pending,(state)=>{
            state.loading = true
        }).addCase(obtenerObras.fulfilled,(state,action)=>{
            state.obras = action.payload
            state.loading = false
        })
    }
})

export default obrasSlice.reducer