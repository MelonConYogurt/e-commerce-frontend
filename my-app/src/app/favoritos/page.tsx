"use client";

import React from "react";
import {useCartStore} from "@/hooks/cart";
import FavoriteProducts from "@/components/FavoriteProducts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";

const FavoritesPage: React.FC = () => {
  const {favoriteProducts, deleteAllFav} = useCartStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Favorite Items
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center gap-5">
            {favoriteProducts.length > 0 ? (
              <FavoriteProducts data={favoriteProducts} />
            ) : (
              <p className="text-center text-gray-500 py-8">
                You don&apos;t have any favorite products yet
              </p>
            )}
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Favorites Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-lg font-medium mb-4">
                <span>Total Favorites:</span>
                <span className="text-primary">{favoriteProducts.length}</span>
              </div>
              <Button
                size="lg"
                className="w-full"
                disabled={favoriteProducts.length === 0}
                onClick={() => deleteAllFav()}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All Favorites
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
