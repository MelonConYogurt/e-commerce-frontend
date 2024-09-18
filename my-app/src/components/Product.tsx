/* eslint-disable @next/next/no-img-element */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Product {
  id: number;
  attributes: {
    name: string;
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
    <>
      {data.map((product, index) => (
        <div
          key={index}
          className="flex flex-col bg-white border border-gray-200 rounded-sm shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg  lg:min-w-64 md:min-w-64 sm:min-w-64"
        >
          <div className="h-64 w-full overflow-hidden flex flex-col justify-center items-center bg-[#f6f6f6] ">
            <Carousel className="w-full max-w-xs mx-1">
              <CarouselContent>
                {product.attributes.media.data.map((mediaItem) => (
                  <CarouselItem key={mediaItem.id}>
                    <img
                      src={
                        mediaItem.attributes.formats.medium?.url ||
                        mediaItem.attributes.url ||
                        "/placeholder.svg"
                      }
                      alt={`${product.attributes.name} - Image`}
                      className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {product.attributes.name}
            </h2>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              {product.attributes.introduction}
            </p>
            <div className="flex  flex-col items-center justify-between">
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
