
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Activity, Settings } from 'lucide-react';
import { TeamManagement } from './TeamManagement';
import { useTeams } from '@/hooks/useTeams';

export const TeamCollaboration: React.FC = () => {
  const { currentTeam, teamMembers } = useTeams();

  if (!currentTeam) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Collaboration</CardTitle>
          <CardDescription>Loading team information...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>{currentTeam.name}</span>
          </CardTitle>
          <CardDescription>
            {currentTeam.description || 'Collaborate with your team members'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{teamMembers.length}</div>
              <div className="text-sm text-gray-500">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {teamMembers.filter(m => m.role === 'admin').length}
              </div>
              <div className="text-sm text-gray-500">Admins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {teamMembers.filter(m => m.role === 'member').length}
              </div>
              <div className="text-sm text-gray-500">Members</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Members</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Activity</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <TeamManagement />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
              <CardDescription>Recent team activities and collaboration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Activity className="h-12 w-12 mx-auto mb-4" />
                <p>Team activity tracking coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Settings</CardTitle>
              <CardDescription>Configure team preferences and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Settings className="h-12 w-12 mx-auto mb-4" />
                <p>Team settings coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
