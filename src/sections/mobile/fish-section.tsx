import { FISHSECTION } from '@/_mock/_side_right';
import Card from '@/components/mobile/card';

const FishSection = () => {
  return (
    <div className="animate-show-up grid grid-cols-2 grid-rows-4 gap-2 w-full h-full">
      {FISHSECTION.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default FishSection;
