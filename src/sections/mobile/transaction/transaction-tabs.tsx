'use client';
import { CustomFlowbiteTheme, Tabs } from 'flowbite-react';
import Image from 'next/image';
const config: CustomFlowbiteTheme['tabs'] = {
  tablist: {
    tabitem: {
      base: 'flex-1 p-2 font-bold',
    },
  },
};
export default function TransactionTabs() {
  return (
    <Tabs theme={config} aria-label="Tabs with icons" style="underline" className="w-full">
      <Tabs.Item active title="Chưa hoàn thành">
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Image src="/mobile/images/icon_noMessage.svg" alt="" width={150} height={127} />
            <p className="text-lg font-bold text-blue-400">Chưa có tin nhắn</p>
          </div>
        </div>
      </Tabs.Item>
      <Tabs.Item title="Đã hoàn thành">
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Image src="/mobile/images/icon_noMessage.svg" alt="" width={150} height={127} />
            <p className="text-lg font-bold text-blue-400">Chưa có tin nhắn</p>
          </div>
        </div>
      </Tabs.Item>
    </Tabs>
  );
}
