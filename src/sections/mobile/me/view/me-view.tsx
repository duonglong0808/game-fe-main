'use client';
import MobileLayout from '@/layouts/mobile';
import CardUser from '../card-user';
import { SIDEBARSERVICE, USER } from '@/_mock/_me';
import { SIDEBARUSER } from '@/_mock';
import Sidebar from '@/components/mobile/sidebar';

export default function MeView() {
  return (
    <MobileLayout title="Tôi">
      <CardUser {...USER} />
      <Sidebar data={SIDEBARUSER} />
      <Sidebar data={SIDEBARSERVICE} />
      <button className="w-full bg-white text-red-500 p-3">Đăng xuất</button>
    </MobileLayout>
  );
}
