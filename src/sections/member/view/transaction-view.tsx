'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Table } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';
import HeaderTransaction from '@/components/member/Header/header-transaction';
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
const TransactionView = () => {
  const [data, setData] = useState(null);
  return (
    <div className="flex flex-col gap-1 w-full h-[70vh]  bg-white p-2">
      <HeaderTransaction />
      <div className="overflow-auto">
        <Flowbite theme={{ theme: config }}>
          <Table>
            <Table.Head>
              <Table.HeadCell>Thời gian</Table.HeadCell>
              <Table.HeadCell>Loại giao dịch</Table.HeadCell>
              <Table.HeadCell>Nội dung</Table.HeadCell>
              <Table.HeadCell>Số tài khoản</Table.HeadCell>
              <Table.HeadCell>Số điểm</Table.HeadCell>
              <Table.HeadCell>Ưu đãi</Table.HeadCell>
              <Table.HeadCell>Phí thú tục</Table.HeadCell>
              <Table.HeadCell>Trạng thái</Table.HeadCell>
              <Table.HeadCell>Biên lai</Table.HeadCell>
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
          <div className="h-[500px] flex flex-col items-center justify-center ">
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

export default TransactionView;
