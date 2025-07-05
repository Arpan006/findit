
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Search, Filter, Grid3X3, List, Calendar, MapPin, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { useToast } from '@/hooks/use-toast';

// Mock data for marketplace items
const mockItems = [
  {
    id: '1',
    title: 'Physics Textbook',
    description: 'Fundamentals of Physics by Halliday & Resnick. 10th edition, good condition with minor highlighting.',
    category: 'Textbooks',
    condition: 'Good',
    price: 400,
    type: 'sell',
    date: '2023-06-10',
    location: 'Hostel Block A',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400',
    seller: {
      name: 'Alex Johnson',
      room: 'A-205'
    }
  },
  {
    id: '2',
    title: 'Scientific Calculator',
    description: 'Casio FX-991EX scientific calculator. Like new, includes cover and manual.',
    category: 'Electronics',
    condition: 'Like New',
    price: 800,
    type: 'sell',
    date: '2023-06-08',
    location: 'Hostel Block B',
    image: 'https://images.unsplash.com/photo-1564438497-80a5fe87447a?q=80&w=400',
    seller: {
      name: 'Sarah Patel',
      room: 'B-118'
    }
  },
  {
    id: '3',
    title: 'Winter Jacket',
    description: 'Medium size black winter jacket, barely used. Very warm and comfortable.',
    category: 'Clothing',
    condition: 'Good',
    price: 600,
    type: 'sell',
    date: '2023-06-07',
    location: 'Hostel Block A',
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=400',
    seller: {
      name: 'Mike Chen',
      room: 'A-312'
    }
  },
  {
    id: '4',
    title: 'Chemistry Lab Coat',
    description: 'Standard white lab coat, size L. No stains or damage. Free to a good home!',
    category: 'Clothing',
    condition: 'Good',
    price: 0,
    type: 'donate',
    date: '2023-06-05',
    location: 'Hostel Block B',
    image: 'https://images.unsplash.com/photo-1584308878768-57d8546e3ffa?q=80&w=400',
    seller: {
      name: 'Emma Clark',
      room: 'B-240'
    }
  },
  {
    id: '5',
    title: 'Desk Lamp',
    description: 'Adjustable LED desk lamp with multiple brightness levels. Includes USB charging port.',
    category: 'Furniture',
    condition: 'Like New',
    price: 350,
    type: 'sell',
    date: '2023-06-03',
    location: 'Hostel Block A',
    image: 'https://images.unsplash.com/photo-1534965187426-13b05740388f?q=80&w=400',
    seller: {
      name: 'David Kim',
      room: 'A-127'
    }
  },
  {
    id: '6',
    title: 'Yoga Mat',
    description: 'Purple 6mm thick yoga mat. Lightly used, clean and in great condition.',
    category: 'Sports Equipment',
    condition: 'Good',
    price: 200,
    type: 'sell',
    date: '2023-06-01',
    location: 'Hostel Block B',
    image: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?q=80&w=400',
    seller: {
      name: 'Priya Singh',
      room: 'B-305'
    }
  }
];

const categories = [
  'All Categories',
  'Textbooks',
  'Electronics',
  'Clothing',
  'Furniture',
  'Sports Equipment',
  'Kitchen Items',
  'Stationery',
  'Other'
];

const MarketplaceGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [listingType, setListingType] = useState('all'); // 'all', 'sell', 'donate'
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  // Filter items based on search term, category, and type
  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesType = listingType === 'all' || item.type === listingType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleContact = async (id: string) => {
    setLoadingItem(id);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Message sent',
      description: 'The seller will be notified of your interest.',
    });
    
    setLoadingItem(null);
  };

  return (
    <div className="space-y-6">
      <GlassMorphicCard className="mb-8">
        <div className="flex flex-col space-y-4">
          {/* Search and view toggle */}
          <div className="flex flex-col md:flex-row items-stretch space-y-4 md:space-y-0 md:space-x-4">
            {/* Search bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search for items..."
                className="input-field pl-10 h-full"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* View toggle */}
            <div className="hidden md:flex">
              <div className="flex items-center border border-input rounded-lg overflow-hidden">
                <button
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-background text-muted-foreground'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-background text-muted-foreground'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
            
            {/* Mobile filter toggle */}
            <div className="md:hidden">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} className="mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          {/* Desktop filters */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Category filter */}
              <select
                className="input-field appearance-none"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              {/* Type filter */}
              <div className="flex items-center border border-input rounded-lg overflow-hidden">
                <button
                  className={`px-3 py-2 text-sm font-medium ${listingType === 'all' ? 'bg-primary text-white' : 'bg-background text-muted-foreground'}`}
                  onClick={() => setListingType('all')}
                >
                  All
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium ${listingType === 'sell' ? 'bg-primary text-white' : 'bg-background text-muted-foreground'}`}
                  onClick={() => setListingType('sell')}
                >
                  For Sale
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium ${listingType === 'donate' ? 'bg-green-500 text-white' : 'bg-background text-muted-foreground'}`}
                  onClick={() => setListingType('donate')}
                >
                  Free
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile filters expandable section */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-border md:hidden"
            >
              <div className="space-y-4">
                {/* Category filter */}
                <div>
                  <label htmlFor="mobileCategory" className="block text-sm font-medium text-foreground mb-1">
                    Category
                  </label>
                  <select
                    id="mobileCategory"
                    className="input-field appearance-none"
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                {/* Type filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Listing Type
                  </label>
                  <div className="flex items-center border border-input rounded-lg overflow-hidden">
                    <button
                      className={`flex-1 py-2 text-sm font-medium ${listingType === 'all' ? 'bg-primary text-white' : 'bg-background text-muted-foreground'}`}
                      onClick={() => setListingType('all')}
                    >
                      All
                    </button>
                    <button
                      className={`flex-1 py-2 text-sm font-medium ${listingType === 'sell' ? 'bg-primary text-white' : 'bg-background text-muted-foreground'}`}
                      onClick={() => setListingType('sell')}
                    >
                      For Sale
                    </button>
                    <button
                      className={`flex-1 py-2 text-sm font-medium ${listingType === 'donate' ? 'bg-green-500 text-white' : 'bg-background text-muted-foreground'}`}
                      onClick={() => setListingType('donate')}
                    >
                      Free
                    </button>
                  </div>
                </div>
                
                {/* View Mode */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    View Mode
                  </label>
                  <div className="flex items-center border border-input rounded-lg overflow-hidden">
                    <button
                      className={`flex-1 py-2 flex items-center justify-center ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-background text-muted-foreground'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid3X3 size={18} className="mr-2" />
                      Grid
                    </button>
                    <button
                      className={`flex-1 py-2 flex items-center justify-center ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-background text-muted-foreground'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List size={18} className="mr-2" />
                      List
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </GlassMorphicCard>
      
      {filteredItems.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <GlassMorphicCard>
                  <div className="flex flex-col h-full">
                    <div className="relative mb-4 rounded-lg overflow-hidden bg-muted h-48">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {item.type === 'donate' ? (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                          Free
                        </div>
                      ) : (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-primary text-white text-xs font-medium rounded-full">
                          ₹{item.price}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                    
                    <div className="mt-auto space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item.condition}</span>
                        <span className="text-muted-foreground">{item.category}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin size={16} className="mr-1 flex-shrink-0" />
                        <span>{item.location} • Room {item.seller.room}</span>
                      </div>
                      
                      <Button 
                        variant="default" 
                        className="w-full mt-4"
                        disabled={loadingItem === item.id}
                        onClick={() => handleContact(item.id)}
                      >
                        {loadingItem === item.id ? (
                          <>
                            <Loader2 size={16} className="mr-2 animate-spin" />
                            Contacting...
                          </>
                        ) : (
                          <>
                            <MessageSquare size={16} className="mr-2" />
                            Contact Seller
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </GlassMorphicCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <GlassMorphicCard>
                  <div className="flex flex-col md:flex-row">
                    <div className="relative rounded-lg overflow-hidden bg-muted w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {item.type === 'donate' ? (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                          Free
                        </div>
                      ) : (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-primary text-white text-xs font-medium rounded-full">
                          ₹{item.price}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 flex-grow">
                      <div className="flex flex-col h-full">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                        
                        <div className="mt-auto space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{item.condition}</span>
                            <span className="text-muted-foreground">{item.category}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin size={16} className="mr-1 flex-shrink-0" />
                              <span>{item.location} • {item.seller.name}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar size={16} className="mr-1 flex-shrink-0" />
                              <span>{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <Button 
                            variant="default" 
                            className="w-full mt-4"
                            disabled={loadingItem === item.id}
                            onClick={() => handleContact(item.id)}
                          >
                            {loadingItem === item.id ? (
                              <>
                                <Loader2 size={16} className="mr-2 animate-spin" />
                                Contacting...
                              </>
                            ) : (
                              <>
                                <MessageSquare size={16} className="mr-2" />
                                Contact Seller
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassMorphicCard>
              </motion.div>
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <Tag size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No items found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default MarketplaceGrid;
