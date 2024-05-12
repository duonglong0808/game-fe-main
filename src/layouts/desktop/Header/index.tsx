'use client';
import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faMobileScreenButton,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
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
import { BaseAxios, formatTime } from '@/utils';
import { GameOptions } from '@/components/home-desktop/GameOptions';
import { Register } from '@/components/home-desktop/Register';
import { Login } from '@/components/home-desktop/Login';
import { getUserInfo } from '@/components/home-desktop/Login/handleLogin';

const cx = classNames.bind(styles);

export function HeaderHome(): JSX.Element {
  const dataGameOption = useRef(dataChess);

  const [openPopupTrans, setOpenPopupTrans] = useState(false);
  const [pointTransfer, setPointTransfer] = useState('');

  const [openGameOption, setOpenGameOption] = useState(false);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user);
  const { name, userName, mainPoint, gamePointKu } = currentUser;

  const [download, setDownload] = useState<boolean>(true);
  useEffect(() => {
    async function fetchDataUser() {
      if (!name && !userName) getUserInfo(dispatch);
    }

    fetchDataUser();
    setDownload(localStorage.getItem('download') === 'true' ? true : false);
  }, []);

  const handleOpenNewTab = (path: string) => {
    if (userName) {
      const left = screen.width / 2 - 950 / 2;
      const top = screen.height / 2 - 750 / 2;

      window.open(
        `${process.env.URL_MAIN}${path}`,
        '',
        'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
          1100 +
          ', height=' +
          750 +
          ', top=' +
          top +
          ', left=' +
          left
      );
    }
  };

  const handleNavigateGameKu = () => {
    if (userName) {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      window.open(
        `${process.env.URL_GAME}?access_token=${accessToken}&&refresh_token=${refreshToken}`,
        '_blank'
      );
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

  const transferPoint = async (
    gamePointTransfer: number,
    gamePointReceive: number,
    points: number
  ) => {
    const axios = new BaseAxios();
    return axios.post('/user-point', {
      gamePointTransfer,
      gamePointReceive,
      points,
    });
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
                <span className={cx('header-top__amount--text')}>$ {mainPoint}</span>
                <FontAwesomeIcon icon={faCaretDown} className={cx('header-top__amount--icon')} />
              </div>

              <button
                className={cx('header-top__btn', 'header-top__btn--move')}
                onClick={() => handleOpenNewTab('/desktop/member/transition')}>
                Chuyển quỹ
              </button>
              <button
                className={cx('header-top__btn', 'header-top__btn--recharge')}
                onClick={() => handleOpenNewTab('/desktop/member/purchase')}>
                Nạp tiền
              </button>
              <button
                className={cx('header-top__btn', 'header-top__btn--withdraw')}
                onClick={() => handleOpenNewTab('/desktop/member/withdraw')}>
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
            <GameOptions {...dataGameOption.current} onClickGame={() => setOpenPopupTrans(true)} />
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
      {openPopupTrans ? (
        <div className="fixed left-0 top-0 right-0 bottom-0 bg-[#00000099] z-10 flex justify-center items-center">
          <div
            className="p-[15px] rounded-[8px] w-[434px] bg-[#fff]"
            style={{
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
            }}>
            <div className="text-[#5aaaf3] text-[18px] border-b-2 border-b-[#e5e5e5] flex pb-3">
              <span className="font-semibold flex-1 text-center">Chuyển khoản nhanh</span>
              <FontAwesomeIcon
                icon={faXmark}
                className={cx('register__header--icon')}
                onClick={() => setOpenPopupTrans(false)}
              />
            </div>
            <div className="p-[20px] pb-[5px]">
              <div className="border-b-2 border-b-[#e5e5e5]">
                <div className="flex h-[35px] mb-[25px]">
                  <span className="w-[115px] ">Tk Chính</span>
                  <span className="text-[#1ba200] flex items-center flex-1 pl-[10px] border-[1px] border-[#dadada]">
                    {mainPoint}
                  </span>
                </div>

                <div className="flex h-[35px] mb-[25px]">
                  <span className="w-[115px] text-[#ffa800]">KU Casino</span>
                  <span className="text-[#1ba200] flex items-center flex-1 pl-[10px] border-[1px] border-[#dadada] ">
                    {gamePointKu}
                  </span>
                </div>

                <div className="flex h-[35px] mb-[25px] items-center">
                  <span className="w-[115px] text-[15px] block">Điểm chuyển</span>
                  <input
                    value={pointTransfer}
                    onChange={(e) => {
                      if (Number(e.target.value) > 0) {
                        const val = Number(e.target.value) < mainPoint ? e.target.value : mainPoint;
                        setPointTransfer(String(val));
                      } else {
                        setPointTransfer('');
                      }
                    }}
                    placeholder="Nhập điểm chuyển"
                    className="bg-[#f3f3f3] font-semibold  h-[35px]  w-[156px] px-2 outline-0"
                  />

                  <button
                    disabled={!mainPoint}
                    onClick={async () => {
                      if (mainPoint) {
                        const res = await transferPoint(1, 3, mainPoint);
                        if (res?.data) {
                          handleNavigateGameKu();
                        }
                      }
                    }}
                    className="bg-[#35b0c0] cursor-pointer rounded-[3px] w-[85px] text-[14px] h-[35px] text-white ml-auto">
                    Chuyển hết
                  </button>
                </div>
              </div>
              <div className="flex justify-between mt-4 mx-2">
                <button
                  onClick={() => {
                    handleNavigateGameKu();
                  }}
                  className="bg-[#ffa800] w-[48%] rounded-sm h-[45px] text-white">
                  Vào trò chơi
                </button>
                <button
                  disabled={!pointTransfer}
                  onClick={async () => {
                    if (pointTransfer) {
                      const res = await transferPoint(1, 3, +pointTransfer);
                      if (res?.data) {
                        handleNavigateGameKu();
                      }
                    }
                  }}
                  className="bg-[#32abff] w-[48%] rounded-sm h-[45px] text-white disabled:bg-[#aaa]">
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}
