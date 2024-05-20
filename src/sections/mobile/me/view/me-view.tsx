'use client';
import MobileLayout from '@/layouts/mobile';
import CardUser from '../card-user';
import { SIDEBARSERVICE, USER } from '@/_mock/_me';
import { SIDEBARUSER } from '@/_mock';
import Sidebar from '@/components/mobile/sidebar';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { logOutUser } from '@/lib/redux/app/user.slice';
import { useRouter } from 'next/navigation';

export default function MeView() {
  const { name, userName, dataGamePoints } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <MobileLayout title="Tôi">
      <CardUser
        count={dataGamePoints?.find((item) => item.gameSlug == 'tk-chinh')?.points || 0}
        name={userName}
        title={name}
        rank="Đồng"
      />
      <Sidebar data={SIDEBARUSER} />
      <Sidebar data={SIDEBARSERVICE} />
      <button
        className="w-full bg-white text-red-500 p-3"
        onClick={() => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          dispatch(logOutUser());
          console.log('aaaa');
          router.replace('/mobile');
        }}>
        Đăng xuất
      </button>
    </MobileLayout>
  );
}
