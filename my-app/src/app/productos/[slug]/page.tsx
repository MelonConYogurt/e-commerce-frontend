/* eslint-disable @next/next/no-img-element */
"use client";

import GetProductBySlug from "@/utils/SlugProduct";
import {useEffect, useState} from "react";
import {ShoppingCart, Heart} from "lucide-react";
import Link from "next/link";

export interface Product {
  id: number;
  attributes: {
    name: string;
    price: string;
    slug: string;
    introduction: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    discount?: string;
    sizes: {
      data: {
        size: number;
        stock: number;
      }[];
    };
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
    colors?: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      }[];
    };
    categories?: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      }[];
    };
    tags?: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      }[];
    };
  };
}

export default function Page({params}: {params: {slug: string}}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [data, setData] = useState<Product[]>([]);

  async function fetchData(slug: string) {
    try {
      const response = await GetProductBySlug(slug);
      return response || [];
    } catch (error) {
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
    <>
      {data.map((product, index) => (
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
                      image.attributes.formats.small?.url || "/placeholder.svg"
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
                  <Link href={`productos/${product.attributes.slug}`}>
                    {product.attributes.name}
                  </Link>
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
                        <div
                          key={sizeData.size}
                          className="px-3 py-1 border border-gray-300 rounded-md"
                        >
                          {sizeData.size}
                        </div>
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
                          className="bg-gray-200 px-2 py-1 rounded-md text-sm"
                        >
                          {category.attributes.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              <div className="flex justify-between items-center">
                <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full justify-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
