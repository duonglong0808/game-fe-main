// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  GAME: '/game',
  MOBILE: '/mobile',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    mail: `${ROOTS.DASHBOARD}/mail`,
    customer: {
      root: `${ROOTS.DASHBOARD}/customer`,
      new: `${ROOTS.DASHBOARD}/customer/new`,
      stock: `${ROOTS.DASHBOARD}/customer/stock`,
      list: `${ROOTS.DASHBOARD}/customer/list`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/customer/${id}/edit`,
    },
  },
  game: {
    xoc_dia: {
      root: `${ROOTS.GAME}/xocdia`,
      detail: (id: string) => `${ROOTS.GAME}/xocdia/${id}`,
      demo: {
        detail: `${ROOTS.GAME}/xocdia/${1}/`,
      },
    },
  },
  mobile: {
    root: `${ROOTS.MOBILE}`,
    endow: `${ROOTS.MOBILE}/endow`,
    member: `${ROOTS.MOBILE}/member`,
    transaction: `${ROOTS.MOBILE}/transaction`,
    support: `${ROOTS.MOBILE}/support`,
    me: `${ROOTS.MOBILE}/me`,
    purchase: {
      root: `${ROOTS.MOBILE}/purchase`,
      atm: `${ROOTS.MOBILE}/purchase/atm`,
      online: `${ROOTS.MOBILE}/purchase/online`,
      banking: `${ROOTS.MOBILE}/purchase/banking`,
      qrcode: `${ROOTS.MOBILE}/purchase/qrcode`,
      counter: `${ROOTS.MOBILE}/purchase/counter`,
      crypto: `${ROOTS.MOBILE}/purchase/crypto`,
      vnpay: `${ROOTS.MOBILE}/purchase/vnpay`,
    },
    withdraw: `${ROOTS.MOBILE}/withdraw`,
    transfer: `${ROOTS.MOBILE}/transfer`,
    forgotPassword: `${ROOTS.MOBILE}/forgotPassword`,
    register: `${ROOTS.MOBILE}/register`,
    infor: `${ROOTS.MOBILE}/infor`,
    managerbank: `${ROOTS.MOBILE}/managerbank`,
  },
};
