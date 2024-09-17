import {Heart, ShoppingCart} from "lucide-react";

function ProductCard() {
  return (
    <div className="flex flex-col items-center justify-center border border-black w-80 h-[506px] rounded-lg">
      <div className="w-60">Imagenes</div>
      <div className="w-72 flex flex-col items-center justify-center">
        <div className="w-10">titulo</div>
        <div className="w-32">description</div>
        <div className="w-20">precio</div>
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
  );
}

export default ProductCard;
