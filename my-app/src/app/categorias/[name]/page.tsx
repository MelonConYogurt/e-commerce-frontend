"use client";

import {useEffect, useState} from "react";
import GetProductsFilter from "@/utils/DinamicFilter";
import ProductCard from "@/components/AlternativeProducts";
import Transition from "@/components/Transition";

async function fetchData(name: string) {
  try {
    const filter = `filters[categories][name][$eq]=${name}&`;
    const response = await GetProductsFilter(1, filter);
    if (response && response.data && response.meta) {
      const {data, meta} = response;
      console.log(meta);
      return data || [];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default function CategoryProducts({params}: {params: {name: string}}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const fetchedData = await fetchData(params.name);
      setData(fetchedData);
    }
    loadData();
  }, [params.name]);

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
