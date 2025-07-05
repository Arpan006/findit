
import { motion } from 'framer-motion';
import { Star, Clock, Calendar, MapPin, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    title: string;
    category: string;
    rating: number;
    reviews: number;
    availability: string[];
    location: string;
    image: string;
    bio: string;
    verified: boolean;
  };
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  const handleBookService = async () => {
    setIsBooking(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'Booking request sent',
      description: `You will be notified when ${service.name} confirms your booking.`,
    });
    
    setIsBooking(false);
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          size={16} 
          className={i <= rating ? 'text-accent-yellow-500 fill-accent-yellow-500' : 'text-gray-300'} 
        />
      );
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <GlassMorphicCard>
        <div className="flex flex-col md:flex-row md:items-center">
          {/* Image and Rating */}
          <div className="mb-4 md:mb-0 md:mr-6">
            <div className="relative rounded-full overflow-hidden bg-muted w-24 h-24 mx-auto md:mx-0">
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {service.verified && (
                <div className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex justify-center mt-2 md:justify-start">
              {renderStars(service.rating)}
            </div>
            <div className="text-sm text-center md:text-left text-muted-foreground mt-1">
              {service.reviews} reviews
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-semibold mb-1">{service.name}</h3>
            <p className="text-primary font-medium mb-2">{service.title}</p>
            <p className="text-sm text-muted-foreground mb-3">{service.bio}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground">
                <MapPin size={16} className="mr-1 flex-shrink-0" />
                <span>{service.location}</span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground">
                <Clock size={16} className="mr-1 flex-shrink-0" />
                <span>Available: {service.availability.join(', ')}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="default" 
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 border-none flex-1"
                disabled={isBooking}
                onClick={handleBookService}
              >
                {isBooking ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <Calendar size={16} className="mr-2" />
                    Book Service
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1"
              >
                <MessageSquare size={16} className="mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </GlassMorphicCard>
    </motion.div>
  );
};

export default ServiceCard;
