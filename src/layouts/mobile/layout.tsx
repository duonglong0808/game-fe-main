'use client';

import { useState } from 'react';
import Footer from './footer';
import Header from './header';

type Props = {
  children: React.ReactNode;
  title?: string;
  isHome?: boolean;
};
export default function MobileLayout({ children, title, isHome }: Props) {
  const [openModalLogin, setOpenModalLogin] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header title={title} openModalLogin={openModalLogin} setOpenModalLogin={setOpenModalLogin} />
      <div className="flex-1 flex flex-col gap-2 overflow-auto bg-gray-100">{children}</div>
      <Footer
        isHome={isHome}
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
    </div>
  );
}
