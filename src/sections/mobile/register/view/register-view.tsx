'use client';

import { ClickNumberBox } from '@/components/mobile/clickNumber';
import MobileLayout from '@/layouts/mobile/layout';
import classNames from 'classnames';
import { useState } from 'react';

export function RegisterView(): JSX.Element {
  const [agentID, setAgentID] = useState('');
  const [account, setAccount] = useState('');
  const [accountError, setAccountError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  return (
    <MobileLayout showFooter={false} title="Đăng ký hội viên">
      <main className="bg-white h-full pt-6 px-7">
        <form>
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
            className={classNames('relative pt-6', {
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
            className={classNames('relative pt-6', {
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
            className={classNames('relative pt-6', {
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
          <div className="relative pt-6 ">
            <div
              className={classNames('mb-2', {
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
                placeholder="Nhập tối đa 8 ký tự"
              />
              <span className="block absolute top-full mt-1 text-[#f00] text-sm">{nameError}</span>
            </div>
            <ClickNumberBox value={phoneNumber} onChangeValue={setPhoneNumber} />
          </div>
        </form>
      </main>
    </MobileLayout>
  );
}
