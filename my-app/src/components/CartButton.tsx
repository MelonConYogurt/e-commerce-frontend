"use client";

import {useCartStore} from "@/hooks/cart";
import {ShoppingCart} from "lucide-react";

function CartButton() {
  const {cartProducts} = useCartStore();
  return (
    <div className="relative ">
      <ShoppingCart className="h-5 w-5 " />
      {cartProducts.length > 0 ? (
        <>
          <div className="flex justify-center items-center absolute -top-2 -right-2  ring rounded-full h-2 w-2 animate-ping  bg-sky-400 opacity-75"></div>
          <div className="flex justify-center items-center absolute -top-2 -right-2  rounded-full h-2 w-2 bg-sky-500 "></div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CartButton;
