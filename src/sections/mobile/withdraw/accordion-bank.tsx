'use client';
import Image from 'next/image';
import { Accordion } from 'flowbite-react';
export default function BankAccordion() {
  return (
    <Accordion className="w-full" collapseAll>
      <Accordion.Panel>
        <Accordion.Title className="bg-white hover:bg-white text-black py-2 flex-1 first:rounded-none">
          <div className="w-full flex items-center justify-between gap-6   ">
            <Image
              src={'/member/withdraw/icon_bkcard_1003.png'}
              alt=""
              width={100}
              height={100}
              className="object-cover border border-gray-200 p-2"
            />
            <div className="flex gap-2 text-lg">
              <p>Số cuối:</p>
              <p className="text-sky-500">5577</p>
            </div>
          </div>
        </Accordion.Title>
        <Accordion.Content className="p-2 bg-gray-200">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between w-full bg-sky-50 border border-sky-400 p-2">
              <Image
                src={'/member/withdraw/icon_bkcard_1003.png'}
                alt=""
                width={100}
                height={100}
                className="object-cover border bg-white border-gray-200 p-2"
              />
              <div className="flex gap-2 text-lg text-sky-500">
                <p>Số cuối:</p>
                <p>5577</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 bg-white border border-gray-300 px-2 py-3 text-gray-500">
              <Image
                src={'/member/withdraw/icon_add.png'}
                alt=""
                width={20}
                height={20}
                className="object-cover"
              />
              <p className="text-lg">Thêm tài khoản</p>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white border border-gray-300 px-2 py-3 text-gray-500">
              <Image
                src={'/member/withdraw/icon_add.png'}
                alt=""
                width={20}
                height={20}
                className="object-cover"
              />
              <p className="text-lg">Thêm tài khoản</p>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white border border-gray-300 px-2 py-3 text-gray-500">
              <Image
                src={'/member/withdraw/icon_add.png'}
                alt=""
                width={20}
                height={20}
                className="object-cover"
              />
              <p className="text-lg">Thêm tài khoản</p>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}
