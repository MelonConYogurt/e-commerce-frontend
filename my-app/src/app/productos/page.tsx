"use client";

import ProductCard from "@/components/Product";
import GetAllProducts from "@/utils/getAllProducts";
import Transition from "@/components/Transition";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {useState, useEffect} from "react";

export interface Product {
  id: number;
  attributes: {
    name: string;
    price: number;
    stock: number;
    slug: string;
    introduction: string;
    description: string;
    colors: {
      options: string[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    stocksize10?: number;
    stocksize9?: number;
    stocksize8?: number;
    stocksize7?: number;
    company?: string;
    media: {
      data: {
        id: number;
        attributes: {
          url: string;
          formats: {
            small?: {
              url: string;
            };
            medium?: {
              url: string;
            };
            large?: {
              url: string;
            };
          };
        };
      }[];
    };
  };
}

export default function Home() {
  const [data, setData] = useState<Product[]>([]);
  const [values, SetValues] = useState({
    genero: {
      hombre: false,
      mujer: false,
    },
    company: {
      nike: false,
      adidas: false,
    },
    priceRange: {
      from: 0,
      to: 0,
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetAllProducts();
        setData(response || []);
        console.log(response);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    }
    fetchData();
  }, []);

  function handleInputChanges(e) {
    console.log(e);
  }

  return (
    <Transition>
      <div>
        <main>
          <div className="flex">
            <div className="bg-[#f6f6f6] w-52 ml-2 rounded-md my-10 p-2 flex flex-col gap-10">
              <div className="flex flex-col gap-2 justify-center items-start">
                <span className="self-center">Genero</span>
                <div className="flex flex-row gap-2 justify-center items-center">
                  <Checkbox
                    id="hombre"
                    checked={values.genero.hombre}
                    onChange={handleInputChanges}
                  />
                  <label htmlFor="hombre">Hombre</label>
                </div>
                <div className="flex flex-row gap-2 justify-center items-center">
                  <Checkbox
                    id="mujer"
                    checked={values.genero.mujer}
                    onChange={handleInputChanges}
                  />
                  <label htmlFor="mujer">Mujer</label>
                </div>
                <hr className="" />
              </div>
              <div className="flex flex-col gap-2 justify-center items-start">
                <span className="self-center">Company</span>
                <div className="flex flex-row gap-2 justify-center items-center ">
                  <Checkbox
                    id="nike"
                    checked={values.company.nike}
                    onChange={handleInputChanges}
                  />
                  <label htmlFor="nike">Nike</label>
                </div>
                <div className="flex flex-row gap-2 justify-center items-center">
                  <Checkbox
                    id="adidas"
                    checked={values.company.adidas}
                    onChange={handleInputChanges}
                  />
                  <label htmlFor="adidas">Adidas</label>
                </div>
                <hr className="" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="self-center">Rango de precio</span>
                <Input type="number" placeholder="Desde: 0" />
                <Input type="number" placeholder="Hasta: 0" />
                <hr className="" />
              </div>
            </div>
            <div className="flex-1 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 mx-10 my-10">
              <ProductCard data={data} />
            </div>
          </div>
        </main>
      </div>
    </Transition>
  );
}
