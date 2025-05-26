
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { MapPin, Camera, Music, Utensils, Home, Palette, Heart, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userLocation, setUserLocation] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
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
    
    // Trigger animations after component mounts
    setTimeout(() => setIsLoaded(true), 100);
  }, [navigate]);

  const services = [
    {
      id: 'decoration',
      title: 'Decoration',
      description: 'Beautiful floral & theme decorations',
      icon: Palette,
      gradient: 'from-pink-500 via-rose-400 to-pink-600',
      bgGradient: 'from-pink-50 via-rose-25 to-pink-100',
      shadowColor: 'shadow-pink-200',
      delay: 'delay-100',
    },
    {
      id: 'catering',
      title: 'Catering',
      description: 'Delicious food & beverages',
      icon: Utensils,
      gradient: 'from-orange-500 via-amber-400 to-red-500',
      bgGradient: 'from-orange-50 via-amber-25 to-red-100',
      shadowColor: 'shadow-orange-200',
      delay: 'delay-200',
    },
    {
      id: 'photography',
      title: 'Photography',
      description: 'Capture precious moments',
      icon: Camera,
      gradient: 'from-blue-500 via-sky-400 to-cyan-500',
      bgGradient: 'from-blue-50 via-sky-25 to-cyan-100',
      shadowColor: 'shadow-blue-200',
      delay: 'delay-300',
    },
    {
      id: 'music',
      title: 'Music & DJ',
      description: 'Live music & DJ services',
      icon: Music,
      gradient: 'from-purple-500 via-violet-400 to-indigo-500',
      bgGradient: 'from-purple-50 via-violet-25 to-indigo-100',
      shadowColor: 'shadow-purple-200',
      delay: 'delay-[400ms]',
    },
    {
      id: 'venue',
      title: 'Function Hall',
      description: 'Premium venue booking',
      icon: Home,
      gradient: 'from-green-500 via-emerald-400 to-teal-500',
      bgGradient: 'from-green-50 via-emerald-25 to-teal-100',
      shadowColor: 'shadow-green-200',
      delay: 'delay-500',
    },
    {
      id: 'makeup',
      title: 'Makeup',
      description: 'Professional makeup artists',
      icon: Heart,
      gradient: 'from-pink-500 via-fuchsia-400 to-purple-500',
      bgGradient: 'from-pink-50 via-fuchsia-25 to-purple-100',
      shadowColor: 'shadow-pink-200',
      delay: 'delay-[600ms]',
    },
    {
      id: 'mehendi',
      title: 'Mehendi',
      description: 'Traditional henna designs',
      icon: Sparkles,
      gradient: 'from-amber-500 via-yellow-400 to-orange-500',
      bgGradient: 'from-amber-50 via-yellow-25 to-orange-100',
      shadowColor: 'shadow-amber-200',
      delay: 'delay-700',
    },
  ];

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-10 animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <Navbar />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4 animate-pulse">
              Welcome, {currentUser?.name}! 
              <span className="inline-block animate-bounce ml-2">🎉</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full animate-pulse"></div>
          </div>
          
          <div className={`flex items-center justify-center text-gray-600 mb-8 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
            <MapPin className="w-5 h-5 mr-2 animate-bounce" />
            <span className="text-lg font-medium">Location: {userLocation}</span>
          </div>
          
          <p className={`text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
            Choose from our premium event services to make your celebration 
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold"> unforgettable</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'} ${service.delay}`}
              >
                <Card
                  className={`relative p-6 bg-gradient-to-br ${service.bgGradient} border-0 shadow-lg ${service.shadowColor} hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-500 hover:scale-105 cursor-pointer group overflow-hidden`}
                  onClick={() => handleServiceClick(service.id)}
                >
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500"></div>
                  <div className="absolute top-4 right-6 w-1 h-1 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-700 delay-100"></div>
                  
                  <div className="text-center relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                      <Icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <Button
                      className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg py-3 font-semibold`}
                    >
                      <span className="group-hover:mr-2 transition-all duration-300">Explore Services</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">✨</span>
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Floating action elements */}
        <div className={`mt-16 text-center transform transition-all duration-1000 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Sparkles className="w-5 h-5 text-purple-600 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-gray-700 font-medium">Making dreams come true since 2020</span>
            <Sparkles className="w-5 h-5 text-pink-600 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
