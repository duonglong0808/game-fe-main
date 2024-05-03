import React from 'react';
import Image from 'next/image';
const TransferView = () => {
  return (
    <div className="flex flex-col gap-1 w-full p-1">
      
      <div className="flex items-center bg-white p-1 gap-3 h-[300px]">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] h-full border border-gray-300 ">
          <Image src={'/member/withdraw/icon_dataInput.png'} alt="" width={30} height={30} />
          <p className="text-center text-sm text-[#888888]">Đề xuất yêu cầu</p>
        </div>

        <div className="flex-1 py-4 flex flex-col  gap-4 px-20">
          <div className="flex items-center justify-between w-full ">
            <p className="text-sm text-red-500">TK chuyển:</p>
            <select className="w-[250px]  appearance-none bg-gray-200 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">TK chính</option>
              <option value="option1">KU thể thao</option>
              <option value="option2">KU Casino</option>
            </select>
          </div>
          <div className="flex items-center justify-between w-full ">
            <p className="text-sm text-green-500">TK nhận:</p>
            <select className="w-[250px]  appearance-none bg-gray-200 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Vui lòng chọn</option>
              <option value="option1">KU thể thao</option>
              <option value="option2">KU Casino</option>
            </select>
          </div>
          <div className="flex items-center justify-between w-full ">
            <p className="text-sm text-black">Điểm chuyển:</p>
            <input
              type="text"
              placeholder="Nhập số điểm"
              className="w-[250px] border-none outline-none bg-gray-200 border border-gray-300 appearance-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md text-sm"
            />
          </div>
          <div className="flex items-center justify-between w-full text-sm text-white gap-4">
            <button className="flex-1 bg-[#0c5d91] py-2 px-6 rounded-sm h-[45px] flex items-center justify-center">
              Chuyển hết về tài khoản chính
            </button>
            <button
              disabled
              className="flex-1 bg-gray-400 py-2 px-4 rounded-sm h-[45px] flex items-center justify-center cursor-not-allowed">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-white p-1 gap-3 h-[250px]">
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
              Hội viên phải chuyển số tiền cược tối thiểu đến tài khoản được chỉ định mới có thể
              tiến hành trò chơi.
            </li>
            <li>Khi chuyển khoản vui lòng kiểm tra số dư tài khoản có đủ hay không.</li>
            <li>
              <span className="text-red-500">
                Chuyển khoản không thông qua tài khoản chính, sẽ ghi nhận 2 dòng giao dịch.
              </span>{' '}
              <br />
              Ví dụ: KU Casino chuyển khoản vào 3D Games, lịch sử chuyển sẽ ghi nhận: KU Casino
              chuyển vào Tài khoản chính, Tài khoản chính chuyển vào 3D Games.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TransferView;
