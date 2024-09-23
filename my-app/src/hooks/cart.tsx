import {create} from "zustand";
import {Product} from "@/types";

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
