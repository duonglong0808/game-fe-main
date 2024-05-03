'use client';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './styles.module.scss';
import { Sliders } from './components/Slider';
import SideLeft from './components/SideLeft';
import SideRight from './components/SideRight';

const cx = classNames.bind(styles);

export default function Home() {
  const [index, setIndex] = useState(0);
  return (
    <main className="max-lg:flex-1 ">
      <div className="max-lg:hidden">
        <Sliders />
        <div className={cx('game-type')}>
          <div
            className={cx(
              'flex container-custom margin-left-right justify-between uppercase text-center',
              'game-type__wrapper'
            )}>
            <div className={cx('game__item', 'game__item-1')}>
              <span> Quay thưởng trăm triệu</span>
            </div>
            <div className={cx('game__item', 'game__item-2')}>
              <span>COOL-IN LIVE</span>
            </div>
            <div className={cx('game__item', 'game__item-3')}>
              <span>Đối tác LaLiga</span>
            </div>
            <div className={cx('game__item', 'game__item-4')}>
              <span>Phim ảnh</span>
            </div>
            <div className={cx('game__item', 'game__item-5')}>
              <span>Hậu trường hoạt động</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden h-full bg-white text-[#535867] flex gap-2 p-2">
        <div className="flex-[0.2] h-full">
          <SideLeft index={index} setIndex={setIndex} />
        </div>
        <div className="flex-[0.8] h-full">
          <SideRight index={index} />
        </div>
      </div>
    </main>
  );
}
