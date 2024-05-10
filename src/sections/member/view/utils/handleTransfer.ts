import { setFetchingDataPoint } from '@/lib/redux/app/user.slice';
import { transferPoint } from './api';

export const handleMovePoint = async (
  gamePointTransfer: number,
  gamePointReceive: number,
  userId: number,
  points: number,
  dispatch: any
) => {
  if (gamePointTransfer && gamePointReceive && userId && points) {
    const res = await transferPoint(gamePointTransfer, gamePointReceive, userId, points);
    if (res.data) {
      dispatch(setFetchingDataPoint({ isFetchPoint: true }));
    }
  }
};
