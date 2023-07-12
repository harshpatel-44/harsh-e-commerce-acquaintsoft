import axios from "../../axios/index";

export const getCategoriesList = async () => {
  try {
    const listRes = await axios.get("products/categories");

    return listRes.data;
  } catch (e) {
    throw e.response;
  }
};

export const getCategoryProductsList = async (apiData) => {
  const { category, productApiState } = apiData;
  try {
    const listRes = await axios.get(`products/category/${category}`, {
      params: productApiState,
    });

    return listRes.data;
  } catch (e) {
    throw e.response;
  }
};
