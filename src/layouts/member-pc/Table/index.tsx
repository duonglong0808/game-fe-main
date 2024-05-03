'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Accordion } from 'flowbite-react';

const INFO = [
  {
    name: 'KU Thể Thao',
    count: 0,
  },
  {
    name: 'KU Casino',
    count: 0,
  },
  {
    name: 'JZ Thể Thao',
    count: 0,
  },
  {
    name: 'KU Xổ Số',
    count: 0,
  },
  {
    name: '3D',
    count: 5,
  },
  {
    name: 'AG',
    count: 0,
  },
  {
    name: 'WM',
    count: 0,
  },
  {
    name: 'CMD',
    count: 0,
  },
  {
    name: 'COOL-IN',
    count: 0,
  },
  {
    name: 'Ví bạn bè',
    count: 0,
  },
];
const INFO_2 = [
  {
    name: 'GPI',
    count: 0,
  },
  {
    name: 'DG',
    count: 0,
  },
  {
    name: 'SA',
    count: 0,
  },
  {
    name: 'AES',
    count: 0,
  },
  {
    name: 'EVO',
    count: 0,
  },
  {
    name: 'DB Casino',
    count: 0,
  },
  {
    name: 'SABA',
    count: 0,
  },
  {
    name: 'AI',
    count: 0,
  },
  {
    name: 'BBIN',
    count: 0,
  },
  {
    name: 'PANDA',
    count: 0,
  },
  {
    name: 'IM',
    count: 0,
  },
];
const INFO_3 = [
  {
    name: 'BNG',
    count: 0,
  },
  {
    name: 'CQ9',
    count: 0,
  },
  {
    name: 'PLS',
    count: 0,
  },
  {
    name: 'RK5',
    count: 0,
  },
  {
    name: 'DS',
    count: 0,
  },
  {
    name: 'V8',
    count: 0,
  },
  {
    name: 'KS',
    count: 0,
  },
  {
    name: 'PG',
    count: 0,
  },
  {
    name: 'KA',
    count: 0,
  },
  {
    name: 'FTG',
    count: 0,
  },
  {
    name: 'FC',
    count: 0,
  },
  {
    name: 'DB Bắn Cá',
    count: 0,
  },
];
const TableInfo = () => {
  return (
    <div className="relative p-1">
      <div className=" w-full bg-[#4a80a3] text-black grid grid-cols-3 p-3">
        <p className="whitespace-nowrap text-sm text-white font-bold dark:text-white border-r flex flex-col justify-center">
          TK Chính
        </p>
        <div className="flex justify-between col-span-2">
          <p className="text-white font-bold px-2 text-lg">0</p>
          <div className="group cursor-pointer">
            <Image
              src={'/btn_pRefresh.png'}
              alt=""
              width={24}
              height={24}
              className="group-hover:hidden"
            />
            <Image
              src={'/btn_pRefresh_2.png'}
              alt=""
              width={24}
              height={24}
              className="hidden group-hover:block"
            />
          </div>
        </div>
      </div>
      <Accordion>
        <Accordion.Panel>
          {INFO.map((item, index) => (
            <div key={index} className="bg-white text-black grid grid-cols-3 p-3">
              <p className="whitespace-nowrap text-sm text-gray-900 dark:text-white border-r flex flex-col justify-center">
                {item.name}
              </p>
              <div className="flex justify-between col-span-2">
                <p className="text-[#02af1d] font-bold px-2">{item.count}</p>
                {item.count > 0 && (
                  <p className="cursor-pointer text-white bg-[#00979c] text-sm hover:bg-[#26bcc1] p-1 rounded-sm">
                    Chuyển về
                  </p>
                )}
              </div>
            </div>
          ))}
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title className="bg-white hover:bg-white text-black hover:text-black">
            <div className="flex items-center">
              <Image
                src={'/member/icon_otherGames.svg'}
                alt=""
                width={15}
                height={15}
                className="object-cover"
              />
              <p className="px-2 text-sm">Sảnh khác</p>
            </div>
          </Accordion.Title>
          <Accordion.Content className="p-0">
            {INFO_2.map((item) => (
              <div
                key={item.name}
                className="bg-[#e2f0f9] text-black grid grid-cols-3 p-3 border-b">
                <p className="whitespace-nowrap text-sm text-gray-900 dark:text-white border-r flex flex-col justify-center">
                  {item.name}
                </p>
                <div className="flex justify-between col-span-2">
                  <p className="text-[#02af1d] font-bold px-2">{item.count}</p>
                  {item.count > 0 && (
                    <p className="cursor-pointer text-white bg-[#00979c] text-sm hover:bg-[#26bcc1] p-1 rounded-sm">
                      Chuyển về
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title className="bg-white hover:bg-white text-black hover:text-black">
            <div className="flex items-center">
              <Image
                src={'/member/icon_otherGames.svg'}
                alt=""
                width={15}
                height={15}
                className="object-cover"
              />
              <p className="px-2 text-sm">Game khác</p>
            </div>
          </Accordion.Title>
          <Accordion.Content className="p-0">
            {INFO_3.map((item) => (
              <div
                key={item.name}
                className="bg-[#e2f0f9] text-black grid grid-cols-3 p-3 border-b">
                <p className="whitespace-nowrap text-sm text-gray-900 dark:text-white border-r flex flex-col justify-center">
                  {item.name}
                </p>
                <div className="flex justify-between col-span-2">
                  <p className="text-[#02af1d] font-bold px-2">{item.count}</p>
                  {item.count > 0 && (
                    <p className="cursor-pointer text-white bg-[#00979c] text-sm hover:bg-[#26bcc1] p-1 rounded-sm">
                      Chuyển về
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>

      <div className=" w-full bg-[#4a80a3]  grid grid-cols-3 p-3">
        <p className="whitespace-nowrap text-sm text-white dark:text-white border-r flex flex-col justify-center font-bold">
          Tổng điểm
        </p>
        <div className="flex justify-between col-span-2">
          <p className="text-[#ffe201] font-bold px-2">5</p>
        </div>
      </div>
    </div>
  );
};

export default TableInfo;
