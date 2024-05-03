'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useAppSelector } from '@/lib/redux/utilRedux';

const cx = classNames.bind(styles);

export function GameOptions({
  games,
  maxLengthRow,
  positionLogo,
  animation,
}: {
  maxLengthRow: number;
  positionLogo?: string;
  animation?: string;
  games: {
    image: string;
    title: string;
    icons: string[];
    background?: string;
    left: number;
    top: number;
    isPending?: boolean;
  }[];
}): JSX.Element {
  const currentUser = useAppSelector((state) => state.user);
  const { userName } = currentUser;

  const handleOpenLogin = () => {
    const boxLogin = document.getElementById(`wrapper-login`);
    if (boxLogin) {
      boxLogin.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  };

  const handleClickGame = () => {
    if (userName) {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      window.open(
        `${process.env.URL_GAME}?access_token=${accessToken}&&refresh_token=${refreshToken}`,
        '_blank'
      );
    } else {
      handleOpenLogin();
    }
  };

  return (
    <div className={cx('wrapper', 'container-custom flex justify-center items-center flex-wrap')}>
      {games.map((game, index) => (
        <div
          key={index}
          className={cx(
            `text-center`,
            { 'basis-1/3': maxLengthRow == 3 },
            { 'basis-1/4': maxLengthRow == 4 },
            { 'basis-1/5': maxLengthRow == 5 },
            { 'game-option__wrapper': !game.isPending }
          )}
          style={{
            //
            height: games.length / maxLengthRow > 1 ? '50%' : '100%',
          }}>
          <div
            style={{
              //
              height: '100%',
              background: `url(${game.image}) no-repeat ${-game.left}px ${game.top}px`,
            }}
            className={cx('game-option', {
              'game-option--scale': animation == 'scale' && !game.isPending,
            })}
            onClick={handleClickGame}>
            <div
              className={cx('game-option--background')}
              style={{
                background: `url(${game.background}) no-repeat -${232 * index}px 0px`,
              }}
            />
            <div
              className={cx('game-option__logo')}
              style={{
                top: positionLogo == 'bottom' ? '60%' : '25%',
                right: 0,
                left: positionLogo == 'bottom' ? '0' : '35%',
              }}>
              <div className={cx('game-option--icons', 'flex justify-center')}>
                {game.icons.map((icon, index) => (
                  <Image
                    key={index}
                    src={icon}
                    alt="icon game"
                    width={game.icons.length > 2 ? 32 : 60}
                    height={20}
                    className={cx('game-option__icon')}
                  />
                ))}
              </div>
              <span
                className={cx(
                  { 'game-option--title': !game.isPending },
                  { 'game-option--title-disable': game.isPending },
                  'uppercase font-semibold text-base block'
                )}>
                {game.title}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
