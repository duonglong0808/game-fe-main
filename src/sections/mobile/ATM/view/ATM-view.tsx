'use client';

import MobileLayout from '@/layouts/mobile/layout';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { paths } from '@/routes/paths';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { addBankUser, getAllBankPayment, getAllBankUser, getPaymentByType } from '../../utils/api';
import { TypePaymentTranSaction, dataBankStatics } from '@/constant';
import { ButtonAdd } from '@/components/member/Button';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ClickNumberBox } from '@/components/mobile/clickNumber';
import { handleConfirmMessage, handleDepositPoint } from '../../utils/handleMember';
import { ShowConfirmMessage } from '@/app/compmnents/ShowMessage';

// const mapSlugToPathMobile = [
//   {
//     slug: 'thanh-toan-truc-tuyen',
//     href: paths.mobile.purchase.online,
//   },
//   {
//     slug: 'qrcode',
//     href: paths.mobile.purchase.vnpay,
//   },
//   {
//     slug: 'chuyen-tai-atm',
//     href: paths.mobile.purchase.atm,
//   },
//   {
//     slug: 'ngan-hang-ien-tu',
//     href: paths.mobile.purchase.atm,
//   },
//   {
//     slug: 'vi-ien-tu',
//     href: paths.mobile.purchase.vnpay,
//   },

//   {
//     name: 'tien-ma-hoa',
//     href: paths.mobile.purchase.crypto,
//   },

//   // {
//   //   name: 'Sắp ra mắt',
//   //   icon: '/member/purchase/icon_online.png',
//   //   disable: true,
//   // },
// ];

export default function ATMView() {
  // const pathName = usePathname();
  // const slug = mapSlugToPathMobile.find((i) => i.href == pathName)?.slug;

  const { titleMessage, descMessage, textClose, textConfirm } = useAppSelector(
    (state) => state.settingApp
  );

  const router = useRouter();
  const { paymentTypes, paymentTypeId } = useAppSelector((state) => state.payment);
  const paymentTypeById = paymentTypes.find((i) => i.id == Number(paymentTypeId));
  const [payments, setPayments] = useState([]);
  const [bankReceiver, setBankReceiver] = useState('');
  const [paymentBank, setPaymentBank] = useState<any[]>([]);
  const bankSelected = paymentBank.find((bank: any) => bank.id == bankReceiver);
  const [paymentId, setPaymentId] = useState();
  const paymentSelect: any = payments.find((i: any) => i.id === paymentId);
  const [point, setPoint] = useState('');
  const [submitDeposit, setSubmitDeposit] = useState(false);
  const dispatch = useAppDispatch();

  const [bankUser, setBankUser] = useState<any[]>([]);
  const [bankUserTransfer, setBankUserTransfer] = useState<number>();
  const dataBankUserTransfer = bankUser.find((bank: any) => bank.id == bankUserTransfer);

  const [showBankUser, setShowBankUser] = useState(false);
  const [refetchBank, setRefetchBank] = useState(true);

  // add Bank
  const [showAddBank, setShowAddBank] = useState(false);
  const [accountOwner, setAccountOwner] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [openListBank, setOpenListBank] = useState(false);
  const [binBank, setBinBank] = useState('');
  const [searchBank, setSearchBank] = useState('');
  const [openEnterPoint, setOpenEnterPoint] = useState(false);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBankReceiver(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      if (paymentId) {
        const res = await getAllBankPayment(paymentId);
        if (res.data) {
          const { data } = res;
          setPaymentBank(data);
        }
      }
    }

    fetchData();
  }, [paymentId]);

  useEffect(() => {
    async function fetchData() {
      if (paymentTypeById) {
        const res = await getPaymentByType(paymentTypeById.id);
        if (res.data) {
          const { data } = res.data;
          setPayments(data);
          setPaymentId(data[0].id);
        }
      }
    }

    fetchData();
  }, [paymentTypeById]);

  useEffect(() => {
    async function fetchData() {
      if (paymentTypeById && refetchBank) {
        const bankUser = await getAllBankUser();
        if (bankUser.data) {
          const { data } = bankUser.data;
          setBankUser(data);
          setBankUserTransfer(data[0].id);
          setRefetchBank(false);
        }
      }
    }

    fetchData();
  }, [refetchBank]);

  const onAddSuccessBank = () => {
    setShowAddBank(false);
    setRefetchBank(true);
  };

  return (
    <MobileLayout title="Chuyển tại ATM" useHandleBack={showAddBank} handleBack={onAddSuccessBank}>
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
        <div className="flex-1 overflow-auto bg-[#f0eff5] flex flex-col items-center w-full divide-y mt-4">
          <div className="text-[#2782d7] bg-white w-full text-[15px] py-2 px-4">
            {payments.map((payment: any, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border border-[#95b5d3] w-fit max-w-[172px] rounded-sm">
                <img
                  src={payment?.methodImage}
                  alt=""
                  width={35}
                  height={35}
                  className="object-contain"
                />
                <p>{payment?.methodName}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2 items-center bg-white w-full px-4">
            <p className="min-w-[120px] text-black">Ngân hàng: </p>
            <div className="relative">
              <select
                value={bankReceiver}
                onChange={handleOptionChange}
                className="block appearance-none bg-white border outline-none focus:ring-0 border-none rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none sm:text-sm">
                <option value="">Chọn ngân hàng muốn nạp</option>
                {paymentBank.map((bank: any, index) => {
                  const nameBankShort = dataBankStatics.find(
                    (item) => (item.bin = bank.binBank)
                  )?.shortName;

                  return (
                    <option key={index} value={bank.id}>
                      {nameBankShort || bank.nameBank}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className=" items-center bg-white w-full px-4">
            <span className="block my-2">
              Tên tài khoản:
              <span className="text-[#2782d7] ml-2">
                {bankSelected ? bankSelected?.accountOwner?.toUpperCase() : ''}
              </span>
            </span>
            <span className="block my-2">
              Số tài khoản:
              <span className="text-[#2782d7] ml-2">
                {bankSelected ? bankSelected?.accountNumber : ''}
              </span>
            </span>
            {paymentSelect?.nameWarning && (
              <p className="text-red-500">* {paymentSelect?.nameWarning}</p>
            )}
          </div>

          <div className="bg-white w-full ">
            <div
              className="flex justify-between items-center px-4 py-1"
              onClick={() => setShowBankUser((pre) => !pre)}>
              <Image
                alt="logo-bank"
                src={
                  dataBankStatics.find((bank) => bank.bin == dataBankUserTransfer?.binBank)?.logo ||
                  ''
                }
                width={122}
                height={38}
                className="border-[1px] border-[#ddd]"
              />
              <div className="flex">
                <span className="text-base">Số cuối: </span>
                <span className="ml-2 text-[#2782d7]">
                  {dataBankUserTransfer?.accountNumber?.slice(-4)}
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
                          setBankUserTransfer(bank?.id);
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
          </div>

          <div className="flex items-center text-lg bg-white w-full px-4 relative">
            <p className="text-black w-[120px]">Số điểm nạp</p>
            <span
              onClick={() => setOpenEnterPoint((pre) => !pre)}
              className={classNames(
                'border-none outline-none py-2 focus:border-none focus:ring-0 text-lg ',
                { 'text-[#999]': !point },
                { 'text-black': point },
                { 'font-semibold': point }
              )}>
              {point || `${paymentTypeById?.minimum} ~ ${paymentTypeById?.maximum}`}

              {point ? (
                <FontAwesomeIcon
                  onClick={() => setPoint('')}
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
              <p className="font-semibold">{point ? (+point * 100).toLocaleString('vi-VN') : 0}</p>
              <p>VND</p>
            </div>
          </div>

          {openEnterPoint ? (
            <div className="w-full py-2 px-3 bg-[#f0eff5]">
              <ClickNumberBox value={point} onChangeValue={setPoint} />
            </div>
          ) : (
            <></>
          )}

          <button
            onClick={() => {
              if (
                paymentId &&
                bankUserTransfer &&
                bankReceiver &&
                +point > Number(paymentTypeById?.minimum) &&
                +point < Number(paymentTypeById?.maximum)
              ) {
                setSubmitDeposit(true);
              }
            }}
            disabled={
              !bankReceiver ||
              !bankUserTransfer ||
              +point < Number(paymentTypeById?.minimum) ||
              +point > Number(paymentTypeById?.maximum)
            }
            className="w-[90%] text-center bg-[#45b5d9] p-2 m-3 text-white rounded-sm text-lg disabled:bg-[#aaa]">
            Xác nhận
          </button>
          <div className="w-full flex items-center justify-center gap-2 bg-white text-black p-3">
            <Image src={'/member/withdraw/icon_maintain.svg'} alt="" width={20} height={20} />
            <p>Chú ý</p>
          </div>
          <ol className="list-decimal w-full bg-white text-black text-base pl-8 py-2">
            <li>Chỉ chấp nhận tài khoản chuyển tiền trùng với họ tên đăng ký.</li>
            <li>Để tăng tốc độ cộng điểm, vui lòng đến mục lịch sử giao dịch tải biên lai lên.</li>
          </ol>

          {/* Submit deposit */}
          {submitDeposit ? (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#00000066] flex justify-center items-center">
              <div className="bg-[#fff] rounded-md w-[80%]">
                <div className="font-bold text-black px-4 py-2 text-center">Nạp tiền nhanh</div>
                <div className="mb-4 text-black">
                  <div className="px-4">
                    <div>
                      Xin quý khách vui lòng xác nhận lại số điểm.
                      <br></br>
                      Sau khi hệ thống xét duyệt xong sẽ tự động nạp điểm vào tài khoản của quý
                      khách.
                    </div>
                    <div className="mt-3">
                      Nạp điểm: <span className="text-[#ad0000] text-lg">{point || 1000}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="flex border-t-[1px]"
                  style={{
                    borderColor: '#eee',
                  }}>
                  <button
                    onClick={() => setSubmitDeposit(false)}
                    className="hover:bg-[#e5e5e5] px-2 py-3 text-[#a1a1a1] font-bold "
                    style={{
                      borderRight: '1px solid #eee',
                      width: '50%',
                    }}>
                    Hủy
                  </button>
                  <button
                    onClick={() => {
                      const data = {
                        paymentId,
                        bankTransferId: bankUserTransfer,
                        bankReceiveId: bankReceiver,
                        type: TypePaymentTranSaction.deposit,
                        point: point,
                        content: paymentTypeById?.name.toLocaleLowerCase().includes('atm')
                          ? 'Ck ATM qua tk'
                          : 'Ck e-banking qua số thẻ',
                      };
                      setSubmitDeposit(false);
                      return handleDepositPoint(data, dispatch);
                    }}
                    className="hover:bg-[#e5e5e5] px-2 text-[#008bec] font-bold"
                    style={{
                      width: '50%',
                    }}>
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {titleMessage && descMessage && (
            <ShowConfirmMessage
              textClose={textClose}
              textConfirm={textConfirm}
              title={titleMessage}
              desc={descMessage}
              onConfirm={() => {
                handleConfirmMessage(dispatch);
                router.push('/mobile/transaction');
              }}
            />
          )}
        </div>
      )}
    </MobileLayout>
  );
}
