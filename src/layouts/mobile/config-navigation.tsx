import { useAppSelector } from '@/lib/redux/utilRedux';
import { paths } from '@/routes/paths';
import Image from 'next/image';
import { useMemo } from 'react';

const icon = (name: string, width = 25, height = 25, type = 'svg') => (
  <Image src={`/mobile/icons/${name}.${type}`} alt={name} width={width} height={height} />
);

const ICONS = {
  home: icon('footer_home'),
  endow: icon('endow', 25, 25, 'png'),
  support: icon('support'),
  purchase_withdraw: icon('purchase_withdraw', 47, 47, 'svg'),
  transaction: icon('transaction'),
  me: icon('me'),
  // transition: icon('transition'),
  purchase: icon('purchase', 34, 34),
  withdraw: icon('withdraw', 34, 34),
};

export const useNavData = () => {
  const currentUser = useAppSelector((state) => state.user);
  const { name, userName } = currentUser;
  const data = useMemo(
    () => [
      {
        title: 'Trang chủ',
        icon: ICONS.home,
        path: paths.mobile.root,
      },
      {
        title: 'Ưu đãi',
        icon: ICONS.endow,
        path: paths.mobile.endow,
      },
      {
        title: 'Hỗ trợ',
        icon: ICONS.support,
        path: paths.mobile.support,
      },
      {
        subheader: 'Nạp rút tiền',
        icon: ICONS.purchase_withdraw,
        items: [
          {
            title: 'Chuyển quỹ',
            path: paths.mobile.transfer,
            bg: 'bg-[#3c92c5]',
          },
          {
            title: 'Nạp tiền',
            path: paths.mobile.purchase.root,
            icon: ICONS.purchase,
            bg: 'bg-[#0a9d4c]',
          },
          {
            title: 'Rút tiền',
            path: paths.mobile.withdraw,
            icon: ICONS.withdraw,
            bg: 'bg-[#f79319]',
          },
        ],
      },
      {
        title: 'Giao dịch',
        icon: ICONS.transaction,
        path: paths.mobile.transaction,
      },
      {
        title: 'Tôi',
        icon: ICONS.me,
        path: paths.mobile.me,
      },
    ],
    []
  );

  return { data, isLogin: Boolean(userName) };
};
