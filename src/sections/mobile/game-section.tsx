import Card from '@/components/mobile/card';
import { GAMESECTION } from '@/_mock/_side_right';
const GameSection = () => {
  return (
    <div className="animate-show-up grid grid-cols-2 grid-rows-5 h-full w-full gap-2">
      {GAMESECTION.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default GameSection;
