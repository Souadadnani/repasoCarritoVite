import { URL_SERVER } from "../../constantes";

export default function Cesta({articulosCesta, setArticulosCesta}){
    const total = articulosCesta.reduce((acc, articulo)=> acc + articulo.precio*articulo.unidades, 0);
    const eliminarArtCesta = (articulo) =>{
        fetch(`${URL_SERVER}articulos`)
            .then(response=>{
                if(response.ok){
                    return response.json();
                }else{throw new Error(`Error en la solicitud ${response.statusText}`)}
            })
            .then(data=>{
                fetch(`${URL_SERVER}articulos/${articulo.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ unidades: articulo.unidades + data.unidades })
                })
                .then((response)=>{
                    if(response.ok){
                        setArticulosCesta(articulosCesta.filter(art=>art.id!==articulo.id));
                    }
                })
    
            })
    }
    return(
        <div>
            <h2>Cesta:</h2>
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
                    {articulosCesta.map(articulo=>{
                        return(
                            <tr key={articulo.id}>
                                <td>{articulo.nombre}</td>
                                <td>{articulo.precio}</td>
                                <td>{articulo.unidades}</td>
                                <td><button onClick={()=>{eliminarArtCesta(articulo)}}>Eliminar</button></td>
                            </tr>
                        )
                    })}
                </tbody>
                {
                    <tfoot>
                        <tr>
                            <td>Total cesta:</td>
                            <td>{total}€</td>
                        </tr>
                    </tfoot>
                }
            </table>
        </div>
    )
}