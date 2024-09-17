import {Heart, ShoppingCart} from "lucide-react";

interface Products {
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

interface Data {
  data: [Products];
}

async function ProductCard({data}: Data) {
  return (
    <>
      {data.map((Element, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center border border-black w-80 h-[506px] rounded-lg"
        >
          <div className="w-60">{}</div>
          <div className="w-72 flex flex-col items-center justify-center">
            <div className="w-10">{Element.attributes.title}</div>
            <div className="w-32"> {Element.attributes.introduction} </div>
            <div className="w-20">{Element.attributes.price}</div>
            <div className="flex space-x-4 mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center">
                <ShoppingCart size={20} />
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductCard;
