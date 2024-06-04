import { cleanDataMessage, setMessageApp } from '@/lib/redux/system/settingSys';
import { submitGiftCode } from './api';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const handleSubmitGiftCode = async (giftCode: string, dispatch: any) => {
  const res = await submitGiftCode(giftCode);
  if (res?.data) {
    window.location.reload();
  } else {
    dispatch(
      setMessageApp({
        titleMessage: 'Tin nhắn',
        descMessage:
          res?.message == 'cannot_use' || res?.message == 'gif_code_invalid'
            ? 'Mã ưu đãi đã sử dụng hoặc không hợp lệ'
            : 'Có lỗi vui lòng thử lại',
        textClose: '',
        textConfirm: 'Xác nhận',
      })
    );
  }
};

export const handleConfirmMessage = (dispatch: any) => {
  dispatch(cleanDataMessage({}));
};
