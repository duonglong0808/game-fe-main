'use client';
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

const LINKS = [
  {
    name: 'Tư liệu',
    href: '/desktop/member/tulieu',
  },
  {
    name: 'Chuyển quỹ',
    href: '/desktop/member/transition',
  },
  {
    name: 'Nạp tiền',
    href: '/desktop/member/purchase',
    isImportant: true,
  },
  {
    name: 'Rút tiền',
    href: '/desktop/member/withdraw',
    isImportant: true,
  },
  {
    name: 'Giao dịch',
    href: '/desktop/member/transaction',
  },
  {
    name: 'Khuyến mãi',
    href: '/desktop/member/point',
  },
];

const Header = () => {
  const pathname = usePathname();
  return (
    <header className=" w-full h-[60px] bg-[#0c5d91] flex justify-center">
      <div className="w-[950px] flex items-center justify-between">
        <p className="text-lg text-white">Hội viên</p>
        <div className="flex items-center gap-4 h-full">
          {LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="relative h-full text-white">
              <p
                className={classNames(
                  'text-sm h-full  flex items-center',
                  { 'text-[#ffd200]': item.isImportant },
                  { 'border-b-4 border-white ': pathname.includes(item.href) }
                )}>
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
