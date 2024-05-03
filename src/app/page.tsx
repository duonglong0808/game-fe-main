import { redirect } from 'next/navigation';
import { useMobileDevice } from '@/routes/hooks';

export default async function MainPage() {
  const mobile = await useMobileDevice();

  if (mobile) {
    redirect('/mobile');
  } else {
    redirect('/desktop');
  }
}