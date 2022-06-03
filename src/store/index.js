import {configureStore} from '@reduxjs/toolkit'

// import productsReducer from '../reducer/productosReducer'
import museosReducer from '../features/museos/museosSlice'
import museoReducer from '../features/museo/museoSlice'
import bienvenidoReducer from '../features/bienvenido/bienvenidoSlice'
import tressesentaReducer from '../features/360/360Slice'
import muntrefLinksSlice from '../features/Muntref_Link/muntrefLink'
import linksmpReducer from '../features/Linksmp/linksmpSlice'
import recorridoReducer from '../features/recorrido/recorridoSlice'
import recursosReducer from '../features/recursos/recursosSlice'
import muestrasReducer from '../features/muestras/muestrasSlice'
import obrasReducer from '../features/obras/obrasSlice'
import userReducer from '../features/usuario/userSlice'
import highlightsReducer from '../features/highligthts/highlightsSlice'
const store = configureStore({
    reducer:{
        //TODO:Agregar reducers
        museos:museosReducer,
        museo:museoReducer,
        highlights:highlightsReducer,
        bienvenido:bienvenidoReducer,
        panoramas:tressesentaReducer,
        muntrefLinks:muntrefLinksSlice,
        linksmp:linksmpReducer,
        recorridos:recorridoReducer,
        recursos:recursosReducer,
        muestras:muestrasReducer,
        obras:obrasReducer,
        usuario:userReducer
        
    }
})

export default store