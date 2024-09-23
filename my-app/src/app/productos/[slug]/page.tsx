/* eslint-disable @next/next/no-img-element */
"use client";
import {useEffect, useState} from "react";
import {Product} from "@/types";
import Transition from "@/components/Transition";
import GetProductBySlug from "@/utils/SlugProduct";

import SellProductCard from "@/components/SellProduct";

export default function Page({params}: {params: {slug: string}}) {
  const [data, setData] = useState<Product[]>([]);

  async function fetchData(slug: string) {
    try {
      const response = await GetProductBySlug(slug);
      return response || [];
    } catch (error) {
      console.error("Error fetching product data:", error);
      return [];
    }
  }

  useEffect(() => {
    async function response() {
      const data = await fetchData(params.slug);
      setData(data);
    }
    response();
  }, [params.slug]);

  return (
    <Transition>
      <SellProductCard data={data}></SellProductCard>
    </Transition>
  );
}
