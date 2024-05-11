'use client';
import React from 'react';
import Image from 'next/image';
import { ButtonMethod } from '@/components/member/Button';
import HeaderPurchase from '@/components/member/Header/header-purchase';
const PayPage = ({
  handleItemClick,
  paymentTypeId,
}: {
  handleItemClick: (id?: number) => void;
  paymentTypeId: number;
}) => {
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
          <HeaderPurchase
            title="Ví điện tử"
            icon="/member/purchase/icon_wallet.png"
            handleBack={handleItemClick}
          />
          <div className="border-b border-gray-300" />
          <div className="flex gap-2">
            <ButtonMethod name="Viettel Pay" select icon="/member/purchase/icon_viettelpay.png" />
            <ButtonMethod name="Quét mã" icon="/member/purchase/icon_momo.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPage;
