
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto py-8 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                <span className="font-bold text-white text-sm">F</span>
              </div>
              <span className="font-bold text-lg text-primary">FindIt</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Improving hostel life at VIT Bhopal University by facilitating lost item recovery, 
              resource sharing, and access to maintenance services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="mailto:contact@findit.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/lost-found" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Lost & Found
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Local Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground text-sm">
                VIT Bhopal University
              </li>
              <li className="text-muted-foreground text-sm">
                Kothri Kalan, Sehore
              </li>
              <li className="text-muted-foreground text-sm">
                Madhya Pradesh, 466114
              </li>
              <li className="text-primary text-sm mt-2">
                support@findit.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} FindIt. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
          <p className="flex items-center text-muted-foreground text-sm mt-4 md:mt-0">
            Made with <Heart size={14} className="mx-1 text-red-500" /> for VIT Bhopal
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
