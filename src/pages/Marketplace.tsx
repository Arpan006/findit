
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItemListing from '@/components/marketplace/ItemListing';
import MarketplaceGrid from '@/components/marketplace/MarketplaceGrid';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Marketplace = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Hostel Marketplace</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Buy, sell, or donate second-hand items within the hostel community.
                From textbooks to electronics, find what you need or give what you don't.
              </p>
            </motion.div>
          </section>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="browse" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Browse Items
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                List an Item
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <MarketplaceGrid />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="list" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ItemListing />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
