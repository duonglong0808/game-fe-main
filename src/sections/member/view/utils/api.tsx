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
    url += `&dateFrom=${dateFrom}&dateTo=${dateTo}`;
  }
  if (gameReceiverId) {
    url += `&gameReceiverId=${gameReceiverId}`;
  }
  return axios.get(url);
};

export const getAllPaymentType = async () => {
  const axios = new BaseAxios();
  return axios.get('/payment-type?sort=id&typeSort=ASC');
};

export const getPaymentByType = async (paymentTypeId: number) => {
  const axios = new BaseAxios();
  return axios.get(`/payment?paymentTypeId=${paymentTypeId}&sort=id&typeSort=ASC`);
};

export const getAllBankPayment = async (paymentId: number) => {
  const axios = new BaseAxios();
  return axios.get(`/payment/${paymentId}/bank`);
};

export const getAllBankUser = () => {
  const axios = new BaseAxios();
  return axios.get(`/bank?isForUser=1`);
};

export const depositPointToMain = (data: any) => {
  const axios = new BaseAxios();
  return axios.post(`/payment-transaction`, data);
};
