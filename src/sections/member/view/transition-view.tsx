'use client';
import React, { useCallback, useState } from 'react';
import HeaderTransition from '@/components/member/Header/header-transition';
import TransferView from '../transfer-view';
import HistoryView from '../history-view';
import { ShowConfirmMessage } from '@/app/compmnents/ShowMessage';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { handleConfirmMessage } from './utils/handleMember';

export default function TransitionView() {
  const [active, setAtive] = useState(1);
  const { titleMessage, descMessage, textClose, textConfirm } = useAppSelector(
    (state) => state.settingApp
  );
  const dispatch = useAppDispatch();
  const handleValueChange = useCallback((value: number) => {
    setAtive(value);
  }, []);
  return (
    <div className="h-full flex  flex-col gap-1 w-full">
      <HeaderTransition onValueChange={handleValueChange} />
      {titleMessage && descMessage && (
        <ShowConfirmMessage
          textClose={textClose}
          textConfirm={textConfirm}
          title={titleMessage}
          desc={descMessage}
          onConfirm={() => handleConfirmMessage(dispatch)}
        />
      )}
      {active === 1 && <TransferView />}
      {active === 2 && <HistoryView />}
    </div>
  );
}
