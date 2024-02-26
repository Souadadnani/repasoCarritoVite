import { useEffect, useState } from 'react'
import Cesta from './componentes/Cesta'
import Articulos from './componentes/Articulos'
import BarraBusqueda from './componentes/BarraBusqueda'
import './App.css'
import { URL_SERVER } from '../constantes'
import FormAddArticulo from './componentes/FormAddArticulo'

function App() {
  const [buscada, setBuscada] = useState("");
  const [articulosCesta, setArticulosCesta] = useState([]);
  const [articulosDisponibles, setArticulosDesponibles] = useState([]);
  const [pedirArticulosDisponibles, setPedirArticulosDisponibles] = useState(false);
  const [articuloNuevo, setArticuloNuevo] = useState({});

  useEffect(()=>{
    fetch(`${URL_SERVER}articulos?nombre_like=${buscada}&unidades_gt=0&_sort=nombre&_order=asc`)
      .then(response=>{
        if(response.ok){
          return response.json();
        }else{throw new Error(`Error en la solicitud ${response.statusText}`);}
      })
      .then(articulos=>{
        setArticulosDesponibles(articulos);
      })
      .catch(error=>{
        console.error(error.message);
      }) 
      setPedirArticulosDisponibles(false);    
  }, [buscada, articulosCesta, pedirArticulosDisponibles]);

  return (
    <>
      <Cesta articulosCesta={articulosCesta} setArticulosCesta={setArticulosCesta}  articulosDisponibles={articulosDisponibles} setArticulosDesponibles={setArticulosDesponibles}></Cesta>
      <BarraBusqueda buscada={buscada} setBuscada={setBuscada}></BarraBusqueda>
      <Articulos 
        setPedirArticulosDisponibles={setPedirArticulosDisponibles} 
        articulosCesta={articulosCesta}
        setArticulosCesta={setArticulosCesta}
        articulosDisponibles={articulosDisponibles}
      ></Articulos>   
      <FormAddArticulo articuloNuevo={articuloNuevo} setArticuloNuevo={setArticuloNuevo} setArticulosDesponibles={setArticulosDesponibles}></FormAddArticulo> 
    </>
  )
}

export default App
