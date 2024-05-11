'use client';

import styles from './header-transaction.module.scss';
import classNames from 'classnames';
import classNamesTag from 'classnames/bind';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const cx = classNamesTag.bind(styles);

const HeaderTransaction = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(1);
  const handleClick = (done: number) => {
    setActive(done);
  };
  return (
    <div className="flex items-center justify-center gap-4 text-sm  p-2 relative max-lg:bg-white text-black">
      <div onClick={() => handleClick(1)} className="cursor-pointer">
        <p
          className={classNames('h-8 max-lg:h-6', {
            'border-b-4 border-[#4a80a3] text-[#4a80a3] z-10': active === 1,
          })}>
          Chưa hoàn thành
        </p>
      </div>
      <div onClick={() => handleClick(2)} className="cursor-pointer">
        <p
          className={classNames('h-8 max-lg:h-6', {
            'border-b-4 border-[#4a80a3] text-[#4a80a3] z-10': active === 2,
          })}>
          Đã hoàn thành
        </p>
      </div>
      <div className={classNames('absolute', 'top-2 right-12')}>
        <div className={cx('option-wrapper', 'relative')}>
          Chọn loại giao dịch
          <div className={cx('option-list')}>
            <label
              className={cx('option--item')}
              style={{
                borderBottom: '1px solid #f2f2f2',
              }}>
              <span className={cx('option--item__span', 'option--item__span--active')}></span>
              Chọn tất cả
            </label>

            <label className={cx('option--item')}>
              <span className={cx('option--item__span', 'option--item__span--active')}></span>
              Nạp tiền
            </label>

            <label className={cx('option--item')}>
              <span className={cx('option--item__span', 'option--item__span--active')}></span>
              Rút tiền
            </label>
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-0 flex items-center gap-2">
        <p className="text-yellow-500 text-xl">10</p>
        <p className="text-lg">s</p>
      </div>
    </div>
  );
};

export default HeaderTransaction;
