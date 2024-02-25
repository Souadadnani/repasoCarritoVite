import { URL_SERVER } from "../../constantes"

export default function Articulos({setPedirArticulosDisponibles, setArticulosCesta, articulosDisponibles, setArticulosDesponibles}){
    
    const agregarArticuloCesta = (articulo) =>{
        fetch(`${URL_SERVER}articulos/${articulo.id}`)
            .then(response=>{
                if(response.ok){
                    return  response.json();
                }else{throw new Error(`Error en la solicitud ${response.status}`)}
            })
            .then(data=>{
                console.log(data);
                if(data.unidades > 0){
                setArticulosCesta((elementosCesta) => {
                    const articuloEnCesta = elementosCesta.find(art=> art.id === articulo.id);
                    if(articuloEnCesta){
                        const nuevaCesta = elementosCesta.map(art=>{
                            if(art.id === articulo.id){
                                return {...art, unidades: art.unidades + 1}
                            }
                            return art;
                        });
                        guardarEnCesta(nuevaCesta);
                        return nuevaCesta;
                    }
                    return [...elementosCesta, {...articulo, unidades: 1}];
                });
                actualizar(articulo.id, data);
            }})
    }
    const actualizar = (id, data) => {
        fetch(`${URL_SERVER}articulos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({unidades: data.unidades -1})
        })
            .then(response=>{
                if(response.ok){
                    setPedirArticulosDisponibles(true);
                }else{
                    alert("No hay unidades disponibles");
                }
            })
            .catch(error=>{
                console.error(error);
            })
    }
    const guardarEnCesta = (articulo) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articulo)
        }
        fetch(`${URL_SERVER}cesta`, options)
            .then(response=>{
                if(response.ok){
                    return response.json()
                }else{throw new Error(`Error en la solicitud ${response.status}`)}
            })
            .catch(error=>{
                console.log(error);
            })
    }

    return(
        <div>
            <h2>Articulos disponinbles:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Unidades</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {articulosDisponibles.map(articulo=>{
                        return(
                            <tr key={articulo.id}>
                                <td>{articulo.nombre}</td>
                                <td>{articulo.precio}</td>
                                <td>{articulo.unidades}</td>
                                <td><button onClick={()=>agregarArticuloCesta(articulo)}>Comprar</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}