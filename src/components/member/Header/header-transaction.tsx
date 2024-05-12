'use client';

import styles from './header-transaction.module.scss';
import classNames from 'classnames';
import classNamesTag from 'classnames/bind';
import { useEffect, useState } from 'react';

const cx = classNamesTag.bind(styles);

const HeaderTransaction = ({
  setStatusTransaction,
  statusTransaction,
  setTypeTransaction,
  typeTransaction,
  onRefresh,
}: {
  statusTransaction: number;
  setStatusTransaction: (status: number) => void;
  typeTransaction: number;
  setTypeTransaction: (type: number) => void;
  onRefresh: () => void;
}) => {
  const [counter, setCounter] = useState(30);

  useEffect(() => {
    let idTimeOut: any;
    if (counter > 0) {
      idTimeOut = setTimeout(() => {
        setCounter((pre) => pre - 1);
      }, 1000);
    } else {
      onRefresh();
      setCounter(30);
    }

    return () => {
      clearTimeout(idTimeOut);
    };
  }, [counter]);

  return (
    <div className="flex items-center justify-center gap-4 text-sm  p-2 relative max-lg:bg-white text-black">
      <div onClick={() => setStatusTransaction(3)} className="cursor-pointer">
        <p
          className={classNames('h-8 max-lg:h-6', {
            'border-b-4 border-[#4a80a3] text-[#4a80a3] z-10': statusTransaction == 3,
          })}>
          Chưa hoàn thành
        </p>
      </div>
      <div onClick={() => setStatusTransaction(1)} className="cursor-pointer">
        <p
          className={classNames('h-8 max-lg:h-6', {
            'border-b-4 border-[#4a80a3] text-[#4a80a3] z-10': statusTransaction === 1,
          })}>
          Đã hoàn thành
        </p>
      </div>
      <div className={classNames('absolute', 'top-2 right-12')}>
        <div className={cx('option-wrapper', 'relative')}>
          Chọn loại giao dịch
          <div className={cx('option-list')}>
            <label
              onClick={() => setTypeTransaction(2)}
              className={cx('option--item')}
              style={{
                borderBottom: '1px solid #f2f2f2',
              }}>
              <span
                className={cx('option--item__span', {
                  'option--item__span--active': typeTransaction == 2,
                })}></span>
              Chọn tất cả
            </label>

            <label onClick={() => setTypeTransaction(0)} className={cx('option--item')}>
              <span
                className={cx('option--item__span', {
                  'option--item__span--active': typeTransaction == 0,
                })}></span>
              Nạp tiền
            </label>

            <label onClick={() => setTypeTransaction(1)} className={cx('option--item')}>
              <span
                className={cx('option--item__span', {
                  'option--item__span--active': typeTransaction == 1,
                })}></span>
              Rút tiền
            </label>
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-0 flex items-center gap-2">
        <p className="text-yellow-500 text-xl">{counter}</p>
        <p className="text-lg">s</p>
      </div>
    </div>
  );
};

export default HeaderTransaction;
