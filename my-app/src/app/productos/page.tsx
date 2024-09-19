"use client";

import {useState, useEffect} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import ProductCard from "@/components/Product";
import GetAllProducts from "@/utils/getAllProducts";
import GetProductsFilter from "@/utils/DinamicFilter";
import Transition from "@/components/Transition";

export interface Product {
  // ... (keep your existing Product interface)
}

export default function Home() {
  const [data, setData] = useState<Product[]>([]);
  const [values, setValues] = useState({
    gender: {
      Hombre: false,
      Mujer: false,
    },
    company: {
      Nike: false,
      Adidas: false,
    },
  });
  const [priceRange, setPriceRange] = useState({min: "", max: ""});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetAllProducts();
        setData(response || []);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    }
    fetchData();
  }, []);

  type Category = "gender" | "company";

  async function handleInputChanges(
    category: Category,
    id: string,
    checked: boolean
  ) {
    setValues((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [id]: checked,
      },
    }));
    try {
      const newResponse = await GetProductsFilter(
        1000,
        `filters[${category}][$eq]=${id}`
      );
      setData(newResponse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Transition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="w-full md:w-64 h-fit">
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Género</h3>
                {Object.entries(values.gender).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`gender-${key}`}
                      checked={value}
                      onCheckedChange={(checked) =>
                        handleInputChanges("gender", key, checked as boolean)
                      }
                    />
                    <Label htmlFor={`gender-${key}`}>{key}</Label>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold">Marca</h3>
                {Object.entries(values.company).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`company-${key}`}
                      checked={value}
                      onCheckedChange={(checked) =>
                        handleInputChanges("company", key, checked as boolean)
                      }
                    />
                    <Label htmlFor={`company-${key}`}>{key}</Label>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold">Rango de precio</h3>
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Desde: 0"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange((prev) => ({...prev, min: e.target.value}))
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Hasta: 0"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((prev) => ({...prev, max: e.target.value}))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProductCard data={data} />
          </div>
        </div>
      </div>
    </Transition>
  );
}
