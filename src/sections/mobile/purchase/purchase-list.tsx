import Image from 'next/image';
import Link from 'next/link';
import { PURCHASE } from '@/_mock/_purchase';

export default function PurchaseList() {
  return (
    <div className="flex-1 flex flex-col gap-4 w-full py-4">
      {PURCHASE.map((item) => (
        <Link
          href={item.href || '/'}
          key={item.name}
          className="relative flex items-center justify-start py-2 pl-4 gap-4 bg-white border-none ">
          <Image
            src="/member/purchase/icon_i.svg"
            alt=""
            width={25}
            height={25}
            className="absolute top-2 right-2"
          />

          <div className="relative bg-white p-2 overflow-hidden w-[45px] h-[45px] flex items-center justify-center">
            <Image src={item.icon} alt="" fill className="object-contain" />
          </div>
          <div>
            <p className="text-black font-bold text-lg">{item.name}</p>
            <p className="text-red-500 text-sm font-bold">{item.limit}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
