import Image from 'next/image';
import Link from 'next/link';
import { PURCHASE } from '@/_mock/_purchase';
import { usePaymentTypes } from '../utils/handleMember';
import { paths } from '@/routes/paths';
import { Status } from '@/constant';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/redux/utilRedux';
import { setPaymentTypeId } from '@/lib/redux/app/payment.slice';

const dataNavigate = [
  {
    slug: 'thanh-toan-truc-tuyen',
    href: paths.mobile.purchase.online,
  },
  {
    slug: 'qrcode',
    href: paths.mobile.purchase.vnpay,
  },
  {
    slug: 'chuyen-tai-atm',
    href: paths.mobile.purchase.atm,
  },
  {
    slug: 'ngan-hang-ien-tu',
    href: paths.mobile.purchase.atm,
  },
  {
    slug: 'vi-ien-tu',
    href: paths.mobile.purchase.vnpay,
  },

  {
    name: 'tien-ma-hoa',
    href: paths.mobile.purchase.crypto,
  },

  // {
  //   name: 'Sắp ra mắt',
  //   icon: '/member/purchase/icon_online.png',
  //   disable: true,
  // },
];

export default function PurchaseList() {
  const { data } = usePaymentTypes();
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div className="flex-1 flex flex-col gap-3 w-full py-2">
      {data.map((item, index) => (
        <button
          onClick={() => {
            const path =
              dataNavigate.find((i) => i.slug == item.slug && item.status == Status.Active)?.href ||
              '#';
            if (path != '#') {
              dispatch(setPaymentTypeId({ id: item.id }));
              router.replace(path);
            }
          }}
          key={index}
          className="relative flex items-center justify-start py-2 pl-4 gap-4 bg-white border-none ">
          <Image
            src="/member/purchase/icon_i.svg"
            alt=""
            width={25}
            height={25}
            className="absolute top-3 right-2"
          />

          <div className="relative bg-white p-2 overflow-hidden w-[45px] h-[45px] flex items-center justify-center">
            <Image src={item.image} alt="" width={35} height={35} className="object-contain" />
          </div>
          <div className="text-start">
            <p className="text-black font-bold text-base">{item.name}</p>
            <p className="text-red-500 text-sm font-bold">
              {item.minimum}~{item.maximum}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
