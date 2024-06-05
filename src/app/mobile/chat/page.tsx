'use client';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

export default function LiveChat(): JSX.Element {
  const router = useRouter();

  return (
    <main className="h-svh w-svw relative">
      <div className="absolute top-0 left-0 right-0 p-[20px] bg-[#124f7f] z-10 mx-[1px]">
        <div
          onClick={() => {
            console.log('aaa');
            router.replace('/');
          }}
          className="absolute top-0 bottom-0 left-0 flex items-center">
          <FontAwesomeIcon icon={faChevronLeft} className="ml-3 w-[14px] text-white" />
        </div>
        <h3 className="text-center text-white font-medium">Chăm sóc khách hàng</h3>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 ">
        <iframe allowFullScreen className="h-full w-full" src={process.env.LINK_CHAT}></iframe>
      </div>
    </main>
  );
}
