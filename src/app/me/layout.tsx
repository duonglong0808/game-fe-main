import React from 'react';
import { FooterHome } from '../home/components/Footer';
import HeaderMe from './components/Header';

export default function MeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-lg:flex hidden max-lg:flex-col max-lg:h-screen max-lg:overflow-hidden">
      <HeaderMe />
      {children}
      <FooterHome />
    </div>
  );
}
