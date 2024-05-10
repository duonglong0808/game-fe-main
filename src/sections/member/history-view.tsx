'use client';
import { use, useEffect, useRef, useState } from 'react';
import { Datepicker, TableCell, TableRow } from 'flowbite-react';
import { Table } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';
import Image from 'next/image';
import { useAppSelector } from '@/lib/redux/utilRedux';
import moment from 'moment';
import { getHistoryTransfer } from './view/utils/api';

const config: CustomFlowbiteTheme = {
  table: {
    root: {
      base: 'w-full text-left text-sm text-gray-500 dark:text-gray-400',
      shadow:
        'absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black',
      wrapper: 'relative',
    },
    body: {
      base: 'group/body',
      cell: {
        base: 'h-[45px] px-1 text-sm text-black text-center',
      },
    },
    head: {
      base: 'group/head text-xs  text-white dark:text-gray-400',
      cell: {
        base: 'bg-[#4a80a3] text-center p-2  dark:bg-gray-700  ',
      },
    },
    row: {
      base: 'group/row',
      hovered: 'hover:bg-gray-50 dark:hover:bg-gray-600',
      striped: 'odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700',
    },
  },
};

const HistoryView = () => {
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
  const { dataGamePoints } = useAppSelector((state) => state.user);
  const gameSelect = useRef('all');
  const dateNow = new Date();
  const minDate = new Date(dateNow.getTime() - 1000 * 60 * 60 * 24 * 7);
  const [dateFrom, setDateFrom] = useState(moment(minDate).format('DD-MM-YYYY'));
  const [dateTo, setDateTo] = useState(moment(dateNow).format('DD-MM-YYYY'));
  const [subMitQuery, setSubMitQuery] = useState(true);
  const [page, setPage] = useState(1);
  const total = useRef(0);

  useEffect(() => {
    async function fetchHistory() {
      if (subMitQuery) {
        const gamePointId =
          dataGamePoints.find((game) => game.gameSlug == gameSelect.current)?.gamePointId ||
          undefined;
        console.log('🚀 ~ fetchHistory ~ gamePointId:', gamePointId);
        const dataRes = await getHistoryTransfer(page, 10, dateFrom, dateTo, gamePointId);
        if (dataRes.data) {
          const { data, pagination } = dataRes.data;
          setPage(pagination.page);
          total.current = pagination.total;
          const dataHis = data.map((item: any) => {
            return {
              createdAt: item.createdAt,
              accountTrans: item.gameTransfer.name,
              pointTrans: item.pointTrans,
              surplus: item.surplus,
              accountReceiver: item.gameReceiver.name,
              status: item.status ? 'Thành công' : 'Thất bại',
            };
          });
          setData(dataHis);
        }
      }
    }

    fetchHistory();
  }, [setSubMitQuery]);

  return (
    <div className="h-full flex flex-col gap-1 w-full p-1">
      <div className="h-full flex flex-col   bg-white p-2 gap-3">
        <div className="flex items-center justify-between ">
          <select
            defaultValue={gameSelect.current}
            onChange={(e) => {
              gameSelect.current = e.target.value;
            }}
            className="w-[150px] appearance-none bg-gray-200 border border-gray-300 rounded-sm shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="all">Tất cả</option>
            {dataGamePoints.map((game, index) => (
              <option key={index} value={game.gameSlug}>
                {game.gameName}
              </option>
            ))}
          </select>

          <div className="flex items-center justify-between gap-1 h-full right-0">
            <p className="text-sm">Thời gian</p>
            <Datepicker
              value={dateFrom}
              onSelectedDateChanged={(date) => {
                // dateFrom.current = moment(date).format('DD-MM-YYYY');
                setDateFrom(moment(date).format('DD-MM-YYYY'));
              }}
              showClearButton={false}
              showTodayButton={false}
              minDate={minDate}
              maxDate={dateNow}
              className="text-base w-[150px]"
            />
            <p> - </p>
            <Datepicker
              value={dateTo}
              onChange={(e) => setDateTo(moment(e.target.value).format('DD-MM-YYYY'))}
              showClearButton={false}
              showTodayButton={false}
              minDate={minDate}
              maxDate={dateNow}
              className="text-base w-[150px]"
            />

            <button className="bg-[#4a80a3] text-sm text-white p-2">Tìm kiếm</button>
          </div>
        </div>
        <div className="border-b bg-gray-200"></div>
        <Flowbite theme={{ theme: config }}>
          <Table
            style={{
              fontSize: '13px',
              borderLeft: '1px solid #dfdfdf',
              borderTop: '1px solid #dfdfdf',
            }}>
            <Table.Head>
              <Table.HeadCell
                style={{
                  borderRight: '1px solid #8ba6b8',
                }}>
                Thời gian
              </Table.HeadCell>
              <Table.HeadCell
                style={{
                  borderRight: '1px solid #8ba6b8',
                }}>
                TK chuyển
              </Table.HeadCell>
              <Table.HeadCell
                style={{
                  borderRight: '1px solid #8ba6b8',
                }}>
                Điểm chuyển
              </Table.HeadCell>
              <Table.HeadCell
                style={{
                  borderRight: '1px solid #8ba6b8',
                }}>
                Số dư
              </Table.HeadCell>
              <Table.HeadCell
                style={{
                  borderRight: '1px solid #8ba6b8',
                }}>
                TK nhận
              </Table.HeadCell>
              <Table.HeadCell
                style={{
                  borderRight: '1px solid #8ba6b8',
                }}>
                Trạng thái
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((item) => (
                <TableRow>
                  <TableCell
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 3px',
                      color: '#888',
                    }}>
                    {moment(item.createdAt).format('DD-MM HH:MM:SS')}
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 3px',
                      textAlign: 'center',
                    }}>
                    {item.accountTrans}
                  </TableCell>
                  <TableCell
                    className="text-[#00af1d] text-right "
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 3px',
                    }}>
                    {item.pointTrans}
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 10px',
                      color: '#888',

                      textAlign: 'right',
                    }}>
                    {item.surplus}
                  </TableCell>
                  <TableCell
                    className="text-[#ff7500]"
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 3px',
                    }}>
                    {item.accountReceiver}
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 3px',
                    }}>
                    {item.status}
                  </TableCell>
                </TableRow>
              ))}
            </Table.Body>
          </Table>
        </Flowbite>
        {!data && (
          <div className="h-full flex flex-col items-center justify-center ">
            <Image
              src={'/transition/icon_noMessage.svg'}
              alt="no data"
              width={100}
              height={100}
              className="object-contain"
            />
            <p className="text-base text-[#72a5dc] font-bold">Chưa có tin nhắn</p>
          </div>
        )}
        <div className="m-auto">aaaa</div>
      </div>
    </div>
  );
};

export default HistoryView;
