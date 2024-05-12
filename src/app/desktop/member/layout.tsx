// auth
import { AuthGuard } from '@/auth/guard';
import MemberLayout from '@/layouts/member-pc';
import { Metadata } from 'next';
// components

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

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

export default function Layout({ children }: Props) {
  return (
    // <AuthGuard>
    <MemberLayout>{children}</MemberLayout>
    // </AuthGuard>
  );
}
