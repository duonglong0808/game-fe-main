'use client';

// auth
import { AuthGuard } from '@/auth/guard';
import MemberLayout from '@/layouts/member-pc';
// components


// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    // <AuthGuard>
    <MemberLayout>{children}</MemberLayout>
    // </AuthGuard>
  );
}