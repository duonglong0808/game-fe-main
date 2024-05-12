'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Accordion } from 'flowbite-react';
import { handleMovePointToMain, useGameTable } from './utils/handleTable';
import { useDispatch } from 'react-redux';
import { refreshPoint } from '@/sections/member/view/utils/handleMember';

const TableInfo = () => {
  const { INFO, INFO_2, INFO_3, main, total, gameMainId } = useGameTable();
  const dispatch = useDispatch();

  return (
    <div className="relative p-1 h-full overflow-auto">
      <div className=" w-full bg-[#4a80a3] text-black grid grid-cols-3 p-3 sticky top-1 z-10">
        <p className="whitespace-nowrap text-sm text-white font-bold dark:text-white border-r flex flex-col justify-center ">
          TK Chính
        </p>
        <div className="flex justify-between col-span-2">
          <p className="text-white font-bold px-2 text-lg">{main}</p>
          <div className="group cursor-pointer" onClick={() => refreshPoint(dispatch)}>
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
            <div key={index} className="bg-white text-black grid grid-cols-3 p-1 h-[44.5px] ">
              <p className="whitespace-nowrap text-sm text-gray-900 dark:text-white border-r flex flex-col justify-center">
                {item.name}
              </p>
              <div className="flex justify-between col-span-2 items-center ">
                <p className="text-[#02af1d] font-bold px-2">{item.points}</p>
                {item.points > 0 && (
                  <p
                    onClick={() => {
                      if (item.gamePointId && gameMainId)
                        handleMovePointToMain(item.gamePointId, gameMainId, item.points, dispatch);
                    }}
                    className="cursor-pointer text-white bg-[#00979c] text-sm hover:bg-[#26bcc1]   p-1.5 rounded-md">
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
                className="bg-[#e2f0f9] text-black grid grid-cols-3 p-1 border-b h-[44.5px]">
                <p className="whitespace-nowrap text-sm text-gray-900 dark:text-white border-r flex flex-col justify-center">
                  {item.name}
                </p>
                <div className="flex justify-between col-span-2 items-center ">
                  <p className="text-[#02af1d] font-bold px-2">{item.points}</p>
                  {item.points > 0 && (
                    <p
                      onClick={() => {
                        if (item.gamePointId && gameMainId)
                          handleMovePointToMain(
                            item.gamePointId,
                            gameMainId,
                            item.points,
                            dispatch
                          );
                      }}
                      className="cursor-pointer text-white bg-[#00979c] text-sm hover:bg-[#26bcc1]   p-1.5 rounded-md">
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
                className="bg-[#e2f0f9] text-black grid grid-cols-3 p-1 border-b h-[44.5px]">
                <p className="whitespace-nowrap text-sm text-gray-900 dark:text-white border-r flex flex-col justify-center">
                  {item.name}
                </p>
                <div className="flex justify-between col-span-2 items-center ">
                  <p className="text-[#02af1d] font-bold px-2">{item.points}</p>
                  {item.points > 0 && (
                    <p
                      onClick={() => {
                        if (item.gamePointId && gameMainId)
                          handleMovePointToMain(
                            item.gamePointId,
                            gameMainId,
                            item.points,
                            dispatch
                          );
                      }}
                      className="cursor-pointer text-white bg-[#00979c] text-sm hover:bg-[#26bcc1]   p-1.5 rounded-md">
                      Chuyển về
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>

      <div className=" w-full bg-[#86aec7]  grid grid-cols-3 p-3 sticky -bottom-1">
        <p className="whitespace-nowrap text-sm text-white dark:text-white border-r flex flex-col justify-center font-bold">
          Tổng điểm
        </p>
        <div className="flex justify-between col-span-2">
          <p className="text-[#ffe201] font-bold px-2">{total}</p>
        </div>
      </div>
    </div>
  );
};

export default TableInfo;
