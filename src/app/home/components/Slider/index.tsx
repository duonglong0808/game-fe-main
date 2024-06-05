'use client';
import Image from 'next/image';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeLow } from '@fortawesome/free-solid-svg-icons';

function formatNumber(number: number): string {
  number = +number.toFixed(1);
  const numberString = number.toString();

  // Tách phần nguyên và phần thập phân (nếu có)
  const [integerPart, decimalPart] = numberString.split('.');

  // Thêm dấu chấm sau mỗi ba chữ số trong phần nguyên
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Nếu có phần thập phân, kết hợp phần nguyên và phần thập phân với dấu phẩy
  if (decimalPart) {
    return `${formattedInteger},${decimalPart}`;
  } else {
    return formattedInteger;
  }
}

const cx = classNames.bind(styles);

function NumberAutoIncrement(): JSX.Element {
  const numberBac = useRef(1934321.5);
  const numberCd = useRef(1534321.5);
  const [render, setRender] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      numberBac.current = +numberBac.current + Math.random() * 6;
      numberCd.current = +numberCd.current + Math.random() * 6;
      setRender(!render);
    }, 10000);

    const handleScroll = () => {
      // Lấy số lượng pixel đã cuộn
      const scrolledPixels = window.scrollY;

      const boxSupportsElement = document.querySelector(`.${cx('box-supports')}`) as HTMLElement;
      console.log('🚀 ~ handleScroll ~ boxSupportsElement:', boxSupportsElement);
      if (boxSupportsElement) {
        if (scrolledPixels >= 0 && scrolledPixels <= 105)
          boxSupportsElement.style.top = `${105 - scrolledPixels}px`;
        else boxSupportsElement.style.top = '0px';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [render]);

  return (
    <div className={cx('slider-jackpot__list')}>
      <div className={cx('slider-jackpot__item', 'slider-jackpot__item--bac')}>
        <Image src="/jackBac.png" width={150} height={43} alt="ppp" />
        <div className={cx('slider-jackpot__item--text', 'text-xs')}>
          <div className="flex ml-4">
            {formatNumber(+numberBac.current)
              .split('')
              .map((item, index) => (
                <span key={index} className={cx('slider-jackpot__number', 'text-3xl')}>
                  {item}
                </span>
              ))}
          </div>
        </div>
      </div>
      <div className={cx('slider-jackpot__item', 'slider-jackpot__item--cd')}>
        <Image src="/jackCD.png" width={150} height={43} alt="ppp" />
        <div className={cx('slider-jackpot__item--text', 'text-xs')}>
          <div className="flex ml-4">
            {formatNumber(+numberCd.current)
              .split('')
              .map((item, index) => (
                <span key={index} className={cx('slider-jackpot__number', 'text-3xl')}>
                  {item}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sliders(): JSX.Element {
  let [indexSlider, setIndexSlider] = useState(0);

  const images = [
    '/slides/slider1.jpg',
    '/slides/slider2.jpg',
    '/slides/slider3.jpg',
    '/slides/slider4.jpg',
    '/slides/slider5.jpg',
    '/slides/slider6.jpg',
    '/slides/slider7.jpg',
    '/slides/slider8.jpg',
    '/slides/slider9.jpg',
  ];
  const iconSlider = [
    '/slides/slider1-icon.jpg',
    '/slides/slider2-icon.jpg',
    '/slides/slider3-icon.jpg',
    '/slides/slider4-icon.jpg',
    '/slides/slider5-icon.jpg',
    '/slides/slider6-icon.jpg',
    '/slides/slider7-icon.jpg',
    '/slides/slider8-icon.jpg',
    '/slides/slider9-icon.jpg',
  ];

  useEffect(() => {
    const nextSlider = setTimeout(() => {
      if (indexSlider == images.length - 1) {
        setIndexSlider(0);
      } else {
        setIndexSlider((pre) => ++pre);
      }
    }, 3000);

    return () => {
      clearInterval(nextSlider);
    };
  }, [indexSlider]);

  return (
    <div className={cx('sliders')}>
      {images.map((image, index) => (
        <img
          alt={`Slider-${index}`}
          key={index}
          src={image}
          className={cx('slider-item', { 'slider-active': indexSlider == index })}
        />
      ))}

      <div className={cx('slider-image', 'container-custom flex justify-end items-center')}>
        {iconSlider.map((icon, index) => (
          <Image
            onMouseEnter={() => setIndexSlider(index)}
            className={cx('slider-image__item', 'rounded-lg', {
              'slider-image__item--active': indexSlider == index,
            })}
            alt={`Icon-slider-${index}`}
            src={icon}
            key={index}
            width={40}
            height={40}
          />
        ))}
      </div>

      <div className={cx('slider-bottom')}>
        <div className="container-custom h-full flex items-center">
          <div className={cx('box-notification', 'w-fit')}>
            <FontAwesomeIcon icon={faVolumeLow} className={cx('box-notification__icon')} />
            <span className={cx('box-notification__text')}>Thông báo</span>
          </div>
          <div className={cx('marquee-container')}>
            <span className={cx('marquee')}>
              <strong>
                Đối tác duy nhất của giải Laliga ở khu vực Châu Á, hội tụ những Dealer phát bài gợi
                cảm và nổi tiếng đến từ nhiều quốc gia khác nhau, nơi duy nhất ở Châu Á mở cửa tham
                quan hiện trường thực tế, trang mạng giải trí trực tuyến đỉnh cao, 24h luôn đồng
                hành cùng quý khách!
              </strong>
            </span>
          </div>
          <NumberAutoIncrement />
        </div>
      </div>

      <div className={cx('box-supports', 'flex flex-col justify-center items-center')}>
        <div className={cx('box-supports__item', 'text-center')}>
          <div
            style={{
              background: 'url(/icon_indexImg.png) no-repeat  2px -744px',
              width: '40px',
              height: '40px',
            }}></div>
          <span className={cx('box-support__item--text', 'text-xs')}>Hỗ trợ</span>
          <div className={cx('box-support__item--bg')}></div>
        </div>
        <div className={cx('box-supports__item', 'text-center')}>
          <div
            style={{
              background: 'url(/icon_indexImg.png) no-repeat  -253px -744px',
              width: '40px',
              height: '40px',
            }}></div>
          <span className={cx('box-support__item--text', 'text-xs')}>Telegram</span>
          <div className={cx('box-support__item--bg')}></div>
        </div>
        <div className={cx('box-supports__item', 'text-center')}>
          <div
            style={{
              background: 'url(/icon_indexImg.png) no-repeat  -201px -748px',
              width: '40px',
              height: '40px',
            }}></div>
          <span className={cx('box-support__item--text', 'text-xs')}>Viber</span>
          <div className={cx('box-support__item--bg')}></div>
        </div>
        <div className={cx('box-supports__item', 'text-center')}>
          <div
            style={{
              background: 'url(/icon_indexImg.png) no-repeat  -48px -744px',
              width: '40px',
              height: '40px',
            }}></div>
          <span className={cx('box-support__item--text', 'text-xs')}>Điện thoại</span>
          <div className={cx('box-support__item--bg')}></div>
        </div>
        <div className={cx('box-supports__item', 'text-center')}>
          <div
            style={{
              background: 'url(/icon_indexImg.png) no-repeat  -100px -744px',
              width: '40px',
              height: '40px',
            }}></div>
          <span className={cx('box-support__item--text', 'text-xs')}>Hỗ trợ từ xa</span>
          <div className={cx('box-support__item--bg')}></div>
        </div>
        <div className={cx('box-supports__item', 'text-center')}>
          <div
            style={{
              background: 'url(/icon_indexImg.png) no-repeat  -156px -745px ',
              width: '40px',
              height: '40px',
            }}></div>
          <span className={cx('box-support__item--text', 'text-xs')}>khiếu lại</span>
          <div className={cx('box-support__item--bg')}></div>
        </div>

        <Image
          alt="Laliga"
          src={'/icon_CAO.png'}
          width={115}
          height={104}
          style={{
            position: 'absolute',
            right: '22px',
            bottom: '-146px',
            // width: '115px',
            // height: '104px',
            scale: 1.4,
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
}
