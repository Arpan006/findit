
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  icon?: ReactNode;
  title?: string;
  description?: string;
  hoverEffect?: boolean;
}

const AnimatedCard = ({ 
  children, 
  className, 
  delay = 0,
  icon,
  title,
  description,
  hoverEffect = true
}: AnimatedCardProps) => {
  return (
    <motion.div
      className={cn(
        "bg-white dark:bg-card border border-border rounded-xl overflow-hidden shadow-md transition-all duration-300",
        hoverEffect && "hover:shadow-lg",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
    >
      {(icon || title || description) ? (
        <div className="p-6">
          {icon && (
            <div className="mb-4 text-primary">
              {icon}
            </div>
          )}
          {title && (
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
          )}
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
          {children}
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
};

export default AnimatedCard;
