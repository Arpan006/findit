
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';

// Mock data for service staff
const mockServiceStaff = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    title: 'Plumber',
    category: 'Plumbing',
    rating: 4.8,
    availability: ['Mon-Fri, 9AM-5PM', 'Sat, 10AM-2PM'],
  },
  {
    id: '2',
    name: 'Anita Sharma',
    title: 'Electrician',
    category: 'Electrical',
    rating: 4.9,
    availability: ['Mon-Sat, 10AM-6PM'],
  },
  {
    id: '3',
    name: 'Vikram Singh',
    title: 'Carpenter',
    category: 'Carpentry',
    rating: 4.7,
    availability: ['Mon-Fri, 8AM-4PM'],
  },
  {
    id: '4',
    name: 'Priya Patel',
    title: 'Laundry Services',
    category: 'Laundry',
    rating: 4.6,
    availability: ['Mon-Sun, 7AM-7PM'],
  },
  {
    id: '5',
    name: 'Sanjay Mehta',
    title: 'AC Technician',
    category: 'HVAC',
    rating: 4.8,
    availability: ['Mon-Sat, 9AM-5PM'],
  }
];

const categories = [
  'All Categories',
  'Plumbing',
  'Electrical',
  'Carpentry',
  'HVAC',
  'Laundry',
  'Cleaning',
  'Painting',
  'IT Support'
];

const ServiceBookingForm = () => {
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  // Filter staff based on selected category
  const filteredStaff = selectedCategory === 'All Categories' 
    ? mockServiceStaff 
    : mockServiceStaff.filter(staff => staff.category === selectedCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStaff || !date || !time || !description || !location) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success message
    toast({
      title: 'Service booked successfully',
      description: 'Your service request has been submitted. You will receive a confirmation shortly.',
    });
    
    // Reset form
    setSelectedStaff('');
    setDate('');
    setTime('');
    setDescription('');
    setLocation('');
    setIsSubmitting(false);
  };

  return (
    <GlassMorphicCard className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">Book a Service</h3>
          <p className="text-muted-foreground">
            Fill in the details below to book a service from one of our verified staff members.
          </p>
        </div>
        
        <div className="space-y-4">
          {/* Service Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">
              Service Category *
            </label>
            <select
              id="category"
              className="input-field appearance-none"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          {/* Staff Selection */}
          <div>
            <label htmlFor="staff" className="block text-sm font-medium text-foreground mb-1">
              Select Staff Member *
            </label>
            <select
              id="staff"
              className="input-field appearance-none"
              value={selectedStaff}
              onChange={e => setSelectedStaff(e.target.value)}
              required
            >
              <option value="" disabled>Select staff member</option>
              {filteredStaff.map(staff => (
                <option key={staff.id} value={staff.id}>
                  {staff.name} - {staff.title} ({staff.rating} ★)
                </option>
              ))}
            </select>
          </div>
          
          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1">
                Date *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-muted-foreground" />
                </div>
                <input
                  id="date"
                  type="date"
                  className="input-field pl-10"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {/* Time */}
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-foreground mb-1">
                Time *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock size={18} className="text-muted-foreground" />
                </div>
                <input
                  id="time"
                  type="time"
                  className="input-field pl-10"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1">
              Room/Location *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-muted-foreground" />
              </div>
              <input
                id="location"
                type="text"
                placeholder="e.g. Hostel A, Room 101"
                className="input-field pl-10"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
              />
            </div>
          </div>
          
          {/* Issue Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
              Issue Description *
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <MessageSquare size={18} className="text-muted-foreground" />
              </div>
              <textarea
                id="description"
                placeholder="Describe the issue or service needed in detail..."
                rows={3}
                className="input-field pl-10"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full py-6 shadow-md bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 border-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="mr-2 animate-spin" />
                Booking...
              </>
            ) : (
              'Book Service'
            )}
          </Button>
        </div>
      </form>
    </GlassMorphicCard>
  );
};

export default ServiceBookingForm;
