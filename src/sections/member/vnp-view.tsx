'use client';
import React from 'react';
import Image from 'next/image';
import { ButtonMethod } from '@/components/member/Button';
import HeaderPurchase from '@/components/member/Header/header-purchase';
const VNPayPage = () => {
  return (
    <div className="max-lg:hidden flex flex-col gap-1 w-full p-1">
      <div className="flex items-center bg-white p-1 gap-3 h-[150px]">
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
          <HeaderPurchase title="Ví điện tử" icon="/member/purchase/icon_wallet.png" />
          <div className="border-b border-gray-300" />
          <div className="flex gap-2">
            <ButtonMethod name="Viettel Pay" select icon="/member/purchase/icon_viettelpay.png" />
            <ButtonMethod name="Quét mã" icon="/member/purchase/icon_momo.png" />
          </div>
        </div>
      </div>

      <div className="flex items-center bg-white p-1 gap-3 h-[150px]">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] h-full border border-gray-300 ">
          <Image src={'/member/withdraw/icon_dataInput.png'} alt="" width={30} height={30} />
          <p className="text-center text-sm text-[#888888]">Đề xuất yêu cầu</p>
        </div>

        <div className="flex-1 py-4 flex  gap-2">
          <p className="text-sm pt-1">Số điểm nạp:</p>
          <div className=" flex flex-col gap-4 w-[200px]">
            <input
              type="text"
              placeholder="200 ~ 1000000"
              className="w-full h-8  text-sm rounded-md bg-gray-200  outline-none border-none "
            />
            <div className="flex justify-between text-sm w-full text-red-500 ">
              <p>
                Thực tế: <span className="font-semibold">0</span>
              </p>
              <p>VNĐ</p>
            </div>
            <button
              disabled
              className="bg-gray-400 text-sm text-white w-full py-2 rounded-md cursor-not-allowed">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-white p-1 gap-3 h-[150px]">
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
    </div>
  );
};

export default VNPayPage;
