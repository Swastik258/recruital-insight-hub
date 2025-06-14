
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Users, Shield, Brain, FileText, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "AI-Powered Resume Screening",
    description: "Automatically analyze and score resumes with advanced AI algorithms for faster, more accurate candidate evaluation."
  },
  {
    icon: <Users className="h-8 w-8 text-green-600" />,
    title: "Smart Candidate Matching",
    description: "Find the perfect candidates using intelligent matching algorithms that consider skills, experience, and cultural fit."
  },
  {
    icon: <Shield className="h-8 w-8 text-purple-600" />,
    title: "Performance Analytics",
    description: "Comprehensive employee performance evaluation and insights with real-time reporting and predictive analytics."
  },
  {
    icon: <Brain className="h-8 w-8 text-orange-600" />,
    title: "Interview Intelligence",
    description: "Generate smart interview questions and evaluate responses with AI-powered insights for better hiring decisions."
  },
  {
    icon: <FileText className="h-8 w-8 text-indigo-600" />,
    title: "Job Description Optimizer",
    description: "Create compelling job descriptions that attract top talent and improve application quality with AI assistance."
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-red-600" />,
    title: "Advanced Reporting",
    description: "Get detailed insights into your hiring process with customizable reports and data visualization tools."
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern HR Teams
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how our AI-powered platform can transform your entire recruitment and HR workflow
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="text-center p-0">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
