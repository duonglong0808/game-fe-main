'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Table, TableCell, TableRow } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';
import HeaderTransaction from '@/components/member/Header/header-transaction';
import { useDataUserInfo } from './utils/handleMember';
import { getAllPaymentTransaction, updateReceiptByTransactionId, upLoadOneFile } from './utils/api';
import moment from 'moment';
import { StatusPaymentTranSaction, TypePaymentTranSaction } from '@/constant';
import classNames from 'classnames';
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
const TransactionView = () => {
  const [data, setData] = useState<
    {
      id: number;
      createdAt: string;
      type: number;
      content: string;
      bankReceive: {
        accountNumber: number;
      };
      point: number;
      status: number;
      receipt: string;
    }[]
  >([]);
  const useUserInfo = useDataUserInfo();
  const [statusTransaction, setStatusTransaction] = useState(3);
  const [typeTransaction, setTypeTransaction] = useState(2);
  const [page, setPage] = useState(1);
  const total = useRef(0);
  const [subMitQuery, setSubMitQuery] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (subMitQuery) {
        const res = await getAllPaymentTransaction(page, typeTransaction, statusTransaction);
        if (res?.data) {
          const { data, pagination } = res.data;
          setData(data);
          setPage(pagination?.page);
          total.current = pagination.total;
          setSubMitQuery(false);
        }
      }
    }

    fetchData();
  }, [subMitQuery]);

  function hideMiddleDigits(text: string) {
    const firstThreeDigits = text.slice(0, 3);
    const lastThreeDigits = text.slice(-3);
    return `${firstThreeDigits}***${lastThreeDigits}`;
  }

  return (
    <div className="flex flex-col gap-1 w-full h-[70vh]  bg-white p-2">
      <HeaderTransaction
        typeTransaction={typeTransaction}
        setStatusTransaction={(status) => {
          setStatusTransaction(status);
          setSubMitQuery(true);
        }}
        setTypeTransaction={(type) => {
          setTypeTransaction(type);
          setSubMitQuery(true);
        }}
        statusTransaction={statusTransaction}
        onRefresh={() => setSubMitQuery(true)}
      />
      <div className="overflow-hidden h-full">
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
                Loại giao dịch
              </Table.HeadCell>
              <Table.HeadCell
                style={{
                  borderRight: '1px solid #8ba6b8',
                }}>
                Nội dung
              </Table.HeadCell>
              <Table.HeadCell
                style={{
                  borderRight: '1px solid #8ba6b8',
                }}>
                Số tài khoản
              </Table.HeadCell>
              <Table.HeadCell
                style={{
                  borderRight: '1px solid #8ba6b8',
                }}>
                Số điểm
              </Table.HeadCell>
              <Table.HeadCell
                style={{
                  borderRight: '1px solid #8ba6b8',
                }}>
                Ưu đãi
              </Table.HeadCell>
              <Table.HeadCell
                style={{
                  borderRight: '1px solid #8ba6b8',
                }}>
                Phí thú tục
              </Table.HeadCell>
              <Table.HeadCell
                style={{
                  borderRight: '1px solid #8ba6b8',
                }}>
                Trạng thái
              </Table.HeadCell>
              <Table.HeadCell
                style={{
                  borderRight: '1px solid #8ba6b8',
                }}>
                Biên lai
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 3px',
                      color: '#888',
                    }}>
                    {' '}
                    {moment(item.createdAt).format('DD-MM HH:MM:SS')}
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 3px',
                      color: '#00af1d',
                      fontWeight: 'bold',
                    }}>
                    {item.type == TypePaymentTranSaction.deposit ? 'Nạp tiền' : 'Rút tiền'}
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 3px',
                      color: '#000',
                    }}>
                    {item.content}
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 3px',
                      color: '#000',
                    }}>
                    {(item.type == TypePaymentTranSaction.withdrawMoney &&
                      hideMiddleDigits(String(item.bankReceive.accountNumber))) ||
                      ''}
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 3px',
                      color: '#00af1d',
                      fontWeight: 'bold',
                    }}>
                    {item.point}
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 3px',
                      color: '#000',
                    }}>
                    0
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 3px',
                      color: '#f00',
                    }}>
                    0
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 3px',
                      color: '#000',
                    }}>
                    {item.status == StatusPaymentTranSaction.processing
                      ? 'Đang xử lý'
                      : item.status == StatusPaymentTranSaction.success
                      ? 'Thành công'
                      : 'Hủy'}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      // if(item.status == StatusPaymentTranSaction.processing &&
                      //   item.type == TypePaymentTranSaction.deposit)
                    }}
                    className="underline"
                    style={{
                      borderRight: '1px solid #dfdfdf',
                      borderBottom: '1px solid #dfdfdf',
                      padding: '0 3px',
                      color: '#f00',
                      cursor:
                        item.status == StatusPaymentTranSaction.processing &&
                        item.type == TypePaymentTranSaction.deposit
                          ? 'pointer'
                          : 'auto',
                    }}>
                    {!item.receipt &&
                    new Date().getTime() - new Date(item.createdAt).getTime() < 60 * 60 * 1000 ? (
                      <>
                        <label htmlFor={`receipt_${item.id}`}>
                          {item.status == StatusPaymentTranSaction.processing &&
                          item.type == TypePaymentTranSaction.deposit
                            ? 'Tải lên'
                            : ''}
                        </label>
                        <input
                          className="hidden"
                          type="file"
                          id={`receipt_${item.id}`}
                          onChange={async (e) => {
                            if (e.target.files) {
                              const url = await upLoadOneFile('image', e.target.files[0]);
                              if (url) {
                                const res = await updateReceiptByTransactionId(item.id, url);
                                setSubMitQuery(true);
                              }
                            }
                          }}
                        />
                      </>
                    ) : (
                      <></>
                    )}
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
        {Math.ceil(total.current / 10) > 1 ? (
          <div className="mx-auto mt-auto flex items-center re">
            <div
              onClick={() => {
                setPage(1);
                setSubMitQuery(true);
              }}
              className="mx-1.5 flex w-[25px] rounded-md h-[28px] bg-[#999] hover:bg-[#aaa] cursor-pointer">
              <Image
                alt="previous all"
                src={'/transition/btn_firstPages.png'}
                width={25}
                height={25}
                objectFit="contain"
                className="p-1.5"
              />
            </div>
            <div
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                  setSubMitQuery(true);
                }
              }}
              className="mx-1.5 flex w-[25px] rounded-md h-[28px] bg-[#999] hover:bg-[#aaa] cursor-pointer">
              <Image
                alt="previous all"
                src={'/transition/btn_prevPages.png'}
                width={25}
                height={25}
                objectFit="contain"
                className="p-1.5"
              />
            </div>

            {Array.from({ length: Math.ceil(total.current / 10) }, (_, index) => index + 1).map(
              (i) => (
                <span
                  onClick={() => {
                    setPage(i);
                    setSubMitQuery(true);
                  }}
                  className={classNames('mx-1 hover:deco cursor-pointer hover:underline', {
                    'text-[#0089c9] underline': i == page,
                  })}>
                  {i}
                </span>
              )
            )}

            <div
              onClick={() => {
                if (page < Math.ceil(total.current / 10)) {
                  setPage(page + 1);
                  setSubMitQuery(true);
                }
              }}
              className="mx-1.5 flex w-[25px] rounded-md h-[28px] bg-[#999] hover:bg-[#aaa] cursor-pointer">
              <Image
                alt="previous all"
                src={'/transition/btn_nextPages.png'}
                width={25}
                height={25}
                objectFit="contain"
                className="p-1.5"
              />
            </div>
            <div
              onClick={() => {
                setPage(Math.ceil(total.current / 10));
                setSubMitQuery(true);
              }}
              className="mx-1.5 flex w-[25px] rounded-md h-[28px] bg-[#999] hover:bg-[#aaa] cursor-pointer">
              <Image
                alt="previous all"
                src={'/transition/btn_lastPages.png'}
                width={25}
                height={25}
                objectFit="contain"
                className="p-1.5"
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TransactionView;
