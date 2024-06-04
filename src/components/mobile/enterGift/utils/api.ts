import { BaseAxios } from '@/utils';

export const submitGiftCode = (giftCode: string) => {
  const axios = new BaseAxios();
  return axios.postV2('/gift-code/submit', {
    code: giftCode,
  });
};
