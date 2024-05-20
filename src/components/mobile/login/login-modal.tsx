'use client';
import { useState } from 'react';
import { Button, Checkbox, Label, Modal, TextInput, Flowbite } from 'flowbite-react';
import { configModal } from './style';
import Image from 'next/image';
import Link from 'next/link';
import { paths } from '@/routes/paths';
import { handleLoginAccount } from './handleLogin';
import { useAppDispatch } from '@/lib/redux/utilRedux';
type Props = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginModal({ openModal, setOpenModal }: Props) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPW, setShowPW] = useState(false);
  const onCloseModal = () => {
    setOpenModal(false);
  };
  const dispatch = useAppDispatch();
  return (
    <Flowbite theme={{ theme: configModal }}>
      <Modal show={openModal} size="sm" onClose={onCloseModal} popup position={'center'}>
        <Modal.Header className="">Đăng nhập hội viên</Modal.Header>
        <Modal.Body className="p-2 pb-0">
          <div className="flex flex-col gap-2 py-3">
            <div className="flex items-center gap-2  border-b border-gray-300">
              <Image src="/mobile/icons/loginID.svg" alt="loginID" width={30} height={30} />
              <input
                value={account}
                onChange={(e) => setAccount(e.target.value.toUpperCase())}
                type="text"
                placeholder="Tài khoản/SĐT"
                className="flex-1 text-gray-600 border-none outline-none font-semibold text-lg ring-0 focus:outline-none placeholder:font-medium"
              />
            </div>
            <div className="flex items-center gap-2 border-b border-gray-300">
              <Image src="/mobile/icons/loginPW.svg" alt="password" width={30} height={30} />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 text-gray-600 border-none outline-none  text-lg ring-0"
                type={showPW ? 'text' : 'password'}
                placeholder="Mật khẩu"
              />
              {!showPW ? (
                <Image
                  src="/mobile/icons/pwOFF.svg"
                  alt="password"
                  width={30}
                  height={30}
                  onClick={() => setShowPW(!showPW)}
                />
              ) : (
                <Image
                  src="/mobile/icons/pwON.svg"
                  alt="password"
                  width={30}
                  height={30}
                  onClick={() => setShowPW(!showPW)}
                />
              )}
            </div>
            <Link
              href={''}
              // href={paths.mobile.forgotPassword}
              className="text-blue-600 flex justify-end w-full">
              Quên mật khẩu?
            </Link>
            <div className="flex w-full justify-between gap-3 text-white">
              <Link
                href={''}
                // href={paths.mobile.register}
                className="flex-1 text-center bg-[#ff7500] py-2 rounded-sm">
                Đăng ký
              </Link>
              <button
                disabled={!account || !password}
                onClick={() =>
                  handleLoginAccount(account, password, () => setOpenModal(false), dispatch)
                }
                className="flex-1 bg-blue-500 disabled:bg-[#aaa] py-2 rounded-sm">
                Đăng nhập
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Flowbite>
  );
}
