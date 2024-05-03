import Image from 'next/image';
import classNames from 'classnames';
import Card from '../Card';
const CONSTANTS = [
  {
    id: 1,
    name: 'KU',
    icon: '/KU_logo.svg',
    img: '/mobileIcon/img_liveOT_1.png',
    isHot: true,
    isSpan: true,
    isBg: true,
  },
  {
    id: 2,
    name: 'DG',
    icon: '/icons/logo_DG.png',
    img: '/mobileIcon/img_liveOT_2.png',
    isSmall: true,
  },
  {
    id: 3,
    name: 'AES',
    icon: '/icons/logo_AES.png',
    img: '/mobileIcon/img_liveOT_3.png',
    isSmall: true,
  },
  {
    id: 4,
    name: 'EVO',
    icon: '/icons/logo_EVO.png',
    img: '/mobileIcon/img_liveOT_4.png',
    isSmall: true,
  },
  {
    id: 5,
    name: 'WM',
    icon: '/icons/logo_WM.png',
    img: '/mobileIcon/img_liveOT_5.png',
    isSmall: true,
  },
  {
    id: 6,
    name: 'AG',
    icon: '/icons/logo_AG.png',
    img: '/mobileIcon/img_liveOT_6.png',
    isSmall: true,
  },
  {
    id: 7,
    name: 'SA',
    icon: '/icons/logo_SA.png',
    img: '/mobileIcon/img_liveOT_7.png',
    isSmall: true,
  },
  {
    id: 8,
    name: 'GPI',
    icon: '/icons/logo_GPI.png',
    img: '/mobileIcon/img_liveOT_8.png',
    isSmall: true,
  },
  {
    id: 9,
    name: 'DB',
    icon: '/icons/logo_DB.png',
    img: '/mobileIcon/img_liveOT_9.png',
    isSmall: true,
  },
];
const LiveCasino = () => {
  return (
    <div className=" grid grid-cols-2 grid-rows-5 gap-2 h-full w-full">
      {CONSTANTS.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default LiveCasino;

const Card1 = ({
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
        'col-span-2 bg-[url(/sideRight/livehotBG.png)] bg-contain': name === 'KU',
      })}>
      <div
        className={classNames('py-2 px-2 w-fit flex items-center flex-col', {
          'px-10 h-full pl-10 justify-center': name === 'KU',
        })}>
        <p className={classNames('font-bold text-lg text-center', { 'text-2xl': name === 'KU' })}>
          {name}
        </p>
        {name == 'KU' ? (
          <Image src={icon} alt={name} width={60} height={60} />
        ) : (
          <Image src={icon} alt={name} width={40} height={40} />
        )}
      </div>

      {name === 'KU' ? (
        <Image
          src={img}
          alt={name}
          width={150}
          height={300}
          className="absolute bottom-0 right-0 "
          priority
        />
      ) : (
        <Image
          src={img}
          alt={name}
          width={70}
          height={100}
          className="absolute bottom-0 right-0 "
          priority
        />
      )}
    </div>
  );
};
