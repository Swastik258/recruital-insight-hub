
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Director",
    company: "TechCorp Inc.",
    content: "week-hr has revolutionized our hiring process. We've reduced screening time by 70% while improving candidate quality significantly.",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Talent Acquisition Manager",
    company: "Global Dynamics",
    content: "The AI-powered matching is incredibly accurate. We're finding candidates we would have missed with traditional methods.",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of People Operations",
    company: "StartupX",
    content: "As a fast-growing startup, week-hr helps us scale our hiring efficiently without compromising on quality.",
    rating: 5,
    avatar: "ER"
  },
  {
    name: "David Kim",
    role: "Recruitment Lead",
    company: "Enterprise Solutions",
    content: "The analytics and reporting features have given us insights we never had before. Highly recommended!",
    rating: 5,
    avatar: "DK"
  },
  {
    name: "Lisa Thompson",
    role: "HR Manager",
    company: "Innovation Labs",
    content: "week-hr's interview question generator has improved our interview quality and candidate assessment process.",
    rating: 5,
    avatar: "LT"
  },
  {
    name: "Alex Parker",
    role: "People & Culture Director",
    company: "Future Tech",
    content: "The platform is intuitive and powerful. It's like having an AI HR expert on our team 24/7.",
    rating: 5,
    avatar: "AP"
  }
];

export const TestimonialsSection = () => {
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(1);
  const testimonialsPerPage = 3;
  
  const totalTestimonialPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const currentTestimonials = testimonials.slice(
    (currentTestimonialPage - 1) * testimonialsPerPage,
    currentTestimonialPage * testimonialsPerPage
  );

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied HR professionals who have transformed their hiring process
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentTestimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentTestimonialPage(Math.max(1, currentTestimonialPage - 1))}
                  className={currentTestimonialPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {[...Array(totalTestimonialPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentTestimonialPage(i + 1)}
                    isActive={currentTestimonialPage === i + 1}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentTestimonialPage(Math.min(totalTestimonialPages, currentTestimonialPage + 1))}
                  className={currentTestimonialPage === totalTestimonialPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
};
