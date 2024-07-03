import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from '../constants/Constants'
import StorageService from './StorageService';

const baseURL = API_BASE_URL
const timeout = 0;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout,
});

axiosInstance.interceptors.request.use(

  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {

    const authToken = await StorageService.getItem("auth-token");

    if (authToken) {
      config.headers['Cookie'] = 'authToken=' + authToken + ";"
    }

    return config;

  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(

  async (response: AxiosResponse): Promise<AxiosResponse> => {
    return response;
  },
  (error) => {

    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, redirecting to login...');
    }

    return Promise.reject(error);

  }

);

export default axiosInstance;