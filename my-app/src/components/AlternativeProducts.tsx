/* eslint-disable @next/next/no-img-element */
"use client";

import {useState} from "react";
import {ShoppingCart, Heart} from "lucide-react";
import {Product} from "../types";
import Link from "next/link";

interface ProductCardProps {
  data: Product[];
}

export default function ProductCard({data}: ProductCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <>
      {data.map((product, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="relative">
            <img
              className="w-full h-96 object-cover"
              src={
                product.attributes.media.data[activeImageIndex].attributes
                  .formats.large?.url || "/placeholder.svg"
              }
              alt={product.attributes.name}
            />
            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
              <Heart className="w-6 h-6 text-red-500" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                <Link href={`productos/${product.attributes.slug}`}>
                  {product.attributes.name}
                </Link>
              </h2>
              <span className="text-3xl font-bold text-green-600">
                ${product.attributes.price}
              </span>
            </div>

            <p className="text-gray-600 mb-4">
              {product.attributes.introduction}
            </p>

            {product.attributes.colors && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Colors:</h3>
                <div className="flex gap-2">
                  {product.attributes.colors.data.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{backgroundColor: color.attributes.name}}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Available Sizes:</h3>
              <div className="flex gap-2">
                {["7", "8", "9", "10"].map(
                  (size) =>
                    product.attributes[
                      `stocksize${size}` as keyof typeof product.attributes
                    ] && (
                      <div
                        key={size}
                        className="px-3 py-1 border border-gray-300 rounded-md"
                      >
                        {size}
                      </div>
                    )
                )}
              </div>
            </div>

            {product.attributes.company && (
              <p className="text-gray-600 mb-4">
                Brand: {product.attributes.company}
              </p>
            )}

            <div className="flex justify-between items-center">
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full justify-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>

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
                    image.attributes.formats.small?.url || "/placeholder.svg"
                  }
                  alt={`${product.attributes.name} - Image ${imgIndex + 1}`}
                  onClick={() => setActiveImageIndex(imgIndex)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
