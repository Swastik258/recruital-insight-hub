
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Settings, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile, loading: profileLoading } = useProfile();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleSettingsClick = () => {
    setIsProfileOpen(false);
    navigate('/settings');
  };

  const navigationItems = [
    { id: 'resume', label: 'Resume Screening' },
    { id: 'interview', label: 'Interview Questions' },
    { id: 'job-description', label: 'Job Descriptions' },
    { id: 'performance', label: 'Performance Evaluation' },
    { id: 'matching', label: 'Candidate Matching' },
  ];

  const getInitials = () => {
    if (profile?.full_name) {
      const names = profile.full_name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`;
      }
      return profile.full_name[0];
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  const getDisplayName = () => {
    if (profile?.full_name) {
      return profile.full_name;
    }
    return user?.email || 'User';
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-900 cursor-pointer" onClick={() => navigate('/dashboard')}>
              week-hr
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
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">{getDisplayName()}</h4>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  {profile && (
                    <div className="text-sm text-muted-foreground">
                      <p className="text-xs mt-1">
                        Member since {new Date(profile.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {profileLoading && (
                    <p className="text-sm text-muted-foreground">Loading profile...</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Button variant="ghost" className="justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={handleSettingsClick}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={handleLogout}>
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
