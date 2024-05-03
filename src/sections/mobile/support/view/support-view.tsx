import MobileLayout from '@/layouts/mobile/layout';
import Image from 'next/image';
import Link from 'next/link';

export default function SupportView() {
  return (
    <MobileLayout title="HỖ TRỢ">
      <div className=" h-full flex flex-col relative ">
        <div className="z-10 flex flex-col justify-end items-center gap-4 h-full px-4 py-12 max-sm:py-6">
          <button className="bg-blue-500 text-2xl max-sm:text-sm py-4 px-10 rounded-full w-fit">
            Liên hệ ngay
          </button>
          <Link href={'/'} className="flex items-center gap-4 w-full bg-white rounded-lg p-4">
            <Image src="/mobile/icons/icon_Serv_online.svg" alt="" width={30} height={30} />
            <p className="flex-1 text-lg max-sm:text-sm text-black">Hỗ trợ</p>
            <p className="text-blue-500 max-sm:text-sm">Liên hệ</p>
          </Link>
          <Link href={'/'} className="flex items-center gap-4 w-full bg-white rounded-lg p-4">
            <Image src="/mobile/icons/icon_Serv_callBack.svg" alt="" width={30} height={30} />
            <p className="flex-1 text-lg max-sm:text-sm text-black">Dịch vụ gọi lại</p>
            <p className="text-blue-500 max-sm:text-sm">Đăng ký</p>
          </Link>
          <Link href={'/'} className="flex items-center gap-4 w-full bg-white rounded-lg p-4">
            <Image src="/mobile/icons/icon_Serv_telegram.svg" alt="" width={30} height={30} />
            <p className="flex-1 text-lg max-sm:text-sm text-black">Telegram</p>
            <p className="text-blue-500 max-sm:text-sm">Liên hệ</p>
          </Link>

          <div className="flex items-center gap-4 w-full bg-white rounded-lg p-4">
            <Image src="/mobile/icons/icon_Serv_viber.svg" alt="" width={30} height={30} />
            <p className="flex-1 text-lg max-sm:text-sm text-black">+1231312412421</p>
            <p className="text-blue-500 max-sm:text-sm">Sao chép</p>
          </div>
          <div className="flex items-center gap-4 w-full bg-white rounded-lg p-4">
            <Image src="/mobile/icons/icon_Serv_phone.svg" alt="" width={30} height={30} />
            <p className="flex-1 text-lg max-sm:text-sm text-black">Telegram</p>
            <p className="text-blue-500 max-sm:text-sm">Gọi ngay</p>
          </div>
          <div className="flex items-center gap-4 w-full bg-white rounded-lg p-4">
            <Image src="/mobile/icons/icon_Serv_email.svg" alt="" width={30} height={30} />
            <p className="flex-1 text-lg max-sm:text-sm text-black">ku1231@gmail.com</p>
            <p className="text-blue-500 max-sm:text-sm">Sao chép</p>
          </div>
        </div>
        <div className="absolute h-[70%] w-full top-0">
          <Image
            src="/mobile/images/img_Serv_bg.png"
            fill
            alt=""
            className="object-cover absolute top-0"
          />
          <Image
            src="/mobile/images/img_Serv_girl.png"
            fill
            alt=""
            className="object-cover absolute top-0"
          />
        </div>
      </div>
    </MobileLayout>
  );
}
