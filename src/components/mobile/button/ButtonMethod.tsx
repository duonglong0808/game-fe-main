import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
type ButtonMethodProps = {
  name: string;
  icon?: string;
  select?: boolean;
};
const ButtonMethod = ({ name, icon, select }: ButtonMethodProps) => {
  return (
    <div
      className={classNames(
        'relative flex items-center justify-between max-lg:flex-row-reverse h-[52px] max-lg:h-[46px] max-lg:text-base w-[170px]  bg-gray-200 max-lg:bg-white p-2  rounded-[3px] cursor-pointer hover:bg-blue-200 hover:text-blue-600 hover:border-blue-500',
        { 'border text-gray-500 border-gray-400 max-lg:border-gray-200': !select },
        {
          'bg-blue-200 text-blue-600 border  border-blue-500': select,
        }
      )}>
      <p className="text-sm max-lg:text-base">{name}</p>
      {icon ? (
        <img src={icon} alt="" width={30} height={30} className={''} loading="lazy" />
      ) : (
        <Image
          src={'/member/withdraw/icon_card.svg'}
          alt=""
          width={30}
          height={30}
          className={''}
        />
      )}
      {select && (
        <Image
          src={'/member/withdraw/icon_payWayOn.png'}
          alt=""
          width={30}
          height={30}
          className={'absolute right-0 bottom-0 max-lg:hidden'}
        />
      )}
    </div>
  );
};

export default ButtonMethod;
