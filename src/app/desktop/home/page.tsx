'use client';
import DesktopView from '@/sections/desktop/view/desktop-view';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DesktopPage() {
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Chuyển hướng sang path khác khi thiết bị là mobile
        router.push('/mobile');
      }
    };

    // Kiểm tra ngay khi component mount
    handleResize();

    // Kiểm tra lại khi kích thước cửa sổ thay đổi
    window.addEventListener('resize', handleResize);

    // Cleanup event listener khi component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [router]);

  return <DesktopView />;
}
