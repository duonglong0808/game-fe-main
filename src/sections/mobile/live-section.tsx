import Card from '@/components/mobile/card';
import { LIVESECTION } from '@/_mock/_side_right';

const LiveCasinoSection = () => {
  return (
    <div className="animate-show-up grid grid-cols-2 grid-rows-5 gap-2 h-full w-full">
      {LIVESECTION.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default LiveCasinoSection;
