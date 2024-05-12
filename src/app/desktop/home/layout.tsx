// 'use client';

// auth
import { AuthGuard } from '@/auth/guard';
// components
import DesktopLayout from '@/layouts/desktop/layout';
import { Metadata } from 'next';

// ----------------------------------------------------------------------
export const metadata: Metadata = {
  title:
    'Thương hiệu Casino chuyên nghiệp số 1 Châu Á, [đối tác chính thức của Laliga trong 5 giải đấu lớn] cùng các trò chơi giải trí (Thể Thao, Casino, E-Sports, Xổ Số)',
  description: ' Casino top 1 ',
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: '/images/favicon.ico',
      href: '/images/favicon.ico',
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: '/images/favicon.ico',
      href: '/images/favicon.ico',
    },
  ],
};
type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    // <AuthGuard>
    <DesktopLayout>{children}</DesktopLayout>
    // </AuthGuard>
  );
}
