'use client';

import styles from './styles/vnp-view.module.scss';
import { ButtonMethod } from '@/components/mobile/button';
import MobileLayout from '@/layouts/mobile/layout';
import { useAppSelector } from '@/lib/redux/utilRedux';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { depositPointToMain, getPaymentByType } from '../../utils/api';
import classNames from 'classnames';
import classNamesBin from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ClickNumberBox } from '@/components/mobile/clickNumber';
import { TypePaymentTranSaction, dataBankStatics } from '@/constant';

const cx = classNamesBin.bind(styles);

export default function VNPayView() {
  const { titleMessage, descMessage, textClose, textConfirm } = useAppSelector(
    (state) => state.settingApp
  );

  const router = useRouter();
  const { paymentTypes, paymentTypeId } = useAppSelector((state) => state.payment);
  const paymentTypeById = paymentTypes.find((i) => i.id == Number(paymentTypeId));
  const [payments, setPayments] = useState([]);
  // console.log('🚀 ~ VNPayView ~ payments:', payments);
  const [paymentId, setPaymentId] = useState();
  const paymentSelect: any = payments.find((i: any) => i.id === paymentId);
  const showAccountBank = paymentSelect?.showAccount;
  const [openEnterPoint, setOpenEnterPoint] = useState(false);
  const [point, setPoint] = useState('');
  const [submitDeposit, setSubmitDeposit] = useState(false);
  const methodPay =
    paymentSelect && paymentSelect.methodName.toLocaleLowerCase().includes('qr')
      ? 'qr'
      : paymentSelect?.methodName.toLocaleLowerCase().includes('momo')
      ? 'momo'
      : 'viettel';
  const [bankReceiver, setBankReceiver] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (paymentTypeById) {
        const res = await getPaymentByType(paymentTypeById.id);
        if (res.data) {
          const { data } = res.data;
          setPayments(data);
          setPaymentId(data[0].id);
        }
      }
    }

    fetchData();
  }, [paymentTypeById]);

  function openPopup(url: string, title: string, w: number, h: number) {
    const left = screen.width / 1.8 - w / 1.8;
    const top = screen.height / 1.8 - h / 1.8;
    return window.open(
      url,
      title,
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
        w +
        ', height=' +
        h +
        ', top=' +
        top +
        ', left=' +
        left
    );
  }

  return (
    <MobileLayout title="Ví điện tử">
      <div className="flex-1 overflow-auto bg-gray-300 flex flex-col items-center w-full divide-y relative">
        <div className="flex items-center justify-start gap-2 py-2 px-4 bg-white w-full">
          {payments.map((pay: any, index) => (
            <ButtonMethod
              key={index}
              name={pay.methodName}
              icon={pay.methodImage}
              select={pay.id == paymentId}
            />
          ))}
        </div>

        <div className="flex items-center text-lg bg-white w-full px-4 relative">
          <p className="text-black w-[120px]">Số điểm nạp</p>
          <span
            onClick={() => setOpenEnterPoint((pre) => !pre)}
            className={classNames(
              'border-none outline-none py-2 focus:border-none focus:ring-0 text-lg ',
              { 'text-[#999]': !point },
              { 'text-black': point },
              { 'font-semibold': point }
            )}>
            {point || `${paymentTypeById?.minimum} ~ ${paymentTypeById?.maximum}`}

            {point ? (
              <FontAwesomeIcon
                onClick={() => setPoint('')}
                className="absolute cursor-pointer top-[50%] bottom-0 right-0 translate-x-[-50%] translate-y-[-50%] text-2xl"
                color="#c6c6ca"
                icon={faCircleXmark}
              />
            ) : (
              <></>
            )}
          </span>
        </div>
        <div className="flex items-center text-lg bg-white w-full px-4 py-2 text-red-500">
          <p className="text-red-500 w-[120px]">Thực tế</p>
          <div className="flex-1 flex items-center justify-between text-lg px-2">
            <p className="font-semibold">{point ? (+point * 100).toLocaleString('vi-VN') : 0}</p>
            <p>VND</p>
          </div>
        </div>

        {openEnterPoint ? (
          <div className="w-full py-2 px-3 bg-[#f0eff5]">
            <ClickNumberBox value={point} onChangeValue={setPoint} />
          </div>
        ) : (
          <></>
        )}

        <button
          onClick={async () => {
            if (
              paymentId &&
              +point >= Number(paymentTypeById?.minimum) &&
              +point <= Number(paymentTypeById?.maximum)
            ) {
              if (showAccountBank) {
                setSubmitDeposit(true);
              } else {
                const data = {
                  paymentId,
                  bankReceiveId: bankReceiver,
                  type: TypePaymentTranSaction.deposit,
                  point: point,
                  content:
                    methodPay == 'qr'
                      ? 'Qrcode'
                      : methodPay == 'momo'
                      ? 'MoMo Quét mã'
                      : 'Viettel Money Quét mã',
                };
                const res = await depositPointToMain(data);
                if (res?.data) {
                  const qrCode = res.data?.qrCode;
                  //
                  const a = openPopup(
                    `${
                      process.env.URL_MAIN
                    }/payment-gate?methodName=${methodPay}&point=${point}&qrCode=${btoa(qrCode)}`,
                    'KU Casio -Qr code',
                    1025,
                    729
                  );
                  // console.log('a', a);
                  setSubmitDeposit(false);
                }
              }
            }
          }}
          disabled={
            +point < Number(paymentTypeById?.minimum) || +point > Number(paymentTypeById?.maximum)
          }
          className="w-[90%] text-center bg-[#45b5d9] p-2 m-3 text-white rounded-sm text-lg disabled:bg-[#aaa]">
          Xác nhận
        </button>
        <div className="w-full flex items-center justify-center gap-2 bg-white text-black p-3">
          <Image src={'/member/withdraw/icon_maintain.svg'} alt="" width={20} height={20} />
          <p>Chú ý</p>
        </div>
        <ol className="list-decimal w-full bg-white text-black text-base pl-8 py-2">
          <li>Nạp tiền khác họ tên đăng ký sẽ bị hoàn trả.</li>
          <li>
            Mỗi mã QR tương ứng với một mã giao dịch,{' '}
            <span className="text-red-500">vui lòng không quét lặp lại</span>.
          </li>
          <li>Để tăng tốc độ cộng điểm, vui lòng đến mục lịch sử giao dịch tải biên lai lên.</li>
        </ol>

        {showAccountBank && submitDeposit ? (
          <div className="absolute bg-[#00000099] flex items-center z-10">
            <div className="bg-[#fff] m-auto z-10 h-full w-full relative">
              <div className="text-[#898989] bg-[#f0eff5] border-b-2 border-[#e5e5e5] py-3 text-center h-[38px] pb-4 text-[16px] flex items-center justify-center">
                Chọn ngân hàng thanh toán
              </div>

              <ul className="flex flex-wrap py-1 mb-[15px] h-full overflow-y-auto border-b-2 border-[#e5e5e5]">
                {dataBankStatics.map((bank, index) => (
                  <li
                    key={index}
                    onClick={() => setBankReceiver(String(bank.bin))}
                    className="basis-1/2">
                    <div
                      className={cx(' m-[5px] cursor-pointer h-[50px] overflow-hidden relative', {
                        'bank-active': bank.bin == bankReceiver,
                      })}
                      style={{ border: '1px solid #ccc' }}>
                      <Image
                        alt="logo bank"
                        src={bank.logo || ''}
                        height={50}
                        width={140}
                        className="w-full h-[50px]"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center">
                <button
                  disabled={!bankReceiver}
                  onClick={async () => {
                    if (
                      bankReceiver &&
                      +point >= Number(paymentTypeById?.minimum) &&
                      +point <= Number(paymentTypeById?.maximum)
                    ) {
                      const data = {
                        paymentId,
                        // bankReceiveId: bankReceiver,
                        type: TypePaymentTranSaction.deposit,
                        point: point,
                        content:
                          methodPay == 'qr'
                            ? 'Qrcode'
                            : methodPay == 'momo'
                            ? 'MoMo Quét mã'
                            : 'Viettel Money Quét mã',
                      };
                      console.log('🚀 ~ onClick={ ~ data:', data);
                      const res = await depositPointToMain(data);
                      if (res?.data) {
                        const qrCode = res.data?.qrCode;
                        const a = openPopup(
                          `${
                            process.env.URL_MAIN
                          }/payment-gate?methodName=${methodPay}&point=${point}&qrCode=${btoa(
                            qrCode
                          )}`,
                          'KU Casio -Qr code',
                          1025,
                          729
                        );
                        // console.log('a', a);
                        setSubmitDeposit(false);
                      }
                    }
                  }}
                  className="mx-auto mb-3 border-0 rounded-[3px] h-[45px] text-sm text-white cursor-pointer w-[300px] bg-[#32abff] hover:bg-[#38b8ff]  disabled:bg-[#aaa] disabled:cursor-not-allowed">
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </MobileLayout>
  );
}
