'use client';
import { useRef, useState } from 'react';
import { Tabs, TabsRef } from 'flowbite-react';

import Carousel from '@/components/mobile/carousel';
import MobileLayout from '@/layouts/mobile';
import SideLeft from '../side-left';
import SideRight from '../side-right';
import Image from 'next/image';

export default function MobileView() {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);
  const boxGiftRef = useRef<HTMLDivElement>(null);

  return (
    <MobileLayout isHome>
      <div className="overflow-hidden h-full">
        <Carousel />
        <div className="h-[75%] bg-white text-gray-600 flex gap-2 p-2 relative">
          <div className="absolute bottom-[10px] left-[50px] z-10" ref={boxGiftRef}>
            <Image
              alt="btn"
              src={'/mobile/images/btn_weekly.png'}
              width={96}
              height={96}
              className="object-contain"
            />
            <span
              onClick={() => {
                if (boxGiftRef.current) {
                  boxGiftRef.current.style.display = 'none';
                }
              }}
              className="absolute top-0 right-0 w-4 h-4 block rounded-full bg-[#00000040] bg-[url(/mobile/images/btn_close_white.svg)] bg-[length:50%] bg-center bg-no-repeat cursor-pointer"></span>
          </div>
          <div className="flex-[0.2] h-full">
            <SideLeft tabsRef={tabsRef} activeTab={activeTab} />
          </div>
          <div className="flex-[0.8] h-full">
            <SideRight tabsRef={tabsRef} setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
