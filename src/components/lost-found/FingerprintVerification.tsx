
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';

interface FingerprintVerificationProps {
  itemId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const FingerprintVerification = ({ itemId, onSuccess, onCancel }: FingerprintVerificationProps) => {
  const [scanStarted, setScanStarted] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [scanFailed, setScanFailed] = useState(false);
  
  const startScan = () => {
    setScanStarted(true);
    setScanProgress(0);
    setScanSuccess(false);
    setScanFailed(false);
    
    // Deterministic algorithm based on itemId to ensure consistent results
    // This is a mock implementation - in a real app, would use actual biometric verification
    const itemIdSum = itemId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const willSucceed = itemIdSum % 10 !== 3; // Make it succeed 90% of the time, consistently based on itemId
    
    // Simulate scan process
    const scanInterval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + 5;
        
        if (newProgress >= 100) {
          clearInterval(scanInterval);
          
          // Determine scan outcome based on itemId
          if (willSucceed) {
            setScanSuccess(true);
            // Delay success callback to show the success state
            setTimeout(() => onSuccess(), 1500);
          } else {
            setScanFailed(true);
          }
          
          return 100;
        }
        
        return newProgress;
      });
    }, 150);
  };
  
  return (
    <GlassMorphicCard className="max-w-md mx-auto">
      <div className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-6">Fingerprint Verification</h3>
        
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto mb-4">
            {!scanStarted ? (
              // Initial state
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Fingerprint size={128} className="text-primary" />
              </motion.div>
            ) : scanSuccess ? (
              // Success state
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle size={128} className="text-green-500" />
              </motion.div>
            ) : scanFailed ? (
              // Failed state
              <motion.div
                initial={{ scale: 1 }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Fingerprint size={128} className="text-destructive" />
              </motion.div>
            ) : (
              // Scanning state
              <>
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Fingerprint size={128} className="text-primary" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 size={48} className="text-primary animate-spin opacity-70" />
                </div>
              </>
            )}
          </div>
          
          {scanStarted && !scanSuccess && !scanFailed && (
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <motion.div 
                className="bg-primary h-2 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${scanProgress}%` }}
              />
            </div>
          )}
          
          <p className="text-lg font-medium mb-2">
            {scanStarted 
              ? scanSuccess 
                ? "Verification successful!" 
                : scanFailed
                  ? "Verification failed. Please try again."
                  : "Scanning your fingerprint..."
              : "Place your finger on the sensor to verify your identity"}
          </p>
          
          <p className="text-sm text-muted-foreground">
            {scanStarted 
              ? scanSuccess 
                ? "You will be redirected to collect your item shortly." 
                : scanFailed
                  ? "Your fingerprint could not be verified. Please ensure your finger is clean and try again."
                  : "Please keep your finger steady during the scan."
              : "This verification ensures that only the rightful owner can claim the item."}
          </p>
        </div>
        
        {!scanStarted ? (
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={startScan}
              className="w-full py-6 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 border-none"
            >
              Start Fingerprint Scan
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="w-full"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </Button>
          </div>
        ) : scanFailed ? (
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={startScan}
              className="w-full py-6 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 border-none"
            >
              Try Again
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="w-full"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </Button>
          </div>
        ) : !scanSuccess && (
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="w-full"
            disabled={scanProgress > 0 && scanProgress < 100}
          >
            <ArrowLeft size={16} className="mr-2" />
            Cancel
          </Button>
        )}
      </div>
    </GlassMorphicCard>
  );
};

export default FingerprintVerification;
