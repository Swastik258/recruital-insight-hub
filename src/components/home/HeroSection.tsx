
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, FileText, Users, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { number: "10,000+", label: "Resumes Processed", icon: <FileText className="h-6 w-6 text-blue-600" /> },
  { number: "500+", label: "Companies Trust Us", icon: <Users className="h-6 w-6 text-green-600" /> },
  { number: "95%", label: "Accuracy Rate", icon: <Award className="h-6 w-6 text-purple-600" /> },
  { number: "60%", label: "Time Saved", icon: <Clock className="h-6 w-6 text-orange-600" /> }
];

export const HeroSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Revolutionize Your <span className="text-blue-600">HR Process</span> with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Streamline recruitment, enhance candidate selection, and boost employee performance with our cutting-edge AI-powered HR dashboard. Join thousands of companies already transforming their hiring process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/signup">
              <Button size="lg" className="px-8 py-3 text-lg w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg w-full sm:w-auto">
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
