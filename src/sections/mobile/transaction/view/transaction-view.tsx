import MobileLayout from '@/layouts/mobile';
import TransactionTabs from '../transaction-tabs';

export default function TransactionView() {
  return (
    <MobileLayout title="Giao dịch">
      <TransactionTabs />
    </MobileLayout>
  );
}
