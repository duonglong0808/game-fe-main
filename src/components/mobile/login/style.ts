import { CustomFlowbiteTheme } from 'flowbite-react';

export const configModal: CustomFlowbiteTheme = {
  modal: {
    content: {
      base: 'relative h-screen flex items-center justify-center w-full p-4',
      inner:
        'relative flex justify-center w-[90vh] flex-col rounded-3xl overflow-hidden bg-white shadow',
    },
    header: {
      base: 'flex items-center justify-between p-5 bg-gray-300 ',
      popup: 'border-b-0 p-2',
      title: 'flex-1 text-center text-base font-bold text-gray-900',
    },
  },
};
