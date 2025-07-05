
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceCard from '@/components/services/ServiceCard';
import ServiceBookingForm from '@/components/services/ServiceBookingForm';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock data for service providers
const mockServiceProviders = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    title: 'Hostel Plumber',
    category: 'Plumbing',
    rating: 4.8,
    reviews: 56,
    availability: ['Mon-Fri', 'Weekends (Emergency)'],
    location: 'On-campus',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200',
    bio: 'Experienced plumber with 10+ years in hostel maintenance. Specialized in quick fixes for common hostel plumbing issues.',
    verified: true
  },
  {
    id: '2',
    name: 'Anita Sharma',
    title: 'Hostel Electrician',
    category: 'Electrical',
    rating: 4.9,
    reviews: 73,
    availability: ['Mon-Sat', 'On-call'],
    location: 'On-campus',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200',
    bio: 'Certified electrician with expertise in fixing power issues, light fixtures, and electrical appliance problems in student rooms.',
    verified: true
  },
  {
    id: '3',
    name: 'Vikram Singh',
    title: 'Hostel Carpenter',
    category: 'Carpentry',
    rating: 4.7,
    reviews: 42,
    availability: ['Mon-Fri'],
    location: 'On-campus',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    bio: 'Skilled carpenter specialized in repairing hostel furniture, cabinets, and wooden fixtures. Quick and reliable service.',
    verified: true
  },
  {
    id: '4',
    name: 'Priya Patel',
    title: 'Laundry Services',
    category: 'Laundry',
    rating: 4.6,
    reviews: 89,
    availability: ['Daily'],
    location: 'On-campus',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
    bio: 'Provides premium laundry services for hostel students. Quick turnaround time and special care for delicate items.',
    verified: true
  },
  {
    id: '5',
    name: 'Sanjay Mehta',
    title: 'AC Technician',
    category: 'HVAC',
    rating: 4.8,
    reviews: 67,
    availability: ['Mon-Sat'],
    location: 'On-call',
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=200',
    bio: 'Specialized in air conditioning and cooling system repairs. Available for regular maintenance and emergency fixes.',
    verified: true
  }
];

const Services = () => {
  const [activeTab, setActiveTab] = useState('browse');
  
  // Scroll animation controls
  const headerRef = useRef(null);
  const inViewHeader = useInView(headerRef, { once: true, amount: 0.3 });
  const animationHeader = useAnimation();
  
  useEffect(() => {
    if (inViewHeader) {
      animationHeader.start('visible');
    }
  }, [inViewHeader, animationHeader]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <section className="mb-12 text-center" ref={headerRef}>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              animate={animationHeader}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Local Services</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find and book verified maintenance staff for plumbing, electrical, and other repair services.
                All service providers are verified by hostel administration for your safety.
              </p>
            </motion.div>
          </section>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="browse" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Service Providers
              </TabsTrigger>
              <TabsTrigger value="book" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Book a Service
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <GlassMorphicCard className="mb-8">
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">Verified Service Providers</h3>
                    <p className="text-muted-foreground">
                      All service providers are verified by the hostel administration. 
                      You can book services directly or message them for inquiries.
                    </p>
                  </div>
                </GlassMorphicCard>
                
                <div className="space-y-6">
                  {mockServiceProviders.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} />
                  ))}
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="book" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ServiceBookingForm />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
