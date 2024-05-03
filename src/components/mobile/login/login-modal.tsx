'use client';
import { useState } from 'react';
import { Button, Checkbox, Label, Modal, TextInput, Flowbite } from 'flowbite-react';
import { configModal } from './style';
import Image from 'next/image';
import Link from 'next/link';
import { paths } from '@/routes/paths';
type Props = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginModal({ openModal, setOpenModal }: Props) {
  const [email, setEmail] = useState('');
  const [showPW, setShowPW] = useState(false);
  const onCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Flowbite theme={{ theme: configModal }}>
      <Modal show={openModal} size="sm" onClose={onCloseModal} popup position={'center'}>
        <Modal.Header>Đăng nhập hội viên</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4 py-3">
            <div className="flex items-center gap-2  border-b border-gray-300">
              <Image src="/mobile/icons/loginID.svg" alt="loginID" width={30} height={30} />
              <input
                type="text"
                placeholder="Tài khoản/SĐT"
                className="flex-1 text-gray-600 border-none outline-none  text-lg ring-0"
              />
            </div>
            <div className="flex items-center gap-2 border-b border-gray-300">
              <Image src="/mobile/icons/loginPW.svg" alt="password" width={30} height={30} />
              <input
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
              href={paths.mobile.forgotPassword}
              className="text-blue-600 flex justify-end w-full">
              Quên mật khẩu?
            </Link>
            <div className="flex w-full justify-between gap-3 text-white">
              <Link
                href={paths.mobile.register}
                className="flex-1 text-center bg-yellow-500 py-3 rounded-sm">
                Đăng ký
              </Link>
              <button className="flex-1 bg-blue-500 py-3 rounded-sm">Đăng nhập</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Flowbite>
  );
}
