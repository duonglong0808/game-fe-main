import React from 'react';
import Image from 'next/image';
import { dataBankStatics } from '@/constant';
type ButtonBankProps = {
  binBank?: string;
  lastNumber?: string;
};
export const ButtonBank = ({ binBank, lastNumber }: ButtonBankProps) => {
  let urlImageBank = '';
  if (binBank) urlImageBank = dataBankStatics.find((bank) => bank.bin == binBank)?.logo || '';

  return (
    <button className="flex flex-col items-center justify-center h-[60px] bg-[#e8f2ff] p-2 gap-2 text-blue-600 border border-solid border-blue-500 rounded-[3px]">
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
