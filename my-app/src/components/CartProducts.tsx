/* eslint-disable @next/next/no-img-element */
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Minus, Plus, Trash2} from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: number;
  media: string;
}

interface CartProps {
  data: Product[];
}

export default function CartProducts({data}: CartProps) {
  return (
    <div className="space-y-4">
      {data.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center">
              <img
                src={product.media}
                alt={product.name}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1 p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">Size: {product.size}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-medium">{product.quantity}</span>
                    <Button variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-semibold">${product.price.toFixed(2)}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="mr-2">
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
