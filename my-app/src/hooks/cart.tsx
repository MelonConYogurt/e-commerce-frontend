import {create} from "zustand";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: number;
  media: string;
  color?: string;
}

interface CartState {
  cartProducts: Product[];
  addToCart: (product: Product) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartProducts: [],
  addToCart: (product) =>
    set((state) => ({
      cartProducts: [...state.cartProducts, product],
    })),
}));
