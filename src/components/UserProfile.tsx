
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Crown, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';

export const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const { subscription } = useSubscription();

  const getInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  const getSubscriptionIcon = () => {
    switch (subscription?.plan) {
      case 'pro':
        return <Crown className="h-3 w-3 text-yellow-500" />;
      case 'premium':
        return <Star className="h-3 w-3 text-purple-500" />;
      default:
        return <User className="h-3 w-3 text-gray-500" />;
    }
  };

  const getSubscriptionColor = () => {
    switch (subscription?.plan) {
      case 'pro':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'premium':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border">
      <Avatar className="h-10 w-10 border-2 border-blue-200">
        <AvatarImage 
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}&backgroundColor=3b82f6&textColor=ffffff`}
          alt="User Avatar" 
        />
        <AvatarFallback className="bg-blue-500 text-white font-semibold">
          {getInitials(user.email || 'U')}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {user.email?.split('@')[0] || 'User'}
        </p>
        <Badge 
          variant="outline" 
          className={`text-xs ${getSubscriptionColor()}`}
        >
          {getSubscriptionIcon()}
          <span className="ml-1 capitalize">{subscription?.plan || 'Free'}</span>
        </Badge>
      </div>
    </div>
  );
};
