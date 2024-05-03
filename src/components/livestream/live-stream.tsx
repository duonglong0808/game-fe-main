'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import TableItem from '@/components/table-item';
import { BaseAxios } from '@/utils';
import ToolTipGame from '../tool-tip-game';
import { ICheckHover } from '@/types/positions';
import { ChipsList } from '../chips-list';

const cx = classNames.bind(styles);

export default function LiveStream({ src }: { src: string }) {
  const [hoverData, setHoverData] = useState<ICheckHover>({
    isHover: false,
    position: { x: 0, y: 0 },
  });
  const [curChips, setCurChips] = useState<number>(0);
  console.log(curChips);
  const videoRef = useRef<HTMLVideoElement>(null);
  //   const [src, setSrc] = useState('http://103.75.184.190:8080/hls/test1.m3u8');

  const chooseBet = async (position: number) => {
    const axios = new BaseAxios(process.env.API_URL_DICE);
    const transaction = localStorage.getItem('transaction');
    const gameDiceId = localStorage.getItem('gameDiceId');
    const diceDetailId = localStorage.getItem('diceDetailId');

    if (transaction && gameDiceId) {
      try {
        const requestBet = await axios.post('/history-play', {
          transaction,
          gameDiceId,
          diceDetailId,
          point: 50,
          answer: position,
        });
        alert('Đặt cược thành công');
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // PlaybackRateController
      // This will run in safari, where HLS is supported natively
      video.src = src;
      video.controls = true;
    } else if (Hls.isSupported()) {
      // This will run in all other modern browsers
      const hls = new Hls({ maxLiveSyncPlaybackRate: 0 });
      hls.loadSource(src);
      // const player = new Plyr(video, defaultOptions);
      hls.attachMedia(video);

      // Bắt đầu phát video ngay khi có tín hiệu
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((error) => {
          console.error('Error starting playback:', error);
        });
      });
    } else {
      console.error(
        'This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'
      );
    }
  }, [videoRef]);

  return (
    <div className={cx('live_wrapper')}>
      <video className={cx('live_container')} id="video" ref={videoRef} autoFocus></video>
      {/* <iframe
        width="100%"
        height="100%"
        className={cx('live_container')}
        src="https://www.youtube.com/embed/tgbNymZ7vqY"
      /> */}

      <div className={cx('live_action')}>
        <div className={cx('d3')}>
          <div className={cx('d3__col')}>
            <TableItem
              className={cx('d3__col__row--1')}
              points={0}
              ratio={0}
              onClick={() => {
                chooseBet(1);
              }}>
              <p>11</p>
            </TableItem>
            <TableItem
              className={cx('d3__col__row--1')}
              points={1}
              ratio={0}
              onClick={() => {
                chooseBet(2);
              }}>
              <p>11</p>
            </TableItem>
            <TableItem
              className={cx('d3__col__row--1')}
              points={2}
              ratio={0}
              onClick={() => {
                chooseBet(3);
              }}>
              <p>11</p>
            </TableItem>
          </div>
          <div className={cx('d3__col')}>
            <TableItem
              className={cx('d3__col__row--2')}
              points={0}
              ratio={0}
              name={'Chẵn'}
              onClick={() => {
                chooseBet(4);
              }}>
              <p>11</p>
            </TableItem>
            <TableItem
              className={cx('d3__col__row--2')}
              points={0}
              ratio={0}
              name={'Xỉu'}
              onHover={setHoverData}
              onClick={() => {
                chooseBet(5);
              }}>
              <p>11</p>
            </TableItem>
          </div>
          <div className={cx('d3__col')}>
            <TableItem
              className={cx('d3__col__row--2')}
              points={0}
              ratio={0}
              name={'Lẻ'}
              onClick={() => {
                chooseBet(6);
              }}>
              <p>11</p>
            </TableItem>
            <TableItem
              className={cx('d3__col__row--2')}
              points={0}
              ratio={0}
              name={'Tài'}
              isLeft={true}
              onHover={setHoverData}
              onClick={() => {
                chooseBet(7);
              }}>
              <p>11</p>
            </TableItem>
          </div>
          <div className={cx('d3__col')}>
            <TableItem
              className={cx('d3__col__row--1')}
              points={4}
              ratio={0}
              onClick={() => {
                chooseBet(8);
              }}>
              <p>11</p>
            </TableItem>
            <TableItem
              className={cx('d3__col__row--1')}
              points={3}
              ratio={0}
              onClick={() => {
                chooseBet(9);
              }}>
              <p>11</p>
            </TableItem>
            <TableItem
              className={cx('d3__col__row--1')}
              points={-1}
              ratio={0}
              onClick={() => {
                chooseBet(10);
              }}>
              <p>11</p>
            </TableItem>
          </div>
        </div>
        <div className={cx('live_action__control')}>
          <div className={cx('live_action__control--left')}>
            <button className={cx('btn-primary')}>Chuẩn</button>
            <button>Cao</button>
            <p className={cx('live_action__control--left__cuoc')}> Cược: </p>
            <p className={cx('live_action__control--left__value')}> 0 </p>
          </div>
          <div className={cx('live_action__control--right')}>
            <div className={cx('right__coins')}>
              <ChipsList setChips={setCurChips} />
            </div>
            <div className={cx('right__action')}>
              <img className={cx('right__action__phinh')} src={'/game/chips/chip_10k.png'} />
              <img className={cx('right__action__auto')} src={'/game/chips/chip_10k.png'} />
            </div>
          </div>
        </div>

        {hoverData.isHover && (
          <ToolTipGame position={hoverData.position}>
            <p>test</p>
          </ToolTipGame>
        )}
      </div>
    </div>
  );
}
