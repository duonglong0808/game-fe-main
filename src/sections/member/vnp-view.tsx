'use client';
import styles from './view/styles/vnp-view.module.scss';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ButtonMethod } from '@/components/member/Button';
import HeaderPurchase from '@/components/member/Header/header-purchase';
import { useAppSelector } from '@/lib/redux/utilRedux';
import { depositPointToMain, getAllBankPayment, getPaymentByType } from './view/utils/api';
import { ShowConfirmMessage } from '@/app/compmnents/ShowMessage';
import { TypePaymentTranSaction, dataBankStatics } from '@/constant';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const VNPayPage = ({
  handleItemClick,
  paymentTypeId,
}: {
  handleItemClick: (id?: number) => void;
  paymentTypeId: number;
}) => {
  const { titleMessage, descMessage, textClose, textConfirm } = useAppSelector(
    (state) => state.settingApp
  );

  const { paymentTypes } = useAppSelector((state) => state.payment);
  const paymentTypeById = paymentTypes.find((i) => i.id === paymentTypeId);
  const [payments, setPayments] = useState([]);
  const [paymentId, setPaymentId] = useState();
  const paymentSelect: any = payments.find((i: any) => i.id === paymentId);
  const showAccountBank = paymentSelect?.showAccount;
  const methodPay =
    paymentSelect && paymentSelect.methodName.toLocaleLowerCase().includes('qr')
      ? 'qr'
      : paymentSelect?.methodName.toLocaleLowerCase().includes('momo')
      ? 'momo'
      : 'viettel';
  const [paymentBank, setPaymentBank] = useState<any[]>([]);
  const [bankReceiver, setBankReceiver] = useState('');

  const [point, setPoint] = useState('');
  const [submitDeposit, setSubmitDeposit] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (paymentId) {
        const res = await getAllBankPayment(paymentId);
        if (res.data) {
          const { data } = res;
          setPaymentBank(data);
        }
      }
    }

    fetchData();
  }, [paymentId]);

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
    const left = screen.width / 2 - w / 2;
    const top = screen.height / 2 - h / 2;
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
    <div className="max-lg:hidden flex flex-col gap-1 w-full p-1">
      <div className="flex items-center bg-white p-1 gap-3 h-[145px]">
        <div className=" flex flex-col items-center justify-center w-[68px] h-full p-2 bg-[#f3f3f3] border border-gray-300">
          <Image
            src={'/member/withdraw/icon_payWay.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Phương thức</p>
        </div>
        <div className="flex-1 flex flex-col justify-evenly gap-2 h-full">
          <HeaderPurchase
            title={paymentTypeById?.name || ''}
            icon={paymentTypeById?.image}
            handleBack={handleItemClick}
          />
          <div className="border-b border-gray-300" />
          <div className="flex gap-2">
            {payments.map((payment: any, index) => (
              <ButtonMethod
                onClick={() => setPaymentId(payment.id)}
                select={payment.id == paymentId}
                name={payment?.methodName}
                icon={payment?.methodImage}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center bg-white p-1 gap-3 h-[240px]">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] h-full border border-gray-300 ">
          <Image src={'/member/withdraw/icon_dataInput.png'} alt="" width={30} height={30} />
          <p className="text-center text-sm text-[#888888]">Đề xuất yêu cầu</p>
        </div>

        <div className="flex-1 py-4 flex  gap-2">
          <p className="text-sm pt-1">Số điểm nạp:</p>
          <div className=" flex flex-col gap-4 w-[200px]">
            <input
              type="number"
              value={point}
              onChange={(e) => {
                if (Number(e.target.value) > 0) {
                  const val =
                    +e.target.value < Number(paymentTypeById?.maximum)
                      ? e.target.value
                      : Number(paymentTypeById?.maximum);
                  setPoint(String(val));
                } else {
                  setPoint('');
                }
              }}
              placeholder={`${paymentTypeById?.minimum} ~ ${paymentTypeById?.maximum}`}
              className="w-[200px] h-8 px-4 py-2 text-sm rounded-md bg-gray-200  outline-none border-none "
            />
            <div className="flex justify-between text-sm w-auto text-red-500">
              <p>
                Thực tế:{' '}
                <span className="font-bold">
                  {point ? (+point * 1000).toLocaleString('vi-VN') : 0}
                </span>
              </p>
              <p className="ml-2">VNĐ</p>
            </div>
            <button
              disabled={!paymentId || !(+point >= 200)}
              onClick={async () => {
                console.log('🚀 ~ onClick={ ~ paymentId:', paymentId);
                if (paymentId && +point >= 200) {
                  if (showAccountBank) {
                    setSubmitDeposit(true);
                  } else {
                    console.log('aaaaa');
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
                        }/payment-gate?methodName=${methodPay}&point=${point}&qrCode=${btoa(
                          qrCode
                        )}`,
                        'KU Casio -Qr code',
                        900,
                        729
                      );
                      // console.log('a', a);
                      setSubmitDeposit(false);
                    }
                  }
                }
              }}
              className=" text-sm  w-[155px] py-2 rounded-sm cursor-pointer text-white bg-[#ff9600] hover:bg-[#ffba00] disabled:bg-gray-400 disabled:cursor-not-allowed">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-white p-1 gap-3 h-[240px]">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] h-full border border-gray-300 ">
          <Image
            src={'/member/withdraw/icon_dataHint.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Đề xuất yêu cầu</p>
        </div>
        <div className="flex-1 py-10 px-4 text-sm ">
          <ol className="list-decimal space-y-2">
            <li>Nạp tiền khác họ tên đăng ký sẽ bị hoàn trả.</li>
            <li>
              Mỗi mã QR tương ứng với một mã giao dịch,{' '}
              <span className="text-red-500">vui lòng không quét lặp lại</span>.
            </li>
            <li>Để tăng tốc độ cộng điểm, vui lòng đến mục lịch sử giao dịch tải biên lai lên.</li>
          </ol>
        </div>
      </div>

      {titleMessage && descMessage && (
        <ShowConfirmMessage
          textClose={textClose}
          textConfirm={textConfirm}
          title={titleMessage}
          desc={descMessage}
          onConfirm={() => {}}
        />
      )}
      {showAccountBank && submitDeposit ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#00000099] flex items-center">
          <div className="bg-[#fff] m-auto z-10 p-[15px] rounded-[8px] w-[640px] relative">
            <div className="text-[#5aaaf3] border-b-2 border-[#e5e5e5] py-3 text-center h-[38px] pb-4 text-[18px] font-bold flex items-center justify-center">
              Chọn ngân hàng thanh toán
            </div>
            <div
              onClick={() => setSubmitDeposit(false)}
              className="absolute top-[5px] right-[14px] w-10 h-10 cursor-pointer"
              style={{
                background: 'url(/member/deposit/icon_close.png) no-repeat center',
                backgroundSize: '20px 20px',
              }}></div>
            <ul className="flex flex-wrap py-1 mb-[15px] max-h-[360px] overflow-y-auto border-b-2 border-[#e5e5e5]">
              {paymentBank.map((bank: any, index) => (
                <li
                  key={index}
                  onClick={() => setBankReceiver(bank.id)}
                  className={cx(
                    'm-[5px] cursor-pointer w-[140] h-[50px] overflow-hidden relative',
                    { 'bank-active': bank.id == bankReceiver }
                  )}
                  style={{ border: '1px solid #ccc' }}>
                  <Image
                    alt="logo bank"
                    src={dataBankStatics.find((i) => i.bin == bank.binBank)?.logo || ''}
                    height={50}
                    width={140}
                  />
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <button
                disabled={!bankReceiver}
                onClick={async () => {
                  if (
                    bankReceiver &&
                    +point > Number(paymentTypeById?.minimum) &&
                    +point < Number(paymentTypeById?.maximum)
                  ) {
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
                      const a = openPopup(
                        `${process.env.URL_MAIN}/payment-gate?methodName=${methodPay}&point=${point}&qrCode=${qrCode}`,
                        'KU Casio -Qr code',
                        900,
                        729
                      );
                      // console.log('a', a);
                      setSubmitDeposit(false);
                    }
                  }
                }}
                className="mx-auto border-0 rounded-[3px] h-[45px] text-sm text-white cursor-pointer w-[300px] bg-[#32abff] hover:bg-[#38b8ff]  disabled:bg-[#aaa] disabled:cursor-not-allowed">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default VNPayPage;
