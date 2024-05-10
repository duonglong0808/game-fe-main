import axios, { AxiosInstance } from 'axios';

export class BaseAxios {
  private request: AxiosInstance;

  constructor(url?: string) {
    const accessToken = localStorage.getItem('access_token');
    this.request = axios.create({
      baseURL: url || process.env.API_URL,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin': '*',
      },
      timeout: 10000,
    });
  }

  async post(url: string, data: any, config?: any) {
    try {
      const response = await this.request.post(url, data, config);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data?.exception?.message);
    }
  }

  async patch(url: string, data: any, config?: any) {
    try {
      const response = await this.request.patch(url, data, config);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data?.exception?.message);
    }
  }
}

export const endpoints = {
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
};

const axiosInstance = axios.create({ baseURL: process.env.API_URL });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
