'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from '../Slider/styles.module.scss';

const cx = classNames.bind(styles);
function Carousel() {
  const [indexSlider, setIndexSlider] = useState(0);

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
    <div className="lg:hidden relative h-[150px] overflow-hidden">
      {images.map((image, index) => (
        <img
          alt={`Slider-${index}`}
          key={index}
          src={image}
          className={cx('slider-item', { 'slider-active': indexSlider == index })}
        />
      ))}

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2  flex gap-2 items-center">
        {iconSlider.map((icon, index) => (
          <span
            onMouseEnter={() => setIndexSlider(index)}
            className={cx(' bg-white rounded-full h-1.5 w-1.5 shadow-lg', {
              'shadow-lg w-2 h-2': indexSlider == index,
            })}
            key={index}
          />
        ))}
      </div>
      <div className="absolute inset-[-10px] z-10 bg-gradient-to-b from-white via-transparent"></div>
      <div className="absolute inset-[-10px] z-10 bg-gradient-to-t from-white via-transparent"></div>
    </div>
  );
}

export default Carousel;
