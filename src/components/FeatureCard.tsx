
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Lock } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

interface FeatureCardProps {
  title: string;
  description: string;
  featureKey: string;
  features: string[];
  onSelect: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  featureKey,
  features,
  onSelect
}) => {
  const { hasFeatureAccess, FEATURE_PLANS } = useSubscription();
  const isUnlocked = hasFeatureAccess(featureKey as any);
  const featurePlan = FEATURE_PLANS[featureKey as keyof typeof FEATURE_PLANS];

  return (
    <Card className={`relative cursor-pointer transition-all hover:shadow-lg ${
      isUnlocked ? 'border-green-500 bg-green-50' : 'border-gray-200'
    }`} onClick={onSelect}>
      {isUnlocked && (
        <Badge className="absolute -top-2 -right-2 bg-green-500">
          <Check className="h-3 w-3 mr-1" />
          Unlocked
        </Badge>
      )}
      {!isUnlocked && (
        <Badge variant="secondary" className="absolute -top-2 -right-2">
          <Lock className="h-3 w-3 mr-1" />
          {featurePlan?.price}
        </Badge>
      )}
      
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          {isUnlocked ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Lock className="h-5 w-5 text-gray-400" />
          )}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        
        <Button 
          className="w-full mt-4" 
          variant={isUnlocked ? "default" : "outline"}
          disabled={!isUnlocked}
        >
          {isUnlocked ? "Access Feature" : `Purchase for ${featurePlan?.price}`}
        </Button>
      </CardContent>
    </Card>
  );
};
