"use client";

import ProductCard from "@/components/AlternativeProducts";
import GetAllProductsPagination from "@/utils/GetProductsPagination";
import GetAllCategories from "@/utils/getAllCategories";
import GetAllTags from "@/utils/GetAllTags";
import GetAllColors from "@/utils/GetAllColors";
import GetProductsFilter from "@/utils/DinamicFilter";
import Transition from "@/components/Transition";
import {Skeleton} from "@/components/ui/skeleton";
import {Product, Category, FilterCategory} from "../../types";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useState, useEffect, useCallback} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {ChevronDown, ChevronLeft, ChevronRight} from "lucide-react";

export default function Home() {
  const [priceRange, setPriceRange] = useState({min: 0, max: 0});
  const [data, setData] = useState<Product[]>([]);
  const [categoryValues, setCategoryValues] = useState<FilterCategory[]>([]);
  const [tagsValues, setTagsValues] = useState<FilterCategory[]>([]);
  const [colorsValues, setColorsValues] = useState<FilterCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalOfpage, setTotalOfPages] = useState(0);
  const [actualPage, setActualPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await GetAllProductsPagination(page);

        if (response && response.data && response.meta) {
          const {data, meta} = response;
          setData(data || []);
          setActualPage(meta.pagination.page || 0);
          setTotalOfPages(meta.pagination.pageCount || 0);
        } else {
          throw new Error("Respuesta no válida del servidor");
        }
      } catch (error) {
        console.log(error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [page]);

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
    if (priceRange.max > 0) {
      ConcatFilters += `filters[price][$gte]=${priceRange.min}&filters[price][$lte]=${priceRange.max}&`;
    }
    return ConcatFilters;
  }, [categoryValues, tagsValues, colorsValues, priceRange]);

  useEffect(() => {
    async function UpdateData() {
      try {
        const filters = StructureFilters();
        const newResponse = await GetProductsFilter(page, filters);
        if (newResponse && newResponse.data && newResponse.meta) {
          setData(newResponse.data || []);
          setActualPage(newResponse.meta.pagination.page || 0);
          setTotalOfPages(newResponse.meta.pagination.pageCount || 0);
        } else {
          setData([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    UpdateData();
  }, [StructureFilters, page]);

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

  function handleInputChangesColors(name: string, checked: boolean) {
    setColorsValues((prev) =>
      prev.map((item) =>
        item.name === name ? {...item, value: checked} : item
      )
    );
  }

  function handleNextPage() {
    setPage((prev) => prev + 1);
  }

  function handlePreviusPage() {
    setPage((prev) => prev - 1);
  }

  return (
    <Transition>
      <div className="flex flex-col md:flex-row gap-8 m-10">
        <Card className="w-full md:w-64 h-fit">
          <CardHeader>
            <CardTitle className="mb-10 text-center">Filtros</CardTitle>
            <Collapsible>
              <CardContent className="flex flex-col gap-6">
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <h3 className="font-semibold">Categorias</h3>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-2">
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
                  </CollapsibleContent>
                </Collapsible>
                <Separator />
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <h3 className="font-semibold">Tags</h3>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-2">
                    {tagsValues.map((element, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          type="checkbox"
                          id={`tag-${index}`}
                          checked={element.value}
                          onChange={(e) =>
                            handleInputChangesTags(
                              element.name,
                              e.target.checked
                            )
                          }
                        />
                        <Label htmlFor={`tag-${index}`}>
                          {element.name.charAt(0).toUpperCase() +
                            element.name.slice(1)}
                        </Label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                <Separator />
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <h3 className="font-semibold">Colores</h3>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-2">
                    {colorsValues.map((element, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-center space-x-2 w-full"
                      >
                        <input
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          type="checkbox"
                          id={`color-${index}`}
                          checked={element.value}
                          onChange={(e) =>
                            handleInputChangesColors(
                              element.name,
                              e.target.checked
                            )
                          }
                        />
                        <div
                          className={`w-6 h-6 rounded-full border border-white-300`}
                          style={{backgroundColor: element.name}}
                        ></div>
                        <Label
                          htmlFor={`color-${index}`}
                          className={`text-sm font-medium text-${element.name}-700 dark:text-${element.name}-300`}
                        >
                          {element.name.charAt(0).toUpperCase() +
                            element.name.slice(1)}
                        </Label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                <Separator />
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <h3 className="font-semibold">Rango de precio</h3>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-2">
                    <Input
                      type="number"
                      placeholder={`Desde: ${priceRange.min}`}
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          min: parseFloat(e.target.value),
                        }))
                      }
                    />
                    <Input
                      type="number"
                      placeholder={`Desde: ${priceRange.max}`}
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Collapsible>
          </CardHeader>
        </Card>
        <div className="flex flex-col gap-20 justify-center items-center">
          <div className="flex-1 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
            {isLoading ? (
              <>
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="flex flex-col space-y-3">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </>
            ) : data && data.length > 0 ? (
              <ProductCard data={data} />
            ) : (
              <p className="h-4/5">No products found.</p>
            )}
          </div>
          <div className="flex items-center justify-center mt-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="inline-flex items-center justify-center gap-3">
              <button
                disabled={actualPage <= 1}
                onClick={() => handlePreviusPage()}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-offset-gray-900"
              >
                <span className="sr-only">Previous Page</span>
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Pagina {actualPage} de {totalOfpage}
              </div>

              <button
                disabled={actualPage >= totalOfpage}
                onClick={() => handleNextPage()}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-offset-gray-900"
              >
                <span className="sr-only">Next Page</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
