
// Image optimization utilities
export const optimizeImageSrc = (src: string, width?: number, quality = 80): string => {
  // If it's already an optimized URL, return as is
  if (src.includes('?') || src.startsWith('data:')) {
    return src;
  }

  // For external images, add optimization parameters
  if (src.startsWith('http')) {
    return `${src}?w=${width || 800}&q=${quality}&auto=format`;
  }

  // For local images, return as is (would need build-time optimization)
  return src;
};

// Lazy loading with intersection observer
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
};

// Preload critical images
export const preloadCriticalImages = () => {
  const criticalImages = [
    '/images/hero-bg.webp',
    '/images/logo.svg'
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};
