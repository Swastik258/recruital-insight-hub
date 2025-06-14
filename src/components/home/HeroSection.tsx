
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, FileText, Users, Award, Clock, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { 
    number: "10,000+", 
    label: "Resumes Processed", 
    icon: <FileText className="h-6 w-6 text-blue-600" />,
    gradient: "from-blue-500 to-blue-600"
  },
  { 
    number: "500+", 
    label: "Companies Trust Us", 
    icon: <Users className="h-6 w-6 text-green-600" />,
    gradient: "from-green-500 to-green-600"
  },
  { 
    number: "95%", 
    label: "Accuracy Rate", 
    icon: <Award className="h-6 w-6 text-purple-600" />,
    gradient: "from-purple-500 to-purple-600"
  },
  { 
    number: "60%", 
    label: "Time Saved", 
    icon: <Clock className="h-6 w-6 text-orange-600" />,
    gradient: "from-orange-500 to-orange-600"
  }
];

export const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-2 mb-8 shadow-lg">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">AI-Powered HR Solutions</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Revolutionize Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative">
              HR Process
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              with AI
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Streamline recruitment, enhance candidate selection, and boost employee performance with our 
            <span className="font-semibold text-blue-600"> cutting-edge AI-powered</span> HR dashboard. 
            Join thousands of companies already transforming their hiring process.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Link to="/signup">
              <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="group px-10 py-4 text-lg border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl">
              <PlayCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-12 border-t border-gray-200/50">
            <p className="text-sm text-gray-500 mb-6 font-medium tracking-wide uppercase">
              Trusted by leading companies worldwide
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-24 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg opacity-50"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
