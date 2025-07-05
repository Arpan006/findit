
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Gamepad2, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementText, setAchievementText] = useState("");
  
  useEffect(() => {
    if (!isLoading) return;
    
    let interval: ReturnType<typeof setInterval> | null = null;
    
    const startProgress = () => {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 8) + 1;
          
          // Level up at certain thresholds
          if (prev < 25 && newProgress >= 25) {
            setCurrentLevel(2);
            showAchievementNotification("Level 2 Unlocked: Novice Explorer!");
          } else if (prev < 50 && newProgress >= 50) {
            setCurrentLevel(3);
            showAchievementNotification("Level 3 Unlocked: Skilled Adventurer!");
          } else if (prev < 75 && newProgress >= 75) {
            setCurrentLevel(4);
            showAchievementNotification("Level 4 Unlocked: Expert Pathfinder!");
          } else if (prev < 90 && newProgress >= 90) {
            setCurrentLevel(5);
            showAchievementNotification("Final Level Unlocked: Campus Master!");
          }
          
          if (newProgress >= 100) {
            if (interval) clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 180);
    };
    
    const showAchievementNotification = (text: string) => {
      setAchievementText(text);
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 3000);
    };
    
    startProgress();
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);
  
  if (!isLoading) return null;
  
  // Define icons based on level
  const getLevelIcon = () => {
    switch (currentLevel) {
      case 1: return <Gamepad2 size={64} className="text-blue-400" />;
      case 2: return <Zap size={64} className="text-yellow-400" />;
      case 3: return <Target size={64} className="text-green-400" />;
      case 4: return <Sparkles size={64} className="text-purple-400" />;
      case 5: return <Trophy size={64} className="text-amber-400" />;
      default: return <Gamepad2 size={64} className="text-blue-400" />;
    }
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            rotate: { repeat: Infinity, duration: 3, ease: "linear" },
            scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
          className="mb-8 relative"
        >
          {getLevelIcon()}
          <motion.div 
            className="absolute inset-0"
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeOut" 
            }}
          >
            {getLevelIcon()}
          </motion.div>
        </motion.div>
        
        <motion.div
          className="mb-4 text-2xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Level {currentLevel}: {progress}% Complete
        </motion.div>
        
        <div className="w-80 h-4 bg-muted rounded-full overflow-hidden mb-4 relative">
          <motion.div 
            className={`h-full ${
              currentLevel === 1 ? "bg-blue-500" :
              currentLevel === 2 ? "bg-gradient-to-r from-blue-500 to-yellow-500" :
              currentLevel === 3 ? "bg-gradient-to-r from-yellow-500 to-green-500" :
              currentLevel === 4 ? "bg-gradient-to-r from-green-500 to-purple-500" :
              "bg-gradient-to-r from-purple-500 to-amber-500"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
          
          {/* Progress markers */}
          <div className="absolute top-0 left-1/4 w-0.5 h-full bg-background/50" />
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-background/50" />
          <div className="absolute top-0 left-3/4 w-0.5 h-full bg-background/50" />
        </div>
        
        <motion.div
          className="flex space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[1, 2, 3, 4, 5].map((level) => (
            <motion.div 
              key={level}
              className={`w-3 h-3 rounded-full ${
                level <= currentLevel 
                  ? level === 1 ? "bg-blue-500" :
                    level === 2 ? "bg-yellow-500" :
                    level === 3 ? "bg-green-500" :
                    level === 4 ? "bg-purple-500" :
                    "bg-amber-500"
                  : "bg-muted"
              }`}
              initial={false}
              animate={level === currentLevel ? { 
                scale: [1, 1.5, 1],
              } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          ))}
        </motion.div>
        
        <motion.p 
          className="mt-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {progress < 25 ? "Discovering campus secrets..." : 
          progress < 50 ? "Learning the pathways..." :
          progress < 75 ? "Mastering the environment..." :
          progress < 100 ? "Becoming a campus expert..." :
          "Ready to explore!"}
        </motion.p>
        
        {/* Achievement notification */}
        <motion.div
          className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-lg mt-4 flex items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: showAchievement ? 1 : 0,
            y: showAchievement ? 0 : -20
          }}
          transition={{ duration: 0.3 }}
        >
          <Trophy className="text-yellow-400" size={18} />
          <span>{achievementText}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
