import { setDataUserLogin, setFetchingDataPoint } from '@/lib/redux/app/user.slice';
import { depositPointToMain, getAllPaymentType, transferPoint } from './api';
import { cleanDataMessage, setMessageApp } from '@/lib/redux/system/settingSys';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { useEffect } from 'react';
import { setPaymentTypes } from '@/lib/redux/app/payment.slice';
import { useRouter } from 'next/navigation';
import { BaseAxios } from '@/utils';

export const handleMovePoint = async (
  gamePointTransfer: number,
  gamePointReceive: number,
  points: number,
  dispatch: any
) => {
  if (gamePointTransfer && gamePointReceive && points) {
    const res = await transferPoint(gamePointTransfer, gamePointReceive, points);
    console.log('🚀 ~ res:', res);
    if (res.data) {
      dispatch(setFetchingDataPoint({ isFetchPoint: true }));
      dispatch(
        setMessageApp({
          titleMessage: 'Tin nhắn',
          descMessage: 'Chuyển tiền thành công',
          textClose: '',
          textConfirm: 'Xác nhận',
        })
      );
    }
  }
};

export const handleConfirmMessage = (dispatch: any) => {
  dispatch(cleanDataMessage({}));
};

export const usePaymentTypes = () => {
  const { fetchDataPaymentTypes, paymentTypes } = useAppSelector((state) => state.payment);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (fetchDataPaymentTypes) {
        const res = await getAllPaymentType();
        if (res.data) {
          const { data } = res.data;
          dispatch(
            setPaymentTypes({
              data,
            })
          );
        }
      }
    }

    fetchData();
  }, [fetchDataPaymentTypes]);

  return { data: paymentTypes };
};

export const handleDepositPoint = async (data: any, dispatch: any) => {
  const res = await depositPointToMain(data);
  if (res.data) {
    console.log('🚀 ~ handleDepositPoint ~ res.data:', res.data);
    dispatch(
      setMessageApp({
        titleMessage: 'Tin nhắn',
        descMessage: 'Xác nhận thành công, vui lòng chờ trong ít phút',
        textClose: '',
        textConfirm: 'Xác nhận',
      })
    );
  }
};

export const refreshPoint = (dispatch: any) => {
  dispatch(setFetchingDataPoint({ isFetchPoint: true }));
};

export const handleDrawMoney = async (data: any, dispatch: any) => {
  const res = await depositPointToMain(data);
  if (res.data) {
    dispatch(setFetchingDataPoint({ isFetchPoint: true }));
    dispatch(
      setMessageApp({
        titleMessage: 'Tin nhắn',
        descMessage: 'Yêu cầu rút tiền thành công, hệ thống sẽ nhanh chóng giúp bạn sử lý',
        textClose: '',
        textConfirm: 'Xác nhận',
      })
    );
  }
};

export const addMessagePopup = async (
  titleMessage: string,
  descMessage: string,
  textConfirm: string,
  dispatch: any
) => {
  dispatch(
    setMessageApp({
      titleMessage,
      descMessage,
      textClose: '',
      textConfirm,
    })
  );
};

export const useDataUserInfo = () => {
  const dispatch = useAppDispatch();
  const { userName } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (!userName) {
        const axios = new BaseAxios();
        const userInfo = await axios.get('auth/userInfo');
        if (userInfo) {
          dispatch(setDataUserLogin(userInfo?.data));
          return true;
        } else {
          router.replace('/desktop/home');
        }
      }
    }

    fetchData();
  });

  return true;
};
