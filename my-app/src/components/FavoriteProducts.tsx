/* eslint-disable @next/next/no-img-element */
"use client";

import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Heart} from "lucide-react";
import {ProductFav} from "@/hooks/cart";
import {useCartStore} from "@/hooks/cart";

interface FavoriteProps {
  data: ProductFav[];
}

export default function FavoriteProducts({data}: FavoriteProps) {
  const {deleteByIdFav} = useCartStore();

  return (
    <>
      {data.map((product) => (
        <Card key={product.id} className="relative w-fit h-fit">
          <CardContent className="flex gap-5  justify-center items-center">
            <div className="relative">
              <img
                src={product.media}
                alt={product.name}
                className="w-full h-48 object-cover m-5 rounded-lg"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>

              <div className="flex justify-between items-center">
                <p className="font-semibold">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                  }).format(Number(product.price))}
                </p>
              </div>
            </div>
          </CardContent>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => deleteByIdFav(product.id)}
          >
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
          </Button>
        </Card>
      ))}
    </>
  );
}
