'use client';
import classNames from 'classnames';
import { Popover } from 'flowbite-react';
type Props = {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AssetPopover({ children, open, setOpen }: Props) {
  const content = (
    <div className="animate-show-down z-50 h-[70vh] w-[70vw] rounded-sm bg-gray-700 text-white overflow-hidden flex flex-col justify-between">
      <div className="flex-1 p-2 overflow-auto divide-y divide-gray-400">
        {Array.from({ length: 30 }).map((_, i) => (
          <Item key={i} title="Test" count={i % 5} colorCount="text-green-400" />
        ))}
      </div>
      <div className="flex flex-col gap-2 p-2 bg-gray-800 divide-y divide-gray-400">
        <Item
          title="Tổng số điểm"
          count={5}
          colorTitle="text-yellow-400"
          colorCount="text-yellow-400"
        />
        <Item
          title="Quà tặng miễn phí"
          count={0}
          colorTitle="text-purple-400"
          colorCount="text-purple-400"
        />
        <button className="p-2 bg-yellow-400 rounded-full">Chuyển hết về tài khoản chính</button>
      </div>
    </div>
  );
  return (
    <Popover content={content} open={open} onOpenChange={setOpen}>
      {children}
    </Popover>
  );
}
type ItemProps = {
  title: string;
  count: number;
  colorTitle?: string;
  colorCount?: string;
};
const Item = ({ title, count, colorTitle, colorCount }: ItemProps) => {
  return (
    <div className="flex gap-2 text-sm py-1 pt-2">
      <p className={classNames('flex-[0.4] border-r border-gray-400 ', `${colorTitle} !important`)}>
        {title}
      </p>
      <div className="flex-[0.6] flex justify-between ">
        <p className={classNames('text-base', `${colorCount} !important`)}>{count}</p>
        {count > 0 && <button className="rounded-md bg-sky-400 p-1">Chuyển về</button>}
      </div>
    </div>
  );
};
