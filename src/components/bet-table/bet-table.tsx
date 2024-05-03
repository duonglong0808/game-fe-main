import React, { forwardRef, HTMLAttributes } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import type { SVGProps } from 'react';

const cx = classNames.bind(styles);

export function StreamlineBall(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 14 14" {...props}>
      <g fill="none" stroke="#ffe66b" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13m0-13v13"></path>
        <path d="M2.1 11.27a5 5 0 0 0 0-8.54m9.8 0a5 5 0 0 0 0 8.54"></path>
      </g>
    </svg>
  );
}
interface TableItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
  ratio: number;
  points?: number;
  name?: string;
  numberPlayer?: number;
}

const TableItem = forwardRef<HTMLDivElement, TableItemProps>(
  ({ children, name, className, points, ratio, ...otherProps }, ref) => (
    <div className={`${className} ${cx('table__item')}`} ref={ref} {...otherProps}>
      {name === undefined && points !== undefined ? (
        <div className={cx('dots')}>
          {Array.from({ length: 4 - points - 1 }, (_, index) => index + 1).map((n) => (
            <span className={cx('dots__item')} />
          ))}
          {Array.from({ length: points }, (_, index) => index + 1).map((n) => (
            <span className={cx('dots__item--red')} />
          ))}
          {points > 0 && points !== 4 && <span className={cx('dots__item--red')}>{points}</span>}
          {points === 0 && <span className={cx('dots__item')}>{points}</span>}
        </div>
      ) : (
        <p className={cx('table__item__name')}>{name}</p>
      )}
      <div>{`1:${ratio}`}</div>
      {/* {children} */}
      <div className={cx('table__item__points')}>
        <StreamlineBall />
        {children}
      </div>
    </div>
  )
);

export default TableItem;
