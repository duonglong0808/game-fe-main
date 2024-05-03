'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LoginModal from '@/components/mobile/login';
import { paths } from '@/routes/paths';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

import AssetPopover from '@/components/mobile/asset';
type Props = {
  title?: string;
};

export default function Header({ title }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [openAssetModal, setOpenAssetModal] = useState(false);
  const [user, setUser] = useState(true);
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

  return (
    <header
      className={classNames(
        'w-full flex items-center py-2 px-3 justify-between',
        {
          'bg-blue-500 ': title,
        },
        {
          'bg-white ': !title,
        }
      )}>
      {title ? (
        <Link href={parentPathname}>
          <Image
            src="/button/icon_arrowW.svg"
            alt="logo"
            width={16}
            height={16}
            className="rotate-90"
          />
        </Link>
      ) : (
        <Image className="" src="/mobile/logo.png" alt="logo" width={100} height={30} />
      )}
      {title && <p className="flex-1 text-center uppercase ">{title}</p>}
      {!user ? (
        <div className="flex gap-2">
          <Link
            href={paths.mobile.register}
            className="cursor-pointer bg-amber-500 text-white rounded-xl flex items-center justify-between gap-2 px-2">
            <Image src={'/mobile/icons/register.svg'} alt="register" width={18} height={18} />
            Đăng ký
          </Link>
          <div
            onClick={() => setOpenModal(true)}
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
                  username
                </p>
                <p
                  className={classNames('text-gray-600 text-xl', {
                    'text-yellow-300': pathname !== paths.mobile.root,
                  })}>
                  $ 0
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

      <LoginModal openModal={openModal} setOpenModal={setOpenModal} />
    </header>
  );
}
