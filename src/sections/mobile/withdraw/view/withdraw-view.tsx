'use client';

import MobileLayout from '@/layouts/mobile';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { addBankUser, getAllBankUser } from '../../utils/api';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { TypePaymentTranSaction, dataBankStatics } from '@/constant';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ClickNumberBox } from '@/components/mobile/clickNumber';
import { addMessagePopup, handleConfirmMessage, handleDrawMoney } from '../../utils/handleMember';
import { ShowConfirmMessage } from '@/app/compmnents/ShowMessage';

export default function WithdrawView() {
  const { titleMessage, descMessage, textClose, textConfirm } = useAppSelector(
    (state) => state.settingApp
  );

  const minPoint = 200;
  const maxPoint = 1000000;
  const [pointWithDraw, setPointWithDraw] = useState('');
  const { dataGamePoints } = useAppSelector((state) => state.user);
  const pointMain = dataGamePoints.find((game) => game.gameSlug == 'tk-chinh')?.points || 0;
  const [bankUser, setBankUser] = useState([]);
  const [bankUserReceive, setBankUserReceive] = useState<number>();
  const dataBankUserReceive: any = bankUser.find((bank: any) => bank.id == bankUserReceive);
  const [refetchBank, setRefetchBank] = useState(true);
  const [showBankUser, setShowBankUser] = useState(false);
  const dispatch = useAppDispatch();

  // add Bank
  const [showAddBank, setShowAddBank] = useState(false);
  const [accountOwner, setAccountOwner] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [openListBank, setOpenListBank] = useState(false);
  const [binBank, setBinBank] = useState('');
  const [searchBank, setSearchBank] = useState('');
  const [openEnterPoint, setOpenEnterPoint] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (refetchBank) {
        const bankUser = await getAllBankUser();
        if (bankUser.data) {
          const { data } = bankUser.data;
          setBankUser(data);
          setBankUserReceive(data[0].id);
          setRefetchBank(false);
        }
      }
    }

    fetchData();
  }, [refetchBank]);

  const onAddSuccessBank = () => {
    console.log('aaaa');
    setShowAddBank(false);
    setRefetchBank(true);
  };

  return (
    <MobileLayout title="Khu rút tiền" useHandleBack={showAddBank} handleBack={onAddSuccessBank}>
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

              <div>
                <span
                  className={classNames(
                    'block relative outline-none mb-4 border-b-2 border-[#f0f0f0] w-full py-2 text-base',
                    { 'text-[#999]': !accountNumber }
                  )}>
                  {accountNumber || 'Số tài khoản'}
                  {accountNumber ? (
                    <FontAwesomeIcon
                      onClick={() => setAccountNumber('')}
                      className="absolute cursor-pointer top-[50%] bottom-0 right-0 translate-x-[-50%] translate-y-[-50%] text-2xl"
                      color="#c6c6ca"
                      icon={faCircleXmark}
                    />
                  ) : (
                    <></>
                  )}
                </span>
                <div className="w-full py-2">
                  <ClickNumberBox value={accountNumber} onChangeValue={setAccountNumber} />
                </div>
              </div>

              <div
                className="relative py-2 border-b-2 border-[#f0f0f0]"
                onClick={() => {
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
        <div className="flex-1 overflow-auto bg-[#f0eff4] flex flex-col items-center w-full divide-y">
          <p className="text-[#648fb2] bg-white w-full font-bold text-lg flex items-center justify-center py-2">
            Ngân hàng
          </p>
          <div
            className="flex justify-between items-center px-4 py-1 w-full bg-white"
            onClick={() => setShowBankUser((pre) => !pre)}>
            <Image
              alt="logo-bank"
              src={
                dataBankStatics.find((bank) => bank.bin == dataBankUserReceive?.binBank)?.logo || ''
              }
              width={122}
              height={38}
              className="border-[1px] border-[#ddd]"
            />
            <div className="flex">
              <span className="text-base">Số cuối: </span>
              <span className="ml-2 text-[#2782d7]">
                {dataBankUserReceive?.accountNumber?.slice(-4)}
              </span>
              <span className="ml-2 bg-[url(/mobile/icons/icon_arrow.svg)] bg-[center] bg-contain w-4"></span>
            </div>
          </div>
          {showBankUser ? (
            <div className="w-full pb-4 bg-[#eee] pt-4 flex flex-col">
              {bankUser?.length &&
                bankUser?.map((bank: any, index) => {
                  const imageBank = dataBankStatics.find((i) => i.bin == bank.binBank)?.logo;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setShowBankUser(false);
                        setBankUserReceive(bank?.id);
                      }}
                      className="flex bg-white justify-between items-center px-3 py-1 mx-3 mb-3">
                      <Image
                        alt="bank"
                        src={imageBank || ''}
                        width={122}
                        height={38}
                        className="border-[1px] border-[#ddd]"
                      />

                      <div className="flex">
                        <span className="text-base">Số cuối: </span>
                        <span className="ml-2 text-[#2782d7]">
                          {bank?.accountNumber?.slice(-4)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              {Array.from({ length: 4 - bankUser.length }, (_, index) => index + 1).map(
                (i, index) => (
                  // <div className="bg-[#eee] mx-3 mb-3 w-full h-auto">
                  <button
                    key={index}
                    onClick={() => {
                      setShowBankUser(false);
                      setShowAddBank(true);
                    }}
                    className="px-3 py-3 mx-3 flex items-center justify-center border-gray-300 bg-[#fff]">
                    <Image src={'/member/withdraw/icon_add.png'} alt="" width={20} height={20} />
                    <p className="text-sm ml-3">Thêm tài khoản</p>
                  </button>
                  // </div>
                )
              )}
            </div>
          ) : (
            <></>
          )}
          <div className="flex items-center text-lg bg-white w-full px-4 relative">
            <p className="text-black w-[120px]">Số điểm rút</p>
            <span
              onClick={() => setOpenEnterPoint((pre) => !pre)}
              className={classNames(
                'border-none outline-none py-2 focus:border-none focus:ring-0 text-lg ',
                { 'text-[#999]': !pointWithDraw },
                { 'text-black': pointWithDraw },
                { 'font-semibold': pointWithDraw }
              )}>
              {pointWithDraw || `${minPoint} ~ ${maxPoint}`}

              {pointWithDraw ? (
                <FontAwesomeIcon
                  onClick={() => setPointWithDraw('')}
                  className="absolute cursor-pointer top-[50%] bottom-0 right-0 translate-x-[-50%] translate-y-[-50%] text-2xl"
                  color="#c6c6ca"
                  icon={faCircleXmark}
                />
              ) : (
                <></>
              )}
            </span>
          </div>
          <div className="flex items-center text-lg bg-white w-full px-4 py-2 text-red-500">
            <p className="text-red-500 w-[120px]">Thực tế</p>
            <div className="flex-1 flex items-center justify-between text-lg px-2">
              <p className="font-semibold">
                {pointWithDraw ? (+pointWithDraw * 1000).toLocaleString('vi-VN') : 0}
              </p>
              <p>VND</p>
            </div>
          </div>
          {openEnterPoint ? (
            <div className="w-full py-2 px-3 bg-[#f0eff5]">
              <ClickNumberBox value={pointWithDraw} onChangeValue={setPointWithDraw} />
            </div>
          ) : (
            <></>
          )}
          <div className="flex items-center text-lg bg-white w-full  px-4 py-2 text-red-500">
            <p className="w-[120px]">MK bảo mật</p>
            <p className="px-2">Không sử dụng</p>
          </div>
          <button
            onClick={() => {
              if (bankUserReceive && Number(pointWithDraw) > 200) {
                if (+pointWithDraw > pointMain) {
                  addMessagePopup('Tin nhắn', 'Số dư không đủ', 'Xác nhận', dispatch);
                } else {
                  const data = {
                    bankReceiveId: bankUserReceive,
                    type: TypePaymentTranSaction.withdrawMoney,
                    point: pointWithDraw,
                    content: 'Ngân hàng điện tử',
                  };
                  handleDrawMoney(data, dispatch);
                  setPointWithDraw('');
                }
              }
            }}
            disabled={!bankUserReceive || +pointWithDraw < minPoint || +pointWithDraw > maxPoint}
            className="w-[90%] text-center bg-[#45b5d9] disabled:bg-gray-400 p-1 h-10 m-4 text-white rounded-sm text-lg">
            Xác nhận
          </button>
          <div className="w-full flex items-center justify-center gap-2 bg-white text-black p-3">
            <Image src={'/member/withdraw/icon_maintain.svg'} alt="" width={20} height={20} />
            <p>Chú ý</p>
          </div>
          <ol className="list-decimal w-full bg-white text-black text-base pl-8 py-2">
            <li>
              Hạn mức rút tiền một <span className="text-red-500">ngày</span> là{' '}
              <span className="text-red-500">2</span> lần. Hạn mức rút tiền một{' '}
              <span className="text-red-500">ngày</span> là{' '}
              <span className="text-red-500">1000000</span> điểm.
            </li>
            <li>
              Điều kiện rút tiền số điểm cược phải <span className="text-red-500">bằng</span> với số
              điểm nạp.
            </li>
            <li>{`Muốn hủy lệnh rút tiền, hãy đến mục Lịch sử giao dịch-> Hủy yêu cầu.`}</li>
          </ol>

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
      )}
    </MobileLayout>
  );
}
