import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown, faBasketball } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const cx = classNames.bind(styles);

export function FooterHome(): JSX.Element {
  return (
    <footer>
      <div className={cx('footer-top', 'max-lg:hidden')}>
        <div
          className={cx(
            'footer-top__wrapper',
            'container-custom flex justify-between text-base items-center h-full'
          )}>
          <div className="flex">
            <Link href={''} className={cx('footer-top__item')}>
              <span className={cx('footer-top__line')}>Giới thiệu</span>
            </Link>
            <Link href={''} className={cx('footer-top__item')}>
              <span className={cx('footer-top__line')}>Trợ giúp</span>
            </Link>
            <Link href={''} className={cx('footer-top__item')}>
              <span className={cx('footer-top__line')}>Điều khoản</span>
            </Link>
            <Link href={''} className={cx('footer-top__item')} style={{ color: '#ffde00' }}>
              <span className={cx('footer-top__line')}>Hỗ trợ</span>
            </Link>
            <Link href={''} className={cx('footer-top__item')} style={{ color: '#ffde00' }}>
              <span className={cx('footer-top__line')}>Link dự bị</span>
            </Link>
            <div className={cx('footer-top__item')}>
              <span>Gọi điện hỗ trợ : </span>
              <span className="ml-2">+63279082890</span>
            </div>
          </div>

          <div className={cx('footer-top__item')}>
            <span className={cx('footer-top__line', 'mr-2')}>Sơ đồ trang mạng</span>
            <FontAwesomeIcon icon={faCaretUp} className={cx('footer-top__item--icon')} />
          </div>
        </div>
        <div className={cx('footer-content')}>
          <div className={cx('footer-content__wrapper', 'container-custom flex justify-between')}>
            <div className={cx('footer-content__item')}>
              <div className={cx('footer-content__item--title', 'text-center text-sm uppercase')}>
                <FontAwesomeIcon icon={faBasketball} className={cx('footer-content__item--icon')} />
                <span>Thể thao</span>
              </div>
              <div className={cx('footer-content__item--content', 'text-center uppercase')}>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  KU
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  jz
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  cmd
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  ag
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  saba
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  ai
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  panda
                </Link>
              </div>
            </div>
            <div className={cx('footer-content__item')}>
              <div className={cx('footer-content__item--title', 'text-center text-sm uppercase')}>
                <div
                  style={{ background: 'url(/icon_indexImg.png) no-repeat -28px -793px' }}
                  className={cx('footer-content__item--icon')}></div>
                <span>CASINO</span>
              </div>
              <div className={cx('footer-content__item--content', 'text-center uppercase')}>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  KU
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  ag
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  wm
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  GPI
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  dg
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  sa
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  aes
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  evo
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  db
                </Link>
              </div>
            </div>
            <div className={cx('footer-content__item')}>
              <div className={cx('footer-content__item--title', 'text-center text-sm uppercase')}>
                <div
                  style={{ background: 'url(/icon_indexImg.png) no-repeat -56px -793px' }}
                  className={cx('footer-content__item--icon')}></div>
                <span>Game</span>
              </div>
              <div className={cx('footer-content__item--content', 'text-center uppercase')}>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  3d
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  bng
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  cq9
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  pls
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  ds
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  rk5
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  pg
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  ka
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  ftg
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  fc
                </Link>
              </div>
            </div>
            <div className={cx('footer-content__item')}>
              <div className={cx('footer-content__item--title', 'text-center text-sm uppercase')}>
                <div
                  style={{ background: 'url(/icon_indexImg.png) no-repeat -84px -793px' }}
                  className={cx('footer-content__item--icon')}></div>
                <span>Xổ số</span>
              </div>
              <div className={cx('footer-content__item--content', 'text-center uppercase')}>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  KU
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  BBin
                </Link>
              </div>
            </div>
            <div className={cx('footer-content__item')}>
              <div className={cx('footer-content__item--title', 'text-center text-sm uppercase')}>
                <div
                  style={{ background: 'url(/icon_indexImg.png) no-repeat -223px -793px' }}
                  className={cx('footer-content__item--icon')}></div>
                <span>e-sports</span>
              </div>
              <div className={cx('footer-content__item--content', 'text-center uppercase')}>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  im
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  saba
                </Link>
              </div>
            </div>
            <div className={cx('footer-content__item')}>
              <div className={cx('footer-content__item--title', 'text-center text-sm uppercase')}>
                <div
                  style={{ background: 'url(/icon_indexImg.png) no-repeat -112px -793px' }}
                  className={cx('footer-content__item--icon')}></div>
                <span>Bắn cá</span>
              </div>
              <div className={cx('footer-content__item--content', 'text-center uppercase')}>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  3d
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  cq9
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  ds
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  ks
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  ka
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  v8
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  ag
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  db
                </Link>
              </div>
            </div>
            <div className={cx('footer-content__item')}>
              <div className={cx('footer-content__item--title', 'text-center text-sm uppercase')}>
                <div
                  style={{ background: 'url(/icon_indexImg.png) no-repeat -168px -793px' }}
                  className={cx('footer-content__item--icon')}></div>
                <span>đối kháng</span>
              </div>
              <div className={cx('footer-content__item--content', 'text-center uppercase')}>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  3d
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  v8
                </Link>
              </div>
            </div>
            <div className={cx('footer-content__item')} style={{ maxWidth: '120px' }}>
              <div className={cx('footer-content__item--title', 'text-center text-sm')}>
                <div
                  style={{ background: 'url(/icon_indexImg.png) no-repeat -140px -793px' }}
                  className={cx('footer-content__item--icon')}></div>
                <span>Giới thiệu</span>
              </div>
              <div className={cx('footer-content__item--content', 'text-center')}>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  Trợ giúp
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  Khiếu lại
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  Hỗ trợ
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  Thông báo
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  Giới thiệu
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  Tinh thần doanh nghiệp
                </Link>
                <Link href={'/'} className={cx('footer-content__item--content-item')}>
                  Giới thiệu sảnh KU
                </Link>
              </div>
            </div>

            <div className={cx('footer-content__item')}>
              <Image
                alt="Download ku"
                src={'/dowload_ku.png'}
                width={110}
                height={110}
                className="rounded-md"
              />
              <div className={cx('footer-content__item--title', 'text-center  ')}>
                <div
                  style={{ background: 'url(/icon_indexImg.png) no-repeat -195px -793px' }}
                  className={cx('footer-content__item--icon')}></div>
                <span className="text-xs mt-2">Tải bản điện thoại</span>
              </div>
              <span className="text-xs">Tận hưởng mọi lúc đặt cược kịp thời</span>
            </div>
          </div>
        </div>
        <div className={cx('footer-bottom')}>
          <div
            className="container-custom flex justify-center"
            style={{
              height: '45px',
              background: 'url("/icon_indexImg.png") 39px -856px no-repeat',
            }}></div>
        </div>
      </div>
      <div className="lg:hidden flex z-20 w-full h-[63px] bg-white text-black border-t-[1px] border-gray-400 items-center">
        <div className="flex items-center justify-evenly w-full text-center">
          <Link href={'/home'} className="flex flex-col items-center justify-center">
            <Image src="/footer/gift.png" alt="logo" width={25} height={25} />
            <p className="text-sm">Ưu đãi</p>
          </Link>
          <Link
            href={'/support'}
            target="_blank"
            className="flex flex-col items-center justify-center">
            <Image src="/footer/icon_footer_service.svg" alt="logo" width={25} height={25} />
            <p className="text-sm">Hỗ trợ</p>
          </Link>
          <Link
            href={'/member/purchase'}
            target="_blank"
            className="flex flex-col items-center justify-center translate-y-[-5px]">
            <Image src="/footer/icon_footer_DW.svg" alt="logo" width={50} height={50} priority />
            <p className="text-sm">Nạp rút tiền</p>
          </Link>
          <Link
            href={'/member/transaction'}
            target="_blank"
            className="flex flex-col items-center justify-center">
            <Image src="/footer/icon_footer_tradeRec.svg" alt="logo" width={25} height={25} />
            <p className="text-sm">Giao dịch</p>
          </Link>
          <Link href={'/me'} className="flex flex-col items-center justify-center">
            <Image src="/footer/icon_footer_member.svg" alt="logo" width={25} height={25} />
            <p className="text-sm">Tôi</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
