"use client";

import {useState, useEffect, useCallback} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import ProductCard from "@/components/AlternativeProducts";
import GetAllCategories from "@/utils/getAllCategories";
import GetAllTags from "@/utils/GetAllTags";
import GetAllColors from "@/utils/GetAllColors";
import GetAllProducts from "@/utils/getAllProducts";
import GetProductsFilter from "@/utils/DinamicFilter";
import Transition from "@/components/Transition";
import {Product, Category, FilterCategory} from "../../types";

export default function Home() {
  const [priceRange, setPriceRange] = useState({min: "", max: ""});
  const [data, setData] = useState<Product[]>([]);
  const [categoryValues, setCategoryValues] = useState<FilterCategory[]>([]);
  const [tagsValues, setTagsValues] = useState<FilterCategory[]>([]);
  const [colorsValues, setColorsValues] = useState<FilterCategory[]>([]);

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

  useEffect(() => {
    async function MapFilters() {
      try {
        const categories = await GetAllCategories();
        const categoryData = categories.map((element: Category) => ({
          name: element.attributes.name,
          value: false,
        }));
        setCategoryValues(categoryData);

        const tags = await GetAllTags();
        const tagData = tags.map((element: Category) => ({
          name: element.attributes.name,
          value: false,
        }));
        setTagsValues(tagData);

        const colors = await GetAllColors();
        const colorData = colors.map((element: Category) => ({
          name: element.attributes.name,
          value: false,
        }));
        setColorsValues(colorData);
      } catch (error) {
        console.log(error);
      }
    }
    MapFilters();
  }, []);

  const StructureFilters = useCallback(() => {
    let ConcatFilters = "";
    categoryValues.forEach((element) => {
      if (element.value) {
        ConcatFilters += `filters[categories][name][$eq]=${element.name}&`;
      }
    });
    tagsValues.forEach((element) => {
      if (element.value) {
        ConcatFilters += `filters[tags][name][$eq]=${element.name}&`;
      }
    });
    colorsValues.forEach((element) => {
      if (element.value) {
        ConcatFilters += `filters[colors][name][$eq]=${element.name}&`;
      }
    });
    return ConcatFilters;
  }, [categoryValues, tagsValues, colorsValues]);

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

  function handleInputChangesCategories(name: string, checked: boolean) {
    setCategoryValues((prev) =>
      prev.map((item) =>
        item.name === name ? {...item, value: checked} : item
      )
    );
  }

  function handleInputChangesTags(name: string, checked: boolean) {
    setTagsValues((prev) =>
      prev.map((item) =>
        item.name === name ? {...item, value: checked} : item
      )
    );
  }

  return (
    <Transition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="w-full md:w-64 h-fit">
            <CardHeader>
              <CardTitle className="self-center">Filtros</CardTitle>
              <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Categorias</h3>
                {categoryValues.map((element, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      type="checkbox"
                      id={`categoria-${index}`}
                      checked={element.value}
                      onChange={(e) =>
                        handleInputChangesCategories(
                          element.name,
                          e.target.checked
                        )
                      }
                    />
                    <Label htmlFor={`categoria-${index}`}>
                      {element.name.charAt(0).toUpperCase() +
                        element.name.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold">Tags</h3>
                {tagsValues.map((element, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      type="checkbox"
                      id={`tag-${index}`}
                      checked={element.value}
                      onChange={(e) =>
                        handleInputChangesTags(element.name, e.target.checked)
                      }
                    />
                    <Label htmlFor={`tag-${index}`}>
                      {element.name.charAt(0).toUpperCase() +
                        element.name.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold">Colors</h3>
                {colorsValues.map((element, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      className={`w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                      type="checkbox"
                      id={`tag-${index}`}
                      checked={element.value}
                      onChange={(e) =>
                        handleInputChangesTags(element.name, e.target.checked)
                      }
                    />
                    <Label htmlFor={`tag-${index}`}>
                      {element.name.charAt(0).toUpperCase() +
                        element.name.slice(1)}
                    </Label>
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
          <div className="flex-1 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <ProductCard data={data} />
          </div>
        </div>
      </div>
    </Transition>
  );
}
