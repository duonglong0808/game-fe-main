import Carousel from './components/Carousel';
import { FooterHome } from './components/Footer';
import { HeaderHome } from './components/Header';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-lg:flex max-lg:flex-col max-lg:h-screen max-lg:overflow-hidden">
      <HeaderHome />
      <Carousel />
      {children}
      <FooterHome />
    </div>
  );
}
