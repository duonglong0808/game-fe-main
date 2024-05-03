import React from 'react';
import Image from 'next/image';

const ButtonAdd = () => {
  return (
    <button className="relative flex items-center justify-between gap-2 p-2 h-[60px] border border-gray-300 rounded-[3px] bg-gray-200 float-left cursor-pointer">
      <Image src={'/member/withdraw/icon_add.png'} alt="" width={20} height={20} />
      <p className="text-sm">Thêm tài khoản</p>
    </button>
  );
};

export default ButtonAdd;
