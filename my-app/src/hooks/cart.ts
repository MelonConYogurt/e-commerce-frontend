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
  color: string;
}

export interface ProductFav {
  id: number;
  name: string;
  price: number;
  media: string;
}

interface CartState {
  cartProducts: Product[];
  favoriteProducts: ProductFav[];
  addToCart: (product: Product) => void;
  addToFavorite: (product: ProductFav) => void;
  deleteAll: () => void;
  deleteById: (id: number, size: number, color: string) => void;
  deleteAllFav: () => void;
  deleteByIdFav: (id: number) => void;
  increment: (id: number, size: number, color: string) => void;
  decreased: (id: number, size: number, color: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartProducts: [],
  favoriteProducts: [],

  addToCart: (newProduct) =>
    set((state) => {
      const productAlreadyInCart = state.cartProducts.find(
        (product) =>
          product.id === newProduct.id &&
          product.size === newProduct.size &&
          product.color === newProduct.color
      );

      if (productAlreadyInCart) {
        return {
          cartProducts: state.cartProducts.map((product) => {
            if (
              product.id === newProduct.id &&
              product.size === newProduct.size &&
              product.color === newProduct.color
            ) {
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

  deleteById: (id, size, color) =>
    set((state) => ({
      cartProducts: state.cartProducts.filter(
        (product) =>
          !(
            product.id === id &&
            product.size === size &&
            product.color === color
          )
      ),
    })),

  deleteAllFav: () =>
    set(() => ({
      favoriteProducts: [],
    })),

  deleteByIdFav: (id) =>
    set((state) => ({
      favoriteProducts: state.favoriteProducts.filter(
        (product) => product.id !== id
      ),
    })),

  increment: (id, size, color) =>
    set((state) => ({
      cartProducts: state.cartProducts.map((product) => {
        if (
          product.id === id &&
          product.size === size &&
          product.color === color
        ) {
          return {...product, quantity: product.quantity + 1};
        }
        return product;
      }),
    })),

  decreased: (id, size, color) =>
    set((state) => ({
      cartProducts: state.cartProducts.map((product) => {
        if (
          product.id === id &&
          product.size === size &&
          product.color === color
        ) {
          return {...product, quantity: product.quantity - 1};
        }
        return product;
      }),
    })),
}));
