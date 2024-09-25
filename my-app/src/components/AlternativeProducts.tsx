/* eslint-disable @next/next/no-img-element */
"use client";

import {useState} from "react";
import {Heart} from "lucide-react";
import {Product} from "../types";
import {useCartStore} from "@/hooks/cart";
import Link from "next/link";
import {toast, Toaster} from "sonner";

interface ProductCardProps {
  data: Product[];
}

interface ProductCardItemProps {
  product: Product;
}

function ProductCardItem({product}: ProductCardItemProps): JSX.Element {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const {addToFavorite} = useCartStore();

  const handleAddToFav = (product: Product) => {
    const productToAdd = {
      id: product.id,
      name: product.attributes.name,
      price: Number(product.attributes.price),
      media:
        product.attributes.media.data[0].attributes.formats.small?.url ||
        "/placeholder.svg",
    };
    addToFavorite(productToAdd);
    toast.success("Se ha agregado el producto a tus favoritos");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img
          className="w-full h-96 object-cover"
          src={
            product.attributes.media?.data?.[activeImageIndex]?.attributes
              ?.formats?.large?.url || "/placeholder.svg"
          }
          alt={product.attributes.name}
        />
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
          <Heart
            className="w-6 h-6 text-red-500"
            onClick={() => handleAddToFav(product)}
          />
        </button>
      </div>

      <div className="p-6">
        <div className="flex  flex-col justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            <Link href={`productos/${product.attributes.slug}`}>
              {product.attributes.name}
            </Link>
          </h2>
          <span className="text-xl mt-1 font-bold text-blue-400">
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
            }).format(Number(product.attributes.price))}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{product.attributes.introduction}</p>

        {product.attributes.colors?.data &&
          product.attributes.colors?.data.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Colores:</h3>
              <div className="flex gap-2">
                {product.attributes.colors.data.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="w-6 h-6 rounded-full border-1 border-gray-300"
                    style={{backgroundColor: color.attributes?.name}}
                  ></div>
                ))}
              </div>
            </div>
          )}

        {product.attributes.sizes &&
          product.attributes.sizes.data.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Available Sizes:</h3>
              <div className="flex flex-wrap gap-2">
                {product.attributes.sizes.data.map((sizeData) => (
                  <button
                    key={sizeData.size}
                    className={`px-3 py-1 border border-gray-300 rounded-md ${
                      sizeData.stock <= 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={sizeData.stock <= 0}
                  >
                    {sizeData.size}
                  </button>
                ))}
              </div>
            </div>
          )}

        {product.attributes.categories &&
          product.attributes.categories.data.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {product.attributes.categories.data.map((category) => (
                  <span
                    key={category.id}
                    className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700"
                  >
                    {category.attributes.name.charAt(0).toUpperCase() +
                      category.attributes.name.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          )}
      </div>

      {product.attributes.media?.data && (
        <div className="px-6 pb-6">
          <div className="flex gap-2 overflow-x-auto">
            {product.attributes.media.data.map((image, imgIndex) => (
              <img
                key={imgIndex}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                  activeImageIndex === imgIndex
                    ? "border-2 border-blue-500"
                    : ""
                }`}
                src={
                  image.attributes?.formats?.small?.url || "/placeholder.svg"
                }
                alt={`${product.attributes.name} - Image ${imgIndex + 1}`}
                onClick={() => setActiveImageIndex(imgIndex)}
              />
            ))}
          </div>
        </div>
      )}
      <Toaster richColors position="top-right" expand={true} />
    </div>
  );
}

export default function ProductCard({data}: ProductCardProps) {
  return (
    <>
      {data.map((product, index) => (
        <ProductCardItem key={index} product={product} />
      ))}
    </>
  );
}
