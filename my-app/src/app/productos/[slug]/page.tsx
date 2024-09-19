import GetProductBySlug from "@/utils/SlugProduct";
import SingleProductCard from "@/components/SIngleProduct";

export default async function Page({params}: {params: {slug: string}}) {
  async function fetchData(slug: string) {
    console.log(slug);
    try {
      const response = await GetProductBySlug(slug);
      console.log(response);
      return response || [];
    } catch (error) {
      return [];
    }
  }
  const data = await fetchData(params.slug);
  return (
    <div>
      <SingleProductCard data={data}></SingleProductCard>
    </div>
  );
}
