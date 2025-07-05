
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ArrowRight, Search, Recycle, Wrench, ArrowDown, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/ui/FeatureCard';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const GlassBall = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md ${className}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      delay,
      duration: 1.5,
      ease: [0, 0.71, 0.2, 1.01]
    }}
  />
);

const Index = () => {
  const features = [
    {
      title: 'Lost & Found',
      description: 'Report lost items or check a database of found items to recover your belongings quickly.',
      icon: <Search size={24} />,
      linkTo: '/lost-found',
      gradient: 'from-blue-500 to-blue-600',
      delay: 0.2
    },
    {
      title: 'Marketplace',
      description: 'Buy, sell, or donate second-hand items from textbooks to electronics within the hostel community.',
      icon: <Recycle size={24} />,
      linkTo: '/marketplace',
      gradient: 'from-green-500 to-green-600',
      delay: 0.4
    },
    {
      title: 'Local Services',
      description: 'Find and book verified maintenance staff for plumbing, electrical, and other repair services.',
      icon: <Wrench size={24} />,
      linkTo: '/services',
      gradient: 'from-blue-500 to-green-500',
      delay: 0.6
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Arjun Singh',
      role: 'Computer Science Student',
      content: 'I found my lost calculator within hours of posting it on FindIt. The matching system is brilliant!',
      rating: 5
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Chemical Engineering Student',
      content: 'Selling my old textbooks was so easy with the marketplace feature. Made some money and helped juniors too!',
      rating: 5
    },
    {
      id: 3,
      name: 'Rohit Patel',
      role: 'Mechanical Engineering Student',
      content: 'The service booking feature saved me when my room\'s AC broke down. The technician arrived the same day!',
      rating: 4
    }
  ];

  // Scroll animation controls
  const featuresRef = useRef(null);
  const inViewFeatures = useInView(featuresRef, { once: true, amount: 0.3 });
  const animationFeatures = useAnimation();

  const statsRef = useRef(null);
  const inViewStats = useInView(statsRef, { once: true, amount: 0.3 });
  const animationStats = useAnimation();

  const testimonialsRef = useRef(null);
  const inViewTestimonials = useInView(testimonialsRef, { once: true, amount: 0.3 });
  const animationTestimonials = useAnimation();

  useEffect(() => {
    if (inViewFeatures) {
      animationFeatures.start('visible');
    }
    if (inViewStats) {
      animationStats.start('visible');
    }
    if (inViewTestimonials) {
      animationTestimonials.start('visible');
    }
  }, [inViewFeatures, inViewStats, inViewTestimonials, animationFeatures, animationStats, animationTestimonials]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Glass balls background effect */}
        <GlassBall className="w-64 h-64 top-[-5%] right-[-5%] opacity-40" delay={0.2} />
        <GlassBall className="w-96 h-96 bottom-[-15%] left-[-10%] opacity-30" delay={0.5} />
        <GlassBall className="w-48 h-48 top-[40%] right-[10%] opacity-20" delay={0.8} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-4">
                Welcome to VIT Bhopal's Hostel Community Platform
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                FindIt
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 mx-auto max-w-2xl">
                Enhancing hostel life with a unified platform for finding lost items, 
                sharing resources, and accessing maintenance services.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white border-none py-6 px-8 shadow-md">
                <Link to="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-background/80 backdrop-blur-sm py-6 px-8">
                <Link to="#features">
                  Learn More
                  <ArrowDown className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative mx-auto max-w-4xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-blue-500/80 to-green-500/80 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl"></div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <GlassMorphicCard className="w-full max-w-2xl mx-auto">
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                        <span className="font-bold text-white text-2xl">F</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-4">Connecting Hostel Communities</h2>
                      <p className="text-muted-foreground mb-6">
                        Our platform makes it easy to recover lost items, share resources, and access maintenance services.
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {features.map((feature, index) => (
                          <Link
                            key={index}
                            to={feature.linkTo}
                            className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full text-primary text-sm font-medium transition-colors flex items-center"
                          >
                            {feature.title}
                            <ChevronRight size={16} className="ml-1" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </GlassMorphicCard>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-background" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={animationFeatures}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover all the ways FindIt makes hostel life easier and more connected.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            initial="hidden"
            animate={animationStats}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ delay: 0.2 }}
              className="glassmorphic p-8 rounded-xl"
            >
              <div className="text-5xl font-bold text-blue-500 mb-2">243</div>
              <div className="text-lg font-medium mb-1">Items Recovered</div>
              <p className="text-muted-foreground text-sm">
                Lost items successfully returned to their owners through our platform.
              </p>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ delay: 0.3 }}
              className="glassmorphic p-8 rounded-xl"
            >
              <div className="text-5xl font-bold text-green-500 mb-2">531</div>
              <div className="text-lg font-medium mb-1">Items Exchanged</div>
              <p className="text-muted-foreground text-sm">
                Second-hand items sold or donated within the hostel community.
              </p>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ delay: 0.4 }}
              className="glassmorphic p-8 rounded-xl"
            >
              <div className="text-5xl font-bold text-primary mb-2">178</div>
              <div className="text-lg font-medium mb-1">Service Bookings</div>
              <p className="text-muted-foreground text-sm">
                Maintenance requests successfully completed by verified staff.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-background" ref={testimonialsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={animationTestimonials}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here's what students at VIT Bhopal have to say about FindIt.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ delay: 0.2 * index }}
              >
                <GlassMorphicCard>
                  <div className="p-1">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < testimonial.rating ? 'text-accent-yellow-500 fill-accent-yellow-500' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <p className="text-foreground mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-medium text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </GlassMorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Connect with Your Hostel Community?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join FindIt today and experience an enhanced hostel life at VIT Bhopal.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 border-none py-6 px-8 shadow-lg">
            <Link to="/register">
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
