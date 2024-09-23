"use client";

import React from "react";
import {useCartStore} from "@/hooks/cart";
import ProductCard from "@/components/AlternativeProducts";

const CarritoPage: React.FC = () => {
  const products = useCartStore((state) => state.cartProducts);
  console.log(products);

  return (
    <div>
      <h1>¡Bienvenido a la página del carrito!</h1>
      <div className="flex-1 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
        <ProductCard data={products}></ProductCard>
      </div>
    </div>
  );
};

export default CarritoPage;
