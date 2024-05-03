'use client';
import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import { Dropdown, Checkbox } from 'flowbite-react';
import { useState } from 'react';

const HeaderTransaction = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive]= useState(1)
  const handleClick = (done: number) => {
    setActive(done)
  };
  return (
    <div className="flex items-center justify-center gap-4 text-sm font-semibold p-2 relative max-lg:bg-white text-black">
      <div onClick={() => handleClick(1)} className="cursor-pointer">
        <p
          className={classNames('h-8 max-lg:h-6', {
            'border-b-2 border-blue-500 text-blue-500 z-10': active === 1,
          })}>
          Chưa hoàn thành
        </p>
      </div>
      <div onClick={() => handleClick(2)} className="cursor-pointer">
        <p
          className={classNames('h-8 max-lg:h-6', {
            'border-b-2 border-blue-500 text-blue-500 z-10': active === 2,
          })}>
          Đã hoàn thành
        </p>
      </div>
      <div
        className={classNames(
          'absolute',
           'top-0 right-20',
          
        )}>
        <Dropdown
          color={'light'}
          label={classNames( 'Chọn loại giao dịch')}
          dismissOnClick={false}>
          <Dropdown.Item className="flex gap-2 w-[100px]">
            <Checkbox defaultChecked />
            Chọn tất cả
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="flex gap-2">
            <Checkbox />
            Nạp tiền
          </Dropdown.Item>
          <Dropdown.Item className="flex gap-2">
            <Checkbox />
            Rút tiền
          </Dropdown.Item>
        </Dropdown>
      </div>
      
        <div className="absolute top-2 right-0 flex items-center gap-2">
          <p className="text-yellow-500 text-xl">10</p>
          <p className="text-lg">s</p>
        </div>
     
    </div>
  );
};

export default HeaderTransaction;
