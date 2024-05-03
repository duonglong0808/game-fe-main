import Card from '../Card';
const CONSTANTS = [
  {
    id: 1,
    name: '3D',
    icon: '/KU_logo.svg',
    img: '/mobileIcon/img_slotOT_1.png',
    isHot: true,
    isSmall: true,
  },
  {
    id: 2,
    name: 'PG',
    icon: '/icons/logo_PG.png',
    img: '/mobileIcon/img_slotOT_2.png',
    isSmall: true,
  },
  {
    id: 3,
    name: 'FC',
    icon: '/icons/logo_FC.png',
    img: '/mobileIcon/img_slotOT_3.png',
    isSmall: true,
    isNew: true,
  },
  {
    id: 4,
    name: 'BNG',
    icon: '/icons/logo_BNG.png',
    img: '/mobileIcon/img_slotOT_4.png',
    isSmall: true,
  },
  {
    id: 5,
    name: 'CQ9',
    icon: '/icons/logo_CQ9.png',
    img: '/mobileIcon/img_slotOT_5.png',
    isSmall: true,
  },
  {
    id: 6,
    name: 'DS',
    icon: '/icons/logo_DS.png',
    img: '/mobileIcon/img_slotOT_6.png',
    isSmall: true,
  },
  {
    id: 7,
    name: 'PLS',
    icon: '/icons/logo_PLS.png',
    img: '/mobileIcon/img_slotOT_7.png',
    isSmall: true,
  },
  {
    id: 8,
    name: 'KA',
    icon: '/icons/logo_KA.png',
    img: '/mobileIcon/img_slotOT_8.png',
    isSmall: true,
  },
  {
    id: 9,
    name: 'FTG',
    icon: '/icons/logo_FTG.png',
    img: '/mobileIcon/img_slotOT_9.png',
    isSmall: true,
  },
  {
    id: 10,
    name: 'RK5',
    icon: '/icons/logo_RK5.png',
    img: '/mobileIcon/img_slotOT_10.png',
    isSmall: true,
  },
];

const Games = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-5 h-full w-full gap-2">
      {CONSTANTS.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Games;
