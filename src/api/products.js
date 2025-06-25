import axios from './axiosInstance';

export const fetchAllProducts = () => axios.get('/products');
