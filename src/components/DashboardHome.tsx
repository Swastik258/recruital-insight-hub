
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Star, 
  Zap,
  Shield,
  BarChart3,
  Mail,
  MessageSquare,
  Briefcase,
  UserCheck,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardHomeProps {
  onFeatureSelect: (feature: string) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onFeatureSelect }) => {
  const { hasFeatureAccess } = useSubscription();
  const { user } = useAuth();

  const features = [
    {
      id: 'resumeScreening',
      title: 'Resume Screening',
      description: 'AI-powered resume analysis and candidate scoring',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      category: 'Core Features'
    },
    {
      id: 'interviewQuestions',
      title: 'Interview Questions',
      description: 'Generate customized interview questions for any role',
      icon: MessageSquare,
      color: 'from-green-500 to-green-600',
      category: 'Core Features'
    },
    {
      id: 'jobDescriptionOptimizer',
      title: 'Job Description Optimizer',
      description: 'Create compelling job descriptions that attract top talent',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      category: 'Core Features'
    },
    {
      id: 'performanceEvaluator',
      title: 'Performance Evaluation',
      description: 'Comprehensive employee performance assessment tools',
      icon: UserCheck,
      color: 'from-orange-500 to-orange-600',
      category: 'Core Features'
    },
    {
      id: 'candidateMatching',
      title: 'Candidate Matching',
      description: 'Smart candidate-job matching with AI algorithms',
      icon: Users,
      color: 'from-red-500 to-red-600',
      category: 'Advanced Features'
    },
    {
      id: 'teamCollaboration',
      title: 'Team Collaboration',
      description: 'Streamline HR team workflows and communication',
      icon: Users,
      color: 'from-teal-500 to-teal-600',
      category: 'Advanced Features'
    },
    {
      id: 'calendarIntegration',
      title: 'Calendar Integration',
      description: 'Sync interviews and meetings across platforms',
      icon: Calendar,
      color: 'from-indigo-500 to-indigo-600',
      category: 'Integrations'
    },
    {
      id: 'emailSupport',
      title: 'Email Support',
      description: '24/7 professional email assistance',
      icon: Mail,
      color: 'from-cyan-500 to-cyan-600',
      category: 'Support'
    },
    {
      id: 'basicAnalytics',
      title: 'Basic Analytics',
      description: 'Essential HR metrics and insights',
      icon: BarChart3,
      color: 'from-yellow-500 to-yellow-600',
      category: 'Analytics'
    },
    {
      id: 'prioritySupport',
      title: 'Priority Support',
      description: 'VIP support with instant responses',
      icon: Zap,
      color: 'from-pink-500 to-pink-600',
      category: 'Support'
    },
    {
      id: 'advancedAnalytics',
      title: 'Advanced Analytics',
      description: 'Deep insights with predictive analytics',
      icon: TrendingUp,
      color: 'from-violet-500 to-violet-600',
      category: 'Analytics'
    },
    {
      id: 'apiAccess',
      title: 'API Access',
      description: 'Integrate with your existing systems',
      icon: Shield,
      color: 'from-gray-500 to-gray-600',
      category: 'Developer'
    }
  ];

  const categories = Array.from(new Set(features.map(f => f.category)));

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const stats = [
    { label: 'Features Available', value: '12', icon: Sparkles },
    { label: 'Active Features', value: features.filter(f => hasFeatureAccess(f.id as any)).length.toString(), icon: Star },
    { label: 'Time Saved', value: '85%', icon: Clock },
    { label: 'Efficiency Boost', value: '3x', icon: TrendingUp }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
          {getGreeting()}, {user?.email?.split('@')[0] || 'there'}! 👋
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
          Welcome to your HR command center. Choose from our powerful features to streamline your hiring process and boost your team's productivity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.label} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <stat.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features by Category */}
      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
            <Badge variant="secondary" className="text-xs">
              {features.filter(f => f.category === category).length} features
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {features
              .filter(feature => feature.category === category)
              .map((feature) => {
                const hasAccess = hasFeatureAccess(feature.id as any);
                const IconComponent = feature.icon;
                
                return (
                  <Card 
                    key={feature.id} 
                    className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm overflow-hidden ${
                      hasAccess ? 'ring-2 ring-green-500 ring-opacity-20' : ''
                    }`}
                    onClick={() => onFeatureSelect(feature.id)}
                  >
                    <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} shadow-lg`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          {hasAccess ? (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <Star className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-gray-600">
                              🔒 Locked
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-lg lg:text-xl group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                      <Button 
                        variant={hasAccess ? "default" : "outline"} 
                        className="w-full group-hover:scale-105 transition-transform"
                      >
                        {hasAccess ? (
                          <>
                            Launch Feature
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      ))}

      {/* Quick Actions */}
      <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <CardContent className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">Ready to transform your HR process?</h3>
              <p className="text-blue-100">
                Unlock all features and supercharge your hiring workflow today.
              </p>
            </div>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8"
              onClick={() => onFeatureSelect('resumeScreening')}
            >
              Get Started
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
