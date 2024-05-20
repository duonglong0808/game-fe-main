import { setDataGamePoint, setDataUserLogin } from '@/lib/redux/app/user.slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { BaseAxios } from '@/utils';
import { useEffect } from 'react';
import { getAllPointByUser } from './api';
import { cleanDataMessage } from '@/lib/redux/system/settingSys';

export const getUserInfo = async (dispatch: any) => {
  const axios = new BaseAxios();
  const [userInfo] = await Promise.all([axios.get('auth/userInfo')]);
  if (userInfo) {
    dispatch(setDataUserLogin({ ...userInfo?.data }));
    return true;
  }
  return false;
};

export const useGamePointHeader = () => {
  const { dataGamePoints, isFetchPoint } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (isFetchPoint) {
        const point = await getAllPointByUser();
        dispatch(
          setDataGamePoint({
            data: point?.data,
          })
        );
      }
    }

    fetchData();
  }, [isFetchPoint]);

  const gameMain = dataGamePoints?.find((item) => item.gameSlug == 'tk-chinh');
  return {
    gameMainId: gameMain?.gamePointId,
    gameMainPoint: gameMain?.points || 0,
    dataGamePoints,
    totalPoint: dataGamePoints?.reduce((pre, item) => pre + item.points, 0),
  };
};

export const handleNavigateGameKu = (userName: string) => {
  if (userName) {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    window.open(
      `${process.env.URL_GAME}?access_token=${accessToken}&&refresh_token=${refreshToken}`,
      '_blank'
    );
  }
};

export const handleConfirmMessage = (dispatch: any) => {
  dispatch(cleanDataMessage({}));
};
