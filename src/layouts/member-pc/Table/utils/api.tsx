import { BaseAxios } from '@/utils';

export const getAllPointByUser = () => {
  const axios = new BaseAxios();

  return axios.get('/user-point');
};

export const transferPoint = async (
  gamePointTransfer: number,
  gamePointReceive: number,
  points: number
) => {
  const axios = new BaseAxios();
  return axios.post('/user-point', {
    gamePointTransfer,
    gamePointReceive,
    points,
  });
};
