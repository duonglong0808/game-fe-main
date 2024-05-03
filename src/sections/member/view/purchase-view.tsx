'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import VNPayPage from '../vnp-view';
import AtmPage from '../atm-view';
import PayPage from '../pay-view';

const PURCHASE = [
  {
    name: 'Thanh toán trực tuyến',
    icon: '/member/purchase/icon_online.png',
    limit: '100~50000',
    href: '/online',
  },
  {
    name: 'Chuyển tiền ATM',
    icon: '/member/purchase/icon_online.png',
    limit: '100~50000',
    href: '/atm',
  },
  {
    name: 'Ngân hàng điện tử',
    icon: '/member/purchase/icon_online.png',
    limit: '100~50000',
    href: '/banking',
  },
  {
    name: 'QRCode',
    icon: '/member/purchase/icon_online.png',
    limit: '100~50000',
    href: '/qrcode',
  },
  {
    name: 'Chuyển tại quầy',
    icon: '/member/purchase/icon_online.png',
    limit: '100~50000',
    href: '/counter',
  },
  {
    name: 'Tiền mã hóa',
    icon: '/member/purchase/icon_online.png',
    limit: '100~50000',
    href: '/crypto',
  },
  {
    name: 'Ví điện tử',
    icon: '/member/purchase/icon_online.png',
    limit: '100~50000',
    href: '/vnpay',
  },
  {
    name: 'Sắp ra mắt',
    icon: '/member/purchase/icon_online.png',
    href: '/',
  },
];
const PurchaseView = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleItemClick = (index:number) => {
    setActiveIndex(index === activeIndex ? 0 : index);
  };

  return (
    <>
    {activeIndex === 0 && <div className="lg:h-[69vh] max-lg:flex-1 grid grid-cols-2 grid-rows-4 max-lg:flex max-lg:flex-col gap-4 w-full p-4 bg-white max-lg:bg-gray-100">
     { PURCHASE.map((item,index) => (
        <div
          onClick = {() => handleItemClick(index+1)}
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
            <Image src={item.icon} alt="" width={40} height={40} className="object-contain" />
          </div>
          <div>
            <p className="text-black max-lg:font-bold max-lg:text-lg">{item.name}</p>
            <p className="text-red-500 text-sm max-lg:font-bold">{item.limit}</p>
          </div>
        </div>
        
      ))}
      

    </div>}
    {activeIndex === 3 && (<AtmPage/> )}
    {activeIndex === 7 && (<VNPayPage/> )}
    {activeIndex === 1 && (<PayPage/> )}
    {activeIndex === 2 && (<PayPage/> )}
    {activeIndex === 4 && (<PayPage/> )}
    {activeIndex === 5 && (<PayPage/> )}
    {activeIndex === 6 && (<PayPage/> )}
    {activeIndex === 8 && (<PayPage/> )}
    </>
  );
};

export default PurchaseView;
