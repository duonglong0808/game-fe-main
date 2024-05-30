import { useEffect } from 'react';
import { getAllPointByUser, transferPoint } from './api';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { setDataGamePoint, setFetchingDataPoint } from '@/lib/redux/app/user.slice';
import { cleanDataMessage, setMessageApp } from '@/lib/redux/system/settingSys';

export const refreshPoint = (dispatch: any) => {
  dispatch(setFetchingDataPoint({ isFetchPoint: true }));
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

export const handleMovePointToOtherGame = async (
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

export const moveAllPointToMainPoint = async (
  data: { gamePointId: number; gameSlug: string; gameName: string; points: number }[],
  gameMainId: number,
  dispatch: any
) => {
  const movePoints = await Promise.all(
    data.map((game) => transferPoint(game.gamePointId, gameMainId, game.points))
  );
  if (movePoints) {
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
};

export const handleConfirmMessage = (dispatch: any) => {
  dispatch(cleanDataMessage({}));
};

export const showMessageWarningHome = (dispatch: any) => {
  dispatch(
    setMessageApp({
      titleMessage: 'Thông báo đề phòng lộ thông tin',
      descMessage: `
      <span>Link chính của trang mạng là 
      <a class='text-[#FF0000] uppercase font-semibold underline' href='${process.env.URL_MAIN}'>${
        process.env.URL_MAIN?.split('//')[1]
      }</a>
      </span>
      <span>Nếu Quý khách đã đăng nhập vào các trang web không xác định, vui lòng <strong class='text-[#0000FF]'>ngay lập tức thay đổi mật khẩu tài khoản</strong >, xin cảm ơn!!!</span>
      `,
      textClose: '',
      textConfirm: '',
      showIconClosed: true,
      isContentHtml: true,
    })
  );
};
