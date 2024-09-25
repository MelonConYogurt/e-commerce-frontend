"use client";

import React, {useEffect, useState} from "react";
import {useCartStore} from "@/hooks/cart";
import CartProducts from "@/components/CartProducts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";

const CarritoPage: React.FC = () => {
  const {cartProducts, deleteAll} = useCartStore();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = cartProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cartProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito de Compras</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Artículos en el Carrito
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cartProducts.length > 0 ? (
              <CartProducts data={cartProducts} />
            ) : (
              <p className="text-center text-gray-500 py-8">
                Tu carrito está vacío
              </p>
            )}
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Resumen del Pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-lg font-medium mb-4">
                <span>Total:</span>
                <span className="text-primary">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                  }).format(Number(total))}
                </span>
              </div>
              <Button
                size="lg"
                className="w-full"
                disabled={cartProducts.length === 0}
              >
                Completar Compra
              </Button>
            </CardContent>
          </Card>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            disabled={cartProducts.length === 0}
            onClick={() => deleteAll()}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar Todos los Artículos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarritoPage;
