
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  MessageSquare, 
  Briefcase, 
  UserCheck, 
  Users, 
  Calendar, 
  Mail, 
  BarChart3, 
  Zap, 
  TrendingUp, 
  Shield, 
  Star,
  ArrowRight
} from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

interface FeatureSelectorProps {
  onFeatureSelect: (feature: string) => void;
}

export const FeatureSelector: React.FC<FeatureSelectorProps> = ({ onFeatureSelect }) => {
  const { hasFeatureAccess, FEATURE_PLANS } = useSubscription();

  const features = [
    {
      id: 'resumeScreening',
      title: 'Resume Screening',
      description: 'AI-powered resume analysis and candidate scoring',
      icon: FileText,
      gradient: 'from-blue-500 to-blue-600',
      planKey: 'resume-screening'
    },
    {
      id: 'interviewQuestions',
      title: 'Interview Questions',
      description: 'Generate customized interview questions for any role',
      icon: MessageSquare,
      gradient: 'from-green-500 to-green-600',
      planKey: 'interview-questions'
    },
    {
      id: 'jobDescriptionOptimizer',
      title: 'Job Description Optimizer',
      description: 'Create compelling job descriptions that attract top talent',
      icon: Briefcase,
      gradient: 'from-purple-500 to-purple-600',
      planKey: 'job-description'
    },
    {
      id: 'performanceEvaluator',
      title: 'Performance Evaluation',
      description: 'Comprehensive employee performance assessment tools',
      icon: UserCheck,
      gradient: 'from-orange-500 to-orange-600',
      planKey: 'performance-evaluation'
    },
    {
      id: 'candidateMatching',
      title: 'Candidate Matching',
      description: 'Smart candidate-job matching with AI algorithms',
      icon: Users,
      gradient: 'from-red-500 to-red-600',
      planKey: 'candidate-matching'
    },
    {
      id: 'teamCollaboration',
      title: 'Team Collaboration',
      description: 'Streamline HR team workflows and communication',
      icon: Users,
      gradient: 'from-teal-500 to-teal-600',
      planKey: 'team-collaboration'
    },
    {
      id: 'calendarIntegration',
      title: 'Calendar Integration',
      description: 'Sync interviews and meetings across platforms',
      icon: Calendar,
      gradient: 'from-indigo-500 to-indigo-600',
      planKey: 'calendar-integration'
    },
    {
      id: 'emailSupport',
      title: 'Email Support',
      description: '24/7 professional email assistance',
      icon: Mail,
      gradient: 'from-cyan-500 to-cyan-600',
      planKey: 'email-support'
    },
    {
      id: 'basicAnalytics',
      title: 'Basic Analytics',
      description: 'Essential HR metrics and insights',
      icon: BarChart3,
      gradient: 'from-yellow-500 to-yellow-600',
      planKey: 'basic-analytics'
    },
    {
      id: 'prioritySupport',
      title: 'Priority Support',
      description: 'VIP support with instant responses',
      icon: Zap,
      gradient: 'from-pink-500 to-pink-600',
      planKey: 'priority-support'
    },
    {
      id: 'advancedAnalytics',
      title: 'Advanced Analytics',
      description: 'Deep insights with predictive analytics',
      icon: TrendingUp,
      gradient: 'from-violet-500 to-violet-600',
      planKey: 'advanced-analytics'
    },
    {
      id: 'apiAccess',
      title: 'API Access',
      description: 'Integrate with your existing systems',
      icon: Shield,
      gradient: 'from-gray-500 to-gray-600',
      planKey: 'api-access'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {features.map((feature) => {
        const hasAccess = hasFeatureAccess(feature.id as any);
        const plan = FEATURE_PLANS[feature.planKey as keyof typeof FEATURE_PLANS];
        const IconComponent = feature.icon;
        
        return (
          <Card 
            key={feature.id} 
            className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm overflow-hidden ${
              hasAccess ? 'ring-2 ring-green-500 ring-opacity-30' : ''
            }`}
            onClick={() => onFeatureSelect(feature.id)}
          >
            <div className={`h-1 bg-gradient-to-r ${feature.gradient}`} />
            <CardHeader className="pb-3 space-y-3">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  {hasAccess ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Star className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-600 border-gray-300">
                      🔒 {plan?.price}
                    </Badge>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors leading-tight">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <CardDescription className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </CardDescription>
              <Button 
                variant={hasAccess ? "default" : "outline"} 
                size="sm"
                className="w-full group-hover:scale-105 transition-transform font-medium"
              >
                {hasAccess ? (
                  <>
                    Open Feature
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  'View Details'
                )}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
