/* eslint-disable @next/next/no-img-element */
"use client";

import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Heart, ShoppingCart} from "lucide-react";
import {Product} from "@/hooks/cart";
import {useCartStore} from "@/hooks/cart";

interface FavoriteProps {
  data: Product[];
}

export default function FavoriteProducts({data}: FavoriteProps) {
  const {addToCart, deleteById} = useCartStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={product.media}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => deleteById(product.id)}
              >
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              </Button>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500">Size: {product.size}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">Color:</p>
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{backgroundColor: product.color}}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                  }).format(Number(product.price))}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
