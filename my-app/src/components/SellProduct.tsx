/* eslint-disable @next/next/no-img-element */
"use client";

import {useState} from "react";
import {ShoppingCart, Heart, Check, AlertCircle, X} from "lucide-react";
import {useCartStore} from "@/hooks/cart";
import {Product} from "@/types";
import {toast, Toaster} from "sonner";
import Link from "next/link";

interface SellProductCardProps {
  data: Product[];
}

export default function SellProductCard({data}: SellProductCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState<number | null>(null);
  const [activeColor, setActiveColor] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product: Product) => {
    if (activeSize !== null) {
      const sizeStock = product.attributes.sizes.data.filter(
        (size) => size.size === activeSize
      );

      const productToAdd = {
        id: product.id,
        name: product.attributes.name,
        price: Number(product.attributes.price),
        quantity: 1,
        size: activeSize,
        maxStock: sizeStock[0].stock,
        color: product.attributes.colors?.data[activeColor]?.attributes.name,
        media:
          product.attributes.media.data[0].attributes.formats.small?.url ||
          "/placeholder.svg",
      };
      addToCart(productToAdd);
      console.log(productToAdd);
      toast.custom((t) => (
        <div className="flex items-center gap-4 relative w-72 bg-white rounded-lg p-1">
          <Link legacyBehavior href="/carrito">
            <img
              src={
                product.attributes.media.data[0].attributes.formats.small
                  ?.url || "/placeholder.svg"
              }
              alt={product.attributes.name}
              className="w-12 h-12 object-cover rounded-lg m-2"
            />
          </Link>
          <div>
            <p className="font-semibold">{product.attributes.name}</p>

            <p className="text-sm text-gray-600">
              {product.attributes.colors?.data[activeColor]?.attributes.name} -
              Size {activeSize}
            </p>
            <p className="text-sm text-gray-600">${product.attributes.price}</p>
          </div>
          <div className="absolute top-1 right-1">
            <button onClick={() => toast.dismiss(t)}>
              <X size={16} />
            </button>
          </div>
        </div>
      ));
    } else {
      toast.error("Please select a size");
    }
  };

  if (data.length === 0) {
    return <div className="text-center py-10">No products found.</div>;
  }

  const product = data[0];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3 p-6">
          <div className="flex flex-col-reverse lg:flex-row gap-6">
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible">
              {product.attributes.media.data.map((image, imgIndex) => (
                <button
                  key={imgIndex}
                  className={`relative w-20 h-20 rounded-md overflow-hidden ${
                    activeImageIndex === imgIndex ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setActiveImageIndex(imgIndex)}
                >
                  <img
                    src={image.attributes.url || "/placeholder.svg"}
                    alt={`${product.attributes.name} - Image ${imgIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="relative flex-grow">
              <img
                className="w-full h-auto object-cover rounded-lg"
                src={
                  product.attributes.media.data[activeImageIndex].attributes
                    .url || "/placeholder.svg"
                }
                alt={product.attributes.name}
                onClick={() => console.log("AA")}
              />
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <Heart className="w-6 h-6 text-red-500" />
              </button>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 p-6 bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {product.attributes.name}
          </h2>
          <span className="text-2xl font-semibold text-green-600 mb-4 block">
            ${product.attributes.price}
          </span>

          <p className="text-gray-600 mb-6">{product.attributes.description}</p>

          {product.attributes.colors &&
            product.attributes.colors.data.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Colors:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.attributes.colors.data.map((color, colorIndex) => (
                    <button
                      key={colorIndex}
                      onClick={() => setActiveColor(colorIndex)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        activeColor === colorIndex
                          ? "ring-2 ring-offset-2 ring-black"
                          : "hover:scale-110"
                      }`}
                      style={{backgroundColor: color.attributes.name}}
                      title={color.attributes.name}
                    >
                      {activeColor === colorIndex && (
                        <Check
                          className="text-white drop-shadow-md"
                          size={20}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {product.attributes.sizes &&
            product.attributes.sizes.data.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Available Sizes:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.attributes.sizes.data.map((sizeData) => (
                    <button
                      key={sizeData.size}
                      onClick={() => setActiveSize(sizeData.size)}
                      className={`px-4 py-2 border rounded-md transition-all duration-200 ${
                        activeSize === sizeData.size
                          ? "bg-blue-500 text-white border-blue-500"
                          : "border-gray-300 hover:border-blue-500"
                      } ${
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
                      {category.attributes.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

          <button
            className="flex items-center justify-center w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>

          {activeSize === null && (
            <div className="mt-4 flex items-center text-yellow-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">
                Please select a size before adding to cart
              </span>
            </div>
          )}
        </div>
      </div>
      <Toaster richColors position="top-right" expand={true} />
    </div>
  );
}
