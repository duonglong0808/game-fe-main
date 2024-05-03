'use client';
import Image from 'next/image';
import React from 'react';
import classNames from 'classnames';
const CONSTANTS = [
  {
    id: 1,
    name: 'HOT',
    icon: '/sideLeft/icon_hot_on.svg',
  },
  {
    id: 2,
    name: 'LIVE CASINO',
    icon: '/sideLeft/icon_live.svg',
  },
  {
    id: 3,
    name: 'XỔ SỐ',
    icon: '/sideLeft/icon_loto.svg',
  },
  {
    id: 4,
    name: 'THỂ THAO',
    icon: '/sideLeft/icon_sport.svg',
  },
  {
    id: 5,
    name: 'GAMES',
    icon: '/sideLeft/icon_slot.svg',
  },
  {
    id: 6,
    name: 'ĐỐI KHÁNG',
    icon: '/sideLeft/icon_chess.svg',
  },
  {
    id: 7,
    name: 'BẮN CÁ',
    icon: '/sideLeft/icon_fish.svg',
  },
  {
    id: 8,
    name: 'E-SPORTS',
    icon: '/sideLeft/icon_esport.svg',
  },
];
export type Props = {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};
const SideLeft = ({ index, setIndex }: Props) => {
  return (
    <section className="flex-[0.2] gap-2 overflow-auto h-full lg:hidden flex flex-col justify-around">
      {CONSTANTS.map((item, i) => (
        <div
          key={item.id}
          className={classNames(
            'flex flex-col justify-center items-center gap-1 bg-[#e7f1fb] rounded p-1 h-full cursor-pointer',
            { 'border border-blue-500': index == i }
          )}
          onClick={() => setIndex(i)}>
          <Image src={item.icon} alt="" width={20} height={20} />
          <span className="font-bold text-center text-sm max-sm:text-xs">{item.name}</span>
        </div>
      ))}
    </section>
  );
};

export default SideLeft;
