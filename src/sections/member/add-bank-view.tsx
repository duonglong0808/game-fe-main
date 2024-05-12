import classNames from 'classnames/bind';
import styles from './view/styles/add-bank-view.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { ShowConfirmMessage } from '@/app/compmnents/ShowMessage';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { cleanDataMessage, setMessageApp } from '@/lib/redux/system/settingSys';
import { dataBankStatics } from '@/constant';
import { addBankUser } from './view/utils/api';

const cx = classNames.bind(styles);

export function AddBankPopup({
  onAddSuccessBank,
  onClosePopupAddBank,
}: {
  onAddSuccessBank: () => void;
  onClosePopupAddBank: () => void;
}): JSX.Element {
  const { userName, phone } = useAppSelector((state) => state.user);

  const [accountNumber, setAccountNumber] = useState('');
  const [openListBank, setOpenListBank] = useState(false);

  const [binBank, setBinBank] = useState('');

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  // redux
  const { titleMessage, descMessage, textClose, textConfirm } = useAppSelector(
    (state) => state.settingApp
  );
  const dispatch = useAppDispatch();

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

  function hideMiddleDigits(text: string) {
    const firstThreeDigits = text.slice(0, 1);
    const lastThreeDigits = text.slice(-1);
    return `${firstThreeDigits}********${lastThreeDigits}`;
  }

  return (
    <div className={cx('register-layer')}>
      <div className={cx('register-wrapper')}>
        <div className={cx('register__header')}>
          <h2 className="flex-1">Thêm tài khoản</h2>
          <FontAwesomeIcon
            icon={faXmark}
            className={cx('register__header--icon')}
            onClick={() => {
              onClosePopupAddBank();
            }}
          />
        </div>
        <form className={cx('register__body')} onSubmit={(e) => e.preventDefault()}>
          <div
            className={cx('register-body__input')}
            style={{
              alignItems: 'flex-start',
              borderBottom: '1px solid #e5e5e5',
            }}>
            <label htmlFor="AgentID">Tài khoản</label>
            <div className="text-start w-[74%]">
              <span className="mb-3 block uppercase text-black ml-[10px]">
                {hideMiddleDigits(userName)}
              </span>
              <input
                type="number"
                name="accountNumber"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                minLength={10}
                maxLength={10}
                placeholder="Số tài khoản"
              />
              <div className="ml-[10px] relative mt-3">
                <span
                  onClick={() => setOpenListBank(true)}
                  className={cx(
                    'text-black block w-full bg-[#f3f3f3] py-1 px-2 relative cursor-pointer ',
                    'select-bank__result'
                  )}>
                  {dataBankStatics.find((bank) => bank.bin == binBank)?.shortName ||
                    'Xin chọn ngân hàng'}
                </span>
                {openListBank ? (
                  <ul className={cx('list-bank')}>
                    <li
                      onClick={() => {
                        setBinBank('');
                        setOpenListBank(false);
                      }}
                      className="py-1 px-2"
                      value={''}>
                      Xin chọn ngân hàng
                    </li>
                    {dataBankStatics.map((bank, index) => (
                      <li
                        className="py-1 px-2 cursor-pointer"
                        key={index}
                        value={bank.bin}
                        onClick={() => {
                          setBinBank(bank.bin);
                          setOpenListBank(false);
                        }}>
                        {bank.shortName}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className={cx('register-body__input')}>
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="number"
              id="phone"
              value={phone}
              readOnly
              minLength={10}
              maxLength={10}
              placeholder="10 chữ số"
              className="cursor-not-allowed border-0 outline-none"
            />
            <div
              className={cx('register-body__input--send', 'register-body__input--active')}
              onClick={() => {}}>
              Gửi mã
            </div>
            <span className={cx('register-body__text--err', 'text-xs')}>{}</span>
          </div>
          <div className={cx('register-body__input')}>
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
            <div
              className={cx('register-body__input--send', {
                'register-body__input--active': code.length == 4,
              })}
              onClick={() => {}}>
              Gửi
            </div>
            <span className={cx('register-body__text--err', 'text-xs')}>{codeError}</span>
          </div>
          <span
            className="text-[red] mb-[2px] py-4 block text-sm"
            style={{
              borderBottom: '1px solid #e5e5e5',
            }}>
            Chỉ chấp nhận TK ngân hàng đúng họ tên đăng ký
          </span>

          <div className="flex">
            <button
              type="submit"
              disabled={true}
              onClick={(e) => {
                //e.preventDefault();
              }}
              className={cx(
                'register-body__cancel',
                'disabled:bg-stone-400 disabled:cursor-not-allowed '
              )}>
              Hủy
            </button>
            <button
              type="submit"
              disabled={!accountNumber || !binBank}
              onClick={async () => {
                if (accountNumber && binBank) {
                  const bankSelect = dataBankStatics.find((bank) => bank.bin == binBank);
                  const data = {
                    nameBank: bankSelect?.name,
                    binBank,
                    accountOwner: userName,
                    accountNumber,
                    isForUser: true,
                  };
                  const res = await addBankUser(data);
                  if (res?.data) {
                    onAddSuccessBank();
                  }
                }
              }}
              className={cx(
                'register-body__submit',
                'disabled:bg-stone-400 disabled:cursor-not-allowed'
              )}>
              Xác Nhận
            </button>
          </div>
        </form>
      </div>

      {titleMessage && descMessage && (
        <ShowConfirmMessage
          textClose={textClose}
          textConfirm={textConfirm}
          title={titleMessage}
          desc={descMessage}
          onClose={handleCloseMessage}
          onConfirm={handleConfirmMessage}
        />
      )}
    </div>
  );
}
