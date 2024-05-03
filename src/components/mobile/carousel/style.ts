import { CustomFlowbiteTheme } from 'flowbite-react';

export const configCarousel: CustomFlowbiteTheme = {
  carousel: {
    root: {
      base: 'relative h-[166px] w-full ',
      // leftControl: 'hidden',
      // rightControl: 'hidden',
    },
    item: {
      base: 'absolute left-1/2 top-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 ',
    },
    indicators: {
      base: 'w-2 h-2 rounded-full',
    },
  },
};
