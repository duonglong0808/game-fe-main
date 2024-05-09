'use client';
import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type HeaderTransitionProps = {
  onValueChange: (value: number) => void; // Thêm kiểu dữ liệu cho prop onValueChange
};
const HeaderTransition = ({ onValueChange }: HeaderTransitionProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setAtive] = useState(1);
  const handleClick = (value: number) => {
    setAtive(value);
    onValueChange(value);
  };
  return (
    <div className="flex items-center justify-center gap-4 text-sm font-semibold p-2">
      <div onClick={() => handleClick(1)} className="cursor-pointer">
        <p
          style={{
            borderBottomWidth: 3,
            borderBottomColor: active === 1 ? '#2782d7' : '#888',
            color: active === 1 ? '#2782d7' : '#888',
          }}
          className={classNames('h-8')}>
          Chuyển quỹ
        </p>
      </div>
      <div onClick={() => handleClick(2)} className="cursor-pointer">
        <p
          style={{
            borderBottomWidth: 3,
            borderBottomColor: active === 2 ? '#2782d7' : '#888',
            color: active === 2 ? '#2782d7' : '#888',
          }}
          className={classNames('h-8')}>
          Lịch sử chuyển
        </p>
      </div>
    </div>
  );
};

export default HeaderTransition;
