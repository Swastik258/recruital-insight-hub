// Lazy loading utility for images
export const lazyLoadImage = (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
};

// Enhanced preload function with priority hints
export const preloadResources = () => {
  const criticalResources = [
    { href: '/fonts/primary-font.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    { href: '/images/hero-bg.webp', as: 'image', fetchpriority: 'high' },
    { href: '/images/logo.svg', as: 'image', fetchpriority: 'high' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    Object.assign(link, resource);
    document.head.appendChild(link);
  });
};

// DNS prefetch for external domains
export const setupDNSPrefetch = () => {
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com'
  ];

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

// Core Web Vitals monitoring
export const measureWebVitals = async () => {
  if ('requestIdleCallback' in window) {
    try {
      const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');
      onCLS(console.log);
      onINP(console.log); // Using onINP instead of onFID
      onFCP(console.log);
      onLCP(console.log);
      onTTFB(console.log);
    } catch (error) {
      console.warn('Web Vitals could not be loaded:', error);
    }
  }
};

// Enhanced service worker registration with update handling
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available, notify user
                  console.log('New content available, please refresh');
                }
              });
            }
          });
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Critical resource hints
export const setupResourceHints = () => {
  setupDNSPrefetch();
  preloadResources();
};

// Performance monitoring and optimization
export const optimizePerformance = () => {
  // Defer non-critical JavaScript
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      measureWebVitals();
    });
  } else {
    setTimeout(measureWebVitals, 2000);
  }

  // Register service worker
  registerServiceWorker();

  // Setup resource hints
  setupResourceHints();
};
