
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Users, Zap, Shield, ArrowRight, PlayCircle, MessageSquare, Award, TrendingUp, BarChart3, FileText, Brain, Clock, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const Home = () => {
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(1);
  const [currentBlogPage, setCurrentBlogPage] = useState(1);
  const testimonialsPerPage = 3;
  const blogsPerPage = 3;

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

  const stats = [
    { number: "10,000+", label: "Resumes Processed", icon: <FileText className="h-6 w-6 text-blue-600" /> },
    { number: "500+", label: "Companies Trust Us", icon: <Users className="h-6 w-6 text-green-600" /> },
    { number: "95%", label: "Accuracy Rate", icon: <Award className="h-6 w-6 text-purple-600" /> },
    { number: "60%", label: "Time Saved", icon: <Clock className="h-6 w-6 text-orange-600" /> }
  ];

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

  const blogPosts = [
    {
      title: "The Future of AI in Recruitment",
      excerpt: "Explore how artificial intelligence is transforming the recruitment landscape and what it means for HR professionals.",
      date: "December 10, 2024",
      readTime: "5 min read",
      category: "AI & Technology",
      image: "/lovable-uploads/ccaca8e7-2d48-4b87-a9a6-a96c57c7fe75.png"
    },
    {
      title: "Best Practices for Resume Screening",
      excerpt: "Learn proven strategies to improve your resume screening process and identify top talent more effectively.",
      date: "December 8, 2024",
      readTime: "7 min read",
      category: "Best Practices",
      image: "/lovable-uploads/ccaca8e7-2d48-4b87-a9a6-a96c57c7fe75.png"
    },
    {
      title: "Building Diverse and Inclusive Teams",
      excerpt: "Discover how modern HR tools can help eliminate bias and build more diverse, inclusive organizations.",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Diversity & Inclusion",
      image: "/lovable-uploads/ccaca8e7-2d48-4b87-a9a6-a96c57c7fe75.png"
    },
    {
      title: "Remote Hiring Strategies for 2025",
      excerpt: "Adapt your hiring process for the remote-first world with these essential strategies and tools.",
      date: "December 3, 2024",
      readTime: "8 min read",
      category: "Remote Work",
      image: "/lovable-uploads/ccaca8e7-2d48-4b87-a9a6-a96c57c7fe75.png"
    },
    {
      title: "Measuring Recruitment Success",
      excerpt: "Key metrics and KPIs to track your recruitment performance and optimize your hiring strategy.",
      date: "December 1, 2024",
      readTime: "5 min read",
      category: "Analytics",
      image: "/lovable-uploads/ccaca8e7-2d48-4b87-a9a6-a96c57c7fe75.png"
    },
    {
      title: "Employee Retention Through Better Hiring",
      excerpt: "How improving your hiring process can lead to better employee retention and reduced turnover costs.",
      date: "November 28, 2024",
      readTime: "6 min read",
      category: "Retention",
      image: "/lovable-uploads/ccaca8e7-2d48-4b87-a9a6-a96c57c7fe75.png"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 50 resume screenings",
        "Basic interview questions",
        "Job description optimizer",
        "Email support",
        "Basic analytics"
      ],
      buttonText: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Ideal for growing HR departments",
      features: [
        "Up to 200 resume screenings",
        "Advanced interview questions",
        "Performance evaluations",
        "Candidate matching",
        "Priority support",
        "Advanced analytics",
        "API access"
      ],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large organizations with complex needs",
      features: [
        "Unlimited resume screenings",
        "Custom AI models",
        "Advanced integrations",
        "Dedicated support",
        "Custom reporting",
        "SSO integration",
        "On-premise deployment"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  // Pagination logic
  const totalTestimonialPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const totalBlogPages = Math.ceil(blogPosts.length / blogsPerPage);
  
  const currentTestimonials = testimonials.slice(
    (currentTestimonialPage - 1) * testimonialsPerPage,
    currentTestimonialPage * testimonialsPerPage
  );
  
  const currentBlogs = blogPosts.slice(
    (currentBlogPage - 1) * blogsPerPage,
    currentBlogPage * blogsPerPage
  );

  return (
    <>
      {/* SEO Meta Tags would be handled by a Head component or Helmet in a real app */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">week-hr</h1>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Reviews</a>
                <a href="#blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a>
              </nav>
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
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

        {/* Features Section */}
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

        {/* Testimonials Section */}
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

            {/* Testimonials Pagination */}
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

        {/* Blog Section */}
        <section id="blog" className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Latest Insights & Resources
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay updated with the latest trends, best practices, and insights in HR and recruitment
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {currentBlogs.map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500"></div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{post.category}</span>
                      <span className="text-sm text-gray-500 ml-auto">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{post.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <Button variant="ghost" size="sm">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Blog Pagination */}
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentBlogPage(Math.max(1, currentBlogPage - 1))}
                      className={currentBlogPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {[...Array(totalBlogPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentBlogPage(i + 1)}
                        isActive={currentBlogPage === i + 1}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentBlogPage(Math.min(totalBlogPages, currentBlogPage + 1))}
                      className={currentBlogPage === totalBlogPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Plan
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Start with a free trial. No credit card required. Upgrade anytime as your team grows.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''} hover:shadow-lg transition-all`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/signup" className="w-full">
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your HR Process?
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                Join thousands of companies already using week-hr to streamline their recruitment and build better teams.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg w-full sm:w-auto">
                    Start Free Trial Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg w-full sm:w-auto">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Zap className="h-6 w-6 text-blue-400" />
                  <span className="text-xl font-bold">week-hr</span>
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Empowering HR teams with intelligent automation and insights. Transform your recruitment process with AI-powered tools designed for modern hiring challenges.
                </p>
                <div className="flex space-x-4">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <TrendingUp className="h-5 w-5 text-gray-400" />
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; 2024 week-hr. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
