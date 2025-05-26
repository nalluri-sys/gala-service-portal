
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Plus } from 'lucide-react';

const ServicePage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
      return;
    }

    // Load services for the selected category
    loadServices();
  }, [serviceId, navigate]);

  const loadServices = () => {
    const serviceData: Record<string, any[]> = {
      decoration: [
        {
          id: 1,
          name: 'Floral Paradise Setup',
          description: 'Beautiful flower arrangements with rose petals and elegant centerpieces',
          price: 25000,
          image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
          category: 'decoration'
        },
        {
          id: 2,
          name: 'Royal Theme Decoration',
          description: 'Gold and red royal theme with premium draping and lighting',
          price: 45000,
          image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
          category: 'decoration'
        },
        {
          id: 3,
          name: 'Modern Minimalist',
          description: 'Clean, elegant white and green theme perfect for contemporary events',
          price: 30000,
          image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
          category: 'decoration'
        }
      ],
      catering: [
        {
          id: 4,
          name: 'Premium Wedding Menu',
          description: 'Multi-cuisine buffet with 50+ dishes including desserts',
          price: 800,
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
          category: 'catering',
          unit: 'per person'
        },
        {
          id: 5,
          name: 'South Indian Feast',
          description: 'Traditional South Indian menu with authentic flavors',
          price: 600,
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
          category: 'catering',
          unit: 'per person'
        },
        {
          id: 6,
          name: 'Continental Delights',
          description: 'International cuisine with live cooking stations',
          price: 1200,
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
          category: 'catering',
          unit: 'per person'
        }
      ],
      photography: [
        {
          id: 7,
          name: 'Wedding Photography Package',
          description: 'Full day coverage with 2 photographers and 500+ edited photos',
          price: 55000,
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          category: 'photography'
        },
        {
          id: 8,
          name: 'Pre-Wedding Shoot',
          description: 'Beautiful outdoor shoot with 50 edited photos and album',
          price: 25000,
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          category: 'photography'
        },
        {
          id: 9,
          name: 'Candid Photography',
          description: 'Natural, candid moments captured throughout the event',
          price: 35000,
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          category: 'photography'
        }
      ],
      music: [
        {
          id: 10,
          name: 'Premium DJ Package',
          description: 'Professional DJ with sound system and lighting for 6 hours',
          price: 15000,
          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
          category: 'music'
        },
        {
          id: 11,
          name: 'Live Band Performance',
          description: '5-piece live band with popular songs and traditional music',
          price: 45000,
          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
          category: 'music'
        },
        {
          id: 12,
          name: 'Classical Music Ensemble',
          description: 'Traditional classical musicians for religious ceremonies',
          price: 25000,
          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
          category: 'music'
        }
      ],
      venue: [
        {
          id: 13,
          name: 'Grand Ballroom',
          description: 'Luxurious ballroom accommodating 500 guests with AC and parking',
          price: 75000,
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
          category: 'venue'
        },
        {
          id: 14,
          name: 'Garden Venue',
          description: 'Beautiful outdoor garden space for 300 guests with natural ambiance',
          price: 45000,
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
          category: 'venue'
        },
        {
          id: 15,
          name: 'Heritage Palace',
          description: 'Royal heritage venue with traditional architecture for 400 guests',
          price: 120000,
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
          category: 'venue'
        }
      ],
      makeup: [
        {
          id: 16,
          name: 'Bridal Makeup Package',
          description: 'Complete bridal makeup with trial, hair styling and accessories',
          price: 15000,
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          category: 'makeup'
        },
        {
          id: 17,
          name: 'Party Makeup',
          description: 'Glamorous party makeup perfect for special occasions',
          price: 5000,
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          category: 'makeup'
        },
        {
          id: 18,
          name: 'Traditional Look',
          description: 'Classic traditional makeup with cultural elements',
          price: 8000,
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          category: 'makeup'
        }
      ],
      mehendi: [
        {
          id: 19,
          name: 'Bridal Mehendi',
          description: 'Intricate bridal henna design for hands and feet',
          price: 5000,
          image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
          category: 'mehendi'
        },
        {
          id: 20,
          name: 'Arabic Design',
          description: 'Beautiful Arabic style mehendi patterns',
          price: 2500,
          image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
          category: 'mehendi'
        },
        {
          id: 21,
          name: 'Simple Elegant',
          description: 'Simple yet elegant mehendi design for special occasions',
          price: 1500,
          image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
          category: 'mehendi'
        }
      ]
    };

    setServices(serviceData[serviceId as string] || []);
  };

  const addToCart = (service: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === service.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...service, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch custom event for navbar to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Added to Cart!",
      description: `${service.name} has been added to your cart.`,
    });
  };

  const getServiceTitle = () => {
    const titles: Record<string, string> = {
      decoration: 'Decoration Services',
      catering: 'Catering Services',
      photography: 'Photography Services',
      music: 'Music & DJ Services',
      venue: 'Function Hall Venues',
      makeup: 'Makeup Services',
      mehendi: 'Mehendi Services'
    };
    return titles[serviceId as string] || 'Services';
  };

  const formatPrice = (price: number, unit?: string) => {
    return unit ? `₹${price.toLocaleString()} ${unit}` : `₹${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="mr-4 border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {getServiceTitle()}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {formatPrice(service.price, service.unit)}
                  </Badge>
                </div>
                <Button
                  onClick={() => addToCart(service)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
