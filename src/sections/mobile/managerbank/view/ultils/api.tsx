import { BaseAxios } from '@/utils';

export const getAllBankUser = () => {
  const axios = new BaseAxios();
  return axios.get(`/bank?isForUser=1`);
};

export const addBankUser = (data: any) => {
  const axios = new BaseAxios();
  return axios.post(`/bank`, data);
};
