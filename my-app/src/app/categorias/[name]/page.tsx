import GetProductsFilter from "@/utils/DinamicFilter";
import ProductCard from "@/components/AlternativeProducts";
import Transition from "@/components/Transition";

async function fetchData(name: string) {
  try {
    const filter = `filters[categories][name][$eq]=${name}&`;
    const response = await GetProductsFilter(1000, filter);
    return response || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function CategoryProducts({
  params,
}: {
  params: {name: string};
}) {
  const data = await fetchData(params.name);
  return (
    <Transition>
      <div className="flex-1 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
        <ProductCard data={data} />
      </div>
    </Transition>
  );
}
