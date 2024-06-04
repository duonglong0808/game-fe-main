'use client';

import { ClickNumberBox } from '@/components/mobile/clickNumber';
import MobileLayout from '@/layouts/mobile/layout';
import { isValidPhoneNumber } from '@/utils';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { handleConfirmMessage, handleCreateAccount } from '../ultil/handleRegister';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { ShowConfirmMessage } from '@/app/compmnents/ShowMessage';

export function RegisterView(): JSX.Element {
  const [agentID, setAgentID] = useState('');
  const [account, setAccount] = useState('');
  const [accountError, setAccountError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { titleMessage, descMessage, textClose, textConfirm } = useAppSelector(
    (state) => state.settingApp
  );
  return (
    <MobileLayout showFooter={false} title="Đăng ký hội viên">
      {titleMessage && descMessage && (
        <ShowConfirmMessage
          textClose={textClose}
          textConfirm={textConfirm}
          title={titleMessage}
          desc={descMessage}
          onConfirm={() => handleConfirmMessage(dispatch)}
        />
      )}
      <main className="bg-white h-full pt-6 px-7">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="border-b-2 border-[#ddd] relative">
            <span className="block text-black mb-1">Tài khoản đại lý</span>
            <input
              type="text"
              value={agentID}
              onChange={(e) => setAgentID(e.target.value)}
              className="border-none outline-none p-0  w-full py-1"
              placeholder="Bỏ qua nếu không có đại lý giới thiệu"
            />
          </div>
          <div
            className={classNames('relative pt-5', {
              'border-[#f00] border-b-[1px]': accountError,
              'border-[#ddd] border-b-2': !accountError,
            })}>
            <span className="block text-black mb-1">Tài khoản</span>
            <input
              type="text"
              className="border-none outline-none p-0 w-full py-1 focus:outline-none focus:shadow-none"
              id="account"
              value={account}
              onBlur={() => {
                if (account.length < 4 || account.length > 10)
                  setAccountError('Tài khoản là tổ hợp 4 ~ 10 ký tự chữ và số');
                else setAccountError('');
              }}
              onChange={(e) => {
                setAccount(e.target.value.toUpperCase());
                setAccountError('');
              }}
              minLength={4}
              maxLength={10}
              placeholder="4 ~ 10 ký tự"
            />
            <span className="block absolute top-full mt-1 text-[#f00] text-sm">{accountError}</span>
          </div>

          <div
            className={classNames('relative pt-5', {
              'border-[#f00] border-b-[1px]': passwordError,
              'border-[#ddd] border-b-2': !passwordError,
            })}>
            <span className="block text-black mb-1">Mật khẩu</span>
            <input
              className="border-none outline-none p-0 w-full py-1 focus:outline-none focus:shadow-none"
              type="password"
              id="password"
              value={password}
              onBlur={() => {
                if (password.length < 6 || password.length > 10)
                  setPasswordError('6 ~ 10 ký tự chữ và số');
                else setPasswordError('');
              }}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              minLength={6}
              maxLength={10}
              placeholder="6 ~ 10 ký tự chữ và số"
            />
            <span className="block absolute top-full mt-1 text-[#f00] text-sm">
              {passwordError}
            </span>
          </div>
          <div
            className={classNames('relative pt-5', {
              'border-[#f00] border-b-[1px]': nameError,
              'border-[#ddd] border-b-2': !nameError,
            })}>
            <span className="block text-black mb-1">Biệt danh</span>
            <input
              className="border-none outline-none p-0 w-full py-1 focus:outline-none focus:shadow-none"
              type="text"
              id="nickname"
              value={name}
              onBlur={() => {
                if (name.length > 8) setNameError('Vui lòng nhập tối đa 10 ký tự');
                else setNameError('');
              }}
              onChange={(e) => {
                setName(e.target.value);
                setNameError('');
              }}
              maxLength={8}
              placeholder="Nhập tối đa 8 ký tự"
            />
            <span className="block absolute top-full mt-1 text-[#f00] text-sm">{nameError}</span>
          </div>
          <div className="pt-6 ">
            <div
              className={classNames('mb-6 relative ', {
                'border-[#f00] border-b-[1px]': nameError,
                'border-[#ddd] border-b-2': !nameError,
              })}>
              <span className="block text-black mb-1">Số điện thoại</span>
              <input
                className="border-none outline-none p-0 w-full py-1 focus:outline-none focus:shadow-none"
                type="text"
                id="nickname"
                value={phoneNumber}
                maxLength={8}
                readOnly
                placeholder="Nhập tối đa 8 ký tự"
              />

              <span className="block absolute top-full mt-1 text-[#f00] text-sm">
                {!isValidPhoneNumber(phoneNumber) ? 'Sai quy cách SĐT Việt Nam' : ''}
              </span>
            </div>
            <ClickNumberBox value={phoneNumber} onChangeValue={setPhoneNumber} />
          </div>

          <div className="flex justify-between mt-4 items-start">
            <div
              className="rounded-full w-5 h-5 border-[1px] border-[#aaa] bg-[length:auto_60%] bg-center bg-no-repeat "
              onClick={(e) => {
                const element = e.target as HTMLElement; // Ép kiểu e.target thành HTMLElement
                element.style.backgroundImage = element.style.backgroundImage
                  ? ''
                  : "url('/mobileIcon/btn_confirm.svg')";
                element.style.backgroundColor = element.style.backgroundColor ? '' : '#1589ff';
              }}></div>
            <span className="block ml-2 flex-1">
              Nhận thông tin khuyến mại qua tin nhắn điện thoại
            </span>
          </div>

          <div className="flex mt-4 items-start">
            <div
              className="rounded-full w-5 h-5 border-[1px] border-[#aaa] bg-[length:auto_60%] bg-center bg-no-repeat "
              onClick={(e) => {
                const element = e.target as HTMLElement; // Ép kiểu e.target thành HTMLElement
                element.style.backgroundImage = element.style.backgroundImage
                  ? ''
                  : "url('/mobileIcon/btn_confirm.svg')";
                element.style.backgroundColor = element.style.backgroundColor ? '' : '#1589ff';
              }}></div>
            <span className="block ml-2 flex-1">
              Tôi đã 18 tuổi, đồng thời đã đọc và đồng ý quy tắc cá cược
              <span className="underline text-[#2782d7]">Điều khoản</span>
            </span>
          </div>

          <button
            type="submit"
            disabled={
              !(account.length >= 4 && account.length <= 10) ||
              !name ||
              !(password.length >= 6 && password.length <= 10) ||
              !isValidPhoneNumber(phoneNumber)
            }
            onClick={(e) => {
              //e.preventDefault();
              handleCreateAccount(
                { username: account, name, phone: phoneNumber, password },
                router,
                dispatch
              );
            }}
            className={classNames(
              'bg-[#45b5d9] rounded-xl mt-3 text-white w-full py-4',
              'disabled:bg-stone-400 disabled:cursor-not-allowed'
            )}>
            Xác Nhận
          </button>
        </form>
      </main>
    </MobileLayout>
  );
}
