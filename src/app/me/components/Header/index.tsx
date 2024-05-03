'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
const HeaderMe = () => {
  const pathname = usePathname();
  const parentPathname = pathname.split('/').slice(0, -1).join('/');
  return (
    <div
      className={classNames('h-[40px] w-full bg-[#0f548b] flex items-center px-2', {
        'justify-between': !pathname.includes('/manager'),
      })}>
      <Link href={parentPathname}>
        <Image
          src="/button/icon_arrowW.svg"
          alt="logo"
          width={16}
          height={16}
          className="rotate-90"
        />
      </Link>
      {pathname.includes('/manager') ? (
        <span className="text-center flex-1">QUẢN LÍ NGÂN HÀNG</span>
      ) : pathname.includes('/withdraw') ? (
        <span className="text-center flex-1 uppercase">Khu rút tiền</span>
      ) : pathname.includes('/atm') ? (
        <span className="text-center flex-1">Thanh toán trực tuyến</span>
      ) : pathname.includes('/vnpay') ? (
        <span className="text-center flex-1">Ví điện tử</span>
      ) : pathname.includes('/purchase') ? (
        <span className="text-center flex-1 uppercase">Khu nạp tiền</span>
      ) : pathname.includes('/transaction') ? (
        <span className="text-center flex-1 uppercase">Giao dịch</span>
      ) : (
        <span>TÔI</span>
      )}

      {pathname === '/me' && (
        <button>
          <Image src="/button/btn_inforMailW.svg" alt="logo" width={20} height={20} />
        </button>
      )}
      {pathname.includes('/withdraw') ||
        (pathname.includes('/purchase') && (
          <button className="text-yellow-200 text-lg">
            <p>$ 0</p>
          </button>
        ))}
    </div>
  );
};

export default HeaderMe;
