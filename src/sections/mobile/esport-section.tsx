import { ESPORTSECTION } from '@/_mock/_side_right';
import Card from '@/components/mobile/card';

const ESportSection = () => {
  return (
    <div className="animate-show-up grid grid-rows-2 w-full h-full gap-2">
      {ESPORTSECTION.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ESportSection;
