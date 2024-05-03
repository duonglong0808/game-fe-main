'use client';
import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type HeaderTransitionProps = {
  onValueChange: (value: number) => void; // Thêm kiểu dữ liệu cho prop onValueChange
};
const HeaderTransition = ({onValueChange}:HeaderTransitionProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [active,setAtive]=useState(1)
  const handleClick = (value: number) => {
    setAtive(value)
    onValueChange(value);
  };
  return (
    <div className="flex items-center justify-center gap-4 text-sm font-semibold p-2">
      <div onClick={() => handleClick(1)} className="cursor-pointer">
        <p
          className={classNames('h-8', {
            'border-b-2 border-blue-500 text-blue-500': active === 1,
          })}>
          Chuyển khoản
        </p>
      </div>
      <div onClick={() => handleClick(2)} className="cursor-pointer">
        <p
          className={classNames('h-8', {
            'border-b-2 border-blue-500 text-blue-500': active === 2,
          })}>
          Lịch sử chuyển
        </p>
      </div>
    </div>
  );
};

export default HeaderTransition;
