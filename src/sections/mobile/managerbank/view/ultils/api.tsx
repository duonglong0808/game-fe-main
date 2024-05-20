import { BaseAxios } from '@/utils';

export const getAllBankUser = () => {
  const axios = new BaseAxios();
  return axios.get(`/bank?isForUser=1`);
};
