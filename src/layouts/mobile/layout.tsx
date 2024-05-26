'use client';

import { useState } from 'react';
import Footer from './footer';
import Header from './header';

type Props = {
  children: React.ReactNode;
  title?: string;
  isHome?: boolean;
  handleBack?: () => void;
  useHandleBack?: boolean;
  showFooter?: boolean;
};
export default function MobileLayout({
  children,
  title,
  isHome,
  handleBack,
  useHandleBack,
  showFooter = true,
}: Props) {
  const [openModalLogin, setOpenModalLogin] = useState(false);

  return (
    <div className="flex flex-col h-svh overflow-hidden">
      {useHandleBack ? (
        <Header
          title={title}
          openModalLogin={openModalLogin}
          setOpenModalLogin={setOpenModalLogin}
          handleBack={handleBack}
        />
      ) : (
        <Header
          title={title}
          openModalLogin={openModalLogin}
          setOpenModalLogin={setOpenModalLogin}
        />
      )}
      <div className="flex flex-1 flex-col gap-2 overflow-auto bg-gray-100">{children}</div>
      {showFooter ? (
        <Footer
          isHome={isHome}
          openModalLogin={openModalLogin}
          setOpenModalLogin={setOpenModalLogin}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
