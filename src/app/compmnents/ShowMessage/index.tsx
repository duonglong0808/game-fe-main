'use client';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/lib/redux/utilRedux';
import { cleanDataMessage } from '@/lib/redux/system/settingSys';

const cx = classNames.bind(styles);

export function ShowConfirmMessage({
  title,
  desc,
  onConfirm,
  onClose,
  textConfirm,
  textClose,
  isContentHtml = false,
  showIconClosed = false,
}: {
  title: string;
  desc: string;
  onConfirm: () => void;
  textConfirm: string;
  textClose: string;
  onClose?: () => void;
  isContentHtml?: boolean;
  showIconClosed?: boolean;
}): JSX.Element {
  const refDesc = useRef<HTMLSpanElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isContentHtml) {
      if (refDesc.current) {
        refDesc.current.innerHTML = desc;
      }
    }
  }, [isContentHtml]);

  return (
    <div className={cx('layer')}>
      <div
        className={cx('wrapper', 'rounded-lg', {
          'p-5 w-[400px]': showIconClosed,
          'w-[320px]': !showIconClosed,
        })}>
        <div
          className={cx('message__body', {
            'pb-[26px]': textClose || textConfirm,
          })}>
          <div className="flex relative justify-center">
            <h3
              className={cx('text-center mb-3 font-bold flex-1', {
                'text-base text-[#5aaaf3] border-b-2 border-[#e5e5e5] mb-1': showIconClosed,
                'text-lg mt-1': !showIconClosed,
              })}>
              {title}
            </h3>
            {showIconClosed ? (
              <Image
                onClick={() => dispatch(cleanDataMessage({}))}
                alt="close"
                src={'/icons/icon_close.png'}
                className="absolute object-contain w-5 top-0 right-1"
                width={30}
                height={36}
              />
            ) : (
              <></>
            )}
          </div>
          <span ref={refDesc} className={cx('message__desc')}>
            {desc}
          </span>
        </div>
        {textClose || textConfirm ? (
          <div className={cx('message__btns')}>
            {textClose && (
              <button className={cx('message__btn--close')} onClick={onClose}>
                {textClose}
              </button>
            )}
            {textConfirm && (
              <button className={cx('message__btn--confirm')} onClick={onConfirm}>
                {textConfirm}
              </button>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
