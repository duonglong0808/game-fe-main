import Card from '../Card';
const CONSTANTS = [
  {
    id: 1,
    name: 'KU',
    icon: '/KU_logo.svg',
    img: '/mobileIcon/img_sportOT_1.png',
    isHot: true,
    isSpan: true,
  },
  {
    id: 2,
    name: 'JZ',
    icon: '/icons/logo_JZ.png',
    img: '/mobileIcon/img_sportOT_2.png',
    isSmall: true,
  },
  {
    id: 3,
    name: 'SABA',
    icon: '/icons/logo_OneBook.png',
    img: '/mobileIcon/img_sportOT_3.png',
    isSmall: true,
  },
  {
    id: 4,
    name: 'CMD',
    icon: '/icons/logo_CMD.png',
    img: '/mobileIcon/img_sportOT_4.png',
    isSmall: true,
  },
  {
    id: 5,
    name: 'AI',
    icon: '/icons/logo_AI.png',
    img: '/mobileIcon/img_sportOT_5.png',
    isSmall: true,
  },
  {
    id: 6,
    name: 'AG',
    icon: '/icons/logo_AG.png',
    img: '/mobileIcon/img_sportOT_6.png',
    isSmall: true,
  },
  {
    id: 7,
    name: 'PANDA',
    icon: '/icons/logo_OBsport.png',
    img: '/mobileIcon/img_sportOT_7.png',
    isSmall: true,
  },
];

const Sport = () => {
  return (
    <div className=" grid grid-cols-2 grid-rows-4 gap-2 h-full w-full">
      {CONSTANTS.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Sport;
