import type { CustomFlowbiteTheme } from 'flowbite-react';
export const config: CustomFlowbiteTheme['sidebar'] = {
  root: {
    base: 'h-min',
    collapsed: {
      off: 'w-full',
    },
    inner: 'px-4 py-2 bg-white',
  },
  itemGroup: {
    base: 'space-y-1 divide-y divide-gray-200 dark:divide-gray-700',
  },
  collapse: {
    list: 'space-y-1 divide-y divide-gray-200 dark:divide-gray-700 bg-sky-100 animate-show-down',
  },
};
