'use client';
import { ShowConfirmMessage } from '@/app/compmnents/ShowMessage';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import classNames from 'classnames';
import { Popover } from 'flowbite-react';
import {
  handleConfirmMessage,
  handleMovePointToOtherGame,
  moveAllPointToMainPoint,
} from './utils/handleAsset';
type Props = {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const dataPointStatics = [
  {
    name: 'KU Thể Thao',
    slug: 'ku-the-thao',
  },
  {
    name: 'JZ Thể Thao',
    slug: 'jz-the-thao',
  },
  {
    name: 'CMD',
    slug: 'cmd',
  },
  {
    name: 'SABA',
    slug: 'saba',
  },
  {
    name: 'AI',
    slug: 'ai',
  },
  {
    name: 'PANDA',
    slug: 'cmd',
  },
  {
    name: 'KU Xổ số',
    slug: 'ku-xo-xo',
  },
  {
    name: 'BBIN',
    slug: 'bbin',
  },
  {
    name: 'IM',
    slug: 'im',
  },
  {
    name: 'COOL-IN',
    slug: 'cool-in',
  },
  {
    name: 'KU Casino',
    slug: 'ku-casino',
  },
  {
    name: 'AG',
    slug: 'ag',
  },
  {
    name: 'WM',
    slug: 'wm',
  },
  {
    name: 'GPI',
    slug: 'gpi',
  },
  {
    name: 'DG',
    slug: 'dg',
  },
  {
    name: 'SA',
    slug: 'sa',
  },
  {
    name: 'AES',
    slug: 'aes',
  },
  {
    name: 'EVO',
    slug: 'evo',
  },
  {
    name: 'DB casino',
    slug: 'db-casino',
  },
  {
    name: 'V8',
    slug: 'v8',
  },
  {
    name: '3D',
    slug: '3d',
  },
  {
    name: 'BNG',
    slug: 'bng',
  },
  {
    name: 'CQ9',
    slug: 'cq9',
  },
  {
    name: 'PLS',
    slug: 'pls',
  },
  {
    name: 'RK5',
    slug: 'rk5',
  },
  {
    name: 'DS',
    slug: 'ds',
  },
  {
    name: 'KS',
    slug: 'ks',
  },
  {
    name: 'PG',
    slug: 'pg',
  },
  {
    name: 'KA',
    slug: 'ka',
  },
  {
    name: 'FTG',
    slug: 'ftg',
  },
  {
    name: 'FC',
    slug: 'fc',
  },
  {
    name: 'DB Bắn Cá',
    slug: 'db-ban-ca',
  },
  {
    name: 'Ví bạn bè',
    slug: 'vi-ban-be',
  },
];
export default function AssetPopover({ children, open, setOpen }: Props) {
  const { dataGamePoints, isFetchPoint } = useAppSelector((state) => state.user);
  const gameMain = dataGamePoints?.find((item) => item.gameSlug == 'tk-chinh');
  const dispatch = useAppDispatch();

  const gameMainId = gameMain?.gamePointId;
  const content = (
    <div className="animate-show-down z-50 h-[70vh] w-[70vw] rounded-sm bg-[#49484b] text-white overflow-hidden flex flex-col justify-between">
      <div className="flex-1 p-2 overflow-auto divide-y divide-gray-400">
        {dataPointStatics.map((item, index) => (
          <Item
            key={index}
            title={item.name}
            colorTitle="#fff"
            gameMainId={gameMainId}
            gamePointId={dataGamePoints?.find((point) => point.gameSlug == item.slug)?.gamePointId}
            count={dataGamePoints?.find((point) => point.gameSlug == item.slug)?.points || 0}
            colorCount="text-[#91ff6d]"
            closePopup={() => setOpen(false)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 p-2 bg-[#272727] divide-y divide-gray-400">
        <Item
          title="Tổng số điểm"
          count={dataGamePoints?.reduce((pre, item) => pre + item.points, 0) | 0}
          colorTitle="text-[yellow]"
          colorCount="text-yellow-400"
          hideTransfer={true}
        />
        <Item
          title="Quà tặng miễn phí"
          count={0}
          colorTitle="text-purple-400"
          colorCount="text-purple-400"
        />
        <button
          className="p-2 bg-[#ffa406] rounded-full"
          onClick={() => {
            const gameHasPoint = dataGamePoints.filter((p) => p.points > 0);
            if (gameHasPoint.length && gameMainId) {
              moveAllPointToMainPoint(gameHasPoint, gameMainId, dispatch);
              setOpen(false);
            }
          }}>
          Chuyển hết về tài khoản chính
        </button>
      </div>
    </div>
  );
  return (
    <Popover content={content} open={open} onOpenChange={setOpen}>
      {children}
    </Popover>
  );
}
type ItemProps = {
  title: string;
  count: number;
  colorTitle?: string;
  colorCount?: string;
  gamePointId?: number;
  gameMainId?: number;
  hideTransfer?: boolean;
  closePopup?: () => void;
};
const Item = ({
  title,
  count,
  colorTitle,
  colorCount,
  gameMainId,
  gamePointId,
  hideTransfer,
  closePopup,
}: ItemProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex gap-2 text-sm py-1 pt-2">
      <p className={classNames('flex-[0.4] border-r border-gray-400 ', `${colorTitle} !important`)}>
        {title}
      </p>
      <div className="flex-[0.6] flex justify-between ">
        <p className={classNames('text-base', `${colorCount} !important`)}>
          {count?.toLocaleString('vi-VN')}
        </p>
        {count > 0 && !hideTransfer && (
          <button
            className="rounded-md bg-sky-400 p-1"
            onClick={() => {
              if (gamePointId && gameMainId) {
                handleMovePointToOtherGame(gamePointId, gameMainId, count, dispatch);
                closePopup && closePopup();
              }
            }}>
            Chuyển về
          </button>
        )}
      </div>
    </div>
  );
};
