import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import Bienvenida from './pages/museo/bievenido/Bienvenida';
import Home from './pages/Home';
import Linkmp from './pages/museo/muntref_link/linksmp/Linkmp';
import Muestras from'./pages/prueba/recorrido/muestras/Muestras';
import MuntrefLink from './pages/prueba/muntreflink/MuntrefLink';
import Museo from './pages/museo/Museo.jsx';
import Obras from './pages/museo/recorrido/muestras/obrasimg/Obras';
import Recorrido from './pages/prueba/recorrido/Recorrido';
import Recursos from './pages/prueba/recorrido/recursos/Recursos';

import Login from './pages/Login';
import NavBar from './components/NavBar';
import PhonePrueba from './pages/prueba/PhonePrueba';
import Bienvenido from './pages/prueba/bienvenido/Bienvenido';
function App() {
  return (
    <BrowserRouter>
    {/* <NavBar/> */}
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/phone_prueba/:idMuseo' element={<PhonePrueba/>}></Route>
        <Route path='/:idMuseo/Bienvenido' element={<Bienvenido/>}></Route>
        <Route path='/:idMuseo/Recorrido' element={<Recorrido/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        {/* <Route path='/:idMuseo' element={<Museo/>}></Route> */}
        <Route path='/:idMuseo/Bienvenida' element={<Bienvenida/>}></Route>
        
        <Route path='/:idMuseo/MuntrefLink' element={<MuntrefLink/>}></Route>
        <Route path='/:idMuseo/MuntrefLink/:idLink/Linkmp' element={<Linkmp/>}></Route>
        {/* <Route path='/:idMuseo/Recorrido' element={<Recorrido/>}></Route> */}
        <Route path='/:idMuseo/Recorrido/:idRecorrido/Recursos' element={<Recursos/>}></Route>
        <Route path='/:idMuseo/Recorrido/:idRecorrido/muestras' element={<Muestras/>}></Route>
        {/* <Route path='/:idMuseo/Recorrido/:idRecorrido/muestras/:idMuestra/obrasimg' element={<Obras/>}></Route> */}
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
