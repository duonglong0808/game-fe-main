import classNames from 'classnames';
import Image from 'next/image';
const Card = ({
  name,
  icon,
  img,
  isHot,
  isSpan,
  isSmall,
  isBg,
  isNew,
}: {
  name: string;
  icon: string;
  img: string;
  isHot?: boolean;
  isSpan?: boolean;
  isSmall?: boolean;
  isBg?: boolean;
  isNew?: boolean;
}) => {
  return (
    <div
      className={classNames(
        'w-full h-full rounded-lg overflow-hidden bg-[#b5d4ee] relative',
        {
          'bg-[url(/mobileIcon/img_liveKUBG.png)] bg-cover': isBg,
        },
        {
          'col-span-2': isSpan,
        }
      )}>
      <div
        className={classNames(
          'py-2 h-full  flex flex-col w-fit items-center',
          {
            ' justify-start px-2': isSmall,
          },
          {
            ' justify-center px-10': !isSmall,
          }
        )}>
        <p
          className={classNames(
            'font-bold text-center',
            {
              'text-base': isSmall,
            },
            {
              'text-2xl': !isSmall,
            }
          )}>
          {name}
        </p>
        {!isSmall ? (
          <Image src={icon} alt={name} width={60} height={60} />
        ) : (
          <Image src={icon} alt={name} width={40} height={40} />
        )}
      </div>
      {isNew && (
        <Image
          src={'/mobileIcon/icon_new.png'}
          alt="new"
          width={60}
          height={60}
          className="absolute top-0 right-0 z-10"
        />
      )}
      {isHot && (
        <Image
          src={'/sideRight/icon_hot.png'}
          alt="hot"
          width={60}
          height={60}
          className="absolute top-0 right-0 z-10"
        />
      )}
      {!isSmall ? (
        <Image
          src={img}
          alt={name}
          width={200}
          height={900}
          className="absolute bottom-0 right-5 overflow-hidden"
          priority
        />
      ) : (
        <Image
          src={img}
          alt={name}
          width={80}
          height={100}
          className="absolute bottom-0 right-2 overflow-hidden"
          priority
        />
      )}
    </div>
  );
};

export default Card;
