
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
  }, [serviceId, navigate]);

  // Special rendering for catering page
  if (serviceId === 'catering') {
    const vegServices = services.filter(service => service.type === 'veg');
    const nonVegServices = services.filter(service => service.type === 'nonveg');

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <ServicePageHeader title={getServiceTitle(serviceId)} />

          <CateringSection
            services={vegServices}
            title="Vegetarian Options"
            emoji="🥬"
            colorScheme="green"
          />

          <CateringSection
            services={nonVegServices}
            title="Non-Vegetarian Options"
            emoji="🍖"
            colorScheme="red"
          />
        </div>
      </div>
    );
  }

  // Default rendering for other service categories
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <ServicePageHeader title={getServiceTitle(serviceId as string)} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
