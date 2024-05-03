import { paths } from '@/routes/paths';
export const PURCHASE = [
  {
    name: 'Thanh toán trực tuyến',
    icon: '/mobile/icons/icon_online.svg',
    limit: '100~50000',
    href: paths.mobile.purchase.online,
  },
  {
    name: 'QRCode',
    icon: '/mobile/icons/icon_qrCode.svg',
    limit: '100~50000',
    href: paths.mobile.purchase.qrcode,
  },
  {
    name: 'Chuyển tiền ATM',
    icon: '/mobile/icons/icon_atm.svg',
    limit: '100~50000',
    href: paths.mobile.purchase.atm,
  },
  {
    name: 'Ngân hàng điện tử',
    icon: '/mobile/icons/icon_netBank.svg',
    limit: '100~50000',
    href: paths.mobile.purchase.banking,
  },
  {
    name: 'Ví điện tử',
    icon: '/mobile/icons/icon_wallet.svg',
    limit: '100~50000',
    href: paths.mobile.purchase.vnpay,
  },
  // {
  //   name: 'Chuyển tại quầy',
  //   icon: '/member/purchase/icon_online.png',
  //   limit: '100~50000',
  //   href: paths.mobile.purchase.counter,
  // },
  {
    name: 'Tiền mã hóa',
    icon: '/mobile/icons/icon_token.svg',
    limit: '100~50000',
    href: paths.mobile.purchase.crypto,
  },

  // {
  //   name: 'Sắp ra mắt',
  //   icon: '/member/purchase/icon_online.png',
  //   disable: true,
  // },
];
