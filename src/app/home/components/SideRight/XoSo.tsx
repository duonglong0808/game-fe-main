import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
const CONSTANTS = [
  {
    id: 1,
    name: 'KU',
    icon: '/KU_logo.svg',
    img: '/sideRight/img_xoso_1.png',
    isHot: true,
  },
  {
    id: 2,
    name: 'BBIN',
    icon: '/icons/logo_BBIN.png',
    img: '/sideRight/img_xoso_2.png',
  },
];
const XoSo = () => {
  return (
    <div className="grid grid-rows-2 gap-2 h-full w-full">
      {CONSTANTS.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default XoSo;

const Card = ({
  name,
  icon,
  img,
  isHot,
}: {
  name: string;
  icon: string;
  img: string;
  isHot?: boolean;
}) => {
  return (
    <div
      className={classNames('w-full h-full rounded-lg overflow-hidden  bg-[#b5d4ee] relative', {
        'bg-[url(/sideRight/img_lotoKUBG.png)] bg-cover': name === 'KU',
      })}>
      <div
        className={classNames(
          'py-2 px-10 h-full justify-center w-fit flex items-center flex-col space-y-4'
        )}>
        <p className={classNames('font-bold text-center text-2xl')}>{name}</p>
        <Image src={icon} alt={name} width={60} height={60} />
      </div>
      {isHot && (
        <Image
          src={'/sideRight/icon_hot.png'}
          alt="hot"
          width={60}
          height={60}
          className="absolute top-0 right-0"
        />
      )}
      {name === 'KU' ? (
        <Image
          src={img}
          alt={name}
          width={190}
          height={900}
          className="absolute bottom-0 right-0 translate-y-6 overflow-hidden "
          priority
        />
      ) : (
        <Image
          src={img}
          alt={name}
          width={140}
          height={300}
          sizes="sm:100vw xs:50vw"
          className="absolute bottom-0 right-4 translate-y-2 overflow-hidden"
          priority
        />
      )}
    </div>
  );
};
