import Card from '../Card';
const CONSTANTS = [
  {
    id: 1,
    name: '3D',
    icon: '/KU_logo.svg',
    img: '/mobileIcon/img_chessOT_1.png',
    isHot: true,
    isBig: true,
  },
  {
    id: 2,
    name: 'V8',
    icon: '/icons/logo_V8.png',
    img: '/mobileIcon/img_chessOT_2.png',
    isBig: true,
  },
];
const Fight = () => {
  return (
    <div className="w-full h-full grid grid-rows-2 gap-2">
      {CONSTANTS.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Fight;
