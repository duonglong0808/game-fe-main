import { SPORTSECTION } from '@/_mock/_side_right';
import Card from '@/components/mobile/card';

const SportSection = () => {
  return (
    <div className="animate-show-up grid grid-cols-2 grid-rows-4 gap-2 h-full w-full">
      {SPORTSECTION.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default SportSection;
