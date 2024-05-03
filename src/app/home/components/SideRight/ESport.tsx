import Card from '../Card';
const CONSTANTS = [
  {
    id: 1,
    name: 'IM',
    icon: '/icons/logo_IM.png',
    img: '/mobileIcon/img_esportsOT_1.png',
    isBig: true,
  },
  {
    id: 2,
    name: 'SHABA',
    icon: '/icons/logo_OneBook.png',
    img: '/mobileIcon/img_esportsOT_2.png',
    isBig: true,
  },
];
const ESport = () => {
  return (
    <div className="grid grid-rows-2 w-full h-full gap-2">
      {CONSTANTS.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ESport;
