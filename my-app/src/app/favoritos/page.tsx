"use client";

import React, {useEffect, useState} from "react";
import {useCartStore} from "@/hooks/cart";

const FavoritosPage: React.FC = () => {
  const {favoriteProducts} = useCartStore();

  return <div></div>;
};

export default FavoritosPage;
