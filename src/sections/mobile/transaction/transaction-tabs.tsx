'use client';
import { StatusPaymentTranSaction, TypePaymentTranSaction } from '@/constant';
import styles from './header-transaction.module.scss';
import classNames from 'classnames/bind';
import { CustomFlowbiteTheme, Tabs } from 'flowbite-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getAllPaymentTransaction } from '../utils/api';
import moment from 'moment';

const cx = classNames.bind(styles);
export default function TransactionTabs() {
  const [statusTransaction, setStatusTransaction] = useState(3);
  const [typeTransaction, setTypeTransaction] = useState(2);
  const [subMitQuery, setSubMitQuery] = useState(true);
  const [data, setData] = useState<
    {
      id: number;
      createdAt: string;
      type: number;
      content: string;
      bankReceive: {
        accountNumber: number;
      };
      point: number;
      status: number;
      receipt: string;
    }[]
  >([]);
  // const [PTIdReceipt, setPTIdReceipt] = useState<number>(1);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllPaymentTransaction(typeTransaction, statusTransaction);
      if (res?.data) {
        const { data, pagination } = res.data;
        setData(data);
        // setSubMitQuery(false);
      }
      // if (subMitQuery) {
      // }
    }

    fetchData();
  }, [statusTransaction, typeTransaction]);

  function hideMiddleDigits(text: string) {
    const firstThreeDigits = text.slice(0, 3);
    const lastThreeDigits = text.slice(-3);
    return `${firstThreeDigits}***${lastThreeDigits}`;
  }

  return (
    <div>
      {/* {PTIdReceipt ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#00000075] z-[60]">
          <div className="absolute left-0 right-0 top-0 bottom-0 m-auto w-[85%] bg-white h-fit rounded-lg">
            <div className=""></div>
          </div>
        </div>
      ) : (
        <></>
      )} */}
      <div className="flex items-center border-[1px] border-[#ddd]">
        <div className={cx('top-2 right-12')}>
          <div className={cx('option-wrapper', 'relative text-black')}>
            Chọn
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
        <button
          onClick={() => setStatusTransaction(3)}
          className={cx('mx-2 flex-1 font-semibold text-[14px] border-b-2 py-2 ', {
            'border-b-4 border-[#4a80a3] text-[#4a80a3] z-10': statusTransaction == 3,
            'border-[transparent] text-black': statusTransaction != 3,
          })}>
          Chưa hoàn thành
        </button>
        <button
          onClick={() => setStatusTransaction(1)}
          className={cx('mx-2 flex-1 font-semibold text-[14px] border-b-2 py-2 ', {
            'border-b-4 border-[#4a80a3] text-[#4a80a3] z-10': statusTransaction == 1,
            'border-[transparent] text-black': statusTransaction != 1,
          })}>
          Đã hoàn thành
        </button>
      </div>
      {data.length ? (
        data.map((item, index) => (
          <div key={index} className="mb-2 bg-white">
            <div className="flex justify-between p-2 border-[1px] border-[#ddd]">
              <div className="flex">
                <span
                  className={cx({
                    'text-[#00bb00]': item.type == TypePaymentTranSaction.deposit,
                    'text-[#ff7c80]': item.type == TypePaymentTranSaction.withdrawMoney,
                  })}>
                  {item.type == TypePaymentTranSaction.deposit ? 'Nạp tiền' : 'Rút tiền'}
                </span>
                <span className="ml-2 ">{item.content}</span>
              </div>
              <span className="text-[#666]">{moment(item.createdAt).format('DD-MM HH:MM:SS')}</span>
            </div>
            <div className="px-2 py-2 w-full">
              <div className="flex text-start items-center mb-2">
                <p className="basis-1/2">
                  Số điểm : <span className="text-[#009019]">{item.point}</span>
                </p>
                <p className="basis-1/2">Ưu đãi: 0</p>
              </div>
              <div>
                <p>
                  Trạng thái :
                  <span className="text-[#2625ed] text-[14px] ml-1">
                    {item.status == StatusPaymentTranSaction.processing
                      ? 'Đang xử lý'
                      : item.status == StatusPaymentTranSaction.success
                      ? 'Thành công'
                      : 'Hủy'}
                  </span>
                  {item.status == StatusPaymentTranSaction.processing ? (
                    <span className="ml-2 text-[#f00]">{`[Hủy yêu cầu]`}</span>
                  ) : (
                    <></>
                  )}
                </p>
              </div>

              {item.status == StatusPaymentTranSaction.processing ? (
                <button className="w-full bg-[#3ba0d3] py-2 text-center mt-2 text-white rounded-lg flex justify-center">
                  <span className="block bg-[url(/mobile/icons/btn_upload.svg)] bg-no-repeat bg-center w-[19px] h-[19px] mr-2 relative top-[2px]"></span>
                  Tải biên lai
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Image src="/mobile/images/icon_noMessage.svg" alt="" width={150} height={127} />
            <p className="text-lg font-bold text-blue-400">Chưa có tin nhắn</p>
          </div>
        </div>
      )}
    </div>
  );
}
