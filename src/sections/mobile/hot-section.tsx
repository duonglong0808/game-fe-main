'use client';

import { HOTSECTION } from '@/_mock/_side_right';
import { useAppSelector } from '@/lib/redux/utilRedux';
import Image from 'next/image';
export default function HotSection() {
  return (
    <section className="animate-show-up h-full grid grid-cols-2 grid-rows-3 gap-2 lg:hidden">
      {HOTSECTION.map((item) => (
        <HotButton key={item.id} {...item} />
      ))}
      <div className="w-full h-full grid grid-rows-2 space-y-2">
        <GradientButton name="PHIM ẢNH" icon="/sideRight/logo_18.svg" />
        <GradientButton name="ĐỐI TÁC LALIGA" icon="/sideRight/logo_LaLiga.svg" />
      </div>
    </section>
  );
}
type GradientButtonProps = {
  name: string;
  icon: string;
};

const GradientButton = ({ name, icon }: GradientButtonProps) => {
  return (
    <button className="flex items-center justify-between bg-gradient-to-br from-blue-200 via-purple-100 to-purple-200 rounded-xl px-4">
      <span className="text-base font-bold">{name}</span>
      <Image src={icon} width={38} height={38} alt="18" />
    </button>
  );
};

type HotButtonProps = {
  name: string;
  icon: string;
  img: string;
  bg: string;
  width?: number;
  height?: number;
};
const HotButton = ({ name, icon, img, bg, width, height }: HotButtonProps) => {
  const { userName } = useAppSelector((state) => state.user);

  const handleNavigateGameKu = () => {
    if (userName) {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      window.location.href = `${process.env.URL_GAME}?access_token=${accessToken}&&refresh_token=${refreshToken}`;
      // window.open(
      //   `${process.env.URL_GAME}?access_token=${accessToken}&&refresh_token=${refreshToken}`,
      //   '_blank'
      // );
    }
  };

  return (
    <div
      onClick={() => {
        console.log('AAAA');
        handleNavigateGameKu();
      }}
      className="relative flex flex-col w-full h-full rounded-xl overflow-hidden py-2 px-4 gap-2">
      <Image src={bg} alt="" fill className="rounded-xl object-cover" />
      <div className="absolute -right-2 -bottom-6 w-[120%] h-[70%] ">
        <Image className="z-10 object-contain" src={img} alt="" fill />
      </div>
      <p className="font-bold text-lg z-30">{name}</p>
      <Image className="z-10" src={icon} alt="" width={55} height={55} />
    </div>
  );
};
