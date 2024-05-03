import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

interface PropsFrom {
  value: string;
  minlength: number;
  maxLength: number;
  required: boolean;
  type: string;
  placeholder: string;
  textError: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function FromGroup({ name, maxLength, minlength, onChange, placeholder, required, label, textError, type, value, onBlur }: PropsFrom) {
  return (
    <div className={cx('register-body__input')}>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} value={value} onChange={(e) => onChange(e.target.value)} minLength={minlength} maxLength={maxLength} placeholder={placeholder} required={required} />
      <span className={cx('register-body__text--err')}>{textError}</span>
    </div>
  );
}
