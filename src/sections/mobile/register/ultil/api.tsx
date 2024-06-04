import { BaseAxios } from '@/utils';

export const createAccount = (data: any) => {
  const axios = new BaseAxios();
  return axios.postV2('/user', data);
};
