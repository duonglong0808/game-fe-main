'use client';
import MobileLayout from '@/layouts/mobile';
import PurchaseList from '../purchase-list';

export default function PurchaseView() {
  return (
    <MobileLayout title="Khu nạp tiền">
      <PurchaseList />
    </MobileLayout>
  );
}
