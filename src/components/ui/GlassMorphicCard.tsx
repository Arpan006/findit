
import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassMorphicCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassMorphicCard = ({ 
  children, 
  className, 
  hoverEffect = true,
  ...motionProps 
}: GlassMorphicCardProps) => {
  return (
    <motion.div
      className={cn(
        "glassmorphic rounded-xl overflow-hidden p-6 transition-all duration-300",
        hoverEffect && "hover:shadow-glass-hover",
        className
      )}
      whileHover={hoverEffect ? { y: -5 } : undefined}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default GlassMorphicCard;
