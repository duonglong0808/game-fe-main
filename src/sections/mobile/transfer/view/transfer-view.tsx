import MobileLayout from '@/layouts/mobile';
import Image from 'next/image';
import TransferTabs from '../transfer-tabs';
export default function TransferView() {
  return (
    <MobileLayout title="Chuyển quỹ">
      <TransferTabs />
    </MobileLayout>
  );
}
