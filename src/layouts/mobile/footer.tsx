'use client';
import Link from 'next/link';
import { useState } from 'react';
import classNames from 'classnames';
import { useNavData } from './config-navigation';
type Props = {
  isHome?: boolean;
};
export default function Footer({ isHome }: Props) {
  const [showNavMore, setShowNavMore] = useState(false);
  const data = useNavData();

  return (
    <div className="flex items-center justify-evenly z-20 w-full h-[55px] bg-white text-black border-t border-gray-300 text-xs relative">
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
          className="flex flex-col items-center justify-center">
          {data[1].icon}
          {data[1].title}
        </Link>
      )}
      {data.slice(2, 6).map((item) => {
        if (item.path) {
          return (
            <Link
              key={item.title}
              href={item.path}
              className="flex flex-col items-center justify-center">
              {item.icon}
              {item.title}
            </Link>
          );
        } else {
          return (
            <div
              onClick={() => setShowNavMore(!showNavMore)}
              key={item.subheader}
              className="flex flex-col items-center justify-center -translate-y-2 z-20">
              {item.icon}
              {item.subheader}
            </div>
          );
        }
      })}
      {showNavMore && (
        <div className="absolute bottom-full w-full flex items-center justify-around text-white bg-white text-base py-4 border-b border-gray-300 animate-show-up">
          {data[3].items &&
            data[3].items.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                className={classNames(
                  'flex items-center justify-between gap-4 p-4 rounded-md leading-8',
                  item.bg
                )}>
                {item.icon}
                {item.title}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
