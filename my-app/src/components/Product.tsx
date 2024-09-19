/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export interface Product {
  id: number;
  attributes: {
    name: string;
    price: number;
    stock: number;
    slug: string;
    introduction: string;
    description: string;
    colors: {
      options: string[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    stocksize10?: number;
    stocksize9?: number;
    stocksize8?: number;
    stocksize7?: number;
    company?: string;
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
  data: Product[];
}

export default function ProductCard({data}: ProductCardProps) {
  return (
    <>
      {data.map((product, index) => (
        <div key={index} className="flex flex-col">
          <div>
            <div className="bg-[#f6f6f6] ">
              <img
                className="w-full h-full"
                src={
                  product.attributes.media.data[0].attributes.formats.medium
                    ?.url
                }
                alt=""
              />
            </div>
            {/* <div className="flex flex-row gap-2 my-2 rounded-md">
              {product.attributes.media.data.map((image, index) => (
                <img
                  className="rounded-md"
                  key={index}
                  src={image.attributes.formats.small?.url}
                  width={60}
                  height={60}
                />
              ))}
            </div> */}
          </div>

          <div className="p-4 flex flex-col ">
            <Link href={`/productos/${product.attributes.slug}`}>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {product.attributes.name}
              </h2>
            </Link>

            <p className="text-sm text-gray-600 mb-4 flex-grow">
              {product.attributes.introduction}
            </p>
            <div className="flex flex-col items-center justify-between">
              <span className="font-bold text-gray-900 self-start">
                ${product.attributes.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
