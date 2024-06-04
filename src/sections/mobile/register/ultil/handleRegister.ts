import { cleanDataMessage, setMessageApp } from '@/lib/redux/system/settingSys';
import { createAccount } from './api';

export const handleCreateAccount = async (data: any, router: any, dispatch: any) => {
  const res = await createAccount(data);
  if (res.data) {
    router.replace('/mobile');
  } else {
    dispatch(
      setMessageApp({
        descMessage: res.message,
        textClose: '',
        textConfirm: 'Xác nhận',
        titleMessage: 'Tin nhắn',
      })
    );
  }
};

export const handleConfirmMessage = (dispatch: any) => {
  dispatch(cleanDataMessage({}));
};
