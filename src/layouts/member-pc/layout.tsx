'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Table from './Table';

export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (pathname.includes('transaction'))
    return (
      <div className="h-screen overflow-hidden flex flex-col">
        <Header />
        <div
          className="flex-1 bg-gray-200 text-[#555] flex justify-center"
          style={{
            backgroundColor: '#f3f3f3',
          }}>
          <div className="flex w-[950px] ">{children}</div>
        </div>
      </div>
    );
  if (pathname.includes('tulieu') || pathname.includes('point'))
    return (
      <>
        <Header />
        {children}
      </>
    );
  return (
    <div className=" h-screen overflow-hidden flex flex-col">
      <Header />
      <div
        className="flex-1 bg-gray-200 text-[#555] flex justify-center"
        style={{
          backgroundColor: '#f3f3f3',
        }}>
        <div className="flex w-[950px] h-[635px] ">
          <div className="flex-[0.35]">
            <Table />
          </div>
          <div className="flex-[0.75] ">{children}</div>
        </div>
      </div>
    </div>
  );
}
