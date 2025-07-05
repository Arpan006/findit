
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, Award, MapPin, Clock, Search, MessageCircle, 
  Wrench, ShoppingBag, Eye, Fingerprint, LogOut, AlertTriangle,
  Mail
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

// Storage keys
const LOST_ITEMS_STORAGE_KEY = 'findit_lost_items';
const FOUND_ITEMS_STORAGE_KEY = 'findit_found_items';

const Dashboard = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [lostItems, setLostItems] = useState<any[]>([]);
  const [foundItems, setFoundItems] = useState<any[]>([]);
  const [claimedItems, setClaimedItems] = useState<any[]>([]);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to access the dashboard.',
        variant: 'destructive'
      });
      navigate('/login');
      return;
    }
    
    // Load user's lost items
    const storedLostItems = localStorage.getItem(LOST_ITEMS_STORAGE_KEY);
    if (storedLostItems && user) {
      const parsed = JSON.parse(storedLostItems);
      const userItems = parsed.filter((item: any) => item.userId === user.id);
      setLostItems(userItems);
    }
    
    // Load claimed items (found items claimed by this user)
    const storedFoundItems = localStorage.getItem(FOUND_ITEMS_STORAGE_KEY);
    if (storedFoundItems && user) {
      const parsed = JSON.parse(storedFoundItems);
      const claimed = parsed.filter((item: any) => item.status === 'claimed');
      setClaimedItems(claimed);
      
      // For staff, show all found items they reported
      if (user.role === 'staff') {
        const staffItems = parsed.filter((item: any) => item.staffId === user.id);
        setFoundItems(staffItems);
      }
    }
  }, [isLoading, isAuthenticated, navigate, toast, user]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'not_found':
        return 'bg-destructive text-destructive-foreground';
      case 'matched':
        return 'bg-yellow-500 text-white';
      case 'claimed':
        return 'bg-green-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'not_found':
        return 'Not Found';
      case 'matched':
        return 'Matched';
      case 'claimed':
        return 'Claimed';
      case 'available':
        return 'Available';
      default:
        return status;
    }
  };
  
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user.name}! Manage your lost items, marketplace listings, and service requests.
              </p>
            </div>
            
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0 flex items-center"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Profile
              </TabsTrigger>
              <TabsTrigger value="items" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                My Items
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Activity
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* User Profile Card */}
                  <GlassMorphicCard>
                    <div className="p-6 text-center">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <User size={50} className="text-primary" />
                      </div>
                      
                      <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                      <Badge className="mb-4">
                        {user.role === 'student' ? 'Student' : user.role === 'staff' ? 'Staff' : 'Admin'}
                      </Badge>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center">
                          <Mail size={16} className="text-muted-foreground mr-2" />
                          <span>{user.email}</span>
                        </div>
                        
                        {user.role === 'student' && user.roomNumber && (
                          <div className="flex items-center justify-center">
                            <MapPin size={16} className="text-muted-foreground mr-2" />
                            <span>Room {user.roomNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </GlassMorphicCard>
                  
                  {/* Green Points Card (for students) */}
                  {user.role === 'student' && (
                    <GlassMorphicCard>
                      <div className="p-6 text-center">
                        <Award size={40} className="text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Green Points</h3>
                        
                        <div className="text-3xl font-bold text-green-500 mb-4">
                          {user.greenPoints || 0}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">
                          Earn points by reporting lost items, returning found items, and sharing resources.
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Report lost item</span>
                            <span className="font-medium">+5 points</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Recover lost item</span>
                            <span className="font-medium">+15 points</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Share second-hand item</span>
                            <span className="font-medium">+10 points</span>
                          </div>
                        </div>
                      </div>
                    </GlassMorphicCard>
                  )}
                  
                  {/* Quick Links Card */}
                  <GlassMorphicCard>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-center">Quick Actions</h3>
                      
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => navigate('/lost-found')}
                        >
                          <Search size={16} className="mr-2 text-primary" />
                          Report Lost Item
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => navigate('/marketplace')}
                        >
                          <ShoppingBag size={16} className="mr-2 text-green-500" />
                          Browse Marketplace
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => navigate('/services')}
                        >
                          <Wrench size={16} className="mr-2 text-blue-500" />
                          Book a Service
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab('items')}
                        >
                          <Eye size={16} className="mr-2 text-accent" />
                          View My Items
                        </Button>
                      </div>
                    </div>
                  </GlassMorphicCard>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* My Items Tab */}
            <TabsContent value="items">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Lost Items */}
                <GlassMorphicCard>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Search size={20} className="mr-2 text-primary" />
                      My Lost Items
                    </h3>
                    
                    {lostItems.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 px-4 font-medium">Item</th>
                              <th className="text-left py-2 px-4 font-medium">Location</th>
                              <th className="text-left py-2 px-4 font-medium">Date Lost</th>
                              <th className="text-left py-2 px-4 font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lostItems.map((item) => (
                              <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30">
                                <td className="py-3 px-4">{item.name}</td>
                                <td className="py-3 px-4">{item.location}</td>
                                <td className="py-3 px-4">{new Date(item.dateLost).toLocaleDateString()}</td>
                                <td className="py-3 px-4">
                                  <Badge className={getStatusBadgeColor(item.status)}>
                                    {getStatusText(item.status)}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AlertTriangle size={40} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground">
                          You haven't reported any lost items yet.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => navigate('/lost-found')}
                        >
                          Report Lost Item
                        </Button>
                      </div>
                    )}
                  </div>
                </GlassMorphicCard>
                
                {/* Claimed Items */}
                <GlassMorphicCard>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Fingerprint size={20} className="mr-2 text-green-500" />
                      Claimed Items
                    </h3>
                    
                    {claimedItems.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 px-4 font-medium">Item</th>
                              <th className="text-left py-2 px-4 font-medium">Found At</th>
                              <th className="text-left py-2 px-4 font-medium">Date Found</th>
                              <th className="text-left py-2 px-4 font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {claimedItems.map((item) => (
                              <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30">
                                <td className="py-3 px-4">{item.name}</td>
                                <td className="py-3 px-4">{item.location}</td>
                                <td className="py-3 px-4">{new Date(item.dateFound).toLocaleDateString()}</td>
                                <td className="py-3 px-4">
                                  <Badge className="bg-green-500 text-white">
                                    {getStatusText(item.status)}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AlertTriangle size={40} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground">
                          You haven't claimed any found items yet.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => navigate('/lost-found')}
                        >
                          Browse Found Items
                        </Button>
                      </div>
                    )}
                  </div>
                </GlassMorphicCard>
                
                {/* Staff reported items (only for staff) */}
                {user.role === 'staff' && (
                  <GlassMorphicCard>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Search size={20} className="mr-2 text-blue-500" />
                        Reported Found Items
                      </h3>
                      
                      {foundItems.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left py-2 px-4 font-medium">Item</th>
                                <th className="text-left py-2 px-4 font-medium">Found At</th>
                                <th className="text-left py-2 px-4 font-medium">Date Found</th>
                                <th className="text-left py-2 px-4 font-medium">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {foundItems.map((item) => (
                                <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30">
                                  <td className="py-3 px-4">{item.name}</td>
                                  <td className="py-3 px-4">{item.location}</td>
                                  <td className="py-3 px-4">{new Date(item.dateFound).toLocaleDateString()}</td>
                                  <td className="py-3 px-4">
                                    <Badge className={
                                      item.status === 'available' 
                                        ? 'bg-primary text-white' 
                                        : 'bg-green-500 text-white'
                                    }>
                                      {getStatusText(item.status)}
                                    </Badge>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <AlertTriangle size={40} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                          <p className="text-muted-foreground">
                            You haven't reported any found items yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </GlassMorphicCard>
                )}
              </motion.div>
            </TabsContent>
            
            {/* Activity Tab */}
            <TabsContent value="activity">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <GlassMorphicCard>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-6 text-center">Recent Activity</h3>
                    
                    <div className="space-y-6">
                      {lostItems.length > 0 || claimedItems.length > 0 ? (
                        <>
                          {/* Recent activities based on user data */}
                          {lostItems.slice(0, 3).map((item) => (
                            <div key={`lost-${item.id}`} className="flex items-start space-x-4 pb-4 border-b border-border/50">
                              <div className="bg-primary/10 p-2 rounded-full">
                                <Search size={18} className="text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">Reported lost item: {item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(item.dateReported).toLocaleString()}
                                </p>
                              </div>
                              <Badge className={getStatusBadgeColor(item.status)}>
                                {getStatusText(item.status)}
                              </Badge>
                            </div>
                          ))}
                          
                          {claimedItems.slice(0, 3).map((item) => (
                            <div key={`claimed-${item.id}`} className="flex items-start space-x-4 pb-4 border-b border-border/50">
                              <div className="bg-green-500/10 p-2 rounded-full">
                                <Fingerprint size={18} className="text-green-500" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">Claimed item: {item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {/* Claim date wouldn't be stored, so this is a mock */}
                                  {new Date().toLocaleString()}
                                </p>
                              </div>
                              <Badge className="bg-green-500 text-white">
                                Claimed
                              </Badge>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <Clock size={40} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                          <p className="text-muted-foreground">
                            No recent activity to display.
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Your activity will appear here as you use FindIt.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassMorphicCard>
                
                {/* Notifications Card */}
                <GlassMorphicCard className="mt-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-6 text-center">Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-3 bg-primary/5 rounded-lg">
                        <MessageCircle size={18} className="text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Welcome to FindIt!</p>
                          <p className="text-sm text-muted-foreground">
                            Thanks for joining our platform. Explore the features and start finding what you need.
                          </p>
                        </div>
                      </div>
                      
                      {lostItems.length > 0 && (
                        <div className="flex items-start space-x-4 p-3 bg-blue-500/5 rounded-lg">
                          <Search size={18} className="text-blue-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Lost Item Update</p>
                            <p className="text-sm text-muted-foreground">
                              We're actively looking for your lost items. We'll notify you when there's a match.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {user.role === 'student' && user.greenPoints && user.greenPoints > 0 && (
                        <div className="flex items-start space-x-4 p-3 bg-green-500/5 rounded-lg">
                          <Award size={18} className="text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Green Points Earned</p>
                            <p className="text-sm text-muted-foreground">
                              You've earned {user.greenPoints} green points so far. Keep it up!
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassMorphicCard>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
