
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, CreditCard } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

interface FeaturePaywallProps {
  feature: string;
  featureKey: string;
  children: React.ReactNode;
}

export const FeaturePaywall: React.FC<FeaturePaywallProps> = ({ 
  feature, 
  featureKey, 
  children 
}) => {
  const { hasFeatureAccess, purchaseFeature, FEATURE_PLANS } = useSubscription();
  const featurePlan = FEATURE_PLANS[featureKey as keyof typeof FEATURE_PLANS];

  const handlePurchase = () => {
    // Simulate payment process
    const confirmed = window.confirm(
      `Purchase ${featurePlan?.name} for ${featurePlan?.price}?`
    );
    
    if (confirmed) {
      purchaseFeature(featureKey);
    }
  };

  if (hasFeatureAccess(featureKey as any)) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle>Unlock {feature}</CardTitle>
          <CardDescription>
            This feature requires a separate purchase to access.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">{featurePlan?.name}</h3>
            <p className="text-2xl font-bold text-blue-600">{featurePlan?.price}</p>
            <p className="text-sm text-gray-600">One-time purchase</p>
          </div>
          
          <Button onClick={handlePurchase} className="w-full" size="lg">
            <CreditCard className="mr-2 h-4 w-4" />
            Purchase Now
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            Secure payment • Instant access • No recurring charges
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
