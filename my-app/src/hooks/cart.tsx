import {create} from "zustand";
import {toast} from "./use-toast";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  maxStock: number;
  size: number;
  media: string;
  color?: string;
}

interface CartState {
  cartProducts: Product[];
  favoriteProducts: Product[];
  addToCart: (product: Product) => void;
  addToFavorite: (product: Product) => void;
  deleteAll: () => void;
  deleteById: (id: number) => void;
  increment: (id: number) => void;
  decreased: (id: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartProducts: [],
  favoriteProducts: [],

  addToCart: (newProduct) =>
    set((state) => {
      const productAlreadyInCart = state.cartProducts.find(
        (product) => product.id === newProduct.id
      );

      if (productAlreadyInCart) {
        return {
          cartProducts: state.cartProducts.map((product) => {
            if (product.id === newProduct.id) {
              if (product.quantity < product.maxStock) {
                return {...product, quantity: product.quantity + 1};
              } else {
                toast({
                  title: "Insuficient stock avaible",
                  variant: "destructive",
                });
                return product;
              }
            }
            return product;
          }),
        };
      } else {
        return {
          cartProducts: [...state.cartProducts, newProduct],
        };
      }
    }),

  addToFavorite: (newProduct) =>
    set((state) => {
      const productAlreadyInFavorites = state.favoriteProducts.find(
        (product) => product.id === newProduct.id
      );

      if (productAlreadyInFavorites) {
        return {
          favoriteProducts: state.favoriteProducts,
        };
      } else {
        return {
          favoriteProducts: [...state.favoriteProducts, newProduct],
        };
      }
    }),

  deleteAll: () =>
    set(() => ({
      cartProducts: [],
    })),

  deleteById: (id) =>
    set((state) => ({
      cartProducts: state.cartProducts.filter((product) => product.id !== id),
    })),

  increment: (id) =>
    set((state) => ({
      cartProducts: state.cartProducts.map((product) => {
        if (product.id === id) {
          return {...product, quantity: product.quantity + 1};
        }
        return product;
      }),
    })),

  decreased: (id) =>
    set((state) => ({
      cartProducts: state.cartProducts.map((product) => {
        if (product.id === id) {
          return {...product, quantity: product.quantity - 1};
        }
        return product;
      }),
    })),
}));
