import React from 'react';
import Image from 'next/image';
const CARDS = [
  {
    id: 1,
    name: 'ABC',
    icon: '/me/manager/icon_bank_1003.png',
    bg: '/me/manager/banklistBg.jpg',
    lastNumber: '1234',
  },
];
const ManagerBank = () => {
  return (
    <div className="flex-1 bg-[#f0eff6] flex flex-col gap-4 p-4 overflow-auto">
      {CARDS.map((card) => (
        <div className="relative w-full h-[122px] rounded-xl overflow-hidden flex flex-col justify-between p-6">
          <Image src={card.bg} alt="" fill className="object-cover" />
          <div className="z-10 flex items-center gap-2">
            <Image
              src={card.icon}
              alt=""
              width={30}
              height={30}
              className="bg-white rounded-full p-1"
            />
            <p className="text-xl font-bold">{card.name}</p>
          </div>
          <div className="absolute right-5 bottom-5 z-10 flex gap-3 items-center">
            {Array(8)
              .fill(0)
              .map((i) => (
                <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
              ))}
            <p className="text-4xl font-bold">{card.lastNumber}</p>
          </div>
        </div>
      ))}

      <div className="w-full flex items-center justify-center bg-white text-black h-[72px] rounded-xl">
        <Image src={'/me/manager/icon_add.svg'} alt="" width={36} height={36} />
        <p className="text-xl">Thêm tài khoản</p>
      </div>
      <p className="text-[#f00] text-center text-lg">Tối đa 4 tài khoản</p>
    </div>
  );
};

export default ManagerBank;
