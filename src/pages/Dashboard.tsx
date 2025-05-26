
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { MapPin, Camera, Music, Utensils, Home, Palette, Heart } from 'lucide-react';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userLocation, setUserLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    const location = localStorage.getItem('userLocation');
    
    if (!user) {
      navigate('/');
      return;
    }
    
    setCurrentUser(JSON.parse(user));
    setUserLocation(location || 'Location not set');
  }, [navigate]);

  const services = [
    {
      id: 'decoration',
      title: 'Decoration',
      description: 'Beautiful floral & theme decorations',
      icon: Palette,
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50',
    },
    {
      id: 'catering',
      title: 'Catering',
      description: 'Delicious food & beverages',
      icon: Utensils,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
    },
    {
      id: 'photography',
      title: 'Photography',
      description: 'Capture precious moments',
      icon: Camera,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      id: 'music',
      title: 'Music & DJ',
      description: 'Live music & DJ services',
      icon: Music,
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50',
    },
    {
      id: 'venue',
      title: 'Function Hall',
      description: 'Premium venue booking',
      icon: Home,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      id: 'makeup',
      title: 'Makeup',
      description: 'Professional makeup artists',
      icon: Heart,
      gradient: 'from-pink-500 to-purple-500',
      bgGradient: 'from-pink-50 to-purple-50',
    },
    {
      id: 'mehendi',
      title: 'Mehendi',
      description: 'Traditional henna designs',
      icon: Palette,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
    },
  ];

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Welcome, {currentUser?.name}! 🎉
          </h1>
          <div className="flex items-center justify-center text-gray-600 mb-8">
            <MapPin className="w-5 h-5 mr-2" />
            <span>Location: {userLocation}</span>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Choose from our premium event services to make your celebration unforgettable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className={`p-6 bg-gradient-to-br ${service.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group`}
                onClick={() => handleServiceClick(service.id)}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <Button
                    className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white border-0`}
                  >
                    Explore Services
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
