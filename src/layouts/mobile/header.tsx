'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LoginModal from '@/components/mobile/login';
import { paths } from '@/routes/paths';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

import AssetPopover from '@/components/mobile/asset';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { getUserInfo, handleConfirmMessage, useGamePointHeader } from './ultils/handleHome';
import { ShowConfirmMessage } from '@/app/compmnents/ShowMessage';
type Props = {
  title?: string;
  openModalLogin: boolean;
  setOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  handleBack?: () => void;
};

export default function Header({ title, openModalLogin, setOpenModalLogin, handleBack }: Props) {
  // const [openModal, setOpenModal] = useState(false);
  const [openAssetModal, setOpenAssetModal] = useState(false);
  const pathname = usePathname();
  const [parentPathname, setParentPathname] = useState('/');
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [isShowAsset, setIsShowAsset] = useState(false);

  useEffect(() => {
    setParentPathname(pathname.split('/').slice(0, -1).join('/'));
    setIsShowInfo(pathname === paths.mobile.me || pathname === paths.mobile.root);
    setIsShowAsset(
      pathname.includes(paths.mobile.purchase.root) ||
        pathname === paths.mobile.root ||
        pathname === paths.mobile.withdraw ||
        pathname === paths.mobile.transaction
    );
  }, [pathname]);

  const dispatch = useAppDispatch();
  const { name, userName } = useAppSelector((state) => state.user);
  const { gameMainPoint } = useGamePointHeader();
  const { titleMessage, descMessage, textClose, textConfirm } = useAppSelector(
    (state) => state.settingApp
  );

  useEffect(() => {
    async function fetchDataUser() {
      if (!name && !userName) getUserInfo(dispatch);
    }

    fetchDataUser();
  }, []);

  return (
    <header
      className={classNames(
        'w-full flex items-center py-2 px-3 justify-between',
        {
          'bg-[#124f7f] ': title,
        },
        {
          'bg-white ': !title,
        }
      )}>
      {titleMessage && descMessage && (
        <ShowConfirmMessage
          textClose={textClose}
          textConfirm={textConfirm}
          title={titleMessage}
          desc={descMessage}
          onConfirm={() => handleConfirmMessage(dispatch)}
        />
      )}
      {title ? (
        handleBack ? (
          <div onClick={handleBack}>
            <Image
              src="/button/icon_arrowW.svg"
              alt="logo"
              width={16}
              height={16}
              className="rotate-90"
            />
          </div>
        ) : (
          <Link href={parentPathname}>
            <Image
              src="/button/icon_arrowW.svg"
              alt="logo"
              width={16}
              height={16}
              className="rotate-90"
            />
          </Link>
        )
      ) : (
        <Image className="" src="/mobile/logo.png" alt="logo" width={100} height={30} />
      )}
      {title && <p className="flex-1 text-center uppercase text-white">{title}</p>}
      {!title && !userName ? (
        <div className="flex gap-2">
          <Link
            href={paths.mobile.register}
            className="cursor-pointer bg-amber-500 text-white rounded-xl flex items-center justify-between gap-2 px-2">
            <Image src={'/mobile/icons/register.svg'} alt="register" width={18} height={18} />
            Đăng ký
          </Link>
          <div
            onClick={() => setOpenModalLogin(true)}
            className="cursor-pointer bg-sky-500 text-white rounded-xl  flex items-center justify-between gap-2 px-2 ">
            <Image src={'/mobile/icons/login.svg'} alt="login" width={18} height={18} />
            Đăng nhập
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 z-50">
          {isShowAsset && (
            <AssetPopover open={openAssetModal} setOpen={setOpenAssetModal}>
              <button
                className="flex items-center gap-2"
                onClick={() => setOpenAssetModal(!openAssetModal)}>
                <p className={classNames('text-base uppercase text-gray-400', { hidden: title })}>
                  {userName.toUpperCase()}
                </p>
                <p
                  className={classNames('text-gray-600 text-xl', {
                    'text-yellow-300': pathname !== paths.mobile.root,
                  })}>
                  $ {gameMainPoint?.toLocaleString('vi-VN') || 0}
                </p>
                <Image
                  src="/mobile/icons/arrowGray.svg"
                  alt="arrow"
                  width={12}
                  height={12}
                  className={classNames('rotate', { 'rotate-180': openAssetModal })}
                />
              </button>
            </AssetPopover>
          )}

          {isShowInfo && !title && (
            <Link href={paths.mobile.infor}>
              <Image src="/mobile/icons/inforMailG.svg" alt="logo" width={20} height={20} />
            </Link>
          )}
          {isShowInfo && title && (
            <Link href={paths.mobile.infor}>
              <Image src="/mobile/icons/inforMailW.svg" alt="logo" width={20} height={20} />
            </Link>
          )}
        </div>
      )}

      <LoginModal openModal={openModalLogin} setOpenModal={setOpenModalLogin} />
    </header>
  );
}
