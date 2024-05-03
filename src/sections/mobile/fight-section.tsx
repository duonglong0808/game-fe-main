import { FIGHTSECTION } from '@/_mock/_side_right';
import Card from '@/components/mobile/card';
const FightSection = () => {
  return (
    <div className="animate-show-up w-full h-full grid grid-rows-2 gap-2">
      {FIGHTSECTION.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default FightSection;
