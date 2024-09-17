/* eslint-disable @next/next/no-img-element */
import {Heart, ShoppingCart} from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  attributes: {
    title: string;
    price: number;
    stock: number;
    introduction: string;
    description: string;
    colors: {
      options: string[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
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

interface ProductCardProps {
  data: [Product];
}

export default function ProductCard({data}: ProductCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((product, index) => (
        <div
          key={index}
          className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <div className="h-64 w-full overflow-hidden">
            <img
              src={
                product.attributes.media.data[0]?.attributes.formats.medium
                  ?.url || "/placeholder.svg"
              }
              alt={product.attributes.title}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {product.attributes.title}
            </h2>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              {product.attributes.introduction}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                ${product.attributes.price}
              </span>
              <div className="flex space-x-2">
                <button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-full transition-colors duration-300 flex items-center justify-center"
                  aria-label="Add to cart"
                >
                  <ShoppingCart size={20} />
                </button>
                <button
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-3 py-2 rounded-full transition-colors duration-300 flex items-center justify-center"
                  aria-label="Add to favorites"
                >
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
