import React, { forwardRef, HTMLAttributes } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import type { SVGProps } from 'react';

const cx = classNames.bind(styles);

interface TableResultProps extends HTMLAttributes<HTMLDivElement> {
  totalRows: number;
  totalCols: number;
  data: [];
  type: string;
  onClickItem?: (index: number) => void;
}

const TableResult = forwardRef<HTMLDivElement, TableResultProps>(
  ({ className, totalRows, totalCols, type, onClickItem, ...otherProps }, ref) => (
    <div className={`${className} ${cx('table_results')}`} ref={ref} {...otherProps}>
      <table className={cx('table_results__table')}>
        <tbody>
          {Array.from({ length: totalRows }, (_, index) => index + 1).map((n) => (
            <tr key={n}>
              {Array.from({ length: totalCols }, (_, index) => index + 1).map((n) => (
                <td className={cx('table_results__col')} key={n}>
                  {type == 'chan-le' ? (
                    <div className={cx('table_results__col--CL')}>L</div>
                  ) : (
                    <div className={cx('table_results__col--ball')}>3</div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={cx('table_results__type')}>{type}</div>
    </div>
  )
);

export default TableResult;
