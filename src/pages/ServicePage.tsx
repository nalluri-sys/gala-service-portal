import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Navbar';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

const ServicePage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

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
        },
        {
          id: 29,
          name: 'Vintage Rustic Setup',
          description: 'Wooden elements with fairy lights and vintage accessories',
          price: 35000,
          image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
          category: 'decoration'
        },
        {
          id: 30,
          name: 'Butterfly Garden Theme',
          description: 'Colorful butterfly decorations with garden-style arrangements',
          price: 28000,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
          category: 'decoration'
        },
        {
          id: 31,
          name: 'Crystal Palace Setup',
          description: 'Luxurious crystal chandeliers and glass centerpieces',
          price: 55000,
          image: 'https://images.unsplash.com/photo-1519167758481-83f29c388958',
          category: 'decoration'
        },
        {
          id: 32,
          name: 'Beach Theme Decoration',
          description: 'Coastal vibes with seashells, sand, and ocean-inspired elements',
          price: 32000,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
          category: 'decoration'
        }
      ],
      catering: [
        {
          id: 4,
          name: 'Paneer Butter Masala',
          description: 'Rich and creamy paneer curry with aromatic spices',
          price: 200,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
          category: 'catering',
          type: 'veg',
          unit: 'per serving'
        },
        {
          id: 5,
          name: 'Dal Makhani',
          description: 'Slow-cooked black lentils in rich tomato and butter gravy',
          price: 150,
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d',
          category: 'catering',
          type: 'veg',
          unit: 'per serving'
        },
        {
          id: 6,
          name: 'Vegetable Biryani',
          description: 'Fragrant basmati rice with mixed vegetables and aromatic spices',
          price: 180,
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d94c',
          category: 'catering',
          type: 'veg',
          unit: 'per serving'
        },
        {
          id: 7,
          name: 'Aloo Gobi',
          description: 'Traditional potato and cauliflower curry with Indian spices',
          price: 120,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
          category: 'catering',
          type: 'veg',
          unit: 'per serving'
        },
        {
          id: 8,
          name: 'Chole Bhature',
          description: 'Spicy chickpea curry served with fluffy fried bread',
          price: 160,
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84',
          category: 'catering',
          type: 'veg',
          unit: 'per serving'
        },
        {
          id: 33,
          name: 'Palak Paneer',
          description: 'Cottage cheese cubes in rich spinach gravy',
          price: 180,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
          category: 'catering',
          type: 'veg',
          unit: 'per serving'
        },
        {
          id: 34,
          name: 'Rajma Masala',
          description: 'Red kidney beans in thick tomato-based curry',
          price: 140,
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d',
          category: 'catering',
          type: 'veg',
          unit: 'per serving'
        },
        {
          id: 35,
          name: 'Malai Kofta',
          description: 'Deep-fried cottage cheese balls in creamy curry',
          price: 220,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
          category: 'catering',
          type: 'veg',
          unit: 'per serving'
        },
        {
          id: 36,
          name: 'Stuffed Paratha',
          description: 'Indian bread stuffed with spiced vegetables',
          price: 80,
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84',
          category: 'catering',
          type: 'veg',
          unit: 'per serving'
        },
        {
          id: 9,
          name: 'Butter Chicken',
          description: 'Tender chicken in rich tomato and butter curry',
          price: 300,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
          category: 'catering',
          type: 'nonveg',
          unit: 'per serving'
        },
        {
          id: 10,
          name: 'Chicken Biryani',
          description: 'Aromatic basmati rice with spiced chicken pieces',
          price: 280,
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d94c',
          category: 'catering',
          type: 'nonveg',
          unit: 'per serving'
        },
        {
          id: 11,
          name: 'Mutton Curry',
          description: 'Slow-cooked mutton in traditional spicy gravy',
          price: 400,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
          category: 'catering',
          type: 'nonveg',
          unit: 'per serving'
        },
        {
          id: 12,
          name: 'Fish Curry',
          description: 'Fresh fish cooked in coconut and spice curry',
          price: 350,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
          category: 'catering',
          type: 'nonveg',
          unit: 'per serving'
        },
        {
          id: 13,
          name: 'Chicken Tikka Masala',
          description: 'Grilled chicken in creamy tomato-based sauce',
          price: 320,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
          category: 'catering',
          type: 'nonveg',
          unit: 'per serving'
        },
        {
          id: 37,
          name: 'Tandoori Chicken',
          description: 'Clay oven roasted chicken with traditional spices',
          price: 250,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
          category: 'catering',
          type: 'nonveg',
          unit: 'per serving'
        },
        {
          id: 38,
          name: 'Prawn Curry',
          description: 'Fresh prawns in spicy coconut curry',
          price: 380,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
          category: 'catering',
          type: 'nonveg',
          unit: 'per serving'
        },
        {
          id: 39,
          name: 'Chicken Kebab',
          description: 'Grilled chicken skewers with aromatic herbs',
          price: 180,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
          category: 'catering',
          type: 'nonveg',
          unit: 'per serving'
        },
        {
          id: 40,
          name: 'Mutton Biryani',
          description: 'Fragrant rice with tender mutton pieces and spices',
          price: 450,
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d94c',
          category: 'catering',
          type: 'nonveg',
          unit: 'per serving'
        }
      ],
      photography: [
        {
          id: 14,
          name: 'Wedding Photography Package',
          description: 'Full day coverage with 2 photographers and 500+ edited photos',
          price: 55000,
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          category: 'photography'
        },
        {
          id: 15,
          name: 'Pre-Wedding Shoot',
          description: 'Beautiful outdoor shoot with 50 edited photos and album',
          price: 25000,
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          category: 'photography'
        },
        {
          id: 16,
          name: 'Candid Photography',
          description: 'Natural, candid moments captured throughout the event',
          price: 35000,
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          category: 'photography'
        },
        {
          id: 41,
          name: 'Traditional Photography',
          description: 'Classic posed photos with traditional styling and props',
          price: 30000,
          image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
          category: 'photography'
        },
        {
          id: 42,
          name: 'Drone Photography',
          description: 'Aerial shots and cinematic videos from unique angles',
          price: 20000,
          image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f',
          category: 'photography'
        },
        {
          id: 43,
          name: 'Baby Shower Photography',
          description: 'Tender moments captured during baby shower celebrations',
          price: 15000,
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
          category: 'photography'
        },
        {
          id: 44,
          name: 'Birthday Party Photography',
          description: 'Fun and energetic coverage of birthday celebrations',
          price: 12000,
          image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d',
          category: 'photography'
        }
      ],
      music: [
        {
          id: 17,
          name: 'Premium DJ Package',
          description: 'Professional DJ with sound system and lighting for 6 hours',
          price: 15000,
          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
          category: 'music'
        },
        {
          id: 18,
          name: 'Live Band Performance',
          description: '5-piece live band with popular songs and traditional music',
          price: 45000,
          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
          category: 'music'
        },
        {
          id: 19,
          name: 'Classical Music Ensemble',
          description: 'Traditional classical musicians for religious ceremonies',
          price: 25000,
          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
          category: 'music'
        },
        {
          id: 45,
          name: 'Bollywood DJ',
          description: 'Specialist in Bollywood hits with dance floor lighting',
          price: 18000,
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
          category: 'music'
        },
        {
          id: 46,
          name: 'Acoustic Guitar Duo',
          description: 'Romantic acoustic performances for intimate gatherings',
          price: 8000,
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
          category: 'music'
        },
        {
          id: 47,
          name: 'Karaoke Setup',
          description: 'Complete karaoke system with song library and microphones',
          price: 5000,
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
          category: 'music'
        },
        {
          id: 48,
          name: 'Folk Music Band',
          description: 'Traditional folk musicians with authentic instruments',
          price: 20000,
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
          category: 'music'
        }
      ],
      venue: [
        {
          id: 20,
          name: 'Grand Ballroom',
          description: 'Luxurious ballroom accommodating 500 guests with AC and parking',
          price: 75000,
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
          category: 'venue'
        },
        {
          id: 21,
          name: 'Garden Venue',
          description: 'Beautiful outdoor garden space for 300 guests with natural ambiance',
          price: 45000,
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
          category: 'venue'
        },
        {
          id: 22,
          name: 'Heritage Palace',
          description: 'Royal heritage venue with traditional architecture for 400 guests',
          price: 120000,
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
          category: 'venue'
        },
        {
          id: 49,
          name: 'Rooftop Terrace',
          description: 'Modern rooftop venue with city views for 200 guests',
          price: 65000,
          image: 'https://images.unsplash.com/photo-1519167758481-83f29c388958',
          category: 'venue'
        },
        {
          id: 50,
          name: 'Lakeside Resort',
          description: 'Peaceful lakeside location with natural beauty for 350 guests',
          price: 85000,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
          category: 'venue'
        },
        {
          id: 51,
          name: 'Banquet Hall',
          description: 'Traditional banquet hall with modern amenities for 600 guests',
          price: 55000,
          image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
          category: 'venue'
        },
        {
          id: 52,
          name: 'Beach Resort',
          description: 'Beachfront venue with ocean views for 250 guests',
          price: 95000,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
          category: 'venue'
        }
      ],
      makeup: [
        {
          id: 23,
          name: 'Bridal Makeup Package',
          description: 'Complete bridal makeup with trial, hair styling and accessories',
          price: 15000,
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          category: 'makeup'
        },
        {
          id: 24,
          name: 'Party Makeup',
          description: 'Glamorous party makeup perfect for special occasions',
          price: 5000,
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          category: 'makeup'
        },
        {
          id: 25,
          name: 'Traditional Look',
          description: 'Classic traditional makeup with cultural elements',
          price: 8000,
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          category: 'makeup'
        },
        {
          id: 53,
          name: 'HD Airbrush Makeup',
          description: 'Professional airbrush makeup for flawless finish',
          price: 12000,
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e',
          category: 'makeup'
        },
        {
          id: 54,
          name: 'Groom Makeup',
          description: 'Grooming and makeup services for grooms',
          price: 3500,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
          category: 'makeup'
        },
        {
          id: 55,
          name: 'Engagement Makeup',
          description: 'Elegant makeup for engagement ceremonies',
          price: 7000,
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e',
          category: 'makeup'
        },
        {
          id: 56,
          name: 'Pre-Wedding Makeup',
          description: 'Photo shoot ready makeup for pre-wedding sessions',
          price: 6000,
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e',
          category: 'makeup'
        }
      ],
      mehendi: [
        {
          id: 26,
          name: 'Bridal Mehendi',
          description: 'Intricate bridal henna design for hands and feet',
          price: 5000,
          image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
          category: 'mehendi'
        },
        {
          id: 27,
          name: 'Arabic Design',
          description: 'Beautiful Arabic style mehendi patterns',
          price: 2500,
          image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
          category: 'mehendi'
        },
        {
          id: 28,
          name: 'Simple Elegant',
          description: 'Simple yet elegant mehendi design for special occasions',
          price: 1500,
          image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
          category: 'mehendi'
        },
        {
          id: 57,
          name: 'Indo-Arabic Fusion',
          description: 'Combination of Indian and Arabic mehendi styles',
          price: 3500,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
          category: 'mehendi'
        },
        {
          id: 58,
          name: 'Floral Patterns',
          description: 'Delicate floral mehendi designs with intricate details',
          price: 3000,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
          category: 'mehendi'
        },
        {
          id: 59,
          name: 'Contemporary Design',
          description: 'Modern mehendi patterns with geometric elements',
          price: 2800,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
          category: 'mehendi'
        },
        {
          id: 60,
          name: 'Mandala Style',
          description: 'Circular mandala patterns with traditional motifs',
          price: 4000,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
          category: 'mehendi'
        }
      ]
    };

    setServices(serviceData[serviceId as string] || []);
    
    // Initialize quantities for each service
    const initialQuantities: Record<number, number> = {};
    serviceData[serviceId as string]?.forEach(service => {
      initialQuantities[service.id] = 1;
    });
    setQuantities(initialQuantities);
  };

  const updateQuantity = (serviceId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [serviceId]: Math.max(1, (prev[serviceId] || 1) + change)
    }));
  };

  const addToCart = (service: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const quantity = quantities[service.id] || 1;
    const existingItem = cart.find((item: any) => item.id === service.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...service, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch custom event for navbar to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Added to Cart!",
      description: `${service.name} (${quantity} servings) has been added to your cart.`,
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

  // Special rendering for catering page
  if (serviceId === 'catering') {
    const vegServices = services.filter(service => service.type === 'veg');
    const nonVegServices = services.filter(service => service.type === 'nonveg');

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

          {/* Vegetarian Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
              <span className="text-2xl mr-2">🥬</span>
              Vegetarian Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vegServices.map((service) => (
                <Card key={service.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white border-green-200">
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
                      <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        {formatPrice(service.price, service.unit)}
                      </Badge>
                    </div>
                    
                    {/* Quantity Selection */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-700">Quantity:</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => updateQuantity(service.id, -1)}
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={quantities[service.id] || 1}
                          onChange={(e) => setQuantities(prev => ({
                            ...prev,
                            [service.id]: Math.max(1, parseInt(e.target.value) || 1)
                          }))}
                          className="w-16 h-8 text-center"
                          min="1"
                        />
                        <Button
                          onClick={() => updateQuantity(service.id, 1)}
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Button
                      onClick={() => addToCart(service)}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Non-Vegetarian Section */}
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
              <span className="text-2xl mr-2">🍖</span>
              Non-Vegetarian Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nonVegServices.map((service) => (
                <Card key={service.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white border-red-200">
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
                      <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                        {formatPrice(service.price, service.unit)}
                      </Badge>
                    </div>
                    
                    {/* Quantity Selection */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-700">Quantity:</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => updateQuantity(service.id, -1)}
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={quantities[service.id] || 1}
                          onChange={(e) => setQuantities(prev => ({
                            ...prev,
                            [service.id]: Math.max(1, parseInt(e.target.value) || 1)
                          }))}
                          className="w-16 h-8 text-center"
                          min="1"
                        />
                        <Button
                          onClick={() => updateQuantity(service.id, 1)}
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Button
                      onClick={() => addToCart(service)}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
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
      </div>
    );
  }

  // Default rendering for other service categories
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
