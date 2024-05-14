import { BaseAxios } from '@/utils';
import moment from 'moment';

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
    url += `&dateFrom=${moment(dateFrom, 'DD/MM/YYYY').toDate()}&dateTo=${moment(
      dateTo,
      'DD/MM/YYYY'
    ).toDate()}`;
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

export const getAllPaymentTransaction = (page: number, type: number, status: number) => {
  const axios = new BaseAxios();
  const dateTo = new Date();
  const dateFrom = new Date(dateTo.getTime() - 7 * 24 * 60 * 60 * 1000);
  let url = `/payment-transaction?page=${page}&limit=${10}&dateFrom=${dateFrom}&dateTo=${dateTo}&status=${status}`;
  if (type < 2) {
    url += `&type=${type}`;
  }
  return axios.get(url);
};

export const upLoadOneFile = async (folder: string, file: File) => {
  const axios = new BaseAxios();
  const formData = new FormData();
  formData.append('folder', folder);
  formData.append('file', file);
  const res = await axios.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  if (res) {
    return res?.data?.data;
  } else {
    return '';
  }
};

export const updateReceiptByTransactionId = (id: number, receipt: string) => {
  const axios = new BaseAxios();
  return axios.patch(`/payment-transaction/${id}/receipt`, { receipt });
};

export const addBankUser = (data: any) => {
  const axios = new BaseAxios();
  return axios.post(`/bank`, data);
};
