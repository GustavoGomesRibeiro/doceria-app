import { create } from "zustand";

type CartState = {
  removeProduct(id: number): unknown;
  updateTotal(): unknown;
  cart: { id: number; name: string; price: number; quantity: number }[];
  total: string;
  addProduct: (product: { id: number; name: string; price: number }) => void;
};
const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  total: "0",

  addProduct: (product) => {
    const cart = get().cart;

    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cart: [...cart, { ...product, quantity: 1 }],
      });
    }

    get().updateTotal();
  },

  removeProduct: (id: number) => {
    set({
      cart: get().cart.filter((item) => item.id !== id),
    });

    get().updateTotal();
  },

  decreaseProductQuantity: (id: number) => {
    const cart = get().cart;
    const product = cart.find((item) => item.id === id);

    if (product && product.quantity > 1) {
      set({
        cart: cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      });
    } else {
      get().removeProduct(id);
    }

    get().updateTotal();
  },

  clearCart: () => {
    set({ cart: [], total: "0" });
  },

  updateTotal: () => {
    const total = get()
      .cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
    set({ total });
  },
}));

export default useCartStore;
