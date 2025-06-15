
import { useEffect } from 'react';
import { optimizePerformance } from '@/utils/performance';
import { setupLazyLoading, preloadCriticalImages } from '@/utils/imageOptimization';

export const usePerformanceOptimization = () => {
  useEffect(() => {
    // Initialize performance optimizations
    optimizePerformance();
    
    // Setup image optimizations
    preloadCriticalImages();
    setupLazyLoading();

    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, []);
};
