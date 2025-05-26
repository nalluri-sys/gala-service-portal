
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServicePageHeaderProps {
  title: string;
}

const ServicePageHeader = ({ title }: ServicePageHeaderProps) => {
  const navigate = useNavigate();

  return (
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
        {title}
      </h1>
    </div>
  );
};

export default ServicePageHeader;
