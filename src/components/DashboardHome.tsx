
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  MessageSquare, 
  Settings, 
  Users, 
  Calendar,
  Mail,
  BarChart3,
  Zap,
  Clock,
  TrendingUp,
  Target,
  Award
} from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

interface DashboardHomeProps {
  onFeatureSelect: (feature: string) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onFeatureSelect }) => {
  const { subscription } = useSubscription();

  const quickActions = [
    {
      id: 'resumeScreening',
      title: 'Screen Resume',
      description: 'Analyze and score candidate resumes',
      icon: FileText,
      color: 'bg-blue-500',
      premium: false
    },
    {
      id: 'interviewQuestions',
      title: 'Generate Questions',
      description: 'Create interview questions',
      icon: MessageSquare,
      color: 'bg-green-500',
      premium: false
    },
    {
      id: 'calendarIntegration',
      title: 'Schedule Meeting',
      description: 'Manage your calendar events',
      icon: Calendar,
      color: 'bg-purple-500',
      premium: true
    },
    {
      id: 'emailSupport',
      title: 'Email Templates',
      description: 'Send professional emails',
      icon: Mail,
      color: 'bg-orange-500',
      premium: true
    }
  ];

  const features = [
    {
      id: 'jobDescriptionOptimizer',
      title: 'Job Description Optimizer',
      description: 'Optimize job postings for better reach',
      icon: Settings,
      stats: 'Improves visibility by 40%'
    },
    {
      id: 'candidateMatching',
      title: 'Candidate Matching',
      description: 'AI-powered candidate recommendations',
      icon: Users,
      stats: '95% accuracy rate'
    },
    {
      id: 'performanceEvaluator',
      title: 'Performance Evaluation',
      description: 'Comprehensive performance analysis',
      icon: BarChart3,
      stats: 'Save 3+ hours per review'
    },
    {
      id: 'teamCollaboration',
      title: 'Team Collaboration',
      description: 'Enhanced team productivity tools',
      icon: Users,
      stats: 'Boost efficiency by 35%'
    }
  ];

  const stats = [
    { label: 'Resumes Processed', value: '1,234', icon: FileText, change: '+12%' },
    { label: 'Interviews Scheduled', value: '89', icon: Calendar, change: '+8%' },
    { label: 'Time Saved', value: '45h', icon: Clock, change: '+15%' },
    { label: 'Success Rate', value: '94%', icon: Target, change: '+3%' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to HRBoost AI</h1>
            <p className="text-lg opacity-90 mb-4">
              Streamline your HR processes with AI-powered automation
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {subscription?.plan || 'Free'} Plan
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                <Award className="h-3 w-3 mr-1" />
                Pro Features Available
              </Badge>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <Zap className="h-12 w-12 mb-2" />
              <p className="text-sm font-medium">AI-Powered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500 font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <stat.icon className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Card 
              key={action.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 group border-2 hover:border-blue-200"
              onClick={() => onFeatureSelect(action.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`${action.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                {action.premium && (
                  <Badge variant="outline" className="text-xs">
                    Pro Feature
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Feature Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">All Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card 
              key={feature.id}
              className="cursor-pointer hover:shadow-md transition-shadow group"
              onClick={() => onFeatureSelect(feature.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <feature.icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-sm">{feature.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.stats}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest HR automation activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Resume screened for Software Engineer position</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <Calendar className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Interview scheduled with John Doe</p>
                <p className="text-sm text-gray-600">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-full">
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Performance evaluation completed</p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
