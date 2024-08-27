'use client';
import Link from 'next/link';
import { useState } from 'react';
import classNames from 'classnames';
import { useNavData } from './config-navigation';
import { useRouter } from 'next/navigation';
import { EnterGiftCode } from '@/components/mobile/enterGift';

type Props = {
  isHome?: boolean;
  openModalLogin: boolean;
  setOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Footer({ isHome, openModalLogin, setOpenModalLogin }: Props) {
  const [showNavMore, setShowNavMore] = useState(false);
  const { data, isLogin } = useNavData();
  const router = useRouter();
  const [openGiftCode, setOpenGiftCode] = useState(false);

  return (
    <div className="flex items-center justify-evenly z-10 w-full h-[55px] bg-white text-black border-t border-gray-300 text-xs relative">
      {openGiftCode ? <EnterGiftCode setOpenGiftCode={setOpenGiftCode} /> : <></>}

      {!isHome ? (
        <Link
          key={data[0].title}
          href={data[0].path || '/'}
          className="flex flex-col items-center justify-center">
          {data[0].icon}
          {data[0].title}
        </Link>
      ) : (
        <Link
          key={data[1].title}
          href={data[1].path || '/'}
          onClick={(e) => {
            e.preventDefault();
            if (isLogin) {
              setOpenGiftCode(true);
            }
          }}
          className="flex flex-col items-center justify-center">
          {data[1].icon}
          {data[1].title}
        </Link>
      )}
      {data.slice(2, 6).map((item, index) => {
        if (item.path) {
          return (
            <Link
              key={index}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                if (isLogin) {
                  router.push(item.path);
                } else {
                  setOpenModalLogin(true);
                }
              }}
              className="flex flex-col items-center justify-center">
              {item.icon}
              {item.title}
            </Link>
          );
        } else {
          return (
            <div
              onClick={() => {
                if (isLogin) {
                  setShowNavMore(!showNavMore);
                } else {
                  setOpenModalLogin(true);
                }
              }}
              key={item.subheader}
              className="flex flex-col items-center justify-center -translate-y-2 z-20">
              {item.icon}
              {item.subheader}
            </div>
          );
        }
      })}
      {showNavMore && (
        <div
          onClick={() => setShowNavMore(false)}
          className="fixed top-0 left-0 right-0 bottom-[55px] w-full h-[calc(100vh - 55px)] bg-[#00000099]">
          <div className="absolute bottom-0 w-full gap-2 flex items-center justify-between text-white bg-white text-base py-[10px] border-b border-gray-300 animate-show-up px-2">
            {data[3].items &&
              data[3].items.map((item) => (
                <Link
                  key={item.title}
                  href={item.path}
                  className={classNames(
                    'flex flex-1 items-center gap-4 px-2 py-[13px] rounded-lg leading-8 my-1 text-sm justify-center',
                    item.bg
                  )}>
                  {item.icon}
                  {item.title}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
