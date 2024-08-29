'use client';

import classNames from 'classnames/bind';
import styles from './show-qr-view.module.scss';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { BaseAxios } from '@/utils';
import { setDataUserLogin } from '@/lib/redux/app/user.slice';

const cx = classNames.bind(styles);

export default function ShowQrCode(): JSX.Element {
  const searchParams = useSearchParams();
  const methodName = searchParams.get('methodName');
  const point = searchParams.get('point');
  const qrCode = searchParams.get('qrCode');

  if (!methodName || !point || !qrCode) redirect('/desktop/home');
  // const userName = 'CPU@)@';
  const { userName } = useAppSelector((state) => state.user);
  const [counter, setCounter] = useState(900);
  let imagePhone = '/member/deposit/img_scan_qr.png';
  switch (methodName) {
    case 'momo':
      imagePhone = '/member/deposit/img_scan_momo.png';
      break;
    case 'viettel':
      imagePhone = '/member/deposit/img_scan_ViettelPay.png';
      break;
    default:
      break;
  }
  const timeStart = useRef(new Date().getTime());
  const timeOut = moment(timeStart.current + 900000).format('HH:mm DD/MM');

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (!userName) {
        const axios = new BaseAxios();
        const userInfo = await axios.get('auth/userInfo');
        if (userInfo) {
          dispatch(setDataUserLogin(userInfo?.data));
          return true;
        } else {
          router.replace('/desktop/home');
        }
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (counter > 1) {
      setTimeout(() => {
        setCounter((pre) => pre - 1);
      }, 1000);
    } else {
    }
  }, [counter]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Chuyển đổi giây và phút thành chuỗi
    const minutesString = String(minutes).padStart(2, '0'); // Thêm số 0 phía trước nếu cần
    const secondsString = String(remainingSeconds).padStart(2, '0'); // Thêm số 0 phía trước nếu cần

    return `${minutesString}:${secondsString}`;
  };

  return (
    <div className={cx('fixed top-0 left-0 right-0 bottom-0 flex justify-center', 'wrapper')}>
      <div className={cx('h-fit m-auto py-10 px-16 w-[900px] relative')}>
        <div>
          <div className="flex justify-between">
            <div className="bg-[#fff] rounded-2xl px-4 py-2 lg:mr-10 w-[340px] lg:w-[450px] ">
              <div className={cx('content-header')}>
                <div className="flex justify-between mb-1 mt-2">
                  <div className="text-sm text-end">
                    <span className="text-[#2c5d99] text-[20px] mr-2">
                      {point ? (+point * 1000).toLocaleString('vi-VN') : 0}
                    </span>
                    VND
                  </div>
                  <div className={cx('box-counter')}>
                    <FontAwesomeIcon className={cx('box-counter__icon')} icon={faClock} />
                    <span className="text-red-600 font-medium text-lg ml-3">
                      {formatTime(counter)}
                    </span>
                  </div>
                </div>
                <span className="text-[#2c5d99] font-semibold">Thời gian hết hạn {timeOut}</span>
              </div>

              <div>
                <div className={cx('box-qr')}>
                  <Image
                    alt="Qr"
                    src={atob(qrCode) || ''}
                    width={200}
                    height={200}
                    className={cx('box-qr__img')}
                  />
                </div>
                <div
                  className={cx('box-qr__content', 'text-[#e3464c] text-[17px] pb-4 text-center')}>
                  <span>Nội dung bắt buộc: </span>
                  <span className="text-[#2c5d99]  w-full">{`mua sam ${userName.toUpperCase()}`}</span>
                </div>
              </div>

              <div className={cx('content-footer', 'hidden lg:flex')}>
                <div className={cx('content-footer__box-icon')}>
                  <Image
                    alt="lightbulb"
                    src={'/member/deposit/lightbulb.png'}
                    width={30}
                    height={50}
                  />
                </div>
                <div className={cx('content-footer__text')}>
                  {methodName == 'qr'
                    ? 'Mã QR chỉ cung cấp cho nạp tiền lần này. Vui lòng không chuyển vào tài khoản MoMo.'
                    : 'Mã QR chỉ cung cấp cho nạp tiền lần này, vui lòng không lưu lại sử dụng cho những nạp tiền lần sau.'}
                </div>
              </div>
            </div>
            <Image
              alt="Image"
              src={imagePhone}
              width={243}
              height={429}
              className="hidden lg:block"
            />
          </div>

          <div className={cx('content-footer', 'mt-3 w-[340px] bg-white flex lg:hidden')}>
            <div className={cx('content-footer__box-icon')}>
              <Image alt="lightbulb" src={'/member/deposit/lightbulb.png'} width={30} height={50} />
            </div>
            <div className={cx('content-footer__text', 'h-full')}>
              {methodName == 'qr'
                ? 'Mã QR chỉ cung cấp cho nạp tiền lần này. Vui lòng không chuyển vào tài khoản MoMo.'
                : 'Mã QR chỉ cung cấp cho nạp tiền lần này, vui lòng không lưu lại sử dụng cho những nạp tiền lần sau.'}
            </div>
          </div>

          <div className={cx('steps', 'justify-around hidden lg:flex')}>
            <div
              className={cx(
                'p-2 text-[#e3464c] mr-8 rounded-lg w-[170px] bg-[#fff] text-center',
                'steps__item'
              )}
              style={{
                border: '1px solid #e3464c',
              }}>
              <div>
                <div
                  className={cx('steps__item--icon')}
                  style={{ background: 'url(/member/deposit/img_step00.svg) no-repeat' }}></div>
              </div>
              <span className="font-semibold text-[16px]">Không lặp lại mã quyét</span>
            </div>
            <div
              className={cx(
                'p-2 text-[#214571] mr-8 rounded-lg w-[170px] bg-[#fff] text-center ',
                'steps__item'
              )}
              style={{
                border: '1px solid #abbcd5',
              }}>
              <div>
                <div
                  className={cx('steps__item--icon')}
                  style={{ background: 'url(/member/deposit/img_step01.svg) no-repeat' }}>
                  <span className="absolute left-3 top-0 text-[36px] font-extrabold text-[#d3dae3]">
                    1.
                  </span>
                </div>
              </div>
              <span className="font-semibold text-[16px]">
                Mở mã quyét trên{' '}
                {methodName == 'qr'
                  ? 'Mobile Banking'
                  : methodName == 'momo'
                  ? 'Momo'
                  : 'ViettelPay'}{' '}
              </span>
            </div>
            <div
              className={cx(
                'p-2 text-[#214571] mr-8 rounded-lg w-[170px] bg-[#fff] text-center',
                'steps__item'
              )}
              style={{
                border: '1px solid #abbcd5',
              }}>
              <div>
                <div
                  className={cx('steps__item--icon')}
                  style={{ background: 'url(/member/deposit/img_step02.svg) no-repeat' }}>
                  <span className="absolute left-3 top-0 text-[36px] font-extrabold text-[#d3dae3]">
                    2.
                  </span>
                </div>
              </div>
              <span className="font-semibold text-[16px]">Quét mã QR</span>
            </div>
            <div
              className={cx(
                'p-2 text-[#214571] rounded-lg w-[170px] bg-[#fff] text-center',
                'steps__item'
              )}
              style={{
                border: '1px solid #abbcd5',
              }}>
              <div>
                <div
                  className={cx('steps__item--icon')}
                  style={{ background: 'url(/member/deposit/img_step03.svg) no-repeat' }}>
                  <span className="absolute left-3 top-0 text-[36px] font-extrabold text-[#d3dae3]">
                    3.
                  </span>
                </div>
              </div>
              <span className="font-semibold text-[16px]">
                Xác nhận số tiền, hoàn tất thanh toán
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
