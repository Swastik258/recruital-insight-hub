
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

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

export const BlogSection = () => {
  const [currentBlogPage, setCurrentBlogPage] = useState(1);
  const blogsPerPage = 3;
  
  const totalBlogPages = Math.ceil(blogPosts.length / blogsPerPage);
  const currentBlogs = blogPosts.slice(
    (currentBlogPage - 1) * blogsPerPage,
    currentBlogPage * blogsPerPage
  );

  return (
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
  );
};
