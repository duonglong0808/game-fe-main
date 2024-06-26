import type { Config } from 'tailwindcss';
import flowbite from 'flowbite-react/tailwind';
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        showUp: {
          '0%': { transform: 'translateY(50%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' },
        },
        showDown: {
          '0%': { transform: 'translateY(-50%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' },
        },
      },
      animation: {
        'show-up': 'showUp 0.3s ease-in-out forwards',
        'show-down': 'showDown 0.3s ease-in-out forwards',
      },
    },
  },

  plugins: [flowbite.plugin()],
};
export default config;
