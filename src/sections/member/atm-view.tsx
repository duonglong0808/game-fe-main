'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ButtonAdd, ButtonBank, ButtonMethod } from '@/components/member/Button';
import HeaderPurchase from '@/components/member/Header/header-purchase';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { getAllBankPayment, getAllBankUser, getPaymentByType } from './view/utils/api';
import { copyTextToClipboard } from '@/utils';
import { handleConfirmMessage, handleDepositPoint } from './view/utils/handleMember';
import { TypePaymentTranSaction, dataBankStatics } from '@/constant';
import { ShowConfirmMessage } from '@/app/compmnents/ShowMessage';
import { useRouter } from 'next/navigation';
import { AddBankPopup } from './add-bank-view';
const AtmPage = ({
  handleItemClick,
  paymentTypeId,
}: {
  handleItemClick: (id?: number) => void;
  paymentTypeId: number;
}) => {
  const { titleMessage, descMessage, textClose, textConfirm } = useAppSelector(
    (state) => state.settingApp
  );

  const router = useRouter();
  const [bankReceiver, setBankReceiver] = useState('');
  const { paymentTypes } = useAppSelector((state) => state.payment);
  const paymentTypeById = paymentTypes.find((i) => i.id === paymentTypeId);
  const [payments, setPayments] = useState([]);
  const [paymentBank, setPaymentBank] = useState<any[]>([]);
  const [paymentId, setPaymentId] = useState();
  const paymentSelect: any = payments.find((i: any) => i.id === paymentId);
  const [point, setPoint] = useState('');
  const [submitDeposit, setSubmitDeposit] = useState(false);
  const dispatch = useAppDispatch();

  const [bankUser, setBankUser] = useState([]);
  const [bankUserTransfer, setBankUserTransfer] = useState<number>();
  const bankSelected = paymentBank.find((bank: any) => bank.id == bankReceiver);

  const [openAddBank, setOpenAddBank] = useState(false);
  const [refetchBank, setRefetchBank] = useState(true);

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

  const onClosePopupAddBank = () => {
    setOpenAddBank(false);
  };

  const onAddSuccessBank = () => {
    setOpenAddBank(false);
    setRefetchBank(true);
  };

  return (
    <div className="max-lg:hidden relative flex flex-col gap-1 w-full p-1">
      {openAddBank ? (
        <AddBankPopup
          onAddSuccessBank={onAddSuccessBank}
          onClosePopupAddBank={onClosePopupAddBank}
        />
      ) : (
        <></>
      )}
      <div className="flex items-center bg-white p-1 gap-3 h-[145px]">
        <div className=" flex flex-col items-center justify-center w-[68px] h-full p-2 bg-[#f3f3f3] border border-gray-300">
          <Image
            src={'/member/withdraw/icon_payWay.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Phương thức</p>
        </div>
        <div className="flex-1 flex flex-col justify-evenly gap-2 h-full">
          <HeaderPurchase
            title={paymentTypeById?.name || ''}
            icon={paymentTypeById?.image}
            handleBack={handleItemClick}
          />
          <div className="border-b border-gray-300" />
          {payments.map((pay: any, index) => (
            <ButtonMethod key={index} name={pay.methodName} icon={pay.methodImage} select />
          ))}
        </div>
      </div>
      <div className="flex items-center  bg-white p-1 gap-3 h-[160px]">
        <div className="flex flex-col items-center justify-center max-w-[68px] h-full p-2 bg-[#f3f3f3] border border-gray-300">
          <Image
            src={'/member/withdraw/icon_payWay.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Chọn ngân hàng</p>
        </div>
        <div className="flex-1 text-sm space-y-2 py-2">
          <div className="flex gap-2 items-center">
            <p className="min-w-[120px] text-black">Ngân hàng: </p>
            <div className="relative">
              <select
                value={bankReceiver}
                onChange={handleOptionChange}
                className="block appearance-none bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
          <div className="flex">
            <p className="min-w-[120px] text-black">Tên tài khoản:</p>
            <span className="text-[#006cff]">{bankSelected ? bankSelected?.accountOwner : ''}</span>
          </div>
          <div className="flex">
            <p className="min-w-[120px] text-black">Số tài khoản:</p>
            <span className="text-[#006cff]">
              {bankSelected ? bankSelected?.accountNumber : ''}
            </span>
            {bankSelected && (
              <span
                onClick={() => copyTextToClipboard(bankSelected.accountNumber)}
                className="ml-3 cursor-pointer w-[47px] text-center bg-[#2d82f5] text-white rounded-[3px]">
                Copy
              </span>
            )}
          </div>
          {paymentSelect?.nameWarning && (
            <p className="text-red-500">* {paymentSelect?.nameWarning}</p>
          )}
        </div>
      </div>

      <div className="flex items-center bg-white p-1 gap-3 h-[195px]">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] h-full border border-gray-300 ">
          <Image src={'/member/withdraw/icon_dataInput.png'} alt="" width={30} height={30} />
          <p className="text-center text-sm text-[#888888]">Đề xuất yêu cầu</p>
        </div>
        <div className="flex-1 flex flex-col py-2 gap-4 ">
          <div className="flex w-full items-center justify-between">
            {bankUser?.length &&
              bankUser?.map((bank: any, index) => (
                <ButtonBank
                  active={bank.id == bankUserTransfer}
                  onClick={() => setBankUserTransfer(bank.id)}
                  key={index}
                  binBank={bank.binBank}
                  lastNumber={bank.accountNumber?.slice(-4)}
                />
              ))}
            {Array.from({ length: 4 - bankUser.length }, (_, index) => index + 1).map(
              (i, index) => (
                <ButtonAdd key={index} onCLick={() => setOpenAddBank(true)} />
              )
            )}
          </div>
          <div className=" flex justify-between items-center gap-2">
            <div className="relative flex justify-between items-center gap-2">
              <p className="text-sm">Số điểm nạp:</p>
              <input
                type="number"
                value={point}
                onChange={(e) => {
                  if (Number(e.target.value) > 0) {
                    const val =
                      +e.target.value < Number(paymentTypeById?.maximum)
                        ? e.target.value
                        : Number(paymentTypeById?.maximum);
                    setPoint(String(val));
                  } else {
                    console.log('aaaaaaa');
                    setPoint('');
                  }
                }}
                placeholder={`${paymentTypeById?.minimum} ~ ${paymentTypeById?.maximum}`}
                className="w-40 h-8 px-4 py-2 text-sm rounded-md bg-gray-200  outline-none border-none "
              />
              <div className="absolute -bottom-8 left-[82px] flex justify-between text-sm w-auto text-red-500">
                <p>
                  Thực tế:{' '}
                  <span className="font-bold">
                    {point ? (+point * 1000).toLocaleString('vi-VN') : 0}
                  </span>
                </p>
                <p className="ml-2">VNĐ</p>
              </div>
            </div>
            <button
              disabled={!paymentId || !bankUserTransfer || !bankReceiver || !point}
              onClick={() => {
                if (paymentId && bankUserTransfer && bankReceiver && point) {
                  setSubmitDeposit(true);
                }
              }}
              className=" text-sm  w-[155px] py-2 rounded-sm cursor-pointer text-white bg-[#ff9600] hover:bg-[#ffba00] disabled:bg-gray-400 disabled:cursor-not-allowed">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-white p-1 gap-3 h-[120px]">
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
            <li>Nạp tiền khác họ tên đăng ký sẽ bị hoàn trả.</li>
            <li>
              Chuyển khoản khác hệ thống vui lòng chọn{' '}
              <span className="text-red-500">chuyển khoản nhanh</span>.
            </li>
            <li>Để tăng tốc độ cộng điểm, vui lòng đến mục lịch sử giao dịch tải biên lai lên.</li>
          </ol>
        </div>
      </div>

      {submitDeposit ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#00000066] flex justify-center items-center">
          <div className="bg-[#fff] rounded-md w-[25%]">
            <div className="font-bold text-black px-4 py-2 text-center">Nạp tiền nhanh</div>
            <div className="mb-4 text-black">
              <div className="px-4">
                <div>
                  Xin quý khách vui lòng xác nhận lại số điểm.
                  <br></br>
                  Sau khi hệ thống xét duyệt xong sẽ tự động nạp điểm vào tài khoản của quý khách.
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
            router.push('/desktop/member/transaction');
          }}
        />
      )}
    </div>
  );
};

export default AtmPage;
