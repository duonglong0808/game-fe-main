import { BaseAxios } from '@/utils';

export const getAllPointByUser = () => {
  const axios = new BaseAxios();

  return axios.get('/user-point');
};
