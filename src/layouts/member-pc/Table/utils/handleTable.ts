import { useEffect } from 'react';
import { getAllPointByUser, transferPoint } from './api';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { setDataGamePoint, setFetchingDataPoint } from '@/lib/redux/app/user.slice';
import { setMessageApp } from '@/lib/redux/system/settingSys';

export const useGameTable = () => {
  const { dataGamePoints, isFetchPoint } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  let INFO = [
    {
      name: 'KU Thể Thao',
      points: 0,
      slug: 'ku-the-thao',
    },
    {
      name: 'KU Casino',
      points: 0,
      slug: 'ku-casino',
    },
    {
      name: 'JZ Thể Thao',
      points: 0,
      slug: 'jz-the-thao',
    },
    {
      name: 'KU Xổ Số',
      points: 0,
      slug: 'ku-xo-so',
    },
    {
      name: '3D',
      points: 5,
      slug: 'sd',
    },
    {
      name: 'AG',
      points: 0,
      slug: 'ag',
    },
    {
      name: 'WM',
      points: 0,
      slug: 'wm',
    },
    {
      name: 'CMD',
      points: 0,
      slug: 'cmd',
    },
    {
      name: 'COOL-IN',
      points: 0,
      slug: 'cool-in',
    },
    {
      name: 'Ví bạn bè',
      points: 0,
      slug: 'vi-ban-be',
    },
  ];
  let INFO_2 = [
    {
      name: 'GPI',
      points: 0,
      slug: 'dgp',
    },
    {
      name: 'DG',
      points: 0,
      slug: 'dg',
    },
    {
      name: 'SA',
      points: 0,
      slug: 'sa',
    },
    {
      name: 'AES',
      points: 0,
      slug: 'aes',
    },
    {
      name: 'EVO',
      points: 0,
      slug: 'evo',
    },
    {
      name: 'DB Casino',
      points: 0,
      slug: 'db-casino',
    },
    {
      name: 'SABA',
      points: 0,
      slug: 'saba',
    },
    {
      name: 'AI',
      points: 0,
      slug: 'ai',
    },
    {
      name: 'BBIN',
      points: 0,
      slug: 'bbin',
    },
    {
      name: 'PANDA',
      points: 0,
      slug: 'panda',
    },
    {
      name: 'IM',
      points: 0,
      slug: 'im',
    },
  ];
  let INFO_3 = [
    {
      name: 'BNG',
      points: 0,
      slug: 'bng',
    },
    {
      name: 'CQ9',
      points: 0,
      slug: 'cq9',
    },
    {
      name: 'PLS',
      points: 0,
      slug: 'pls',
    },
    {
      name: 'RK5',
      points: 0,
      slug: 'rk5',
    },
    {
      name: 'DS',
      points: 0,
      slug: 'ds',
    },
    {
      name: 'V8',
      points: 0,
      slug: 'v8',
    },
    {
      name: 'KS',
      points: 0,
      slug: 'ks',
    },
    {
      name: 'PG',
      points: 0,
      slug: 'pg',
    },
    {
      name: 'KA',
      points: 0,
      slug: 'ks',
    },
    {
      name: 'FTG',
      points: 0,
      slug: 'ftg',
    },
    {
      name: 'FC',
      points: 0,
      slug: 'fc',
    },
    {
      name: 'DB Bắn Cá',
      points: 0,
      slug: 'db-ban-ca',
    },
  ];

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
    main: gameMain?.points,
    INFO: INFO.map((i) => {
      const gamePoint = dataGamePoints?.find((item) => item.gameSlug == i.slug);
      return {
        ...i,
        gamePointId: gamePoint?.gamePointId,
        points: gamePoint?.points || 0,
      };
    }),
    INFO_2: INFO_2.map((i) => {
      const gamePoint = dataGamePoints?.find((item) => item.gameSlug == i.slug);
      return {
        ...i,
        gamePointId: gamePoint?.gamePointId,
        points: gamePoint?.points || 0,
      };
    }),
    INFO_3: INFO_3.map((i) => {
      const gamePoint = dataGamePoints?.find((item) => item.gameSlug == i.slug);
      return {
        ...i,
        gamePointId: gamePoint?.gamePointId,
        points: gamePoint?.points || 0,
      };
    }),
    total: dataGamePoints.reduce((pre, item) => pre + item.points, 0),
  };
};

export const handleMovePointToMain = async (
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
      // dispatch(
      //   setMessageApp({
      //     titleMessage: 'Tin nhắn',
      //     descMessage: 'Chuyển tiền thành công',
      //     textClose: '',
      //     textConfirm: 'Xác nhận',
      //   })
      // );
    }
  }
};
