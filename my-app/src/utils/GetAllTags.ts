async function GetAllTags() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tags?populate=*`,
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
      console.log(meta);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export default GetAllTags;
