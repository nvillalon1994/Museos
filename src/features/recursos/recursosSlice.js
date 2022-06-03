import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

import { get360, getRecursos } from "../../firebase"

const initialState ={
    recursos:[],
    loading:false
}

export const obtenerRecursos = createAsyncThunk("recursos", async (info)=>{
    
    
    const idMuseo = info.id
    const idRecorrido = info.idRecorrido
    
    const recursos = await getRecursos(idMuseo,idRecorrido)
    console.log(recursos)
    
    return recursos
})


const recursosSlice = createSlice({
    name:"recursos",
    initialState,
    extraReducers(builder){
        builder.addCase(obtenerRecursos.pending,(state)=>{
            state.loading = true
        }).addCase(obtenerRecursos.fulfilled,(state,action)=>{
            state.recursos = action.payload
            state.loading = false
        })
    }
})

export default recursosSlice.reducer