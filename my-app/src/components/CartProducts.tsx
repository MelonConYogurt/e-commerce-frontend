/* eslint-disable @next/next/no-img-element */
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Minus, Plus, Trash2} from "lucide-react";
import {Product} from "@/hooks/cart";
import {useCartStore} from "@/hooks/cart";

interface CartProps {
  data: Product[];
}

export default function CartProducts({data}: CartProps) {
  const {deleteById, increment, decreased} = useCartStore();
  return (
    <div className="space-y-4  ">
      {data.map((product) => (
        <Card key={product.id} className="overflow-hidden relative rounded-lg">
          <CardContent className="p-0">
            <div className="flex items-center rounded-lg">
              <img
                src={product.media}
                alt={product.name}
                className="w-32 h-32 object-cover m-2 rounded-lg"
              />
              <div className="flex-1 p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>

                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500">Size: {product.size}</p>
                  <div className="flex gap-2">
                    <p className="text-sm text-gray-500">Color:</p>
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{backgroundColor: product.color}}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decreased(product.id)}
                      disabled={product.quantity === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-medium">{product.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => increment(product.id)}
                      disabled={product.quantity === product.maxStock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-2">
                    <p>Amount:</p>
                    <p className="font-semibold">
                      {new Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                      }).format(Number(product.price))}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className=" absolute top-1 right-1"
                onClick={() => deleteById(product.id)}
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
