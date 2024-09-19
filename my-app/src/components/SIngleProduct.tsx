/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {Product} from "@/types";

interface ProductCardProps {
  data: Product[];
}

export default function ProductCard({data}: ProductCardProps) {
  return (
    <>
      {data.map((product) => (
        <div
          key={product.id}
          className="flex flex-col border rounded-md overflow-hidden shadow-md"
        >
          {/* Main Image */}
          <div className="bg-[#f6f6f6]">
            <img
              className="w-full h-auto"
              src={
                product.attributes.media.data[0]?.attributes.formats.medium
                  ?.url || "/placeholder.jpg"
              }
              alt={product.attributes.name}
            />
          </div>
          {/* Thumbnail Images */}
          <div className="flex flex-row gap-2 my-2 px-2">
            {product.attributes.media.data.map((image) => (
              <img
                className="rounded-md cursor-pointer"
                key={image.id}
                src={image.attributes.formats.small?.url || "/placeholder.jpg"}
                width={60}
                height={60}
                alt={`Thumbnail for ${product.attributes.name}`}
              />
            ))}
          </div>
          {/* Product Details */}
          <div className="p-4 flex flex-col">
            <Link href={`/productos/${product.attributes.slug}`}>
              <a className="text-xl font-semibold mb-2 text-gray-800 hover:underline">
                {product.attributes.name}
              </a>
            </Link>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              {product.attributes.introduction}
            </p>
            <div className="flex flex-col items-center">
              <span className="font-bold text-gray-900">
                ${product.attributes.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
