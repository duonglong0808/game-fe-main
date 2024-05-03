
'use client';

// auth
import { AuthGuard } from '@/auth/guard';
// components
import DesktopLayout from '@/layouts/desktop/layout';


// ----------------------------------------------------------------------

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
