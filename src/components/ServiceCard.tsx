
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Service, formatPrice } from '@/data/serviceData';

interface ServiceCardProps {
  service: Service;
  showQuantity?: boolean;
  colorScheme?: 'default' | 'green' | 'red';
}

const ServiceCard = ({ service, showQuantity = false, colorScheme = 'default' }: ServiceCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === service.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...service, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch custom event for navbar to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
    
    const message = showQuantity 
      ? `${service.name} (${quantity} servings) has been added to your cart.`
      : `${service.name} has been added to your cart.`;
    
    toast({
      title: "Added to Cart!",
      description: message,
    });
  };

  const getColorScheme = () => {
    switch (colorScheme) {
      case 'green':
        return {
          border: 'border-green-200',
          badge: 'bg-gradient-to-r from-green-500 to-green-600',
          button: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
        };
      case 'red':
        return {
          border: 'border-red-200',
          badge: 'bg-gradient-to-r from-red-500 to-red-600',
          button: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
        };
      default:
        return {
          border: '',
          badge: 'bg-gradient-to-r from-purple-500 to-pink-500',
          button: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
        };
    }
  };

  const colors = getColorScheme();

  return (
    <Card className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white ${colors.border}`}>
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
          <Badge className={`${colors.badge} text-white`}>
            {formatPrice(service.price, service.unit)}
          </Badge>
        </div>
        
        {showQuantity && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => updateQuantity(-1)}
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 h-8 text-center"
                min="1"
              />
              <Button
                onClick={() => updateQuantity(1)}
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        <Button
          onClick={addToCart}
          className={`w-full ${colors.button} text-white`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ServiceCard;
