'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAllBankUser } from './utils/api';
import { ButtonAdd, ButtonBank } from '@/components/member/Button';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { ShowConfirmMessage } from '@/app/compmnents/ShowMessage';
import {
  addMessagePopup,
  handleConfirmMessage,
  handleDrawMoney,
  useDataUserInfo,
} from './utils/handleMember';
import { TypePaymentTranSaction } from '@/constant';

const WithDrawView = () => {
  const { titleMessage, descMessage, textClose, textConfirm } = useAppSelector(
    (state) => state.settingApp
  );

  const useInfo = useDataUserInfo();

  const { dataGamePoints } = useAppSelector((state) => state.user);
  const pointMain = dataGamePoints.find((game) => game.gameSlug == 'tk-chinh')?.points || 0;

  const [bankUser, setBankUser] = useState([]);
  const [bankUserReceive, setBankUserReceive] = useState<number>();
  const [point, setPoint] = useState('');
  const dispatch = useAppDispatch();
  const minPoint = 200;
  const maxPoint = 1000000;

  useEffect(() => {
    async function fetchData() {
      const bankUser = await getAllBankUser();
      if (bankUser.data) {
        const { data } = bankUser.data;
        setBankUser(data);
        setBankUserReceive(data[0].id);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="max-lg:hidden flex flex-col gap-1 w-full p-1">
      <div className="flex items-center bg-white p-1 gap-3 h-[100px]">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] border border-gray-300 h-full">
          <Image
            src={'/member/withdraw/icon_payWay.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Phương thức</p>
        </div>
        <button className="relative flex items-center justify-between h-[52px] w-[170px] bg-[#e8f2ff] p-2 text-blue-600 border border-solid border-blue-500 rounded-sm">
          <p>Ngân hàng</p>
          <Image
            src={'/member/withdraw/icon_card.svg'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <Image
            src={'/member/withdraw/icon_payWayOn.png'}
            alt=""
            width={30}
            height={30}
            className={'absolute right-0 bottom-0'}
          />
        </button>
        {/* <div>
          <Link href={'/desktop/member/crypto'} className="underline text-blue-600 text-sm">
            Tìm hiểu về Tiền mã hóa
          </Link>
        </div> */}
      </div>
      <div className="flex items-center  bg-white p-1 gap-3 h-[135px]">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] border border-gray-300 h-full">
          <Image
            src={'/member/withdraw/icon_payWay.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Chọn ngân hàng</p>
        </div>
        <div className="flex-1 flex items-center justify-between">
          {bankUser?.map((bank: any, index) => (
            <ButtonBank
              key={index}
              binBank={bank.binBank}
              lastNumber={bank.accountNumber?.slice(-4)}
            />
          ))}
          {Array.from({ length: 4 - bankUser.length }, (_, index) => index + 1).map((i, index) => (
            <ButtonAdd key={index} />
          ))}
        </div>
      </div>

      <div className="flex items-center bg-white p-1 gap-3 h-[135px]">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] h-full border border-gray-300 ">
          <Image
            src={'/member/withdraw/icon_dataInput.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Đề xuất yêu cầu</p>
        </div>
        <div className="flex-1 py-4">
          <div className=" flex justify-between mb-10">
            <div className="relative flex justify-between items-center gap-2">
              <p className="text-sm">Số điểm rút:</p>
              <input
                type="text"
                value={point}
                onChange={(e) => {
                  if (Number(e.target.value) > 0) {
                    const val = +e.target.value < maxPoint ? e.target.value : maxPoint;
                    setPoint(String(val));
                  } else {
                    setPoint('');
                  }
                }}
                placeholder={`${minPoint} ~ ${maxPoint}`}
                className=" h-8 px-4 py-2 text-sm rounded-md bg-gray-200 w-[190px]  outline-none border-none "
              />
              <div className="absolute -bottom-8 left-[82px] flex justify-between text-sm w-auto min-w-[190px] text-red-500">
                <p>
                  Thực tế:{' '}
                  <span className="font-bold">
                    {point ? (+point * 1000).toLocaleString('vi-VN') : 0}
                  </span>
                </p>
                <p className="ml-2">VNĐ</p>
              </div>
            </div>
            <div className="relative flex justify-between items-center gap-2">
              <p className="text-sm">MK bảo mật:</p>
              <input
                type="text"
                disabled
                placeholder="Không sử dụng"
                className="w-40 h-8 px-4 py-2 text-sm rounded-md bg-gray-200  outline-none border-none "
              />
            </div>
          </div>
          <div className="flex w-full justify-end">
            <button
              disabled={!bankUserReceive || Number(point) < 200}
              onClick={() => {
                if (bankUserReceive && Number(point) > 200) {
                  if (+point > pointMain) {
                    addMessagePopup('Tin nhắn', 'Số dư không đủ', 'Xác nhận', dispatch);
                  } else {
                    const data = {
                      bankReceiveId: bankUserReceive,
                      type: TypePaymentTranSaction.withdrawMoney,
                      point: point,
                      content: 'Ngân hàng điện tử',
                    };
                    handleDrawMoney(data, dispatch);
                    setPoint('');
                  }
                }
              }}
              className=" text-sm  w-[155px] py-2 rounded-sm cursor-pointer text-white bg-[#ff9600] hover:bg-[#ffba00] disabled:bg-gray-400 disabled:cursor-not-allowed">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-white p-1 gap-3 h-[250px]">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] h-full border border-gray-300 ">
          <Image
            src={'/member/withdraw/icon_dataHint.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Đề xuất yêu cầu</p>
        </div>
        <div className="flex-1 py-10 px-4 text-sm ">
          <ol className="list-decimal space-y-2">
            <li>
              Hạn mức rút tiền một <span className="text-red-500">ngày</span> là{' '}
              <span className="text-red-500">2</span> lần.Hạn mức rút tiền một{' '}
              <span className="text-red-500">ngày</span> là{' '}
              <span className="text-red-500">1000000</span> điểm.
            </li>
            <li>
              Điều kiện rút tiền số điểm cược phải <span className="text-red-500">bằng</span> với số
              điểm nạp.
            </li>
            <li>{`Muốn hủy lệnh rút tiền, hãy đến mục Hội viên-> Lịch sử giao dịch-> Hủy yêu cầu.`}</li>
          </ol>
        </div>
      </div>

      {titleMessage && descMessage && (
        <ShowConfirmMessage
          textClose={textClose}
          textConfirm={textConfirm}
          title={titleMessage}
          desc={descMessage}
          onConfirm={() => {
            handleConfirmMessage(dispatch);
          }}
        />
      )}
    </div>
  );
};

export default WithDrawView;
