'use client';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LiveChat(): JSX.Element {
  const router = useRouter();

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.id = 'hs-script-loader';
  //   script.async = true;
  //   script.defer = true;
  //   script.src = '//js-na1.hs-scripts.com/46384536.js';
  //   document.head.appendChild(script);

  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js-na1.hs-scripts.com/46384536.js"></script>
      </Head>
      <main className="h-svh w-svw relative">
        <div id="hubspotForm" className="hubspotForm"></div>

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
          {/* <iframe allowFullScreen className="h-full w-full" src={process.env.LINK_CHAT}></iframe> */}
        </div>
      </main>
      {/* aaa */}
      <script
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src="//js-na1.hs-scripts.com/46384536.js"></script>
    </>
  );
}
