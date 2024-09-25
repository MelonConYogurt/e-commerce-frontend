"use client";

import React from "react";
import {useCartStore} from "@/hooks/cart";
import FavoriteProducts from "@/components/FavoriteProducts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

const FavoritesPage: React.FC = () => {
  const {favoriteProducts, deleteAllFav} = useCartStore();

  return (
    <div className="flex items-center justify-center my-20">
      <div className="container relative">
        <Card className="rounded-lg">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Your Favorites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-5 mx-5 justify-center items-center">
              {favoriteProducts.length > 0 ? (
                <FavoriteProducts data={favoriteProducts} />
              ) : (
                <p className="text-center text-gray-500">
                  You don&apos;t have any favorite products yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <Button
          className="absolute top-2 right-2"
          size="lg"
          onClick={deleteAllFav}
          disabled={favoriteProducts.length === 0}
        >
          Clear All Favorites
        </Button>
      </div>
    </div>
  );
};

export default FavoritesPage;
