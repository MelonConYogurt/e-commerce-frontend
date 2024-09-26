async function GetProductsFilter(
  page: number,
  filter: string = "",
  pageSize: number = 25
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}&${filter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    } else {
      const {data, meta} = await response.json();
      return {data, meta};
    }
  } catch (error) {
    console.log(error);
  }
}

export default GetProductsFilter;
