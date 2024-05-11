'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ButtonMethod } from '@/components/member/Button';
import HeaderPurchase from '@/components/member/Header/header-purchase';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { getPaymentByType } from './view/utils/api';
import { ShowConfirmMessage } from '@/app/compmnents/ShowMessage';
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
  const [point, setPoint] = useState<number>();
  const [submitDeposit, setSubmitDeposit] = useState(false);
  const dispatch = useAppDispatch();

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
                const val =
                  +e.target.value < Number(paymentTypeById?.maximum)
                    ? +e.target.value
                    : Number(paymentTypeById?.maximum);
                setPoint(val);
              }}
              placeholder={`${paymentTypeById?.minimum} ~ ${paymentTypeById?.maximum}`}
              className="h-8 px-4 py-2 text-sm rounded-md bg-gray-200  outline-none border-none "
            />
            <div className=" flex justify-between text-sm w-auto text-red-500">
              <p>
                Thực tế:{' '}
                <span className="font-bold">
                  {point ? (point * 1000).toLocaleString('vi-VN') : 0}
                </span>
              </p>

              <p>VNĐ</p>
            </div>
            <button
              disabled={!paymentId || !point}
              onClick={() => {
                if (paymentId && point) {
                  setSubmitDeposit(true);
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
    </div>
  );
};

export default VNPayPage;
