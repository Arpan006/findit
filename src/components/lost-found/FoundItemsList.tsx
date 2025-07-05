
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Layers, Filter, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import FingerprintVerification from './FingerprintVerification';

// Storage key for lost and found items
const LOST_ITEMS_STORAGE_KEY = 'findit_lost_items';
const FOUND_ITEMS_STORAGE_KEY = 'findit_found_items';

// Default found items if none exist
const defaultFoundItems = [
  {
    id: '1',
    name: 'Blue Notebook',
    description: 'A blue spiral notebook with "Organic Chemistry" written on the cover.',
    location: 'Library',
    dateFound: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    imageUrl: 'https://images.unsplash.com/photo-1600095077943-9059ad6fde2a?q=80&w=200',
    status: 'available',
    staffId: '2',
    staffName: 'Jane Smith'
  },
  {
    id: '2',
    name: 'Silver Watch',
    description: 'A silver analog watch with a leather strap. Brand appears to be Fossil.',
    location: 'Dining Hall',
    dateFound: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=200',
    status: 'available',
    staffId: '2',
    staffName: 'Jane Smith'
  },
  {
    id: '3',
    name: 'USB Drive',
    description: '32GB SanDisk USB drive, black and red in color.',
    location: 'Study Room',
    dateFound: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    imageUrl: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?q=80&w=200',
    status: 'available',
    staffId: '2',
    staffName: 'Jane Smith'
  },
  {
    id: '4',
    name: 'Water Bottle',
    description: 'Blue hydroflask water bottle with a few stickers on it.',
    location: 'Sports Complex',
    dateFound: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=200',
    status: 'available',
    staffId: '2',
    staffName: 'Jane Smith'
  }
];

const locations = [
  'All Locations',
  'Dining Hall',
  'Study Room',
  'Library',
  'Sports Complex',
  'Hostel Block A',
  'Hostel Block B',
  'Cafeteria',
  'Lecture Hall',
  'Lab Complex'
];

// Initialize found items in localStorage if they don't exist
const initializeFoundItems = () => {
  const foundItems = localStorage.getItem(FOUND_ITEMS_STORAGE_KEY);
  if (!foundItems) {
    localStorage.setItem(FOUND_ITEMS_STORAGE_KEY, JSON.stringify(defaultFoundItems));
  }
};

// Get found items from localStorage
const getFoundItems = () => {
  initializeFoundItems();
  const foundItems = localStorage.getItem(FOUND_ITEMS_STORAGE_KEY);
  return foundItems ? JSON.parse(foundItems) : [];
};

// Update found item status in localStorage
const updateFoundItemStatus = (itemId: string, status: string) => {
  const foundItems = getFoundItems();
  const updatedItems = foundItems.map((item: any) => 
    item.id === itemId ? {...item, status} : item
  );
  localStorage.setItem(FOUND_ITEMS_STORAGE_KEY, JSON.stringify(updatedItems));
  return updatedItems;
};

const FoundItemsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [showFilters, setShowFilters] = useState(false);
  const [verifyingItemId, setVerifyingItemId] = useState<string | null>(null);
  const [foundItems, setFoundItems] = useState<any[]>([]);
  
  const { user, updateGreenPoints } = useAuth();
  const { toast } = useToast();
  
  // Load found items on component mount
  useEffect(() => {
    setFoundItems(getFoundItems());
  }, []);
  
  // Filter items based on search term and location
  const filteredItems = foundItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'All Locations' || item.location === selectedLocation;
    const isAvailable = item.status === 'available';
    
    return matchesSearch && matchesLocation && isAvailable;
  });

  const handleClaimItem = (itemId: string) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to claim an item',
        variant: 'destructive'
      });
      return;
    }
    
    setVerifyingItemId(itemId);
  };

  const handleVerificationSuccess = () => {
    if (!verifyingItemId || !user) return;
    
    // Update the found item status
    const updatedItems = updateFoundItemStatus(verifyingItemId, 'claimed');
    setFoundItems(updatedItems);
    
    // Log the claim in lost items if it's a match
    const lostItems = localStorage.getItem(LOST_ITEMS_STORAGE_KEY);
    if (lostItems) {
      const parsedLostItems = JSON.parse(lostItems);
      const matchingLostItem = parsedLostItems.find((item: any) => 
        item.userId === user.id && 
        item.status === 'not_found' &&
        item.name.toLowerCase() === 
        foundItems.find((found) => found.id === verifyingItemId)?.name.toLowerCase()
      );
      
      if (matchingLostItem) {
        // Update lost item status
        matchingLostItem.status = 'claimed';
        localStorage.setItem(LOST_ITEMS_STORAGE_KEY, JSON.stringify(parsedLostItems));
        
        // Award green points for recovering a lost item
        if (user.role === 'student') {
          updateGreenPoints(15);
        }
      }
    }
    
    toast({
      title: 'Item claimed successfully',
      description: 'Please collect your item from the lost and found desk.',
    });
    
    setVerifyingItemId(null);
  };

  const handleVerificationCancel = () => {
    setVerifyingItemId(null);
  };

  return (
    <div className="space-y-6">
      {verifyingItemId ? (
        <FingerprintVerification
          itemId={verifyingItemId}
          onSuccess={handleVerificationSuccess}
          onCancel={handleVerificationCancel}
        />
      ) : (
        <>
          <GlassMorphicCard className="mb-8">
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
              
              {/* Desktop filters */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={18} className="text-muted-foreground" />
                  </div>
                  <select
                    className="input-field pl-10 h-full appearance-none pr-8"
                    value={selectedLocation}
                    onChange={e => setSelectedLocation(e.target.value)}
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
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
                  <div>
                    <label htmlFor="mobileLocation" className="block text-sm font-medium text-foreground mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin size={18} className="text-muted-foreground" />
                      </div>
                      <select
                        id="mobileLocation"
                        className="input-field pl-10 appearance-none"
                        value={selectedLocation}
                        onChange={e => setSelectedLocation(e.target.value)}
                      >
                        {locations.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </GlassMorphicCard>
          
          {filteredItems.length > 0 ? (
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
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute bottom-0 right-0 px-2 py-1 bg-primary text-white text-xs font-medium rounded-tl-lg">
                          Item #{item.id}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                      
                      <div className="mt-auto space-y-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin size={16} className="mr-1 flex-shrink-0" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar size={16} className="mr-1 flex-shrink-0" />
                          <span>Found on {new Date(item.dateFound).toLocaleDateString()}</span>
                        </div>
                        
                        <Button 
                          variant="default" 
                          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 border-none flex items-center justify-center"
                          onClick={() => handleClaimItem(item.id)}
                        >
                          <Fingerprint size={18} className="mr-2" />
                          Claim Item with Fingerprint
                        </Button>
                      </div>
                    </div>
                  </GlassMorphicCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Layers size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No items found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FoundItemsList;
