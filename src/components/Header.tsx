
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Settings, LogOut, User } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigationItems = [
    { id: 'resume', label: 'Resume Screening' },
    { id: 'interview', label: 'Interview Questions' },
    { id: 'job-description', label: 'Job Descriptions' },
    { id: 'performance', label: 'Performance Evaluation' },
    { id: 'matching', label: 'Candidate Matching' },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-900">
              AI HR & Recruitment Dashboard
            </h1>
            <nav className="hidden md:flex space-x-6">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  onClick={() => setActiveSection(item.id)}
                  className="text-sm"
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>

          <Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback>HR</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">HR Manager</h4>
                  <p className="text-sm text-muted-foreground">hr@company.com</p>
                </div>
                <div className="grid gap-2">
                  <Button variant="ghost" className="justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};
