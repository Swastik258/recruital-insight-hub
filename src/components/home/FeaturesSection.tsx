
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Users, Shield, Brain, FileText, BarChart3, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-8 w-8 text-white" />,
    title: "AI-Powered Resume Screening",
    description: "Automatically analyze and score resumes with advanced AI algorithms for faster, more accurate candidate evaluation.",
    gradient: "from-blue-500 to-blue-600",
    delay: "0"
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Smart Candidate Matching",
    description: "Find the perfect candidates using intelligent matching algorithms that consider skills, experience, and cultural fit.",
    gradient: "from-green-500 to-green-600",
    delay: "100"
  },
  {
    icon: <Shield className="h-8 w-8 text-white" />,
    title: "Performance Analytics",
    description: "Comprehensive employee performance evaluation and insights with real-time reporting and predictive analytics.",
    gradient: "from-purple-500 to-purple-600",
    delay: "200"
  },
  {
    icon: <Brain className="h-8 w-8 text-white" />,
    title: "Interview Intelligence",
    description: "Generate smart interview questions and evaluate responses with AI-powered insights for better hiring decisions.",
    gradient: "from-orange-500 to-orange-600",
    delay: "300"
  },
  {
    icon: <FileText className="h-8 w-8 text-white" />,
    title: "Job Description Optimizer",
    description: "Create compelling job descriptions that attract top talent and improve application quality with AI assistance.",
    gradient: "from-indigo-500 to-indigo-600",
    delay: "400"
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-white" />,
    title: "Advanced Reporting",
    description: "Get detailed insights into your hiring process with customizable reports and data visualization tools.",
    gradient: "from-red-500 to-red-600",
    delay: "500"
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Features</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Powerful Features for
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Modern HR Teams
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how our AI-powered platform can transform your entire recruitment and HR workflow with these cutting-edge capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden hover:-translate-y-2"
              style={{
                animationDelay: `${feature.delay}ms`
              }}
            >
              <div className={`h-2 bg-gradient-to-r ${feature.gradient}`}></div>
              <CardContent className="p-8 relative">
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Sparkles className="h-16 w-16 text-gray-400" />
                </div>
                
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span className="text-sm font-semibold">Learn more</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <span className="font-semibold">Explore All Features</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
