"use client";

import {useEffect, useState} from "react";
import GetAllProducts from "@/utils/getAllProducts";
import ProductCard from "@/components/ProductosOferta";
import Transition from "@/components/Transition";

async function fetchData() {
  try {
    const response = await GetAllProducts(1000);
    return response || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default function OfertasPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const products = await fetchData();
      setData(products);
    }
    loadProducts();
  }, []);

  return (
    <Transition>
      <div className="flex flex-col md:flex-row gap-8 m-10">
        <div className="flex-1 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
          <ProductCard data={data} />
        </div>
      </div>
    </Transition>
  );
}
