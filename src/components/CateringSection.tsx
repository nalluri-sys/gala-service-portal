
import { Service } from '@/data/serviceData';
import ServiceCard from './ServiceCard';
import { Utensils, Leaf } from 'lucide-react';

interface CateringSectionProps {
  services: Service[];
  title: string;
  emoji: string;
  colorScheme: 'green' | 'red';
}

const CateringSection = ({ services, title, emoji, colorScheme }: CateringSectionProps) => {
  const titleColor = colorScheme === 'green' ? 'text-green-600' : 'text-red-600';
  const bgGradient = colorScheme === 'green' 
    ? 'from-green-50 via-emerald-25 to-green-100' 
    : 'from-red-50 via-rose-25 to-red-100';
  const borderColor = colorScheme === 'green' ? 'border-green-200' : 'border-red-200';
  const IconComponent = colorScheme === 'green' ? Leaf : Utensils;

  return (
    <div className="mb-12 relative">
      {/* Section background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${bgGradient} rounded-3xl opacity-20 transform -skew-y-1`}></div>
      
      <div className="relative z-10 p-6">
        <div className={`flex items-center justify-center mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border ${borderColor} shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105`}>
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 ${colorScheme === 'green' ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-red-400 to-rose-500'} rounded-full flex items-center justify-center shadow-lg animate-pulse`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            
            <h2 className={`text-3xl font-bold ${titleColor} flex items-center`}>
              <span className="text-3xl mr-3 animate-bounce">{emoji}</span>
              {title}
            </h2>
            
            <div className={`w-12 h-12 ${colorScheme === 'green' ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-red-400 to-rose-500'} rounded-full flex items-center justify-center shadow-lg animate-pulse delay-500`}>
              <span className="text-xl">{emoji}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`transform transition-all duration-700 delay-${index * 100} hover:scale-105`}
            >
              <ServiceCard
                service={service}
                showQuantity={true}
                colorScheme={colorScheme}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className={`absolute top-4 right-4 w-6 h-6 ${colorScheme === 'green' ? 'bg-green-300' : 'bg-red-300'} rounded-full opacity-40 animate-ping`}></div>
      <div className={`absolute bottom-4 left-4 w-4 h-4 ${colorScheme === 'green' ? 'bg-emerald-300' : 'bg-rose-300'} rounded-full opacity-40 animate-ping delay-1000`}></div>
    </div>
  );
};

export default CateringSection;
