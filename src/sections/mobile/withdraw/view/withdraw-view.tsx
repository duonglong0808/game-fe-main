'use client';

import MobileLayout from '@/layouts/mobile';
import Image from 'next/image';
import BankAccordion from '../accordion-bank';

export default function WithdrawView() {
  return (
    <MobileLayout title="Khu rút tiền">
      <div className="flex-1 overflow-auto bg-[#f0eff4] flex flex-col items-center w-full divide-y">
        <p className="text-sky-500 bg-white w-full font-bold text-lg flex items-center justify-center py-2">
          Ngân hàng
        </p>
        <BankAccordion />
        <div className="flex items-center text-lg bg-white w-full px-4">
          <p className="text-black w-[120px]">Số điểm rút</p>
          <input
            type="text"
            className="border-none outline-none py-2 text-gray-700 focus:border-none focus:ring-0 text-lg"
            placeholder="200 ~ 1000000"
          />
        </div>
        <div className="flex items-center text-lg bg-white w-full px-4 py-2 text-red-500">
          <p className="text-red-500 w-[120px]">Thực tế</p>
          <div className="flex-1 flex items-center justify-between text-lg px-2">
            <p>0</p>
            <p>VND</p>
          </div>
        </div>
        <div className="flex items-center text-lg bg-white w-full  px-4 py-2 text-red-500">
          <p className="w-[120px]">MK bảo mật</p>
          <p className="px-2">Không sử dụng</p>
        </div>
        <button className="w-[90%] text-center bg-gray-400 p-4 m-4 text-white rounded-sm text-lg">
          Xác nhận
        </button>
        <div className="w-full flex items-center justify-center gap-2 bg-white text-black p-3">
          <Image src={'/member/withdraw/icon_maintain.svg'} alt="" width={20} height={20} />
          <p>Chú ý</p>
        </div>
        <ol className="list-decimal w-full bg-white text-black text-base pl-8 py-2">
          <li>
            Hạn mức rút tiền một <span className="text-red-500">ngày</span> là{' '}
            <span className="text-red-500">2</span> lần. Hạn mức rút tiền một{' '}
            <span className="text-red-500">ngày</span> là{' '}
            <span className="text-red-500">1000000</span> điểm.
          </li>
          <li>
            Điều kiện rút tiền số điểm cược phải <span className="text-red-500">bằng</span> với số
            điểm nạp.
          </li>
          <li>{`Muốn hủy lệnh rút tiền, hãy đến mục Lịch sử giao dịch-> Hủy yêu cầu.`}</li>
        </ol>
      </div>
    </MobileLayout>
  );
}
