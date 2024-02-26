export default function FormAddArticulo({articuloNuevo, setArticuloNuevo, setArticulosDisponibles}) {

    const guardarArticulo = (articuloNuevo) =>{
        const options = {
            
        }
    }

    return(
        <form>
            <input type="text" placeholder="nombre" />
            <input type="number" placeholder="precio" />
            <input type="number" placeholder="unidades" />
            <button>Guardar</button>
        </form>
    )
}