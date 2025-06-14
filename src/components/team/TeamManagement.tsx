
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, UserPlus, Crown, User, Eye } from 'lucide-react';
import { useTeams } from '@/hooks/useTeams';
import { useToast } from '@/hooks/use-toast';

export const TeamManagement: React.FC = () => {
  const { currentTeam, teamMembers, inviteTeamMember, updateMemberRole, removeTeamMember } = useTeams();
  const { toast } = useToast();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = async () => {
    if (!currentTeam || !inviteEmail.trim()) return;

    setIsInviting(true);
    // Note: In a real app, you'd need to handle email-based invitations
    // For now, this is a placeholder for the team invitation flow
    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${inviteEmail}`,
    });
    setInviteEmail('');
    setIsInviting(false);
  };

  const handleRoleChange = async (memberId: string, newRole: string) => {
    const success = await updateMemberRole(memberId, newRole);
    if (success) {
      toast({
        title: "Role Updated",
        description: "Team member role has been updated successfully.",
      });
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    const success = await removeTeamMember(memberId);
    if (success) {
      toast({
        title: "Member Removed",
        description: "Team member has been removed successfully.",
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4" />;
      case 'member':
        return <User className="h-4 w-4" />;
      case 'viewer':
        return <Eye className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'member':
        return 'bg-blue-100 text-blue-800';
      case 'viewer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!currentTeam) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Invite Team Member</span>
          </CardTitle>
          <CardDescription>
            Invite new members to join your team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleInvite}
                disabled={!inviteEmail.trim() || isInviting}
                className="w-full"
              >
                {isInviting ? 'Inviting...' : 'Send Invite'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members ({teamMembers.length})</CardTitle>
          <CardDescription>
            Manage your team members and their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getRoleIcon(member.role)}
                    <div>
                      <p className="font-medium">
                        {member.profiles.full_name || 'Unknown User'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {member.profiles.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getRoleColor(member.role)}>
                    {member.role}
                  </Badge>
                  <Select
                    value={member.role}
                    onValueChange={(value) => handleRoleChange(member.id, value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
