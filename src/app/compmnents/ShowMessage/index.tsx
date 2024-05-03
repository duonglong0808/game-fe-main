import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export function ShowConfirmMessage({ title, desc, onConfirm, onClose, textConfirm, textClose }: { title: string; desc: string; onConfirm: () => void; textConfirm: string; textClose: string; onClose?: () => void }): JSX.Element {
  return (
    <div className={cx('layer')}>
      <div className={cx('wrapper', 'rounded-lg')}>
        <div className={cx('message__body')}>
          <h3 className="text-center text-lg mb-3 font-bold">{title}</h3>
          <span className={cx('message__desc')}>{desc}</span>
        </div>
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
      </div>
    </div>
  );
}
