'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import VNPayPage from '../vnp-view';
import AtmPage from '../atm-view';
import PayPage from '../pay-view';
import { useDataUserInfo, usePaymentTypes } from './utils/handleMember';

const PurchaseView = () => {
  const [activePaymentType, setActivePaymentType] = useState(0);
  const handleItemClick = (id?: number) => {
    setActivePaymentType(id ? id : 0);
  };
  const useUserInfo = useDataUserInfo();

  const { data } = usePaymentTypes();

  return (
    <div className="h-full">
      {activePaymentType == 0 && (
        <div className="lg:h-[100%] max-lg:flex-1 grid grid-cols-2 grid-rows-3 max-lg:flex max-lg:flex-col gap-4 w-full p-4 bg-white max-lg:bg-gray-100">
          {data.map((item, index) => (
            <div
              onClick={() => {
                if (item.status == 'ACTIVE') {
                  handleItemClick(item.id);
                }
              }}
              key={index}
              className="relative flex items-center justify-center max-lg:justify-start gap-4 bg-gray-100 max-lg:bg-white max-lg:border-none hover:bg-blue-100 border border-gray-400 rounded-md cursor-pointer hover:border-blue-400">
              <Image
                src="/member/purchase/icon_i.svg"
                alt=""
                width={25}
                height={25}
                className="absolute top-2 right-2"
              />

              <div className="bg-white rounded-full p-2 overflow-hidden w-[60px] h-[60px] flex items-center justify-center">
                <Image
                  src={item.image || ''}
                  alt=""
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-black max-lg:font-bold max-lg:text-lg">{item.name}</p>
                <p className="text-red-500 text-sm max-lg:font-bold">{`${item.minimum} ~ ${item.maximum}`}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {(activePaymentType === 2 || activePaymentType === 3) && (
        <AtmPage handleItemClick={handleItemClick} paymentTypeId={activePaymentType} />
      )}
      {(activePaymentType === 4 || activePaymentType === 7) && (
        <VNPayPage handleItemClick={handleItemClick} paymentTypeId={activePaymentType} />
      )}
    </div>
  );
};

export default PurchaseView;
