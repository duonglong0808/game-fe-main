import Card from '../Card';
const CONSTANTS = [
  {
    id: 1,
    name: '3D',
    icon: '/KU_logo.svg',
    img: '/mobileIcon/img_fishOT_1.png',
    isHot: true,
    isSmall: true,
  },
  {
    id: 2,
    name: 'DS',
    icon: '/icons/logo_DS.png',
    img: '/mobileIcon/img_fishOT_2.png',
    isSmall: true,
  },
  {
    id: 3,
    name: 'KS',
    icon: '/icons/logo_KS.png',
    img: '/mobileIcon/img_fishOT_3.png',
    isSmall: true,
  },
  {
    id: 4,
    name: 'CQ9',
    icon: '/icons/logo_CQ9.png',
    img: '/mobileIcon/img_fishOT_4.png',
    isSmall: true,
  },
  {
    id: 5,
    name: 'AG',
    icon: '/icons/logo_AG.png',
    img: '/mobileIcon/img_fishOT_5.png',
    isSmall: true,
  },
  {
    id: 6,
    name: 'KA',
    icon: '/icons/logo_KA.png',
    img: '/mobileIcon/img_fishOT_6.png',
    isSmall: true,
  },
  {
    id: 7,
    name: 'V8',
    icon: '/icons/logo_V8.png',
    img: '/mobileIcon/img_fishOT_7.png',
    isSmall: true,
  },
  {
    id: 8,
    name: 'DB',
    icon: '/icons/logo_DB.png',
    img: '/mobileIcon/img_fishOT_8.png',
    isSmall: true,
  },
];
const Fish = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-4 gap-2 w-full h-full">
      {CONSTANTS.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Fish;
