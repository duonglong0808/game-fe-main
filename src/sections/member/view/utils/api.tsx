import { BaseAxios } from '@/utils';

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

export const getHistoryTransfer = async (
  page: number,
  limit: number,
  dateFrom: string,
  dateTo: string,
  gameReceiverId?: number
) => {
  const axios = new BaseAxios();
  let url = `/user-point/history?page=${page}&limit=${limit}`;
  if (dateFrom && dateTo) {
    url += `dateFrom="${dateFrom}"&dateTo="${dateTo}"`;
  }
  if (gameReceiverId) {
    url += `gameReceiverId=${gameReceiverId}`;
  }
  return axios.get(url);
};
