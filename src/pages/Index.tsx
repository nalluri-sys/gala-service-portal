
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/location');
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => 
        (u.email === formData.email || u.phone === formData.email) && 
        u.password === formData.password
      );
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${user.name}!`,
        });
        navigate('/location');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // Signup logic
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Please ensure both passwords match.",
          variant: "destructive",
        });
        return;
      }
      
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        location: formData.location
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast({
        title: "Account Created!",
        description: `Welcome to our platform, ${formData.name}!`,
      });
      navigate('/location');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07')] bg-cover bg-center opacity-10"></div>
      
      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-0 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            🎉 Event Services
          </h1>
          <p className="text-gray-600">Your perfect celebration awaits</p>
        </div>

        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              isLogin
                ? 'bg-white shadow-sm text-purple-600'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              !isLogin
                ? 'bg-white shadow-sm text-purple-600'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">Email / Phone</Label>
            <Input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="Enter email or phone number"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Enter your phone number"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="Enter your city"
                />
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-2.5 font-medium"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Index;
