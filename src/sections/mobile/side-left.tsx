'use client';
import Image from 'next/image';
import React from 'react';
import classNames from 'classnames';
import { SIDELEFT } from '@/_mock/_side-left';
import { TabsRef, Button } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
export type Props = {
  tabsRef: React.RefObject<TabsRef>;
  activeTab: number;
};
const SideLeft = ({ tabsRef, activeTab }: Props) => {
  return (
    <section className="flex-[0.2] gap-2  h-full  flex flex-col justify-between">
      {SIDELEFT.map((item, i) => (
        <CustomButton
          key={item.id}
          isActive={activeTab == i}
          icon={item.icon}
          name={item.name}
          onClick={() => tabsRef.current?.setActiveTab(i)}
        />
      ))}
    </section>
  );
};

export default SideLeft;

type ButtonProps = {
  isActive?: boolean;
  icon: string;
  name: string;
  onClick?: () => void;
};
const customTheme: CustomFlowbiteTheme['button'] = {
  base: 'h-full',
  inner: {
    base: 'flex flex-col justify-center items-center gap-1 bg-sky-100 rounded p-1 h-full',
  },
};
const CustomButton = ({ isActive, icon, name, onClick }: ButtonProps) => {
  return (
    <Button
      theme={customTheme}
      color={'default'}
      className={classNames({ 'border border-blue-500': isActive })}
      onClick={onClick}>
      <Image src={icon} alt={name} width={20} height={20} />
      <span className="font-bold text-center text-xs">{name}</span>
    </Button>
  );
};
