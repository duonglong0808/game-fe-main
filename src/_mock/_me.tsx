import { paths } from '@/routes/paths';
import {
  HiOutlineUser,
  HiOutlineCreditCard,
  HiOutlineLockClosed,
  HiOutlineInformationCircle,
  HiOutlineQuestionMarkCircle,
  HiOutlineDesktopComputer,
  HiOutlineFlag,
} from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsFileText } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { HiOutlineCloudArrowDown } from 'react-icons/hi2';
export const USER = {
  name: 'Nguyen Van',
  title: 'Developer',
  count: 0,
  icon: '/me/icon_level1.svg',
  rank: 'Đồng',
};

export const SIDEBARUSER = [
  {
    icon: HiOutlineUser,
    title: 'Tư liệu hội viên',
    href: paths.mobile.me,
  },
  {
    icon: HiOutlineCreditCard,
    title: 'Quản lý ngân hàng',
    href: paths.mobile.managerbank,
  },
  {
    icon: HiOutlineLockClosed,
    title: 'Thay đổi mật khẩu',
    href: paths.mobile.me,
  },
  {
    icon: IoSettingsOutline,
    title: 'Chuyển quỹ tự động',
    isDot: true,
    href: paths.mobile.me,
  },
  {
    title: 'Giao dịch',
    icon: BsFileText,
    children: [
      {
        title: 'Lịch sử giao dịch',
        href: paths.mobile.me,
      },
      {
        title: 'Lịch sử chuyển điểm',
        href: paths.mobile.me,
      },
      {
        title: 'Khuyến mại',
        href: paths.mobile.me,
      },
    ],
  },
];

export const SIDEBARSERVICE = [
  {
    icon: FiEdit,
    title: 'Khiếu nại',
    href: paths.mobile.me,
  },
  {
    icon: HiOutlineInformationCircle,
    title: 'Giới thiệu',
    href: paths.mobile.me,
  },
  {
    icon: HiOutlineQuestionMarkCircle,
    title: 'Câu hỏi thường gặp',
    href: paths.mobile.me,
  },
  {
    icon: HiOutlineCloudArrowDown,
    title: 'APP',
    children: [
      {
        title: 'Chia sẻ APP',
        href: paths.mobile.me,
      },
      {
        title: 'Tải APP',
        href: paths.mobile.me,
      },
    ],
    isDot: true,
  },
  {
    icon: HiOutlineDesktopComputer,
    title: 'Trở về PC',
    href: paths.mobile.me,
  },
  {
    title: 'Hướng dẫn người mới',
    icon: HiOutlineFlag,
    href: paths.mobile.me,
  },
];

export const CARDS = [
  {
    id: 1,
    name: 'ABC',
    icon: '/me/manager/icon_bank_1003.png',
    bg: '/me/manager/banklistBg.jpg',
    lastNumber: '1234',
  },
];
