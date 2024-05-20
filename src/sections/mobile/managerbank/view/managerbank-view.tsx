'use client';
import MobileLayout from '@/layouts/mobile';
import Image from 'next/image';
import { CARDS } from '@/_mock';
import { useEffect, useRef, useState } from 'react';
import { getAllBankUser } from './ultils/api';
import { dataBankStatics } from '@/constant';

export default function ManagerBankView() {
  const [bankUser, setBankUser] = useState([]);
  const [refetchBank, setRefetchBank] = useState(true);
  const title = useRef('Quản lý ngân hàng');
  const [showAddBank, setShowAddBank] = useState(true);

  const [accountOwner, setAccountOwner] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [openListBank, setOpenListBank] = useState(false);

  const [binBank, setBinBank] = useState('');
  const [searchBank, setSearchBank] = useState('Xin chọn ngân hàng');

  useEffect(() => {
    async function fetchData() {
      if (refetchBank) {
        const bankUser = await getAllBankUser();
        if (bankUser.data) {
          const { data } = bankUser.data;
          setBankUser(data);
          setRefetchBank(false);
        }
      }
    }

    fetchData();
  }, [refetchBank]);

  return (
    <MobileLayout title={title.current}>
      {showAddBank ? (
        <div className="w-full h-full bg-[#fff]">
          <form onSubmit={(e) => e.preventDefault()} className="p-5">
            <div className="">
              <label className="block text-base mb-2">Tên tài khoản</label>
              <input
                value={accountOwner}
                onChange={(e) => setAccountOwner(e.target.value)}
                placeholder="Tên tài khoản"
                className="outline-none mb-4 border-b-2 border-[#f0f0f0] w-full py-2 text-base"
              />

              <input
                value={accountOwner}
                onChange={(e) => setAccountOwner(e.target.value)}
                placeholder="Số tài khoản"
                className="outline-none mb-4 border-b-2 border-[#f0f0f0] w-full py-2 text-base"
              />

              <div className="relative py-2 border-b-2 border-[#f0f0f0]">
                Xin chọn ngân hàng
                <span
                  className="absolute right-4 top-4 h-full bottom-0 w-[16px]"
                  style={{
                    background: 'url(/mobile/icons/icon_select.svg) no-repeat ',
                    backgroundSize: 'contain',
                  }}></span>
              </div>
            </div>

            <p className="text-[#f00] text-center text-sm mt-8">
              Chỉ chấp nhận TK ngân hàng đúng họ tên đăng ký
            </p>

            <button
              disabled={!accountNumber || !accountOwner || !binBank}
              className="w-full rounded-xl mt-4 bg-[#2782d7] disabled:bg-[#a7aebb] py-3 text-white">
              Xác nhận
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 bg-gray-200 flex flex-col gap-4 p-4 overflow-auto">
          {bankUser.length &&
            bankUser.map((card: any, index) => (
              <div
                key={index}
                className="relative w-full h-[100px] rounded-xl overflow-hidden flex flex-col justify-between p-6">
                <Image src={'/me/manager/banklistBg.jpg'} alt="" fill className="object-cover" />
                <div className="z-10 flex items-center gap-2 absolute top-2">
                  <Image
                    src={dataBankStatics.find((bank) => bank.bin == card.binBank)?.logo || ''}
                    alt=""
                    width={40}
                    height={40}
                    className="bg-white rounded-full p-1 w-[40px] h-[40px] object-contain"
                  />
                  <p className="text-xl font-bold text-white">
                    {dataBankStatics.find((bank) => bank.bin == card.binBank)?.shortName ||
                      card.nameBank}
                  </p>
                </div>
                <div className="absolute right-5 bottom-1 z-10 flex gap-3 items-center">
                  {Array.from({ length: 8 }, (_, i) => i).map((i, index) => (
                    <div key={index} className="w-2 h-2 bg-white rounded-full"></div>
                  ))}
                  <p className="text-3xl font-bold text-white">{card.accountNumber?.slice(-4)}</p>
                </div>
              </div>
            ))}

          {bankUser.length < 4 ? (
            <>
              <div
                onClick={() => {
                  title.current = 'Thêm tài khoản';
                  setShowAddBank(true);
                }}
                className="w-full flex items-center justify-center bg-white text-black h-[72px] rounded-xl">
                <Image src={'/me/manager/icon_add.svg'} alt="" width={36} height={36} />
                <p className="text-xl">Thêm tài khoản</p>
              </div>
              <p className="text-red-500 text-center text-lg">Tối đa 4 tài khoản</p>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </MobileLayout>
  );
}
