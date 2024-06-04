import { BaseAxios } from '@/utils/baseAxios';

export const handleSendSms = async (phone: string, setPhoneNumberError: any) => {
  const axios = new BaseAxios();
  const sendCode = await axios.post('/user/send-code', { phone });
  if (sendCode) setPhoneNumberError('Đã gửi mã xác nhận vui lòng kiểm tra điện thoại của bạn');
  setTimeout(() => {
    setPhoneNumberError('');
  }, 30000);
};

export const handleCheckCode = async (
  phone: string,
  code: string,
  setCodeError: any,
  setDisabledSubmit: any
) => {
  const axios = new BaseAxios();
  const checkCode = await axios.post('/user/check-code', { phone, code });
  console.log('🚀 ~ handleCheckCode ~ checkCode:', checkCode);
  if (!checkCode?.data) setCodeError('Mã xác nhận sai vui lòng thử lại');
  else setDisabledSubmit(false);
};

export const handleCreateAccount = async (data: any, handleCloseRegister: () => void) => {
  console.log('🚀 ~ handleCreateAccount ~ data:', data);
  const axios = new BaseAxios();
  const createAccount = await axios.post('/user', data);
  // if (!createAccount.data) alert('kkk');
  handleCloseRegister();
};
