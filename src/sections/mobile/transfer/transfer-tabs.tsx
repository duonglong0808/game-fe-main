'use client';
import { Tabs } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import Image from 'next/image';
const config: CustomFlowbiteTheme['tabs'] = {
  tablist: {
    tabitem: {
      base: 'flex-1 p-2 font-bold',
    },
  },
};
export default function TransferTabs() {
  return (
    <Tabs theme={config} aria-label="Tabs with icons" style="underline" className="w-full">
      <Tabs.Item active title="Chuyển quỹ">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col divide-y  text-black bg-white border border-gray-200">
            <div className="flex items-center py-4 px-8 text-lg p-3">
              <p className="flex-[0.3]">Tổng số điểm</p>
              <p className="flex-[0.7] font-bold">0</p>
            </div>
            <div className="flex items-center py-4 px-8 text-lg p-3">
              <p className="flex-[0.3]">TK chuyển</p>
              <select className="flex-[0.7] appearance-none bg-transparent border border-none text-left ring-0 focus:border-none focus:outline-none ">
                <option value="">TK chính</option>
                <option value="option1">KU thể thao</option>
                <option value="option2">KU Casino</option>
              </select>
            </div>
            <div className="flex items-center py-4 px-8 text-lg p-3">
              <p className="flex-[0.3]">TK nhận</p>
              <select className="flex-[0.7] appearance-none bg-transparent border border-none text-left ring-0 focus:border-none focus:outline-none ">
                <option value="">Vui lòng chọn</option>
                <option value="option1">KU thể thao</option>
                <option value="option2">KU Casino</option>
              </select>
            </div>
          </div>
          <div className="flex items-center py-4 px-8 text-lg p-3 my-2 bg-white text-black border border-gray-200">
            <p className="flex-[0.3]">Điểm chuyển</p>
            <input
              type="text"
              placeholder="Nhập số điểm"
              className="flex-[0.7] p-2 border-none outline-none"
            />
          </div>

          <div className="flex items-center py-4 px-8 justify-between w-full text-base text-white gap-4 p-4">
            <button className="flex-1 bg-yellow-400 py-2 px-6 rounded-sm h-[55px] flex items-center justify-center">
              Chuyển hết về tài khoản chính
            </button>
            <button
              disabled
              className="flex-1 bg-gray-400 py-2 px-4 rounded-sm h-[55px] flex items-center justify-center cursor-not-allowed">
              Xác nhận
            </button>
          </div>
        </div>
      </Tabs.Item>
      <Tabs.Item title="Tự động">
        <div className="flex flex-col gap-3 divide-y text-black ">
          <p className="py-4 px-8 border border-gray-300 text-lg text-center bg-white">
            Sử dụng chức năng tự động chuyển điểm ra (vào) hay không
          </p>
          <div className="flex flex-col divide-y bg-white">
            <div className="flex items-center py-2 px-4">
              <input
                type="checkbox"
                className="bg-blue-500 h-11 w-11 rounded-md"
                style={{ backgroundSize: '1.5em 1.5em' }}
              />
              <p className="flex-1 text-center uppercase text-lg">KU thể thao</p>
            </div>
            <div className="flex items-center py-2 px-4">
              <input
                type="checkbox"
                className="bg-blue-500 h-11 w-11 rounded-md"
                style={{ backgroundSize: '1.5em 1.5em' }}
              />
              <p className="flex-1 text-center uppercase text-lg">KU thể thao</p>
            </div>
            <div className="flex items-center py-2 px-4">
              <input
                type="checkbox"
                className="bg-blue-500 h-11 w-11 rounded-md"
                style={{ backgroundSize: '1.5em 1.5em' }}
              />
              <p className="flex-1 text-center uppercase text-lg">KU thể thao</p>
            </div>
            <div className="flex items-center py-2 px-4">
              <input
                type="checkbox"
                className="bg-blue-500 h-11 w-11 rounded-md"
                style={{ backgroundSize: '1.5em 1.5em' }}
              />
              <p className="flex-1 text-center uppercase text-lg">KU thể thao</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-8 ">
            <button className="w-full rounded-sm p-4 bg-white border border-cyan-400">
              Hủy bỏ
            </button>
            <button className="rounded-sm w-full bg-cyan-400 p-4 text-white">Xác nhận</button>
          </div>
        </div>
      </Tabs.Item>
      <Tabs.Item title="Lịch sử chuyển">
        <div className="w-full h-[100%] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Image src="/mobile/images/icon_noMessage.svg" alt="" width={150} height={127} />
            <p className="text-lg font-bold text-blue-400">Chưa có tin nhắn</p>
          </div>
        </div>
      </Tabs.Item>
    </Tabs>
  );
}
