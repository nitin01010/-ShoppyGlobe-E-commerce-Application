import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://dummyjson.com',
  withCredentials: false,
});

export default instance;
