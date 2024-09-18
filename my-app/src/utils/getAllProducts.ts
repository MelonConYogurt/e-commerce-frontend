import {API_URL, API_TOKEN} from "../config";

async function GetAllProducts(limit: number = 1000) {
  try {
    const response = await fetch(
      `${API_URL}/api/products?populate=*&pagination[limit]=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    } else {
      const {data, meta} = await response.json();
      console.log(meta);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export default GetAllProducts;
