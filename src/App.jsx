import { useEffect, useState } from 'react'
import Cesta from './componentes/Cesta'
import Articulos from './componentes/Articulos'
import BarraBusqueda from './componentes/BarraBusqueda'
import './App.css'
import { URL_SERVER } from '../constantes'

function App() {
  const [buscada, setBuscada] = useState("");
  const [articulosCesta, setArticulosCesta] = useState([]);
  const [articulosDisponibles, setArticulosDesponibles] = useState([]);
  const [pedirArticulosDisponibles, setPedirArticulosDisponibles] = useState(true);

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
        setPedirArticulosDisponibles(false);//???
        console.error(error.message);
      })     
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
        setArticulosDesponibles={setArticulosDesponibles}
      ></Articulos>    
    </>
  )
}

export default App
