import type { AxiosInstance } from 'axios';
import axios from 'axios';

const API_BASE_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
const REQUEST_TIMEOUT = 5000;

const configureAPI = (): AxiosInstance => {
  const apiConfig = axios.create({
    baseURL: API_BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return apiConfig;
};

export default configureAPI;
