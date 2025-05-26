
import { Service } from '@/data/serviceData';
import ServiceCard from './ServiceCard';

interface CateringSectionProps {
  services: Service[];
  title: string;
  emoji: string;
  colorScheme: 'green' | 'red';
}

const CateringSection = ({ services, title, emoji, colorScheme }: CateringSectionProps) => {
  const titleColor = colorScheme === 'green' ? 'text-green-600' : 'text-red-600';

  return (
    <div className="mb-12">
      <h2 className={`text-2xl font-bold ${titleColor} mb-6 flex items-center`}>
        <span className="text-2xl mr-2">{emoji}</span>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            showQuantity={true}
            colorScheme={colorScheme}
          />
        ))}
      </div>
    </div>
  );
};

export default CateringSection;
