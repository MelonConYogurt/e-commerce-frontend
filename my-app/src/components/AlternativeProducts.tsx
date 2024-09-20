/* eslint-disable @next/next/no-img-element */
"use client";

import {useState} from "react";
import {ShoppingCart, Heart} from "lucide-react";
import {Product} from "../types";
import Link from "next/link";

interface ProductCardProps {
  data: Product[];
}

interface ProductCardItemProps {
  product: Product;
}

function ProductCardItem({product}: ProductCardItemProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
          <Heart className="w-6 h-6 text-red-500" />
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

        {product.attributes.colors?.data && (
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

        {product.attributes.sizes?.data && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Tallas disponibles:</h3>
            <div className="flex gap-2">
              {product.attributes.sizes.data.map((size, index) => (
                <div className="" key={index}>
                  {size?.size}
                </div>
              ))}
            </div>
          </div>
        )}

        {product.attributes.categories?.data && (
          <div>
            <p className="text-gray-600 mb-4">Categorias:</p>
            <div className="flex flex-wrap gap-2 my-1">
              {product.attributes.categories.data.map((categoria, index) => (
                <div key={index}>{categoria.attributes?.name}</div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full justify-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Añadir al carrito
          </button>
        </div>
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
