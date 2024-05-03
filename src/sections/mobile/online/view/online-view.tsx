import MobileLayout from '@/layouts/mobile/layout';
import Image from 'next/image';
export default function OnlineView() {
  return (
    <MobileLayout title="Thanh toán trực tuyến">
      <div className="flex-1 overflow-auto bg-gray-300 flex flex-col items-center w-full divide-y">
        <div className="text-sky-500 bg-white w-full text-base py-2 px-4">
          <div className="flex items-center gap-2 border border-sky-500 w-fit p-2 rounded-sm">
            <Image src={'/member/withdraw/btn_eBanking.svg'} alt="" width={30} height={30} />
            <p>E-Banking</p>
          </div>
        </div>

        <div className="flex items-center text-lg bg-white w-full px-4">
          <p className="text-black w-[120px]">Số điểm nạp</p>
          <input
            type="text"
            className="border-none outline-none py-2 text-gray-700 focus:border-none focus:ring-0 text-lg"
            placeholder="200 ~ 1000000"
          />
        </div>
        <div className="flex items-center text-lg bg-white w-full px-4 py-2 text-red-500">
          <p className="text-red-500 w-[120px]">Thực tế</p>
          <div className="flex-1 flex items-center justify-between text-lg px-2">
            <p className="font-bold">0</p>
            <p>VNĐ</p>
          </div>
        </div>

        <button className="w-[90%] text-center bg-gray-400 p-3 m-4 text-white rounded-sm text-lg">
          Xác nhận
        </button>
        <div className="w-full flex items-center justify-center gap-2 bg-white text-black p-3">
          <Image src={'/member/withdraw/icon_maintain.svg'} alt="" width={20} height={20} />
          <p>Chú ý</p>
        </div>
        <ol className="list-decimal w-full bg-white text-black text-base pl-8 py-2">
          <li>Chỉ chấp nhận tài khoản chuyển tiền trùng với họ tên đăng ký.</li>
          <li>Để tăng tốc độ cộng điểm, vui lòng đến mục lịch sử giao dịch tải biên lai lên.</li>
        </ol>
      </div>
    </MobileLayout>
  );
}
