import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
type HeaderProps = {
  title: string;
  icon?: string;
  handleBack: () => void;
};
const HeaderPurchase = ({ title, icon, handleBack }: HeaderProps) => {
  return (
    <div
      className="flex justify-between"
      onClick={() => {
        console.log('aaa');
        handleBack();
      }}>
      <div className="flex items-center gap-2">
        {icon ? (
          <Image src={icon} alt="" width={30} height={30} />
        ) : (
          <Image src={'/member/withdraw/icon_card.svg'} alt="" width={30} height={30} />
        )}
        <p>{title}</p>
        <Image src={'/member/purchase/icon_arrowPay.png'} alt="" width={16} height={16} />
      </div>
      <Link
        href={'/desktop/member/purchase'}
        className="flex items-center justify-between gap-2 border border-blue-400 text-blue-400 hover:bg-blue-100 rounded-md px-3 py-1">
        <Image src={'/member/purchase/icon_arrowL.png'} alt="" width={8} height={8} />
        <p className="text-sm">Trở về</p>
      </Link>
    </div>
  );
};

export default HeaderPurchase;
