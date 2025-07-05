
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Search, Bell, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Toggle } from '@/components/ui/toggle';
import { useIsMobileBoolean } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Lost & Found', path: '/lost-found' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Services', path: '/services' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glassmorphic py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-bold text-white text-xl">F</span>
            </motion.div>
            <span className="font-bold text-lg text-primary hidden sm:block">FindIt</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <motion.div key={link.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-white bg-primary shadow-md'
                      : 'text-foreground hover:bg-primary/10'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop: Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme toggle */}
            <Toggle 
              pressed={theme === 'dark'} 
              onPressedChange={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full"
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </Toggle>
            
            <Button variant="ghost" size="icon" className="text-foreground">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground">
              <Bell size={20} />
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-green-500 border-none shadow-md">
              <Link to="/login">
                <User size={18} className="mr-2" />
                Login
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            {/* Mobile theme toggle */}
            <Toggle 
              pressed={theme === 'dark'} 
              onPressedChange={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </Toggle>
            
            <Button variant="ghost" size="icon" className="text-foreground">
              <User size={20} />
            </Button>
            <button
              className="text-foreground p-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glassmorphic border-t border-gray-200 dark:border-gray-800 mt-2"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-white bg-primary shadow-md'
                      : 'text-foreground hover:bg-primary/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/login"
                className="block px-4 py-3 mt-3 rounded-lg text-white bg-gradient-to-r from-blue-500 to-green-500 text-center font-medium"
              >
                Login / Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
