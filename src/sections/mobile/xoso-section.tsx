import { XOSOSECTION } from '@/_mock/_side_right';
import Card from '@/components/mobile/card';

export const XoSoSection = () => {
  return (
    <div className="animate-show-up grid grid-rows-2 gap-2 h-full w-full">
      {XOSOSECTION.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default XoSoSection;
