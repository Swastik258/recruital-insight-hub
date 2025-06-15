
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: any;
    fbq: any;
    clarity: any;
  }
}

export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views with Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }

    // Track page views with Facebook Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'PageView');
    }

    // Track page views with Microsoft Clarity
    if (typeof window.clarity !== 'undefined') {
      window.clarity('identify', 'user_' + Date.now());
    }
  }, [location]);

  return null;
};

// Analytics event tracking functions
export const trackEvent = (eventName: string, parameters?: any) => {
  // Google Analytics
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, parameters);
  }

  // Facebook Pixel
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', eventName, parameters);
  }

  console.log('Event tracked:', eventName, parameters);
};

export const trackConversion = (value?: number, currency = 'INR') => {
  trackEvent('Purchase', {
    currency: currency,
    value: value,
  });
};

export const trackSignup = () => {
  trackEvent('CompleteRegistration');
};

export const trackTrialStart = () => {
  trackEvent('StartTrial');
};
