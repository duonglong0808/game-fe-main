
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Accordion } from 'flowbite-react';
import { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';
const theme: CustomFlowbiteTheme = {
  accordion: {
    root: {
      base: 'divide-y divide-gray-200 border-gray-200 dark:divide-gray-700 dark:border-gray-700',
      flush: {
        off: 'rounded-lg border',
        on: 'border-b',
      },
    },
    content: {
      base: 'p-5 first:rounded-t-lg last:rounded-b-lg dark:bg-gray-900',
    },
    title: {
      arrow: {
        base: 'h-6 w-6 shrink-0',
        open: {
          off: '',
          on: 'rotate-180',
        },
      },
      base: 'flex w-full items-center justify-between p-5 text-left font-medium text-gray-500 first:rounded-t-lg last:rounded-b-lg dark:text-gray-400',
      flush: {
        off: 'hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800',
        on: 'bg-transparent dark:bg-transparent',
      },
      heading: 'flex-1',
      open: {
        off: '',
        on: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white',
      },
    },
  },
};
const WithDrawView = () => {
 
  return (
    <div className="max-lg:hidden flex flex-col gap-1 w-full p-1">
      <div className="flex items-center bg-white p-1 gap-3">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] border border-gray-300">
          <Image
            src={'/member/withdraw/icon_payWay.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Phương thức</p>
        </div>
        <button className="relative flex items-center justify-between h-[52px] w-[170px] bg-[#e8f2ff] p-2 text-blue-600 border border-solid border-blue-500 rounded-sm">
          <p>Ngân hàng</p>
          <Image
            src={'/member/withdraw/icon_card.svg'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <Image
            src={'/member/withdraw/icon_payWayOn.png'}
            alt=""
            width={30}
            height={30}
            className={'absolute right-0 bottom-0'}
          />
        </button>
        <div>
          <Link href={'/desktop/member/crypto'} className="underline text-blue-600 text-sm">
            Tìm hiểu về Tiền mã hóa
          </Link>
        </div>
      </div>
      <div className="flex items-center  bg-white p-1 gap-3">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] border border-gray-300">
          <Image
            src={'/member/withdraw/icon_payWay.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Chọn ngân hàng</p>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <button className="flex flex-col items-center justify-center h-[60px] bg-[#e8f2ff] p-2 gap-2 text-blue-600 border border-solid border-blue-500 rounded-sm">
            <Image
              src={'/member/withdraw/icon_bkcard_1003.png'}
              alt=""
              width={80}
              height={80}
              className={''}
            />
            <div className="flex items-center gap-2 text-sm">
              <p className="text-black">Số cuối:</p>
              <p>5577</p>
            </div>
          </button>
          <button className="relative flex items-center justify-between gap-2 p-2 h-[60px] border border-gray-300 rounded-md bg-gray-200 float-left cursor-pointer">
            <Image
              src={'/member/withdraw/icon_add.png'}
              alt=""
              width={20}
              height={20}
              className={''}
            />
            <p className="text-sm">Thêm tài khoản</p>
          </button>
          <button className="relative flex items-center justify-between gap-2 p-2 h-[60px] border border-gray-300 rounded-md bg-gray-200 float-left cursor-pointer">
            <Image
              src={'/member/withdraw/icon_add.png'}
              alt=""
              width={20}
              height={20}
              className={''}
            />
            <p className="text-sm">Thêm tài khoản</p>
          </button>
          <button className="relative flex items-center justify-between gap-2 p-2 h-[60px] border border-gray-300 rounded-md bg-gray-200 float-left cursor-pointer">
            <Image
              src={'/member/withdraw/icon_add.png'}
              alt=""
              width={20}
              height={20}
              className={''}
            />
            <p className="text-sm">Thêm tài khoản</p>
          </button>
        </div>
      </div>

      <div className="flex items-center bg-white p-1 gap-3">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] h-full border border-gray-300 ">
          <Image
            src={'/member/withdraw/icon_dataInput.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Đề xuất yêu cầu</p>
        </div>
        <div className="flex-1 py-4">
          <div className=" flex justify-between mb-10">
            <div className="relative flex justify-between items-center gap-2">
              <p className="text-sm">Số điểm rút:</p>
              <input
                type="text"
                placeholder="200 ~ 1000000"
                className="w-40 h-8 px-4 py-2 text-sm rounded-md bg-gray-200  outline-none border-none "
              />
              <div className="absolute -bottom-8 left-[82px] flex justify-between text-sm w-[160px] text-red-500">
                <p>Thực tế: 0</p>
                <p>VNĐ</p>
              </div>
            </div>
            <div className="relative flex justify-between items-center gap-2">
              <p className="text-sm">MK bảo mật:</p>
              <input
                type="text"
                disabled
                placeholder="Không sử dụng"
                className="w-40 h-8 px-4 py-2 text-sm rounded-md bg-gray-200  outline-none border-none "
              />
            </div>
          </div>
          <div className="flex w-full justify-end">
            <button
              disabled
              className="bg-gray-400 text-sm text-white w-[155px] py-2 rounded-md cursor-not-allowed">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-white p-1 gap-3">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] h-full border border-gray-300 ">
          <Image
            src={'/member/withdraw/icon_dataHint.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Đề xuất yêu cầu</p>
        </div>
        <div className="flex-1 py-10 px-4 text-sm ">
          <ol className="list-decimal space-y-2">
            <li>
              Hạn mức rút tiền một <span className="text-red-500">ngày</span> là{' '}
              <span className="text-red-500">2</span> lần.Hạn mức rút tiền một{' '}
              <span className="text-red-500">ngày</span> là{' '}
              <span className="text-red-500">1000000</span> điểm.
            </li>
            <li>
              Điều kiện rút tiền số điểm cược phải <span className="text-red-500">bằng</span> với số
              điểm nạp.
            </li>
            <li>{`Muốn hủy lệnh rút tiền, hãy đến mục Hội viên-> Lịch sử giao dịch-> Hủy yêu cầu.`}</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default WithDrawView;
