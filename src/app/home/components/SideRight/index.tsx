import Image from 'next/image';

import LiveCasino from './LiveCasino';
import XoSo from './XoSo';
import Sport from './Sport';
import Games from './Games';
import Fight from './Fight';
import Fish from './Fish';
import ESport from './ESport';
const CONSTANTS = [
  {
    id: 1,
    name: 'KU CASINO',
    bg: '/sideRight/livehotBG.png',
    icon: '/KU_logo.svg',
    img: '/sideRight/hotlive.png',
  },
  {
    id: 2,
    name: 'KU XỔ SỐ',
    bg: '/sideRight/lotoHotBG.png',
    icon: '/KU_logo.svg',
    img: '/sideRight/hotLoto.png',
  },
  {
    id: 3,
    name: 'KU THỂ THAO',
    bg: '/sideRight/sportHotBG.png',
    icon: '/KU_logo.svg',
    img: '/sideRight/hotOT.png',
  },
  {
    id: 4,
    name: '3D GAMES',
    bg: '/sideRight/slotHotBG.png',
    icon: '/KU_logo.svg',
    img: '/sideRight/hotOT2.png',
  },
  {
    id: 5,
    name: 'COOL - IN LIVE',
    bg: '/sideRight/hotBG.png',
    icon: '/sideRight/live.svg',
    img: '/sideRight/hotOT_CI.png',
  },
];
const SideRight = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return (
        <section className="h-full grid grid-cols-2 grid-rows-3 gap-2 lg:hidden">
          {CONSTANTS.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col w-full h-full  rounded-xl overflow-hidden">
              <div className="absolute w-full h-full overflow-hidden">
                <Image src={item.bg} alt="" fill className="overflow-hidden" />
              </div>
              <div className="px-4 pt-2 space-y-2 z-10 h-full w-full flex flex-col justify-between">
                <div>
                  <span className="font-bold text-lg">{item.name}</span>
                  <Image className="z-10" src={item.icon} alt="" width={55} height={55} />
                </div>
                <div className="relative flex-1">
                  <Image
                    className="z-10 absolute right-0 bottom-[-10px]"
                    src={item.img}
                    alt=""
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="w-full h-full grid grid-rows-2 space-y-2">
            <div className="flex items-center justify-between bg-gradient-to-br from-blue-200 via-purple-100 to-purple-200 rounded-xl px-4">
              <span className="text-base font-bold">PHIM ẢNH</span>
              <Image src="/sideRight/logo_18.svg" width={38} height={38} alt="18" />
            </div>
            <div className="flex items-center justify-between bg-gradient-to-br from-blue-200 via-purple-100 to-purple-200 rounded-xl px-4">
              <span className="text-base font-bold">ĐỐI TÁC LALIGA</span>
              <Image src="/sideRight/logo_LaLiga.svg" width={38} height={38} alt="18" />
            </div>
          </div>
        </section>
      );

    case 1:
      return <LiveCasino />;
    case 2:
      return <XoSo />;
    case 3:
      return <Sport />;
    case 4:
      return <Games />;
    case 5:
      return <Fight />;
    case 6:
      return <Fish />;
    case 7:
      return <ESport />;
    default:
      return <div>Error</div>;
  }
};

export default SideRight;
