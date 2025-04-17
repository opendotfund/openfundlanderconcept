
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';

const MobileBanner = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only set the timer if we're on mobile
    if (isMobile) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000); // 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Don't render anything if not mobile or banner has been dismissed
  if (!isMobile || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-2"
        >
          <Alert className="bg-primary/10 border border-primary">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-medium">Coming Soon</AlertTitle>
            <AlertDescription className="text-xs text-muted-foreground">
              An iOS mobile application is coming soon for mobile users. For best website experience, please use desktop.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileBanner;
