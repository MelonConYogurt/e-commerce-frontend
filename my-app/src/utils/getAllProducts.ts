import {API_URL, API_TOKEN} from "../config";

async function GetAllProducts() {
  try {
    const response = await fetch(`${API_URL}/api/products&populate=*`, {
      headers: {
        content: "content-type",
        Autorization: `bearer ${API_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    } else {
      const data = response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default GetAllProducts;
