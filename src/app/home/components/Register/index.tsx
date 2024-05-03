import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState } from 'react';
import { isValidPhoneNumber } from '@/utils';
import { handleCheckCode, handleCreateAccount, handleSendSms } from './handleRedister';
import { ShowConfirmMessage } from '@/app/compmnents/ShowMessage';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { cleanDataMessage, setMessageApp } from '@/lib/redux/system/settingSys';

const cx = classNames.bind(styles);

export function Register(): JSX.Element {
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [agentID, setAgentID] = useState('');
  const [account, setAccount] = useState('');
  const [accountError, setAccountError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  // redux
  const { titleMessage, descMessage, textClose, textConfirm } = useAppSelector((state) => state.settingApp);
  const dispatch = useAppDispatch();
  const setMessageScreenRegister = (title: string, message: string) => {
    dispatch(setMessageApp({ titleMessage: title, descMessage: message, textClose: 'Thoát', textConfirm: 'Xác Nhận' }));
  };

  const handleCloseRegister = () => {
    const boxRegister = document.getElementById(`wrapper-register`);
    if (boxRegister) {
      boxRegister.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  const handleCloseMessage = () => {
    dispatch(cleanDataMessage({}));
    handleCloseRegister();
  };

  const handleConfirmMessage = () => {
    dispatch(cleanDataMessage({}));
  };

  return (
    <div className={cx('register-layer')}>
      <div className={cx('register-wrapper')}>
        <div className={cx('register__header')}>
          <h2 className="flex-1">Đăng ký hội viên</h2>
          <FontAwesomeIcon
            icon={faXmark}
            className={cx('register__header--icon')}
            onClick={() => {
              if (agentID || account || name || password || phoneNumber) setMessageScreenRegister('Tin nhắn', 'Bạn đăng ký chưa hoàn tất, có tiếp tục hay không？              ');
              else handleCloseRegister();
            }}
          />
        </div>
        <form className={cx('register__body')} onSubmit={(e) => e.preventDefault()}>
          <div className={cx('register-body__input')}>
            <label htmlFor="agentID">Tài khoản đại lý</label>
            <input type="text" id="agentID" value={agentID} onChange={(e) => setAgentID(e.target.value)} placeholder="Bỏ qua nếu không có đại lý giới thiệu" />
          </div>

          <div className={cx('register-body__input')}>
            <label htmlFor="AgentID">Tài khoản</label>
            <input
              type="text"
              id="account"
              value={account}
              onBlur={() => {
                if (account.length < 4 || account.length > 10) setAccountError('Vui lòng nhập từ 4 - 10 ký tự');
                else setAccountError('');
              }}
              onChange={(e) => {
                setAccount(e.target.value.toUpperCase());
                setAccountError('');
              }}
              minLength={4}
              maxLength={10}
              placeholder="4 ~ 10 ký tự chữ và số"
            />
            <span className={cx('register-body__text--err', 'text-xs')}>{accountError}</span>
          </div>
          <div className={cx('register-body__input')}>
            <label htmlFor="nickName">Biệt danh</label>
            <input
              type="text"
              id="nickname"
              value={name}
              onBlur={() => {
                if (name.length > 8) setNameError('Vui lòng nhập tối đa 10 ký tự');
                else setNameError('');
              }}
              onChange={(e) => {
                setName(e.target.value);
                setNameError('');
              }}
              maxLength={8}
              placeholder="Nhập tối đa 8 ký tự"
            />
            <span className={cx('register-body__text--err', 'text-xs')}>{nameError}</span>
          </div>
          <div className={cx('register-body__input', 'register-body__input--password')}>
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onBlur={() => {
                if (password.length < 6 || password.length > 10) setPasswordError('Vui lòng nhập từ 4 - 10 ký tự');
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
          </div>
          <div className={cx('register-body__input')}>
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="number"
              id="phone"
              value={phoneNumber}
              onBlur={() => {
                if (!isValidPhoneNumber(phoneNumber)) setPhoneNumberError('Sai quy cách SĐT Việt Nam	');
                else setPhoneNumberError('');
              }}
              minLength={10}
              maxLength={10}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setPhoneNumberError('');
              }}
              placeholder="10 chữ số"
            />
            <div className={cx('register-body__input--send', { 'register-body__input--active': isValidPhoneNumber(phoneNumber) })} onClick={() => isValidPhoneNumber(phoneNumber) && handleSendSms(phoneNumber, setPhoneNumberError)}>
              Gửi mã
            </div>
            <span className={cx('register-body__text--err', 'text-xs')}>{phoneNumberError}</span>
          </div>
          <div className={cx('register-body__input', 'register-body__input--code')}>
            <label htmlFor="codeSMS">Mã xác nhận</label>
            <input
              type="text"
              id="codeSMS"
              value={code}
              onBlur={() => {
                if (code.length != 4) setCodeError('Vui lòng nhập 4 ký tự');
                else setCodeError('');
              }}
              onChange={(e) => {
                setCode(e.target.value);
                setCodeError('');
              }}
              placeholder="4 chữ số"
            />
            <div className={cx('register-body__input--send', { 'register-body__input--active': isValidPhoneNumber(phoneNumber) && code.length == 4 })} onClick={() => isValidPhoneNumber(phoneNumber) && handleCheckCode(phoneNumber, code, setCodeError, setDisabledSubmit)}>
              Gửi
            </div>
            <span className={cx('register-body__text--err', 'text-xs')}>{codeError}</span>
          </div>

          <div className={cx('register-body__confirm')}>
            <div
              className={cx('register-body__check')}
              onClick={(e) => {
                const element = e.target as HTMLElement; // Ép kiểu e.target thành HTMLElement
                element.style.backgroundImage = element.style.backgroundImage ? '' : "url('/icon_check.png')";
              }}></div>
            <span>Nhận thông tin khuyến mãi qua tin nhắn điện thoại</span>
          </div>

          <div className={cx('register-body__confirm')}>
            <div
              className={cx('register-body__check')}
              onClick={(e) => {
                const element = e.target as HTMLElement; // Ép kiểu e.target thành HTMLElement
                element.style.backgroundImage = element.style.backgroundImage ? '' : "url('/icon_check.png')";
              }}></div>
            <span>
              Tôi đã 18 tuổi, đồng thời đã đọc và đồng ý quy tắc cá cược{' '}
              <Link href={''} style={{ color: '#0f699d', textDecoration: 'underline' }}>
                Điều khoản
              </Link>
            </span>
          </div>

          <button
            type="submit"
            disabled={disabledSubmit}
            onClick={(e) => {
              //e.preventDefault();
              handleCreateAccount({ username: account, name, phone: phoneNumber, code, password }, handleCloseRegister);
            }}
            className={cx('register-body__submit', 'disabled:bg-stone-400 disabled:cursor-not-allowed')}>
            Xác Nhận
          </button>
        </form>
      </div>

      {titleMessage && descMessage && <ShowConfirmMessage textClose={textClose} textConfirm={textConfirm} title={titleMessage} desc={descMessage} onClose={handleCloseMessage} onConfirm={handleConfirmMessage} />}
    </div>
  );
}
