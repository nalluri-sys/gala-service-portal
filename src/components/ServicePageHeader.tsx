
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServicePageHeaderProps {
  title: string;
}

const ServicePageHeader = ({ title }: ServicePageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-8 relative">
      {/* Decorative elements */}
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-60 animate-ping"></div>
      <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-60 animate-ping delay-500"></div>
      
      <Button
        onClick={() => navigate('/dashboard')}
        variant="outline"
        className="mr-6 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm bg-white/80"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
        <span className="font-medium">Back to Dashboard</span>
      </Button>
      
      <div className="flex items-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent relative">
          {title}
          <div className="absolute -top-1 -right-8">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </h1>
      </div>
      
      {/* Animated underline */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full opacity-30 animate-pulse"></div>
    </div>
  );
};

export default ServicePageHeader;
