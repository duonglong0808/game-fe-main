import { setDataUserLogin } from '@/lib/redux/app/user.slice';
import { setMessageApp } from '@/lib/redux/system/settingSys';
import { getCookie, setCookie } from '@/utils';
import { BaseAxios } from '@/utils/baseAxios';
import axiosLibrary from 'axios';

function generateBBOSID() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const length = 24; // Độ dài của BBOSID
  let bbosid = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    bbosid += characters.charAt(randomIndex);
  }

  return bbosid;
}

export const handleCreateAccount = async (data: any, handleCloseRegister: () => void) => {
  console.log('🚀 ~ handleCreateAccount ~ data:', data);
  const axios = new BaseAxios();
  const createAccount = await axios.post('/user', data);
  if (!createAccount.data) alert('kkk');
  handleCloseRegister();
};

export const handleLoginAccount = async (
  account: string,
  password: string,
  handleCloseRegister: () => void,
  dispatch: any
) => {
  password = btoa(password);
  const axios = new BaseAxios();
  const login = await axios.post('/auth/login', {
    account,
    password,
  });
  console.log('🚀 ~ handleLoginAccount ~ login:', login);
  if (!login) {
    dispatch(
      setMessageApp({
        titleMessage: 'Tin nhắn',
        descMessage: 'Tài khoản hoặc mật khẩu sai',
        textClose: '',
        textConfirm: 'Xác nhận',
      })
    );
  } else {
    localStorage.setItem('access_token', login?.data?.access_token);
    localStorage.setItem('refresh_token', login?.data?.refresh_token);

    await getUserInfo(dispatch);
    handleCloseRegister();
  }
};

export const getUserInfo = async (dispatch: any) => {
  const axios = new BaseAxios();
  const [userInfo, dataPoint] = await Promise.all([
    axios.get('auth/userInfo'),
    getPointGameKuAndMain(),
  ]);
  console.log('🚀 ~ getUserInfo ~ dataPoint:', dataPoint);
  if (userInfo) {
    dispatch(setDataUserLogin({ ...userInfo?.data, ...dataPoint.data }));
    return true;
  }
  return false;
};

export const getPointGameKuAndMain = async () => {
  const axios = new BaseAxios();
  return axios.get(`/user-point/game/ku-casino`);
};

// export const checkAccountKu = async (account: string, password: string, BBOSID: string) => {
//   const uniquetick = new Date(new Date().toISOString()).getTime() * 1000;
//   try {
//     const baseAxios = axiosLibrary.create({
//       baseURL: process.env.HOST_KU,
//       timeout: 10000,
//     });
//     const dataCount = await baseAxios.post(
//       `/Authorize/SignIn`,
//       {
//         AccountID: 'CPU2023',
//         AccountPWD: 'cHUyMDIz',
//         ProtectCode: '',
//         LocalStorgeCookie: '5870799f7d1a4f75ad7a7931f3603727',
//         FingerIDX: '9e75f7afb0bb5529e9d01cb6b5691e3f',
//         ScreenResolution: '1920*1080',
//         ShowSliderCaptcha: false,
//         ShowPhoneVerify: false,
//         VerifySliderCaptcha: false,
//         CellPhone: '',
//         ProtectCodeCellPhone: '',
//         IsCellPhoneValid: false,
//         IdyKey: '',
//         CaptchaCode: '',
//         LoginVerification: 0,
//         IsLobbyProtect: false,
//         ProtectCodeModel: {
//           CellPhone: '',
//           CaptchaCode: '',
//           PWD: '',
//           CountDownSecond: -1,
//           DefaultCountDownSecond: '30',
//           IsCaptchaSent: false,
//           IsCaptchaCodeVerified: false,
//           VerifiedEffectiveTime: 10,
//           DefaultVerifiedEffectiveTime: '10',
//           SendCaptchaCodeMsg: '',
//           SendCaptchaButtonName: 'loading',
//           SendVerifyCodeCount: 0,
//           CallCustomerServiceCounts: 0,
//           IsCallCustomerService: false,
//           IsServiceCallBackValid: false,
//           IsCanNotUseSMSProvider: false,
//           CheckCellPhoneIsVerifiedOrOverLimitReturnMessage: '',
//         },
//         ElementManager: {
//           ElementMap: {
//             ProtectCodeSendCaptchaButton: {
//               Id: 'ProtectCodeSendCaptchaButton',
//               Enabled: true,
//               Visibility: true,
//               DisableMap: {},
//             },
//             ProtectCodeLoginButton: {
//               Id: 'ProtectCodeLoginButton',
//               Enabled: false,
//               Visibility: true,
//               DisableMap: {},
//             },
//             VerifiedEffectiveTime: {
//               Id: 'VerifiedEffectiveTime',
//               Enabled: true,
//               Visibility: true,
//               DisableMap: {
//                 VerifyCaptchaChange: true,
//               },
//             },
//             signin: {
//               Id: 'signin',
//               Enabled: true,
//               Visibility: true,
//               DisableMap: {
//                 DoSignIn: true,
//               },
//             },
//             ProtectCodeCaptchaCode: {
//               Id: 'ProtectCodeCaptchaCode',
//               Enabled: true,
//               Visibility: true,
//               DisableMap: {},
//             },
//           },
//         },
//         DepositNewsModel: [],
//         SignInOverLimitIsRefreshPage: false,
//         UniqueSessionId: 'TM1513720326498500608',
//       },
//       {
//         method: 'POST',
//         withCredentials: true,
//         headers: {
//           // 'Accept-Encoding': 'gzip, deflate, br',
//           // Connection: 'keep-alive',
//           'Access-Control-Allow-Credentials': true,
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
//           'Content-Type': 'application/json;charset=UTF-8',
//           Accept: 'application/json, text/plain, */*',
//           Authority: 'vn.vc9363k.net',
//           // Cookie: `_culture=vi-vn; BBOSID=${BBOSID}`,
//           RequestVerificationToken: 'AFWVb25udMemrL8dBMN--GL40zipBuW4ejd8dxtLBJrViAR40YhPNORvGWu4fokJnTDLzpuytEdzxip1n8JyeCCjBcg1:3BGds1zeYITpfWwp2TTSmFfCosA23F5l7jpTxMVQ15_ISYEtrs3x8YCDd5osoPCF2tDRbhZKjDGlieiIzTogODDbCNI1',
//           // 'Sec-Fetch-Mode': 'cors',
//           // // Origin: 'https://vn.vc9363k.net',
//           // // Referer: 'https://vn.vc9363k.net/Home/Index',
//           // 'Sec-Ch-Ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
//           // 'Sec-Ch-Ua-Mobile': '?0',
//           // 'Sec-Fetch-Dest': 'empty',
//           // 'Sec-Fetch-Site': 'same-origin',
//           // Uniquetick: uniquetick,
//           //  'X-Requested-With': 'XMLHttpRequest',
//         },
//       },
//     );

//     if (dataCount.data?.Data?.AccountID) return dataCount.data.Data;
//     return false;
//   } catch (error: any) {
//     console.log('🚀 ~ checkAccountKu ~ error:', error.message);
//     return false;
//   }
// };
