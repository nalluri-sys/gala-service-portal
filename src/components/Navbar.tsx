
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { User, LogOut, ShoppingCart } from 'lucide-react';

export const Navbar = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    // Update cart count
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };

    updateCartCount();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userLocation');
    localStorage.removeItem('cart');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-purple-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={goToDashboard}
          >
            <span className="text-2xl">🎉</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Event Services
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser && (
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="w-4 h-4" />
                <span className="hidden md:inline">{currentUser.name}</span>
              </div>
            )}

            <Button
              onClick={goToCart}
              variant="outline"
              className="relative border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-1.5 py-0.5">
                  {cartCount}
                </Badge>
              )}
              <span className="hidden md:inline ml-2">Cart</span>
            </Button>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
