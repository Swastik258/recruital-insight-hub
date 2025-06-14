
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface SubscriptionFeatures {
  resumeScreening: boolean;
  interviewQuestions: boolean;
  jobDescriptionOptimizer: boolean;
  performanceEvaluator: boolean;
  candidateMatching: boolean;
  teamCollaboration: boolean;
  calendarIntegration: boolean;
  emailSupport: boolean;
  basicAnalytics: boolean;
  prioritySupport: boolean;
  advancedAnalytics: boolean;
  apiAccess: boolean;
}

interface UserSubscription {
  plan: string | null;
  features: SubscriptionFeatures;
  isActive: boolean;
}

const FEATURE_PLANS = {
  'resume-screening': { name: 'Resume Screening', price: '₹99' },
  'interview-questions': { name: 'Interview Questions', price: '₹149' },
  'job-description': { name: 'Job Description Optimizer', price: '₹199' },
  'performance-evaluation': { name: 'Performance Evaluation', price: '₹249' },
  'candidate-matching': { name: 'Candidate Matching', price: '₹299' },
  'team-collaboration': { name: 'Team Collaboration', price: '₹399' },
  'calendar-integration': { name: 'Calendar Integration', price: '₹199' },
  'email-support': { name: 'Email Support', price: '₹99' },
  'basic-analytics': { name: 'Basic Analytics', price: '₹149' },
  'priority-support': { name: 'Priority Support', price: '₹199' },
  'advanced-analytics': { name: 'Advanced Analytics', price: '₹349' },
  'api-access': { name: 'API Access', price: '₹499' }
};

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription>({
    plan: null,
    features: {
      resumeScreening: false,
      interviewQuestions: false,
      jobDescriptionOptimizer: false,
      performanceEvaluator: false,
      candidateMatching: false,
      teamCollaboration: false,
      calendarIntegration: false,
      emailSupport: false,
      basicAnalytics: false,
      prioritySupport: false,
      advancedAnalytics: false,
      apiAccess: false
    },
    isActive: false
  });

  useEffect(() => {
    if (user) {
      // Load user's purchased features from localStorage for now
      const storedFeatures = localStorage.getItem(`features_${user.id}`);
      if (storedFeatures) {
        const features = JSON.parse(storedFeatures);
        setSubscription({
          plan: 'custom',
          features,
          isActive: Object.values(features).some(Boolean)
        });
      }
    }
  }, [user]);

  const hasFeatureAccess = (feature: keyof SubscriptionFeatures): boolean => {
    return subscription.features[feature];
  };

  const purchaseFeature = (featureKey: string) => {
    if (!user) return;
    
    // Update localStorage with purchased feature
    const currentFeatures = subscription.features;
    const updatedFeatures = {
      ...currentFeatures,
      [featureKey]: true
    };
    
    localStorage.setItem(`features_${user.id}`, JSON.stringify(updatedFeatures));
    setSubscription({
      plan: 'custom',
      features: updatedFeatures,
      isActive: true
    });
  };

  return {
    subscription,
    hasFeatureAccess,
    purchaseFeature,
    FEATURE_PLANS
  };
};
