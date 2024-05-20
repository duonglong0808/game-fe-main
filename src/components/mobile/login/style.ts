import { CustomFlowbiteTheme } from 'flowbite-react';

export const configModal: CustomFlowbiteTheme = {
  modal: {
    content: {
      base: 'relative h-screen flex items-center justify-center w-full p-4',
      inner:
        'relative flex justify-center w-[80vh] flex-col rounded-xl overflow-hidden bg-white shadow',
    },
    header: {
      base: 'flex items-center justify-between bg-[#eee]',
      popup: 'border-b-0 p-1',
      title: 'flex-1 text-center text-base font-bold text-gray-900 relative left-4',
    },
  },
};
