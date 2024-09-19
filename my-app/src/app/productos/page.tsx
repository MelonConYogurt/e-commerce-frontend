"use client";

import {useState, useEffect, useCallback} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import ProductCard from "@/components/Product";
import GetAllProducts from "@/utils/getAllProducts";
import GetProductsFilter from "@/utils/DinamicFilter";
import Transition from "@/components/Transition";
import {Product} from "../../types";

export default function Home() {
  type Category = "gender" | "company";
  const [priceRange, setPriceRange] = useState({min: "", max: ""});
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

  const StructureFilters = useCallback(() => {
    let ConcatFilters = "";
    Object.entries(values).forEach(([category, object]) => {
      Object.entries(object).forEach(([key, value]) => {
        if (value) {
          ConcatFilters += `filters[${category}][$eq]=${key}&`;
        }
      });
    });
    return ConcatFilters;
  }, [values]);

  useEffect(() => {
    async function UpdateData() {
      try {
        const filters = StructureFilters();
        const newResponse = await GetProductsFilter(1000, filters);
        setData(newResponse);
      } catch (error) {
        console.log(error);
      }
    }
    UpdateData();
  }, [StructureFilters]);

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
                <Input
                  type="number"
                  placeholder="Desde: 0"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      min: e.target.value,
                    }))
                  }
                />
                <Input
                  type="number"
                  placeholder="Hasta: 0"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      max: e.target.value,
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex-1 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <ProductCard data={data} />
          </div>
        </div>
      </div>
    </Transition>
  );
}
