'use client';
import { useState } from 'react';
import { Datepicker } from 'flowbite-react';
import { Table } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';
import Image from 'next/image';
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
        base: 'px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg',
      },
    },
    head: {
      base: 'group/head text-xs  text-white dark:text-gray-400',
      cell: {
        base: 'bg-[#0c5d91] text-center p-2 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700',
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
  const [data, setData] = useState(null);
  return (
    <div className="h-full flex flex-col gap-1 w-full p-1">
      <div className="h-full flex flex-col   bg-white p-2 gap-3">
        <div className="flex items-center justify-between ">
          <select className="w-[150px] appearance-none bg-gray-200 border border-gray-300 rounded-sm shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Tất cả</option>
            <option value="option1">KU thể thao</option>
            <option value="option2">KU Casino</option>
          </select>

          <div className="flex items-center justify-between gap-1 h-full">
            <p className="text-sm">Thời gian</p>
            <Datepicker className="text-sm w-[150px] " />
            <p> - </p>
            <Datepicker className="text-sm w-[150px]" />

            <button className="bg-[#4a80a3] text-sm text-white p-2">Tìm kiếm</button>
          </div>
        </div>
        <div className="border-b bg-gray-200"></div>
        <Flowbite theme={{ theme: config }}>
          <Table>
            <Table.Head>
              <Table.HeadCell>Thời gian</Table.HeadCell>
              <Table.HeadCell>TK chuyển</Table.HeadCell>
              <Table.HeadCell>Điểm chuyển</Table.HeadCell>
              <Table.HeadCell>Số dư</Table.HeadCell>
              <Table.HeadCell>TK nhận</Table.HeadCell>
              <Table.HeadCell>Trạng thái</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {/* <TableRow>
                <TableCell>{'20-10-2024'}</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>VNPAY</TableCell>
                <TableCell>300</TableCell>
                <TableCell>User</TableCell>
                <TableCell>OK</TableCell>
              </TableRow> */}
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
      </div>
    </div>
  );
};

export default HistoryView;
