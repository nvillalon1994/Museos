import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

import { getRecorrido} from "../../firebase"

const initialState ={
    recorridos:[],
    loading:false
}

export const obtenerRecorridos = createAsyncThunk("recorridos", async (id,thunkAPI)=>{
    const state =thunkAPI.getState()
    const museoscol = state.museos.museosCol
    
    const recorridos = await getRecorrido(id,museoscol)
    console.log("se ejecuta")
    return recorridos
})


const recorridosSlice = createSlice({
    name:"recorridos",
    initialState,
    extraReducers(builder){
        builder.addCase(obtenerRecorridos.pending,(state)=>{
            state.loading = true
        }).addCase(obtenerRecorridos.fulfilled,(state,action)=>{
            state.recorridos = action.payload
            state.loading = false
        })
    }
})

export default recorridosSlice.reducer