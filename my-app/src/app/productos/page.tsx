import ProductCard from "@/components/Product";
import GetAllProducts from "@/utils/getAllProducts";
import Transition from "@/components/Transition";

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
    <Transition>
      <div>
        <main>
          <div className="flex">
            <div className="bg-[#f6f6f6] w-52 ml-2 rounded-md my-10 p-2 flex flex-col">
              Menu
            </div>
            <div className="flex-1 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 mx-10 my-10">
              <ProductCard data={data} />
            </div>
          </div>
        </main>
      </div>
    </Transition>
  );
}
