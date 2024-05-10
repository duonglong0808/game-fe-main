import { BaseAxios } from '@/utils';

export const transferPoint = async (
  gamePointTransfer: number,
  gamePointReceive: number,
  userId: number,
  points: number
) => {
  const axios = new BaseAxios();
  return axios.patch('/user-point', {
    gamePointTransfer,
    gamePointReceive,
    userId,
    points,
  });
};
