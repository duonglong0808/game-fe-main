'use client';
import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faMobileScreenButton, faStar } from '@fortawesome/free-solid-svg-icons';
// import { GameOptions } from '../GameOptions';
import { useEffect, useRef, useState } from 'react';
import {
  dataChess,
  dataESport,
  dataFishGame,
  dataGame,
  dataLive,
  dataLottery,
  dataSport,
  dataTopGame,
} from './dataStatics';
import { useAppDispatch, useAppSelector } from '@/lib/redux/utilRedux';
import { logOutUser } from '@/lib/redux/app/user.slice';
import { formatTime } from '@/utils';
import { GameOptions } from '@/components/home-desktop/GameOptions';
import { Register } from '@/components/home-desktop/Register';
import { Login } from '@/components/home-desktop/Login';
import { getUserInfo } from '@/components/home-desktop/Login/handleLogin';

const cx = classNames.bind(styles);

export function HeaderHome(): JSX.Element {
  const time = new Date();

  const dataGameOption = useRef(dataChess);
  const [openGameOption, setOpenGameOption] = useState(false);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user);
  const { name, userName } = currentUser;

  const [download, setDownload] = useState<boolean>(true);
  useEffect(() => {
    async function fetchDataUser() {
      if (!name && !userName) getUserInfo(dispatch);
    }

    fetchDataUser();
    setDownload(localStorage.getItem('download') === 'true' ? true : false);
  }, []);

  const handleClickDeposit = () => {
    if (userName) {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      window.open(`/desktop/member/transition`, '_blank');
    }
  };

  const handleMouseLeave = (event: any) => {
    const target = event.relatedTarget as HTMLElement; // Kiểm tra kiểu
    if (target && !target.closest(`.header-bottom__list-game`)) {
      console.log('Mouse left the game option');
      setOpenGameOption(false);
    }
  };
  const handleSetDownload = () => {
    setDownload(!download);
    localStorage.setItem('download', !download ? 'true' : 'false');
  };

  return (
    <header>
      <div className={cx('header-top', 'max-lg:hidden')}>
        <div className="container-custom flex justify-between margin-left-right items-center h-full">
          <div className={cx('header-top__time')}>
            <span>{formatTime(new Date())}</span>
            <i className={cx('header-top__time--icon')}></i>
          </div>
          {name || userName ? (
            <div className={cx('header-top__right', 'flex items-center')}>
              <div className={cx('header-top__name')}>
                <span className={cx('header-top__name--rank')}>Đồng</span>
                <span className={cx('header-top__name--text')}>{userName || name}</span>
              </div>

              <div className={cx('header-top__amount')}>
                <span className={cx('header-top__amount--text')}>$ 0</span>
                <FontAwesomeIcon icon={faCaretDown} className={cx('header-top__amount--icon')} />
              </div>

              <button className={cx('header-top__btn', 'header-top__btn--move')}>Chuyển quỹ</button>
              <button
                className={cx('header-top__btn', 'header-top__btn--recharge')}
                onClick={handleClickDeposit}>
                Nạp tiền
              </button>
              <button className={cx('header-top__btn', 'header-top__btn--withdraw')}>
                Rút tiền
              </button>

              <span className={cx('header-top--icon-user')}></span>
              <span className={cx('header-top--icon-letter')}></span>
              <span
                className={cx('header-top-logout')}
                onClick={() => dispatch(logOutUser())}></span>
            </div>
          ) : (
            <div className={cx('header-top__right', 'flex')}>
              <div
                className={cx('header-top__right__register')}
                onClick={() => {
                  const boxRegister = document.getElementById(`wrapper-register`);
                  if (boxRegister) {
                    boxRegister.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                  }
                }}>
                Đăng ký
              </div>
              <div
                className={cx('header-top__right__login')}
                onClick={() => {
                  const boxLogin = document.getElementById(`wrapper-login`);
                  if (boxLogin) {
                    boxLogin.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                  }
                }}>
                Đăng nhập
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={cx('header-bottom', 'max-lg:hidden')}>
        <div
          className={cx(
            'container-custom flex justify-between uppercase text-black h-full',
            'header-bottom__wrapper'
          )}>
          <Link href={'/home'}>
            <img className="" src="/logo.png" />
          </Link>
          <div
            onMouseEnter={() => {
              dataGameOption.current = dataTopGame;
              setOpenGameOption(true);
            }}
            onMouseLeave={handleMouseLeave}
            className={cx(
              'header-bottom__item',
              'header-bottom__item--first',
              'flex items-center'
            )}>
            <Image
              alt="Icon fire"
              src="/icon_fire.gif"
              width={300}
              height={10}
              className={cx('header-bottom__item--icon')}
            />
            <h3>KU siêu hot</h3>
          </div>
          <div
            className={cx('header-bottom__item')}
            onMouseEnter={() => {
              dataGameOption.current = dataSport;
              setOpenGameOption(true);
            }}
            onMouseLeave={handleMouseLeave}>
            <h3>THể thao</h3>
          </div>
          <div
            className={cx('header-bottom__item')}
            onMouseEnter={() => {
              dataGameOption.current = dataLive;
              setOpenGameOption(true);
            }}
            onMouseLeave={handleMouseLeave}>
            <h3>Live casino</h3>
          </div>
          <div
            className={cx('header-bottom__item')}
            onMouseEnter={() => {
              dataGameOption.current = dataGame;
              setOpenGameOption(true);
            }}
            onMouseLeave={handleMouseLeave}>
            <h3>games</h3>
          </div>
          <div
            className={cx('header-bottom__item')}
            onMouseEnter={() => {
              dataGameOption.current = dataLottery;
              setOpenGameOption(true);
            }}
            onMouseLeave={handleMouseLeave}>
            <h3>Xổ số</h3>
          </div>
          <div
            className={cx('header-bottom__item')}
            onMouseEnter={() => {
              dataGameOption.current = dataESport;
              setOpenGameOption(true);
            }}
            onMouseLeave={handleMouseLeave}>
            <h3>e-sport</h3>
          </div>
          <div
            className={cx('header-bottom__item')}
            onMouseEnter={() => {
              dataGameOption.current = dataFishGame;
              setOpenGameOption(true);
            }}
            onMouseLeave={handleMouseLeave}>
            <h3>bắn cá</h3>
          </div>
          <div
            className={cx('header-bottom__item')}
            onMouseEnter={() => {
              dataGameOption.current = dataChess;
              setOpenGameOption(true);
            }}
            onMouseLeave={handleMouseLeave}>
            <h3>đối kháng</h3>
          </div>
          <div className={cx('header-bottom__item')}>
            <h3>Ưu đãi</h3>
          </div>
          <div className={cx('header-bottom__item--last', 'flex items-center')}>
            <FontAwesomeIcon
              icon={faMobileScreenButton}
              className={cx('header-bottom__item--icon')}
              color="#497fb3"
            />
            <h3>Tải app</h3>
          </div>
        </div>
        {openGameOption && (
          <div
            className={cx('header-bottom__item--game', 'header-bottom__list-game')}
            onMouseLeave={() => setOpenGameOption(false)}>
            <GameOptions {...dataGameOption.current} />
          </div>
        )}
      </div>
      {/* Mobile */}
      <div className="max-lg:block hidden p-2 bg-white text-black">
        <div className={cx('flex items-center justify-between', { hidden: download })}>
          <div className="flex gap-2 items-center">
            <button className="w-4 h-4 opacity-45" onClick={handleSetDownload}>
              X
            </button>
            <div className="bg-gray-100 px-1 py-3 rounded-md shadow-md">
              <Image src="/KU_logo.svg" alt="" width={35} height={35} />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-extrabold text-base leading-none">KU APP</h1>
              <span className="text-sm">
                Vui chơi thỏa thích <br /> ngay tức thì, mọi lúc mọi nơi
              </span>
            </div>
          </div>
          <button className="bg-[#2b91e5] px-2 py-1 text-white rounded min-w-[65px]">Tải về</button>
        </div>
        <div className="flex items-center justify-between">
          <Link href={'/home'}>
            <Image className="" src="/logo.png" alt="logo" width={100} height={30} />
          </Link>
          <div className="flex gap-2">
            <Link
              href={'/register'}
              className="cursor-pointer bg-[#ffa84d] text-white rounded-xl overflow-hidden">
              <div className="flex items-center justify-between gap-2 px-2 ">
                <Image src={'/mobileIcon/btn_join.svg'} alt="login" width={18} height={18} />
                <p className="text-base">Đăng ký</p>
              </div>
            </Link>
            <Link
              href={'/login'}
              className="cursor-pointer bg-[#399fda] text-white rounded-xl overflow-hidden">
              <div className="flex items-center justify-between gap-2 px-2 ">
                <Image src={'/mobileIcon/btn_login.svg'} alt="login" width={18} height={18} />
                <p className="text-base">Đăng nhập</p>
              </div>
            </Link>
            {/* <div className={cx('header-top__right', 'flex')}>
              <div
                className={cx('header-top__right__register', '')}
                onClick={() => {
                  const boxRegister = document.getElementById(`wrapper-register`);
                  if (boxRegister) {
                    boxRegister.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                  }
                }}>
                Đăng ký
              </div>

              <div
                className={cx('header-top__right__login')}
                onClick={() => {
                  const boxLogin = document.getElementById(`wrapper-login`);
                  if (boxLogin) {
                    boxLogin.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                  }
                }}>
                Đăng nhập
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className={cx('wrapper-register')} id="wrapper-register">
        <Register />
      </div>
      <div className={cx('wrapper-login')} id="wrapper-login">
        <Login />
      </div>
    </header>
  );
}
