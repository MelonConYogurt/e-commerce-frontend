/* eslint-disable @next/next/no-img-element */
"use client";

import {Product} from "@/types";
import {useState} from "react";
import {ShoppingCart, Heart} from "lucide-react";
import {useCartStore} from "@/hooks/cart";

interface SellProductCardProps {
  data: Product[];
}

function SellProductCard({data}: SellProductCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeButtonSize, setActiveButtonSize] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product: Product) => {
    if (activeButtonSize !== 0) {
      const productToAdd = {
        id: product.id,
        name: product.attributes.name,
        price: Number(product.attributes.price),
        quantity: 1,
        size: activeButtonSize,
        media:
          product.attributes.media.data[0].attributes.formats.small?.url ||
          "/placeholder.svg",
      };
      addToCart(productToAdd);
      console.log("Add to Cart!: ", productToAdd);
    } else {
      console.log("Select a size");
    }
  };

  return (
    <div>
      {data.length > 0 &&
        data.map((product, index) => (
          <div key={index} className="bg-white w-full overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="lg:w-1/4">
                <div className="flex flex-row lg:flex-col gap-5 overflow-x-auto lg:overflow-x-visible">
                  {product.attributes.media.data.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                        activeImageIndex === imgIndex
                          ? "border-2 border-blue-500"
                          : ""
                      }`}
                      src={
                        image.attributes.formats.small?.url ||
                        "/placeholder.svg"
                      }
                      alt={`${product.attributes.name} - Image ${imgIndex + 1}`}
                      onClick={() => setActiveImageIndex(imgIndex)}
                    />
                  ))}
                </div>
              </div>
              <div className="relative lg:w-1/2">
                <img
                  className="w-full h-auto object-cover rounded-lg"
                  src={
                    product.attributes.media.data[activeImageIndex].attributes
                      .url || "/placeholder.svg"
                  }
                  alt={product.attributes.name}
                />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
                  <Heart className="w-6 h-6 text-red-500" />
                </button>
              </div>
              <div className="lg:w-1/4 p-6">
                <div className="flex flex-col gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {product.attributes.name}
                  </h2>
                  <span className="text-3xl font-bold text-green-600">
                    ${product.attributes.price}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">
                  {product.attributes.description}
                </p>

                {product.attributes.colors &&
                  product.attributes.colors.data.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Colors:</h3>
                      <div className="flex gap-2">
                        {product.attributes.colors.data.map(
                          (color, colorIndex) => (
                            <div
                              key={colorIndex}
                              className="w-6 h-6 rounded-full border-2 border-gray-300"
                              style={{backgroundColor: color.attributes.name}}
                              title={color.attributes.name}
                            ></div>
                          )
                        )}
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
                            value={sizeData.size}
                            onClick={() => setActiveButtonSize(sizeData.size)}
                            className={`px-3 py-1 border ${
                              activeButtonSize === sizeData.size
                                ? "border-black"
                                : "border-gray-300"
                            }  rounded-md ${
                              sizeData.stock <= 0
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            {sizeData.size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                {product.attributes.categories &&
                  product.attributes.categories.data.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Categories:</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.attributes.categories.data.map((category) => (
                          <span
                            key={category.id}
                            className="bg-blue-100 p-2 border border-gray-300 rounded-md text-sm"
                          >
                            {category.attributes.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="flex justify-between items-center">
                  <button
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full justify-center"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default SellProductCard;
