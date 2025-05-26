
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import ServiceCard from '@/components/ServiceCard';
import CateringSection from '@/components/CateringSection';
import ServicePageHeader from '@/components/ServicePageHeader';
import { getServicesByCategory, getServiceTitle, Service } from '@/data/serviceData';

const ServicePage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
      return;
    }

    // Load services for the selected category
    const categoryServices = getServicesByCategory(serviceId as string);
    setServices(categoryServices);
    
    // Trigger animations
    setTimeout(() => setIsLoaded(true), 100);
  }, [serviceId, navigate]);

  // Special rendering for catering page
  if (serviceId === 'catering') {
    const vegServices = services.filter(service => service.type === 'veg');
    const nonVegServices = services.filter(service => service.type === 'nonveg');

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-red-200 to-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full opacity-15 animate-bounce" style={{ animationDuration: '3s' }}></div>
        </div>

        <Navbar />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <ServicePageHeader title={getServiceTitle(serviceId)} />
          </div>

          <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <CateringSection
              services={vegServices}
              title="Vegetarian Options"
              emoji="🥬"
              colorScheme="green"
            />
          </div>

          <div className={`transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <CateringSection
              services={nonVegServices}
              title="Non-Vegetarian Options"
              emoji="🍖"
              colorScheme="red"
            />
          </div>
        </div>
      </div>
    );
  }

  // Default rendering for other service categories
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '4s' }}></div>
      </div>

      <Navbar />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <ServicePageHeader title={getServiceTitle(serviceId as string)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`transform transition-all duration-1000 delay-${(index + 1) * 100} ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
