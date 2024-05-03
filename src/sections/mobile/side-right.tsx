'use client';
import { Tabs, TabsRef } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import HotSection from './hot-section';
import LiveCasinoSection from './live-section';
import XoSoSection from './xoso-section';
import SportSection from './sport-section';
import GameSection from './game-section';
import FightSection from './fight-section';
import FishSection from './fish-section';
import ESportSection from './esport-section';

const customTheme: CustomFlowbiteTheme['tabs'] = {
  base: 'w-full h-full',
  tablist: {
    base: 'hidden',
    tabitem: {
      base: 'w-full h-full',
    },
  },
  tabitemcontainer: {
    base: 'w-full h-full',
  },
  tabpanel: 'w-full h-full',
};
type Props = {
  tabsRef: React.RefObject<TabsRef>;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
};
const SideRight = ({ tabsRef, setActiveTab }: Props) => {
  return (
    <Tabs
      theme={customTheme}
      aria-label="Default tabs"
      style="default"
      ref={tabsRef}
      onActiveTabChange={(tab) => setActiveTab(tab)}>
      <Tabs.Item active title="Hot Section">
        <HotSection />
      </Tabs.Item>
      <Tabs.Item title="Live Casino">
        <LiveCasinoSection />
      </Tabs.Item>
      <Tabs.Item title="Xo so">
        <XoSoSection />
      </Tabs.Item>
      <Tabs.Item title="Sport">
        <SportSection />
      </Tabs.Item>
      <Tabs.Item title="Games">
        <GameSection />
      </Tabs.Item>
      <Tabs.Item title="Fight">
        <FightSection />
      </Tabs.Item>
      <Tabs.Item title="Fish">
        <FishSection />
      </Tabs.Item>
      <Tabs.Item title="Esport">
        <ESportSection />
      </Tabs.Item>
    </Tabs>
  );
};

export default SideRight;
