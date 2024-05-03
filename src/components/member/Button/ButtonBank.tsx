import React from 'react';
import Image from 'next/image';
type ButtonBankProps = {
  icon?: string;
  lastNumber?: string;
};
export const ButtonBank = ({ icon, lastNumber }: ButtonBankProps) => {
  return (
    <button className="flex flex-col items-center justify-center h-[60px] bg-[#e8f2ff] p-2 gap-2 text-blue-600 border border-solid border-blue-500 rounded-[3px]">
      {icon ? (
        <Image src={icon} alt="" width={80} height={80} className={''} />
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
