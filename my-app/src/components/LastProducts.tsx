import ProductCard from "./Products";
import GetAllProducts from "@/utils/getAllProducts";

async function fetchData() {
  try {
    const response = await GetAllProducts(6);
    return response || [];
  } catch (error) {
    return [];
  }
}

async function LastProductsCard() {
  const data = await fetchData();
  return <ProductCard data={data}></ProductCard>;
}

export default LastProductsCard;
