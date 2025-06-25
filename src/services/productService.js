import { fetchAllProducts } from '../api/products';

export const getAllProducts = async () => {
  try {
    const { data } = await fetchAllProducts();
    return data;
  } catch (err) {
    console.error('Error fetching products:', err);
    throw err;
  }
};
