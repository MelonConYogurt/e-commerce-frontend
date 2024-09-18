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
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mx-10 my-10">
          <ProductCard data={data} />
        </div>
      </main>
    </div>
  );
}
