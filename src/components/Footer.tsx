
import React from 'react';
import { Separator } from '@/components/ui/separator';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        <Separator className="mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-gray-900 mb-2">HR Support</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Email: hr-support@company.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Help Center
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t text-center text-xs text-muted-foreground">
          © 2024 week-hr. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
