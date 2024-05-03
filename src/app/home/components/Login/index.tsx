import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { handleLoginAccount } from './handleLogin';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { ShowConfirmMessage } from '@/app/compmnents/ShowMessage';
import { cleanDataMessage } from '@/lib/redux/system/settingSys';

const cx = classNames.bind(styles);

export function Login(): JSX.Element {
  const [account, setAccount] = useState('');
  const [accountError, setAccountError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { titleMessage, descMessage, textClose, textConfirm } = useAppSelector((state) => state.settingApp);
  // console.log('🛫🛫🛫 ~ file: index.tsx:20 ~ Login ~ titleMessage, descMessage:', titleMessage, descMessage);
  const dispatch = useAppDispatch();

  const handleCloseLogin = () => {
    setAccount('');
    setPassword('');
    const boxLogin = document.getElementById(`wrapper-login`);
    if (boxLogin) {
      boxLogin.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  const handleOpenRegister = () => {
    const boxLogin = document.getElementById(`wrapper-login`);
    const boxRegister = document.getElementById(`wrapper-register`);
    if (boxRegister && boxLogin) {
      boxLogin.style.display = 'none';
      boxRegister.style.display = 'block';
    }
  };

  const handleConfirmMessage = () => {
    setPassword('');
    dispatch(cleanDataMessage({}));
  };

  return (
    <div className={cx('register-layer')}>
      <div className={cx('register-wrapper')}>
        <div className={cx('register__header')}>
          <h2 className="flex-1">Đăng nhập hội viên</h2>
          <FontAwesomeIcon icon={faXmark} className={cx('register__header--icon')} onClick={handleCloseLogin} />
        </div>
        <form className={cx('register__body')} onSubmit={(e) => e.preventDefault()}>
          <div className={cx('register-body__input')}>
            <label htmlFor="account">Tài khoản</label>
            <input
              type="text"
              id="account-register"
              value={account}
              onBlur={() => {
                if (account.length < 4 || account.length > 10) setAccountError('Vui lòng nhập từ 4 - 10 ký tự');
                else accountError && setAccountError('');
              }}
              onChange={(e) => {
                setAccount(e.target.value.toUpperCase());
                accountError && setAccountError('');
              }}
              minLength={4}
              maxLength={10}
              placeholder="4 ~ 10 ký tự chữ và số"
            />
            <span className={cx('register-body__text--err', 'text-xs')}>{accountError}</span>
          </div>

          <div className={cx('register-body__input')}>
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password-login"
              value={password}
              onBlur={() => {
                if (password.length < 6 || password.length > 10) setPasswordError('Vui lòng nhập từ 6 - 10 ký tự');
                else setPasswordError('');
              }}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              minLength={6}
              maxLength={10}
              placeholder="6 ~ 10 ký tự chữ và số"
            />
            <span className={cx('register-body__text--err', 'text-xs')}>{passwordError}</span>
            <span
              className={cx('register-body__icon-eye')}
              onClick={(e) => {
                const input = document.getElementById('password-login');
                const eye = e.target as HTMLElement;

                if (input) {
                  eye.classList.toggle(cx('register-body__icon-eye--show'));
                  if (input.getAttribute('type') === 'password') input.setAttribute('type', 'text');
                  else input.setAttribute('type', 'password');
                }
              }}></span>
          </div>

          <div className={cx('register-body__option')}>
            <span className={cx('register-body__option--register')} onClick={handleOpenRegister}>
              Đăng ký!
            </span>
            <span className={cx('register-body__option--forgot')}>Quên mật khẩu?</span>
          </div>

          <button
            type="submit"
            // ref={submit}
            disabled={account.length < 4 || account.length > 10 || password.length < 6 || password.length > 10}
            onClick={async (e) => {
              const btn = e.target as HTMLButtonElement;
              btn.disabled = true;
              await handleLoginAccount(account, password, handleCloseLogin, dispatch);
            }}
            className={cx('register-body__submit', 'disabled:bg-stone-400 disabled:cursor-not-allowed')}>
            Đăng nhập
          </button>
        </form>
      </div>

      {titleMessage && descMessage && <ShowConfirmMessage textClose={textClose} textConfirm={textConfirm} title={titleMessage} desc={descMessage} onConfirm={handleConfirmMessage} />}
    </div>
  );
}
