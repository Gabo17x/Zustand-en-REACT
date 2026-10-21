import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCarritoStore = create(
  persist(
    (set) => ({
 
      items: [],

   
      agregarProducto: (producto) =>
        set((state) => {
          const existe = state.items.find((item) => item.id === producto.id)

          if (existe) {
            return {
              items: state.items.map((item) =>
                item.id === producto.id
                  ? { ...item, cantidad: item.cantidad + 1 }
                  : item
              ),
            }
          }

          return { items: [...state.items, { ...producto, cantidad: 1 }] }
        }),

      // Disminuye la cantidad o elimina el producto si llega a 1
      disminuirCantidad: (id) =>
        set((state) => {
          const itemEncontrado = state.items.find((item) => item.id === id)

          if (itemEncontrado && itemEncontrado.cantidad === 1) {
            return {
              items: state.items.filter((item) => item.id !== id),
            }
          }

          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
            ),
          }
        }),

      eliminarProducto: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      vaciarCarrito: () => set({ items: [] }),
    }),
    {
      name: 'carrito-storage', // Guarda el estado en el navegador
    }
  )
)