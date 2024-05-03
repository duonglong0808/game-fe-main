'use client';

import { useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const Chips = [
  {
    value: 10,
    off: '/game/chips/chip_10.png',
    on: '/game/chips/chip_10_on_stand.png',
  },
  {
    value: 100,
    off: '/game/chips/chip_100.png',
    on: '/game/chips/chip_100_on_stand.png',
  },
  {
    value: 200,
    off: '/game/chips/chip_200.png',
    on: '/game/chips/chip_200_on_stand.png',
  },
  {
    value: 500,
    off: '/game/chips/chip_500.png',
    on: '/game/chips/chip_500_on_stand.png',
  },
  {
    value: 1000,
    off: '/game/chips/chip_1k.png',
    on: '/game/chips/chip_1k_on_stand.png',
  },
  {
    value: 5000,
    off: '/game/chips/chip_5k.png',
    on: '/game/chips/chip_5k_on_stand.png',
  },
  {
    value: 10000,
    off: '/game/chips/chip_10k.png',
    on: '/game/chips/chip_10k_on_stand.png',
  },
  {
    value: 50000,
    off: '/game/chips/chip_50k.png',
    on: '/game/chips/chip_50k_on_stand.png',
  },
];
export default function ChipsList({ setChips }: { setChips: (num: number) => void }) {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(5);

  const [disableLeft, setDisableLeft] = useState(true);
  const [disableRight, setDisableRight] = useState(false);

  const [activeChip, setActiveChip] = useState(-1);

  const [listChips, setListChips] = useState(Chips.slice(left, right));

  const handleLeft = () => {
    if (!disableLeft) {
      setLeft((prev) => {
        if (prev === 1) {
          setDisableLeft(true);
        }
        return prev - 1;
      });
      setRight((prev) => {
        return prev - 1;
      });
      setListChips(Chips.slice(left - 1, right - 1));
      setChips(listChips[activeChip - 1].value);
      setDisableRight(false);
    }
  };

  const handleRight = () => {
    if (!disableRight) {
      setLeft((prev) => {
        if (prev === 1) {
          setDisableLeft(false);
        }
        return prev + 1;
      });
      setRight((prev) => {
        if (prev === Chips.length - 1) {
          setDisableRight(true);
        }
        return prev + 1;
      });
      setListChips(Chips.slice(left + 1, right + 1));
      setChips(listChips[activeChip + 1].value);
      setDisableLeft(false);
    }
  };

  return (
    <div className={cx('chips-list')}>
      <img
        src={disableLeft ? '/game/chips/left_off.png' : '/game/chips/left_on.png'}
        className={cx('chips-list__control')}
        onClick={handleLeft}
      />
      <div className={cx('chips-list__chips')}>
        {listChips.map((chip, index) => (
          <img
            src={activeChip == index ? chip.on : chip.off}
            className={cx('chips-list__chip-item')}
            key={index}
            onClick={() => {
              setChips(chip.value);
              setActiveChip(index);
            }}
          />
        ))}
      </div>
      <img
        src={disableRight ? '/game/chips/right_off.png' : '/game/chips/right_on.png'}
        className={cx('chips-list__control')}
        onClick={handleRight}
      />
    </div>
  );

  // return (
  //   <div className={cx('chips-list')}>
  //     <img src="/game/chips/left_on.png" className={cx('chips-list__control')} />
  //     <div className={cx('chips-list__chips')}>
  //       <img src="/game/chips/chip_10.png" className={cx('chips-list__chip-item')} />
  //       <img src="/game/chips/chip_100.png" className={cx('chips-list__chip-item')} />
  //       <img src="/game/chips/chip_200.png" className={cx('chips-list__chip-item')} />
  //       <img src="/game/chips/chip_500.png" className={cx('chips-list__chip-item')} />
  //       <img src="/game/chips/chip_1k.png" className={cx('chips-list__chip-item')} />
  //       {/* <img src="/game/chips/chip_5k.png" />
  //       <img src="/game/chips/chip_10k.png" />
  //       <img src="/game/chips/chip_50k.png" /> */}
  //     </div>
  //     <img src="/game/chips/right_on.png" className={cx('chips-list__control')} />
  //   </div>
  // );
}
