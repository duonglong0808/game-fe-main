'use client';
import { useRef, useState } from 'react';
import { Tabs, TabsRef } from 'flowbite-react';

import Carousel from '@/components/mobile/carousel';
import MobileLayout from '@/layouts/mobile';
import SideLeft from '../side-left';
import SideRight from '../side-right';

export default function MobileView() {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <MobileLayout isHome>
      <Carousel />
      <div className="flex-1 h-full bg-white text-gray-600 flex gap-2 p-2">
        <div className="flex-[0.2] h-full">
          <SideLeft tabsRef={tabsRef} activeTab={activeTab} />
        </div>
        <div className="flex-[0.8] h-full">
          <SideRight tabsRef={tabsRef} setActiveTab={setActiveTab} />
        </div>
      </div>
    </MobileLayout>
  );
}
