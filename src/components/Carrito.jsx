import { useCarritoStore } from '../store/useCarritoStore'

function Carrito() {
  const items = useCarritoStore((state) => state.items)
  const disminuirCantidad = useCarritoStore((state) => state.disminuirCantidad)
  const eliminarProducto = useCarritoStore((state) => state.eliminarProducto)
  const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito)

  const total = items.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  )

  if (items.length === 0) {
    return (
      <section className="panel">
        <h2>Carrito</h2>
        <p className="vacio">Tu carrito está vacío</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>Carrito</h2>

      {items.map((item) => (
        <div key={item.id} className="fila">
          <div>
            <p className="fila-nombre">{item.nombre}</p>
            {/* Mostramos cantidad, precio unitario y el subtotal calculado */}
            <p className="fila-detalle">
              {item.cantidad} x ${item.precio.toLocaleString('es-CO')} = <strong>${(item.precio * item.cantidad).toLocaleString('es-CO')}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button 
              className="btn btn-secundario" 
              onClick={() => disminuirCantidad(item.id)}
            >
              −
            </button>
            <button 
              className="btn btn-secundario" 
              onClick={() => eliminarProducto(item.id)}
            >
              Quitar
            </button>
          </div>
        </div>
      ))}

      <div className="total">
        <span>Total</span>
        <strong>${total.toLocaleString('es-CO')}</strong>
      </div>

      <button 
        className="btn btn-secundario btn-bloque" 
        onClick={vaciarCarrito}
      >
        Vaciar carrito
      </button>
    </section>
  )
}

export default Carrito