'use client';
import MobileLayout from '@/layouts/mobile';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { addBankUser, getAllBankUser } from './ultils/api';
import { dataBankStatics } from '@/constant';

export default function ManagerBankView() {
  const [bankUser, setBankUser] = useState([]);
  const [refetchBank, setRefetchBank] = useState(true);
  const title = useRef('Quản lý ngân hàng');
  const [showAddBank, setShowAddBank] = useState(false);

  const [accountOwner, setAccountOwner] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [openListBank, setOpenListBank] = useState(false);

  const [binBank, setBinBank] = useState('');
  const [searchBank, setSearchBank] = useState('');

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
    <MobileLayout
      title={title.current}
      useHandleBack={openListBank || showAddBank}
      showFooter={!openListBank}
      handleBack={() => {
        if (openListBank) {
          title.current = 'Thêm tài khoản';
          setOpenListBank(false);
          setShowAddBank(true);
        } else {
          title.current = 'Quản lý ngân hàng';
          setShowAddBank(false);
        }
      }}>
      {showAddBank ? (
        <div className="w-full h-full bg-[#fff] text-black">
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
                value={accountNumber}
                // onFocus={() =>  }
                // onChange={(e) => {
                //   if (Number(e.target.value) > 0) {
                //     setAccountNumber(String(e.target.value));
                //   } else {
                //     setAccountNumber('');
                //   }
                // }}
                placeholder="Số tài khoản"
                className="outline-none mb-4 border-b-2 border-[#f0f0f0] w-full py-2 text-base"
              />

              <div
                className="relative py-2 border-b-2 border-[#f0f0f0]"
                onClick={() => {
                  title.current = 'Xin chọn ngân hàng';
                  setOpenListBank(true);
                  setShowAddBank(false);
                }}>
                {dataBankStatics.find((bank) => bank.bin == binBank)?.shortName ||
                  'Xin chọn ngân hàng'}
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
              onClick={async () => {
                if (accountNumber && binBank) {
                  const bankSelect = dataBankStatics.find((bank) => bank.bin == binBank);
                  const data = {
                    nameBank: bankSelect?.name,
                    binBank,
                    accountOwner,
                    accountNumber,
                    isForUser: true,
                  };
                  const res = await addBankUser(data);
                  if (res?.data) {
                    title.current = 'Quản lý ngân hàng';
                    setShowAddBank(false);
                    setRefetchBank(true);
                  }
                }
              }}
              className="w-full rounded-xl mt-4 bg-[#2782d7] disabled:bg-[#a7aebb] py-3 text-white">
              Xác nhận
            </button>
          </form>
        </div>
      ) : openListBank ? (
        <div className="w-full h-full bg-white">
          <div className="p-[10px] w-full border-b-[1px] border-[#ddd] relative flex items-center">
            <input
              value={searchBank}
              onChange={(e) => setSearchBank(e.target.value)}
              placeholder="Vui lòng nhập từ khóa"
              className="text-black border-[1px] px-10 py-1 border-[#ddd]  rounded-md w-full  outline-none"
            />
            <span className="absolute left-[8%] bg-contain top-[50%]  translate-x-[-50%] translate-y-[-50%]  bg-[url(/mobile/icons/icon_search_gray.svg)] w-4 h-4"></span>
          </div>
          <ul className="text-black">
            {dataBankStatics
              .filter((i) => i.shortName.includes(searchBank))
              .map((bank, index) => (
                <li
                  onClick={() => {
                    title.current = 'Thêm tài khoản';
                    setOpenListBank(false);
                    setShowAddBank(true);
                    setBinBank(String(bank.bin));
                  }}
                  key={index}
                  className="px-[10px] py-3  border-b-[1px] border-[#ddd] cursor-pointer">
                  {bank.shortName}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="flex-1 bg-gray-200 flex flex-col gap-4 p-4 overflow-auto">
          {bankUser.length ? (
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
            ))
          ) : (
            <></>
          )}

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
