import ProductCard from "@/components/Product";
import GetAllProducts from "@/utils/getAllProducts";

async function fetchData() {
  try {
    const response = await GetAllProducts();
    return response || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Home() {
  const data = await fetchData();

  return (
    <div>
      <main>
        <ProductCard data={data} />
      </main>
    </div>
  );
}
