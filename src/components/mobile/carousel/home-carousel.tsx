'use client';
import { Carousel } from 'flowbite-react';
import { images } from '@/_mock/_carousel';
import Image from 'next/image';
import { Flowbite } from 'flowbite-react';
import { configCarousel } from './style';
export default function HomeCarousel() {
  return (
    <div className="relative h-[166px] overflow-hidden">
      <Flowbite theme={{ theme: configCarousel }}>
        <Carousel>
          {images.map((image) => (
            <Image
              key={image}
              src={image}
              alt="..."
              width={200}
              height={500}
              className="object-cover"
            />
          ))}
        </Carousel>
      </Flowbite>
      <div className="absolute top-0 left-0 right-0 h-[30%]  z-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0  h-[30%] z-20 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
