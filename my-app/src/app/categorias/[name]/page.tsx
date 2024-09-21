// import Link from "next/link";
// import {Card, CardContent, CardFooter} from "@/components/ui/card";
// import {Button} from "@/components/ui/button";
// import GetAllCategories from "@/utils/getAllCategories";
// import {Category} from "@/types";

// async function fetchData() {
//   try {
//     const response = await GetAllCategories();
//     return response || [];
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }
// }

// export default async function Categorias() {
//   const categories: Category[] = await fetchData();

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">
//         Categorías de Tenis
//       </h1>
//       {categories && categories.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {categories.map((category) => (
//             <Card key={category.id} className="overflow-hidden">
//               <CardContent className="p-4">
//                 <h2 className="text-xl font-semibold mb-2">
//                   {category.attributes.name}
//                 </h2>
//               </CardContent>
//               <CardFooter>
//                 <Link href={`/categoria/${category.id}`} passHref>
//                   <Button className="w-full">Ver Productos</Button>
//                 </Link>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">
//           No se encontraron categorías.
//         </p>
//       )}
//     </div>
//   );
// }

export default function Page({params}: {params: {name: string}}) {
  return <div>My Post: {params.name}</div>;
}
