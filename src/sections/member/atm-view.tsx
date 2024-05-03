'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ButtonAdd, ButtonBank, ButtonMethod } from '@/components/member/Button';
import HeaderPurchase from '@/components/member/Header/header-purchase';
const AtmPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="max-lg:hidden flex flex-col gap-1 w-full p-1">
      <div className="flex items-center bg-white p-1 gap-3 h-[150px]">
        <div className=" flex flex-col items-center justify-center w-[68px] h-full p-2 bg-[#f3f3f3] border border-gray-300">
          <Image
            src={'/member/withdraw/icon_payWay.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Phương thức</p>
        </div>
        <div className="flex-1 flex flex-col justify-evenly gap-2 h-full">
          <HeaderPurchase title="Chuyển khoản ATM" />
          <div className="border-b border-gray-300" />
          <ButtonMethod name="Chuyển khoản cùng hệ thống" select />
        </div>
      </div>
      <div className="flex items-center  bg-white p-1 gap-3 h-[180px]">
        <div className="flex flex-col items-center justify-center max-w-[68px] h-full p-2 bg-[#f3f3f3] border border-gray-300">
          <Image
            src={'/member/withdraw/icon_payWay.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Chọn ngân hàng</p>
        </div>
        <div className="flex-1 text-sm space-y-2 py-2">
          <div className="flex gap-2 items-center">
            <p>Ngân hàng: </p>
            <div className="relative">
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="block appearance-none bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Chọn ngân hàng muốn nạp</option>
                <option value="option1">ACB</option>
                <option value="option2">Vietcombank</option>
              </select>
            </div>
          </div>
          <div>
            <p>Tên tài khoản:</p>
          </div>
          <div>
            <p>Số tài khoản:</p>
          </div>
          <p className="text-red-500">*Chỉ sử dụng cho nạp tiền lần này.</p>
        </div>
      </div>

      <div className="flex items-center bg-white p-1 gap-3 h-[200px]">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] h-full border border-gray-300 ">
          <Image src={'/member/withdraw/icon_dataInput.png'} alt="" width={30} height={30} />
          <p className="text-center text-sm text-[#888888]">Đề xuất yêu cầu</p>
        </div>
        <div className="flex-1 flex flex-col py-2 gap-4 ">
          <div className="flex w-full items-center justify-between">
            <ButtonBank />
            <ButtonAdd />
            <ButtonAdd />
            <ButtonAdd />
          </div>
          <div className=" flex justify-between items-center gap-2">
            <div className="relative flex justify-between items-center gap-2">
              <p className="text-sm">Số điểm nạp:</p>
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
            <button
              disabled
              className="bg-gray-400 text-sm text-white w-[155px] py-2 rounded-md cursor-not-allowed">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-white p-1 gap-3 h-[150px]">
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
            <li>Nạp tiền khác họ tên đăng ký sẽ bị hoàn trả.</li>
            <li>
              Chuyển khoản khác hệ thống vui lòng chọn{' '}
              <span className="text-red-500">chuyển khoản nhanh</span>.
            </li>
            <li>Để tăng tốc độ cộng điểm, vui lòng đến mục lịch sử giao dịch tải biên lai lên.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AtmPage;
