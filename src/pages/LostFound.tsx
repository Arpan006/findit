
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LostItemForm from '@/components/lost-found/LostItemForm';
import FoundItemsList from '@/components/lost-found/FoundItemsList';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Fingerprint, Award, Search, AlertCircle } from 'lucide-react';
import { AnimationWrapper } from '@/utils/animations';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const LostFound = () => {
  const [activeTab, setActiveTab] = useState('report');
  
  // Scroll animation controls
  const headerRef = useRef(null);
  const inViewHeader = useInView(headerRef, { once: true, amount: 0.3 });
  const animationHeader = useAnimation();
  
  useEffect(() => {
    if (inViewHeader) {
      animationHeader.start('visible');
    }
  }, [inViewHeader, animationHeader]);

  // Achievement badges (gamification)
  const badges = [
    { icon: <Search size={16} />, label: "Detective", description: "Report or find 3 items" },
    { icon: <Fingerprint size={16} />, label: "Verified", description: "Complete fingerprint verification" },
    { icon: <Award size={16} />, label: "Good Samaritan", description: "Return 5 items to owners" }
  ];

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
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4 relative inline-block"
                whileHover={{ scale: 1.05 }}
              >
                Lost & Found
                <motion.div 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              </motion.h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Report lost items or browse found items to get reunited with your belongings.
                Our system uses AI to match lost and found items, making the recovery process easier.
              </p>
              
              {/* Fingerprint verification feature highlight */}
              <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
                <Fingerprint className="text-primary mr-2" size={18} />
                <span>Now with fingerprint verification for secure item claiming</span>
              </div>
              
              {/* Achievement badges (gamification) */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {badges.map((badge, index) => (
                  <AnimationWrapper 
                    key={index} 
                    animation="fadeIn" 
                    delay={0.2 * index}
                  >
                    <motion.div 
                      className="flex items-center p-2 px-4 bg-muted/50 rounded-full border border-border"
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        backgroundColor: "hsl(var(--muted))"
                      }}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mr-2">
                        {badge.icon}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-medium">{badge.label}</p>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                      </div>
                    </motion.div>
                  </AnimationWrapper>
                ))}
              </div>
            </motion.div>
          </section>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="report" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Report Lost Item
              </TabsTrigger>
              <TabsTrigger value="browse" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Browse Found Items
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="report" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* Floating helper */}
                <motion.div 
                  className="absolute -top-12 -right-4 p-3 bg-accent text-accent-foreground rounded-lg max-w-xs text-sm"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center space-x-2">
                    <AlertCircle size={16} />
                    <span>Add photos to increase chances of finding your item by 80%</span>
                  </div>
                  <div className="absolute -bottom-2 left-8 w-4 h-4 bg-accent transform rotate-45"></div>
                </motion.div>
                
                <LostItemForm />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="browse" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* View toggle */}
                <div className="flex justify-center mb-6">
                  <ToggleGroup type="single" defaultValue="grid">
                    <ToggleGroupItem value="grid" aria-label="Grid view">
                      Grid
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list" aria-label="List view">
                      List
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <FoundItemsList />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LostFound;
