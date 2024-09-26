async function GetAllProductsPagination(page: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?populate=*pagination[pageSize]=3&pagination[page]=${page}`,
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

export default GetAllProductsPagination;
