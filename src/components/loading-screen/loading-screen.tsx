'use client';

import { Progress, Spinner } from 'flowbite-react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './loading-screen.module.scss';
// import { useIsResponsive } from '@/routes/hooks';
const cx = classNames.bind(styles);

export default function LoadingScreen() {
  // const isResponsive = useIsResponsive();
  const isResponsive = true;

  return (
    <div className={cx('loading_screen')}>
      <img className={cx('loading_screen__deader')} src={'/loading/img_txt.png'} alt="girls" />
      <div className={cx('loading_screen__girls')}>
        <img
          className={cx('loading_screen__girls-image')}
          src={`${isResponsive ? '/loading/img_loading_girl.png' : '/loading/img_LD_model.png'}`}
          alt="girls"
        />

        <div className={cx('loading_screen__girls__progress')}>
          <p>45%</p>
          <p>Loading.. </p>
          <Progress
            progress={45}
            className={`${isResponsive ? 'w-[200px]' : 'w-[500px]'}`}
            color="yellow"
          />
        </div>
      </div>
    </div>
  );
}
