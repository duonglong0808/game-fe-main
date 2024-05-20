import { setFetchingDataPoint } from '@/lib/redux/app/user.slice';
import { transferPoint } from './api';
import { cleanDataMessage, setMessageApp } from '@/lib/redux/system/settingSys';

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
        descMessage: 'Chuyển hết về tài khoản chính thành công',
        textClose: '',
        textConfirm: 'Xác nhận',
      })
    );
  }
};

export const handleConfirmMessage = (dispatch: any) => {
  dispatch(cleanDataMessage({}));
};
