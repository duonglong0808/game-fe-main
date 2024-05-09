'use client';
import React, { useCallback, useState } from 'react';
import HeaderTransition from '@/components/member/Header/header-transition';
import TransferView from '../transfer-view';
import HistoryView from '../history-view';

export default function TransitionView() {
  const [active, setAtive] = useState(1);
  const handleValueChange = useCallback((value: number) => {
    setAtive(value);
  }, []);
  return (
    <div className="h-full flex  flex-col gap-1 w-full">
      <HeaderTransition onValueChange={handleValueChange} />
      {active === 1 && <TransferView />}
      {active === 2 && <HistoryView />}
    </div>
  );
}
