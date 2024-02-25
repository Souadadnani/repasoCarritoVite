export default function BarraBusqueda({buscada, setBuscada}){
    return(
        <div>
            <input type="text" value={buscada} placeholder="Buscar" onChange={(e)=>setBuscada(e.target.value)}/>
        </div>
    )
}