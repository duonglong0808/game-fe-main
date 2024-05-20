import Image from 'next/image';
type CardUserProps = {
  name: string;
  title: string;
  count: number;
  icon?: string;
  rank: string;
};
export default function CardUser({ name, title, count, icon, rank }: CardUserProps) {
  return (
    <div className="bg-white text-black flex items-center justify-around w-full p-4">
      <div className="flex flex-col justify-center items-center">
        <Image src={icon ? icon : '/me/icon_level1.svg'} alt="" width={55} height={55} />
        <p>{rank}</p>
      </div>
      <div className="flex flex-col ml-3">
        <p className="text-[15px]">{name.toUpperCase()}</p>
        <p className="text-blue-400">{title}</p>
      </div>
      <div>
        <p className="text-[#ff7800] text-[22px]">$ {count.toLocaleString('vi-VN')}</p>
      </div>
    </div>
  );
}
