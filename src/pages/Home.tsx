
import React from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <HomeHeader />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <BlogSection />
      <PricingSection />
      <CTASection />
      <HomeFooter />
    </div>
  );
};

export default Home;
