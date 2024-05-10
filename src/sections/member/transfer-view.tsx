'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import classNames from 'classnames/bind';
import { handleMovePoint } from './view/utils/handleMember';

const cx = classNames.bind({});

const TransferView = () => {
  const { dataGamePoints } = useAppSelector((state) => state.user);
  const [accountTransfer, setAccountTransfer] = useState('tk-chinh');
  const [accountReceiver, setAccountReceiver] = useState('wait');
  const [pointTransfer, setPointTransfer] = useState<number>(0);
  const gameTransfer = dataGamePoints.find((i) => i.gameSlug == accountTransfer) || {
    gameName: '',
    gamePointId: '',
    gameSlug: '',
    points: 0,
  };
  const gameReceiver = dataGamePoints.find((i) => i.gameSlug == accountReceiver) || {
    gameName: '',
    gamePointId: '',
    gameSlug: '',
    points: 0,
  };

  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-1 flex-col gap-1 w-full p-1">
      <div className="flex items-center bg-white p-1 gap-3 h-[300px]">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] h-full border border-gray-300 ">
          <Image src={'/member/withdraw/icon_dataInput.png'} alt="" width={30} height={30} />
          <p className="text-center text-sm text-[#888888]">Đề xuất yêu cầu</p>
        </div>

        <div className="flex-1 py-4 flex flex-col  gap-4 px-20">
          <div className="flex items-center justify-between w-full ">
            <p className="text-sm text-red-500">TK chuyển:</p>

            <div className="relative">
              {gameTransfer ? (
                <span className="absolute right-8 top-2 z-10">{gameTransfer?.points}</span>
              ) : (
                <></>
              )}
              <select
                defaultValue={'tk-chinh'}
                onChange={(e) => {
                  setAccountTransfer(e.target.value);
                }}
                className="w-[250px] relative  appearance-none bg-gray-200 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {dataGamePoints.map((game, index) => (
                  <option key={index} value={game.gameSlug}>
                    {game.gameName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between w-full ">
            <p className="text-sm text-green-500">TK nhận:</p>
            <div className="relative">
              {gameReceiver ? (
                <span className="absolute right-8 top-2 z-10">{gameReceiver?.points}</span>
              ) : (
                <></>
              )}
              <select
                defaultValue={'wait'}
                onChange={(e) => {
                  setAccountReceiver(e.target.value);
                }}
                className="w-[250px] relative  appearance-none bg-gray-200 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="wait">Vui lòng chọn</option>
                {dataGamePoints
                  .filter((item) => item.gameSlug != accountTransfer)
                  .map((game, index) => (
                    <option key={index} value={game.gameSlug}>
                      {game.gameName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between w-full ">
            <p className="text-sm text-black">Điểm chuyển:</p>
            <input
              onChange={(e) => {
                if (+e.target.value <= gameTransfer?.points) {
                  setPointTransfer(+e.target.value);
                } else {
                  setPointTransfer(+gameTransfer?.points);
                }
              }}
              type="text"
              placeholder="Nhập số điểm"
              value={pointTransfer}
              className="w-[250px] border-none outline-none bg-gray-200 border border-gray-300 appearance-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md text-sm"
            />
          </div>
          <div className="flex items-center justify-between w-full text-sm text-white gap-4">
            <button className="flex-1 bg-[#0c5d91] py-2 px-6 rounded-sm h-[45px] flex items-center justify-center">
              Chuyển hết về tài khoản chính
            </button>
            <button
              onClick={() => {
                console.log('🚀 ~ TransferView ~ pointTransfer:', pointTransfer);
                if (pointTransfer) {
                  handleMovePoint(
                    +gameTransfer.gamePointId,
                    +gameReceiver.gamePointId,
                    pointTransfer,
                    dispatch
                  );
                  setPointTransfer(0);
                }
              }}
              disabled={pointTransfer == 0}
              className={cx(
                'flex-1  bg-[#0c5d91] py-2 px-4 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400 rounded-sm h-[45px] flex items-center justify-center'
              )}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center bg-white p-1 gap-3 h-[250px]">
        <div className="flex flex-col items-center justify-center max-w-[68px] p-2 bg-[#f3f3f3] h-full border border-gray-300 ">
          <Image
            src={'/member/withdraw/icon_dataHint.png'}
            alt=""
            width={30}
            height={30}
            className={''}
          />
          <p className="text-center text-sm text-[#888888]">Đề xuất yêu cầu</p>
        </div>
        <div className="flex-1 py-10 px-4 text-sm ">
          <ol className="list-decimal space-y-2">
            <li>
              Hội viên phải chuyển số tiền cược tối thiểu đến tài khoản được chỉ định mới có thể
              tiến hành trò chơi.
            </li>
            <li>Khi chuyển khoản vui lòng kiểm tra số dư tài khoản có đủ hay không.</li>
            <li>
              <span className="text-red-500">
                Chuyển khoản không thông qua tài khoản chính, sẽ ghi nhận 2 dòng giao dịch.
              </span>{' '}
              <br />
              Ví dụ: KU Casino chuyển khoản vào 3D Games, lịch sử chuyển sẽ ghi nhận: KU Casino
              chuyển vào Tài khoản chính, Tài khoản chính chuyển vào 3D Games.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TransferView;
