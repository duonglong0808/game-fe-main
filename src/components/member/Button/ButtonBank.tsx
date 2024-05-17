import React from 'react';
import Image from 'next/image';
import { dataBankStatics } from '@/constant';
import classNames from 'classnames';
type ButtonBankProps = {
  binBank?: string;
  lastNumber?: string;
  active: boolean;
  onClick: () => void;
};
export const ButtonBank = ({ binBank, lastNumber, active, onClick }: ButtonBankProps) => {
  let urlImageBank = '';
  if (binBank) urlImageBank = dataBankStatics.find((bank) => bank.bin == binBank)?.logo || '';

  return (
    <button
      onClick={onClick}
      className={classNames(
        'flex flex-col items-center justify-center h-[60px]  p-2 gap-2 text-blue-600 border border-solid  rounded-[3px]',
        { 'border-blue-500': active, 'bg-[#e8f2ff]': active }
      )}>
      {urlImageBank ? (
        <Image src={urlImageBank} alt="" width={80} height={80} className={''} />
      ) : (
        <Image
          src={'/member/withdraw/icon_bkcard_1003.png'}
          alt=""
          width={80}
          height={80}
          className={''}
        />
      )}
      <div className="flex items-center gap-2 text-sm">
        <p className="text-black">Số cuối:</p>
        {lastNumber ? <p>{lastNumber}</p> : <p>5577</p>}
      </div>
    </button>
  );
};
