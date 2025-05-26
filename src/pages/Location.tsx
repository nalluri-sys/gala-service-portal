
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { MapPin } from 'lucide-react';

const Location = () => {
  const [location, setLocation] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
      return;
    }
    
    const userData = JSON.parse(user);
    setCurrentUser(userData);
    if (userData.location) {
      setLocation(userData.location);
    }
  }, [navigate]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // In a real app, you'd use a geocoding service here
            setLocation(`Lat: ${latitude.toFixed(2)}, Lng: ${longitude.toFixed(2)}`);
            toast({
              title: "Location Detected!",
              description: "Your current location has been set.",
            });
          } catch (error) {
            toast({
              title: "Location Error",
              description: "Could not fetch location details.",
              variant: "destructive",
            });
          }
        },
        (error) => {
          toast({
            title: "Location Access Denied",
            description: "Please enter your location manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Please enter your location manually.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter or select your location.",
        variant: "destructive",
      });
      return;
    }

    // Update user's location
    const updatedUser = { ...currentUser, location };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    localStorage.setItem('userLocation', location);
    
    toast({
      title: "Location Set!",
      description: `Location set to: ${location}`,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500673922987-e212871fec22')] bg-cover bg-center opacity-10"></div>
      
      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-0 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Select Location
          </h1>
          <p className="text-gray-600">
            Hello, {currentUser?.name}! Where are you planning your event?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="location">Your Location</Label>
            <Input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1"
              placeholder="Enter your city or area"
              required
            />
          </div>

          <Button
            type="button"
            onClick={getCurrentLocation}
            variant="outline"
            className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Use Current Location
          </Button>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2.5 font-medium"
          >
            Continue to Dashboard
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Location;
