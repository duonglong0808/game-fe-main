'use client';
import { ClickNumberBox } from '@/components/mobile/clickNumber';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Tabs } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { addMessagePopup, handleConfirmMessage, handleMovePoint } from '../utils/handleMember';
import { ShowConfirmMessage } from '@/app/compmnents/ShowMessage';
import { getHistoryTransfer } from '../utils/api';
import moment from 'moment';
const config: CustomFlowbiteTheme['tabs'] = {
  tablist: {
    tabitem: {
      base: 'flex-1 h-10 p-2 text-[14px] font-[700] text-[#648fb2] border-b-4',
    },
  },
  tabitemcontainer: {
    base: 'p-0',
  },
};
export default function TransferTabs() {
  const { dataGamePoints } = useAppSelector((state) => state.user);
  const [accountTransfer, setAccountTransfer] = useState('tk-chinh');
  const [accountReceiver, setAccountReceiver] = useState('wait');
  const [pointTransfer, setPointTransfer] = useState('');
  const [openEnterPoint, setOpenEnterPoint] = useState(true);
  const [openSelectPoint, setOpenSelectPoint] = useState(false);
  const dataListGameTransfer = dataGamePoints?.filter((i) => i.gameSlug != accountReceiver);
  const dataListGameReceiver = dataGamePoints?.filter((i) => i.gameSlug != accountTransfer);
  const [historyActive, setHistoryActive] = useState<number[]>([]);
  const [refreshHistory, setRefreshHistory] = useState(true);
  const { titleMessage, descMessage, textClose, textConfirm } = useAppSelector(
    (state) => state.settingApp
  );
  const dispatch = useAppDispatch();
  const [data, setData] = useState<
    {
      createdAt: string;
      accountTrans: string;
      pointTrans: string;
      surplus: string;
      accountReceiver: string;
      status: string;
    }[]
  >([]);

  useEffect(() => {
    async function fetchHistory() {
      if (refreshHistory) {
        const currentDate = new Date();
        const dateFrom = new Date(currentDate.getTime() - 1000 * 60 * 60 * 24 * 7);
        const dataRes = await getHistoryTransfer(
          1,
          1000,
          dateFrom.toISOString(),
          currentDate.toISOString()
        );
        if (dataRes.data) {
          const { data, pagination } = dataRes.data;
          const dataHis = data.map((item: any) => {
            return {
              createdAt: item.createdAt,
              accountTrans: item.gameTransfer?.name,
              pointTrans: item.pointTrans,
              surplus: item.surplus,
              accountReceiver: item.gameReceiver.name,
              status: item.status ? 'Thành công' : 'Thất bại',
            };
          });
          setRefreshHistory(false);
          setHistoryActive([]);
          setData(dataHis);
        }
      }
    }

    fetchHistory();
  }, [refreshHistory]);

  return (
    <>
      {titleMessage && descMessage && (
        <ShowConfirmMessage
          textClose={textClose}
          textConfirm={textConfirm}
          title={titleMessage}
          desc={descMessage}
          onConfirm={() => handleConfirmMessage(dispatch)}
        />
      )}
      <Tabs theme={config} aria-label="Tabs with icons" style="underline" className="w-full">
        <Tabs.Item className="h-10 text-base border-b-4" active title="Chuyển quỹ">
          <div className="flex flex-col -mt-5">
            <div className="flex flex-col divide-y  text-black bg-white border border-gray-200">
              <div className="flex items-center py-1 px-4 text-lg p-3 h-12">
                <p className="flex-[0.5] text-[15px]">Tổng số điểm</p>
                <p className="flex-1 ml-3 font-bold text-[#00bb00]">
                  {dataGamePoints?.reduce((pre, item) => {
                    return pre + item.points;
                  }, 0)}
                </p>
              </div>
              <div className="flex items-center py-1 px-4 text-lg p-3 h-12">
                <p className="flex-[0.5] text-[15px]">TK chuyển</p>
                <div
                  onClick={() => setOpenSelectPoint(true)}
                  className="flex-1 text-black text-[15px] flex flex-col h-[34px] bg-[url(/mobile/icons/icon_select.svg)] bg-no-repeat bg-[right] bg-[length:9%]">
                  <p className="font-semibold leading-[17px] ">
                    {dataGamePoints?.find((game) => game.gameSlug == accountTransfer)?.gameName}
                  </p>
                  <p className="leading-[17px]">
                    {dataGamePoints?.find((game) => game.gameSlug == accountTransfer)?.points}
                  </p>
                </div>
              </div>
              <div className="flex items-center py-1 px-4 text-lg p-3 h-12">
                <p className="flex-[0.5] text-[15px]">TK nhận</p>
                <div
                  onClick={() => setOpenSelectPoint(true)}
                  className="flex-1 text-[#2782d7] text-[15px] flex flex-col justify-center h-[34px] bg-[url(/mobile/icons/icon_select.svg)] bg-no-repeat bg-[right] bg-[length:9%]">
                  {!dataGamePoints?.find((game) => game.gameSlug == accountReceiver) ? (
                    <p className="font-semibold leading-[17px] ">Vui lòng chọn</p>
                  ) : (
                    <>
                      <p className="font-semibold leading-[17px] ">
                        {dataGamePoints?.find((game) => game.gameSlug == accountReceiver)?.gameName}
                      </p>
                      <p className="leading-[17px]">
                        {dataGamePoints?.find((game) => game.gameSlug == accountReceiver)?.points}
                      </p>
                    </>
                  )}
                </div>
                {/* <select className="flex-1 ml-3 appearance-none bg-transparent border border-none text-left ring-0 focus:border-none focus:outline-none ">
                <option value="">Vui lòng chọn</option>
                <option value="option1">KU thể thao</option>
                <option value="option2">KU Casino</option>
              </select> */}
              </div>
            </div>
            <div className="flex items-center py-1 px-4 text-lg p-3 h-12 my-2 relative bg-white text-black border border-gray-200">
              <p className="text-base mr-4">Điểm chuyển</p>
              <span
                onClick={() => setOpenEnterPoint((pre) => !pre)}
                className={classNames(
                  'border-none outline-none flex-1 py-2 focus:border-none focus:ring-0 text-lg ',
                  { 'text-[#999]': !pointTransfer },
                  { 'text-black': pointTransfer },
                  { 'font-semibold': pointTransfer }
                )}>
                {pointTransfer || 'Nhập số điểm'}
              </span>
              {pointTransfer ? (
                <FontAwesomeIcon
                  onClick={() => setPointTransfer('')}
                  className="absolute cursor-pointer top-[50%] bottom-0 right-0 translate-x-[-50%] translate-y-[-50%] text-2xl"
                  color="#c6c6ca"
                  icon={faCircleXmark}
                />
              ) : (
                <></>
              )}
            </div>
            {openEnterPoint ? (
              <div className="w-full px-3 bg-[#f0eff5]">
                <ClickNumberBox value={pointTransfer} onChangeValue={setPointTransfer} />
              </div>
            ) : (
              <></>
            )}

            <div className="flex items-center py-1 px-8 justify-between w-full text-base text-white gap-4 p-4">
              <button className="flex-1 bg-[#ffa406] px-6 rounded-sm h-[40px] flex items-center justify-center text-sm">
                Chuyển hết về tài khoản chính
              </button>
              <button
                onClick={() => {
                  console.log('🚀 ~ TransferView ~ pointTransfer:', pointTransfer);
                  if (
                    +pointTransfer <
                    Number(dataGamePoints?.find((game) => game.gameSlug == accountTransfer)?.points)
                  ) {
                    handleMovePoint(
                      Number(
                        dataGamePoints?.find((game) => game.gameSlug == accountTransfer)
                          ?.gamePointId
                      ),
                      Number(
                        dataGamePoints?.find((game) => game.gameSlug == accountReceiver)
                          ?.gamePointId
                      ),
                      +pointTransfer,
                      dispatch
                    );
                    setPointTransfer('');
                    setRefreshHistory(true);
                  } else {
                    addMessagePopup('Tin nhắn', 'Số dư bạn không đủ', 'Xác nhận', dispatch);
                  }
                }}
                disabled={!pointTransfer || !accountReceiver}
                className="flex-1 bg-[#0c5d91] disabled:bg-[#aaa] py-2 px-4 rounded-sm h-[40px] flex items-center justify-center cursor-not-allowed">
                Xác nhận
              </button>
            </div>
          </div>

          {openSelectPoint ? (
            <div className="fixed top-0 left-0 right-0 bottom-0  z-30 text-black">
              <div
                className="absolute left-0 right-0 top-0 h-[160px] bg-[#00000075]"
                onClick={() => setOpenSelectPoint(false)}></div>
              <div className="absolute left-0 right-0 bottom-0 top-40 bg-white">
                <div className="px-[25px] py-2 bg-[#e8f2fc]">
                  <div className="flex justify-between">
                    <h3>Chuyển quỹ</h3>
                    <button
                      onClick={() => setOpenSelectPoint(false)}
                      className="px-[10px] bg-[#2782d7] rounded-xl text-white  font-semibold">
                      Xác nhận
                    </button>
                  </div>
                  <div className="flex items-center mt-3">
                    <button className="h-11 flex-1 border-[1px] border-[#dcdcdc] rounded px-[10px] flex flex-col justify-center bg-white">
                      <p className="font-semibold text-[14px]">
                        {dataGamePoints?.find((game) => game.gameSlug == accountTransfer)?.gameName}
                      </p>
                      <p className="text-[#039612] text-[14px]">
                        {dataGamePoints?.find((game) => game.gameSlug == accountTransfer)?.points}
                      </p>
                    </button>
                    <span className="bg-[url(/mobile/icons/icon_arrowBlue.svg)] bg-no-repeat bg-contain w-5 h-5 mx-4"></span>
                    <button className="h-11 flex-1 border-[1px] border-[#dcdcdc] rounded px-[10px] flex flex-col justify-center bg-white">
                      {dataGamePoints?.find((game) => game.gameSlug == accountReceiver) ? (
                        <>
                          <p className="font-semibold text-[14px]">
                            {
                              dataGamePoints?.find((game) => game.gameSlug == accountReceiver)
                                ?.gameName
                            }
                          </p>
                          <p className="text-[#039612] text-[14px]">
                            {
                              dataGamePoints?.find((game) => game.gameSlug == accountReceiver)
                                ?.points
                            }
                          </p>
                        </>
                      ) : (
                        <p className="font-semibold text-[14px]">Vui lòng chọn</p>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between px-[25px] h-full overflow-hidden">
                  <div className="flex-[0.45] overflow-y-scroll no-scrollbar">
                    <div className="">
                      {dataListGameTransfer.map((game, index) => (
                        <div
                          onClick={() => setAccountTransfer(game.gameSlug)}
                          key={index}
                          className="px-3 text-start border-b-[1px] border-[#d7d7d7] text-sm mb-1">
                          <p>{game.gameName}</p>
                          <p className="text-[#039612] mt-[2px]">{game.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-[0.45] overflow-y-scroll no-scrollbar">
                    <div className="">
                      {dataListGameReceiver.map((game, index) => (
                        <div
                          onClick={() => setAccountReceiver(game.gameSlug)}
                          key={index}
                          className="px-3 text-start border-b-[1px] border-[#d7d7d7] text-sm mb-1">
                          <p>{game.gameName}</p>
                          <p className="text-[#039612] mt-[2px]">{game.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </Tabs.Item>
        <Tabs.Item className="h-10 text-base" title="Tự động">
          {/* <div className="flex flex-col gap-3 divide-y text-black ">
            <p className="py-1 px-8 border border-gray-300 text-lg text-center bg-white">
              Sử dụng chức năng tự động chuyển điểm ra (vào) hay không
            </p>
            <div className="flex flex-col divide-y bg-white">
              <div className="flex items-center py-2 px-4">
                <input
                  type="checkbox"
                  className="bg-blue-500 h-11 w-11 rounded-md"
                  style={{ backgroundSize: '1.5em 1.5em' }}
                />
                <p className="flex-1 text-center uppercase text-lg">KU thể thao</p>
              </div>
              <div className="flex items-center py-2 px-4">
                <input
                  type="checkbox"
                  className="bg-blue-500 h-11 w-11 rounded-md"
                  style={{ backgroundSize: '1.5em 1.5em' }}
                />
                <p className="flex-1 text-center uppercase text-lg">KU thể thao</p>
              </div>
              <div className="flex items-center py-2 px-4">
                <input
                  type="checkbox"
                  className="bg-blue-500 h-11 w-11 rounded-md"
                  style={{ backgroundSize: '1.5em 1.5em' }}
                />
                <p className="flex-1 text-center uppercase text-lg">KU thể thao</p>
              </div>
              <div className="flex items-center py-2 px-4">
                <input
                  type="checkbox"
                  className="bg-blue-500 h-11 w-11 rounded-md"
                  style={{ backgroundSize: '1.5em 1.5em' }}
                />
                <p className="flex-1 text-center uppercase text-lg">KU thể thao</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-8 ">
              <button className="w-full rounded-sm p-4 bg-white border border-cyan-400">
                Hủy bỏ
              </button>
              <button className="rounded-sm w-full bg-cyan-400 p-4 text-white">Xác nhận</button>
            </div>
          </div> */}
        </Tabs.Item>
        <Tabs.Item className="h-10 text-base" title="Lịch sử chuyển">
          {data.length ? (
            data.map((item, index) => (
              <div
                key={index}
                className="border-[1px] border-[#e1e1e3] w-[90%] mx-auto px-2 py-1 rounded-lg bg-white mb-3 text-black">
                <div
                  onClick={() => {
                    if (historyActive.includes(index)) {
                      setHistoryActive((pre) => pre.filter((item) => item != index));
                    } else {
                      setHistoryActive((pre) => [...pre, index]);
                    }
                  }}
                  className={classNames('flex items-center')}>
                  <div className="mr-3 rounded-[3px] w-[35px] h-[18px] bg-[#268d33] bg-[url(/mobile/icons/icon_check.svg)] bg-no-repeat bg-[length:30%] bg-center "></div>
                  <div className="flex-1">
                    <p className="font-semibold text-[15px] leading-[18px]">
                      Chuyển vào TK {item.accountReceiver}
                    </p>
                    <p className="text-[#a3a3a3]">
                      {moment(item.createdAt).format('yyyy-MM-DD HH:mm:ss')}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">{item.pointTrans}</span>
                    <span className="block bg-[url(/mobile/icons/icon_arrow.svg)] bg-no-repeat w-3 h-4 bg-contain"></span>
                  </div>
                </div>
                <div
                  className={classNames(' border-t-[1px] border-[#e1e1e3] mt-1 pt-1', {
                    hidden: !historyActive.includes(index),
                    block: historyActive.includes(index),
                  })}>
                  <p className="text-[#a3a3a3]">
                    Chi tiết: <span className="text-black">{item.accountTrans}</span> chuyển đến{' '}
                    <span className="text-[#ff7800]">{item.accountReceiver}</span>
                  </p>
                  <p className="text-[#a3a3a3]">
                    Số dư: <span className="text-black">{item.surplus}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-[100%] flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Image src="/mobile/images/icon_noMessage.svg" alt="" width={150} height={127} />
                <p className="text-lg font-bold text-blue-400">Chưa có tin nhắn</p>
              </div>
            </div>
          )}
        </Tabs.Item>
      </Tabs>
    </>
  );
}
