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
    <div className="bg-white text-black flex items-center justify-around w-full py-2">
      <div className="flex flex-col justify-center items-center">
        <Image src={icon ? icon : '/me/icon_level1.svg'} alt="" width={65} height={65} />
        <p>{rank}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-xl">{name}</p>
        <p className="text-blue-400">{title}</p>
      </div>
      <div>
        <p className="text-yellow-400 text-3xl">$ {count}</p>
      </div>
    </div>
  );
}
