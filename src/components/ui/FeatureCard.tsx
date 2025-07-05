
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  linkTo: string;
  gradient?: string;
  delay?: number;
  className?: string;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  linkTo, 
  gradient = "from-blue-500 to-green-500",
  delay = 0,
  className
}: FeatureCardProps) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 group",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="h-full flex flex-col p-6">
        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-md`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>
        
        <Link 
          to={linkTo} 
          className="inline-flex items-center text-primary font-medium text-sm group-hover:underline"
        >
          Learn more
          <motion.div
            className="ml-1"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            whileHover={{ x: 5 }}
          >
            <ArrowRight size={16} />
          </motion.div>
        </Link>
      </div>
      
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default FeatureCard;
