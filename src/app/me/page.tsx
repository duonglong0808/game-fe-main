import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';
import { USER } from '@/_mock/_me';

const MePage = () => {
  return (
    <div className="max-lg:flex-1 bg-[#f0eff4] flex flex-col gap-2 overflow-auto">
      <div className="bg-white text-black flex items-center justify-around w-full py-2">
        <div className="flex flex-col justify-center items-center">
          <Image src={'/me/icon_level1.svg'} alt="" width={65} height={65} />
          <p>Đồng</p>
        </div>
        <div className="flex flex-col">
          <p>NGOCTRAMQ</p>
          <p className="text-[#2782d7] ">Qwert</p>
        </div>
        <div>
          <p className="text-[#ff7800] text-3xl">$ 0</p>
        </div>
      </div>
      <Accordion>
        <AccordionPanel>
          <Link href={'/me/infor'} className="bg-white text-black flex items-center p-3">
            <Image src={'/me/icon_menu_MemInfor.svg'} alt="" width={27} height={27} />
            <p className="px-6">Tư liệu hội viên</p>
          </Link>
          <Link href={'/me/manager'} className="bg-white text-black flex items-center p-3">
            <Image src={'/me/icon_menu_card.svg'} alt="" width={27} height={27} />
            <p className="px-6">Quản lý ngân hàng</p>
          </Link>
          <Link href={'/me/infor'} className="bg-white text-black flex items-center p-3">
            <Image src={'/me/icon_login.svg'} alt="" width={27} height={27} />
            <p className="px-6">Thay đổi mật khẩu</p>
          </Link>
          <Link href={'/me/infor'} className="bg-white text-black flex items-center p-3">
            <Image src={'/me/icon_setting.svg'} alt="" width={27} height={27} />
            <p className="px-6">Chuyển quỹ tự động</p>
          </Link>
          {/* <AccordionTitle>What is Flowbite?</AccordionTitle> */}
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle className="bg-white hover:bg-white text-black p-3">
            <div className="flex items-center">
              <Image
                src={'/me/icon_menu_record.svg'}
                alt=""
                width={27}
                height={27}
                className="object-cover"
              />
              <p className="px-6">Giao dịch</p>
            </div>
          </AccordionTitle>
          <AccordionContent className="bg-[#e8f9ff] text-black">
            <ul className="list-disc list-inside divide-y space-y-2">
              <li>
                <Link href={'#'}>Liên hệ</Link>
              </li>
              <li className="pt-2">
                <Link href={'#'}>Lịch sử chuyển điểm </Link>
              </li>
              <li className="pt-2">
                <Link href={'#'}>Khuyến mại</Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>

      <Accordion>
        <AccordionPanel>
          <Link href={'/me/infor'} className="bg-white text-black flex items-center p-3">
            <Image src={'/me/icon_complian.svg'} alt="" width={27} height={27} />
            <p className="px-6">Khiếu nại</p>
          </Link>
          <Link href={'/me/infor'} className="bg-white text-black flex items-center p-3">
            <Image src={'/me/icon_about.svg'} alt="" width={27} height={27} />
            <p className="px-6">Giới thiệu</p>
          </Link>
          <Link href={'/me/infor'} className="bg-white text-black flex items-center p-3">
            <Image src={'/me/icon_menu_help.svg'} alt="" width={27} height={27} />
            <p className="px-6">Vấn đề thường gặp</p>
          </Link>

          {/* <AccordionTitle>What is Flowbite?</AccordionTitle> */}
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle className="bg-white hover:bg-white text-black p-3">
            <div className="flex items-center">
              <Image
                src={'/me/icon_menu_download.svg'}
                alt=""
                width={27}
                height={27}
                className="object-cover"
              />
              <p className="px-6">APP</p>
            </div>
          </AccordionTitle>
          <AccordionContent className="bg-[#e8f9ff] text-black">
            <ul className="list-disc list-inside divide-y space-y-2">
              <li>
                <Link href={'#'}>Chia sẻ APP</Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <Link href={'/me/infor'} className="bg-white text-black flex items-center p-3">
            <Image src={'/me/icon_footer_computer.svg'} alt="" width={27} height={27} />
            <p className="px-6">Trở về PC</p>
          </Link>
          <Link href={'/me/infor'} className="bg-white text-black flex items-center p-3">
            <Image src={'/me/icon_teach.svg'} alt="" width={27} height={27} />
            <p className="px-6">Hướng dẫn sử dụng</p>
          </Link>
        </AccordionPanel>
      </Accordion>

      <button className="w-full bg-white text-[#f00] p-3">Đăng xuất</button>
    </div>
  );
};

export default MePage;
