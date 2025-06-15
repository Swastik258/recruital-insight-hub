
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from '@/components/SEO';
import { Analytics } from '@/components/Analytics';
import { HomeHeader } from '@/components/home/HomeHeader';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { BlogSection } from '@/components/home/BlogSection';
import { PricingSection } from '@/components/home/PricingSection';
import { CTASection } from '@/components/home/CTASection';
import { HomeFooter } from '@/components/home/HomeFooter';

const Home = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-x-hidden">
        <SEO 
          title="Week-HR | AI-Powered HR Solutions & Interview Questions Generator"
          description="Transform your recruitment process with Week-HR's AI-powered HR solutions. Generate behavioral interview questions, screen resumes automatically, optimize job descriptions, and boost hiring efficiency by 60%. Trusted by 500+ companies worldwide. Start your free trial today!"
          keywords="AI HR software, interview questions generator, resume screening AI, job description optimizer, recruitment automation, HR analytics dashboard, candidate matching system, performance evaluation tools, hiring efficiency, behavioral interview questions, HR technology, talent acquisition, employee screening, recruitment SaaS"
          url="https://week-hr.com"
        />
        <Analytics />
        
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="relative z-10">
            <HomeHeader />
            <main>
              <HeroSection />
              <FeaturesSection />
              <TestimonialsSection />
              <BlogSection />
              <PricingSection />
              <CTASection />
            </main>
            <HomeFooter />
          </div>
        </div>

        {/* Hidden content for SEO - frequently searched terms */}
        <div className="sr-only">
          <h2>AI-Powered HR Solutions for Modern Recruitment</h2>
          <p>Week-HR provides comprehensive AI-driven human resources solutions including automated resume screening, intelligent interview question generation, job description optimization, candidate matching algorithms, performance evaluation tools, and advanced HR analytics. Our platform helps companies reduce hiring time by 60% while improving candidate quality and selection accuracy.</p>
          
          <h3>Key Features</h3>
          <ul>
            <li>Automated Resume Screening with AI</li>
            <li>Behavioral Interview Questions Generator</li>
            <li>Job Description Optimizer for Better Reach</li>
            <li>Candidate Matching and Ranking System</li>
            <li>Performance Evaluation and Analytics</li>
            <li>Team Collaboration Tools</li>
            <li>Calendar Integration for Interview Scheduling</li>
            <li>Advanced HR Analytics and Reporting</li>
          </ul>

          <h3>Industries We Serve</h3>
          <p>Technology companies, startups, healthcare organizations, financial services, manufacturing, retail, consulting firms, and enterprise organizations across India and globally.</p>

          <h3>Benefits</h3>
          <p>Reduce hiring time, improve candidate quality, automate repetitive HR tasks, enhance decision-making with data analytics, streamline interview processes, and build better teams faster.</p>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Home;
