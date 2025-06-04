import axios from 'axios';

const BASE_URL = 'http://localhost:9090';

export const getAllCategories = () =>
  axios.get(`${BASE_URL}/kategoriler`);