import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";
import GetAllCategories from "@/utils/getAllCategories";
import {Category} from "@/types";

async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await GetAllCategories();
    return response || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function CategoriasMenu() {
  const categories = await fetchCategories();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-primary text-base">
            Categorías
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex flex-row">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Explora Categorías
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Descubre nuestra amplia gama de categorías y encuentra
                      exactamente lo que buscas.
                    </p>
                  </a>
                </NavigationMenuLink>
              </div>
              <ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/categorias/${category.attributes.name}`}
                          className={navigationMenuTriggerStyle()}
                        >
                          {category.attributes.name.charAt(0).toUpperCase() +
                            category.attributes.name.slice(1)}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted-foreground">
                    No se encontraron categorías.
                  </li>
                )}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
