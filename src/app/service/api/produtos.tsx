export const listarProdutos = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const headersList = {
    Accept: "*/*",
  };
  try {
    const response = await fetch(`${BASE_URL}api/consultar-produtos`, {
      method: "GET",
      headers: headersList,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
