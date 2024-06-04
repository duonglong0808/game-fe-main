'use client';
import { faGift, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useState } from 'react';
import { handleSubmitGiftCode } from './utils/handleGift';
import { useAppDispatch } from '@/lib/redux/utilRedux';
import { useRouter } from 'next/navigation';

export function EnterGiftCode({
  setOpenGiftCode,
}: {
  setOpenGiftCode: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [giftCode, setGiftCode] = useState('');
  const dispatch = useAppDispatch();

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-transparent z-30 flex items-center justify-center">
      <div className="py-4 px-4 bg-white w-[400px] max-w-[90%]">
        <div className="relative">
          <h2 className="text-center text-xl font-medium">Nhập mã ưu đãi</h2>
          <FontAwesomeIcon
            icon={faXmark}
            className={classNames('absolute top-1 right-2 w-4 h-4')}
            onClick={() => {
              setOpenGiftCode(false);
            }}
          />
        </div>
        <div>
          <div className="flex items-center gap-2  border-b border-gray-300">
            <FontAwesomeIcon icon={faGift} />
            <input
              value={giftCode}
              onChange={(e) => setGiftCode(e.target.value)}
              type="text"
              placeholder="Nhập gift code"
              className="flex-1 text-gray-600 border-none outline-none text-sm ring-0 focus:outline-none placeholder:font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={!giftCode}
            onClick={(e) => {
              handleSubmitGiftCode(giftCode, dispatch);
            }}
            className={classNames(
              'bg-[#45b5d9] mt-3 text-white w-full py-4',
              'disabled:bg-stone-400 disabled:cursor-not-allowed'
            )}>
            Xác Nhận
          </button>
        </div>
      </div>
    </div>
  );
}
