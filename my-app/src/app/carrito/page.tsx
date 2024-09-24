"use client";

import React, {useEffect, useState} from "react";
import {useCartStore} from "@/hooks/cart";
import CartProducts from "@/components/CartProducts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

const CarritoPage: React.FC = () => {
  const {cartProducts} = useCartStore();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = cartProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cartProducts]);

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Tu Carrito de Compras
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cartProducts.length > 0 ? (
            <CartProducts data={cartProducts} />
          ) : (
            <p className="text-center text-gray-500">Tu carrito está vacío</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-xl font-semibold">
            Total:{" "}
            <span className="text-primary">
              {" "}
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
              }).format(Number(total))}
            </span>
          </div>
          <Button size="lg" disabled={cartProducts.length === 0}>
            Proceder al Pago
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CarritoPage;
