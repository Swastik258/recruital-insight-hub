
import { lazy } from 'react';

// Lazy load components with better error handling
export const createLazyComponent = (importFn: () => Promise<any>) => {
  return lazy(() => 
    importFn().catch(() => ({
      default: () => {
        const React = require('react');
        return React.createElement('div', null, 'Error loading component');
      }
    }))
  );
};

// Preload components that will likely be needed
export const preloadComponent = (importFn: () => Promise<any>) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      importFn().catch(() => {
        // Silently fail for preloading
      });
    });
  } else {
    setTimeout(() => {
      importFn().catch(() => {
        // Silently fail for preloading
      });
    }, 100);
  }
};

// Route-based code splitting
export const RouteComponents = {
  Home: createLazyComponent(() => import('../pages/Home')),
  Login: createLazyComponent(() => import('../pages/Login')),
  Signup: createLazyComponent(() => import('../pages/Signup')),
  Dashboard: createLazyComponent(() => import('../pages/Index')),
  Payment: createLazyComponent(() => import('../pages/Payment')),
  Settings: createLazyComponent(() => import('../pages/Settings')),
};
