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
        <Card key={product.id} className="relative w-[600px] h-50 rounded-lg ">
          <CardContent className="flex flex-col justify-center items-center gap-5 p-0 m-0">
            <img
              src={product.media}
              alt={product.name}
              className="w-full h-48 object-scale-down rounded-lg"
            />
            <div className="">
              <h2 className="text-lg font-semibold">{product.name}</h2>

              <div className="flex justify-between items-center mb-4">
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
            onClick={() => {
              deleteByIdFav(product.id);
              console.log("AAA");
            }}
          >
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
          </Button>
        </Card>
      ))}
    </>
  );
}
