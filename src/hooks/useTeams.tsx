
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Team {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: string;
  joined_at: string;
  profiles: {
    full_name: string | null;
    email: string | null;
  };
}

export const useTeams = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
      } else {
        setTeams(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch teams');
    }
  };

  const fetchCurrentTeam = async () => {
    if (!user) return;

    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('current_team_id, teams(*)')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching current team:', profileError);
        return;
      }

      if (profile?.teams) {
        setCurrentTeam(profile.teams as Team);
      }
    } catch (err) {
      console.error('Error fetching current team:', err);
    }
  };

  const fetchTeamMembers = async (teamId: string) => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select(`
          *,
          profiles(full_name, email)
        `)
        .eq('team_id', teamId)
        .order('joined_at', { ascending: false });

      if (error) {
        console.error('Error fetching team members:', error);
        setError(error.message);
      } else {
        setTeamMembers(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch team members');
    }
  };

  const switchTeam = async (teamId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ current_team_id: teamId })
        .eq('id', user.id);

      if (error) {
        console.error('Error switching team:', error);
        setError(error.message);
      } else {
        await fetchCurrentTeam();
      }
    } catch (err) {
      console.error('Error switching team:', err);
      setError('Failed to switch team');
    }
  };

  const inviteTeamMember = async (teamId: string, userId: string, role: string = 'member') => {
    try {
      const { error } = await supabase
        .from('team_members')
        .insert({
          team_id: teamId,
          user_id: userId,
          role: role
        });

      if (error) {
        console.error('Error inviting team member:', error);
        setError(error.message);
        return false;
      }

      await fetchTeamMembers(teamId);
      return true;
    } catch (err) {
      console.error('Error inviting member:', err);
      setError('Failed to invite team member');
      return false;
    }
  };

  const updateMemberRole = async (memberId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .update({ role: newRole })
        .eq('id', memberId);

      if (error) {
        console.error('Error updating member role:', error);
        setError(error.message);
        return false;
      }

      if (currentTeam) {
        await fetchTeamMembers(currentTeam.id);
      }
      return true;
    } catch (err) {
      console.error('Error updating role:', err);
      setError('Failed to update member role');
      return false;
    }
  };

  const removeTeamMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', memberId);

      if (error) {
        console.error('Error removing team member:', error);
        setError(error.message);
        return false;
      }

      if (currentTeam) {
        await fetchTeamMembers(currentTeam.id);
      }
      return true;
    } catch (err) {
      console.error('Error removing member:', err);
      setError('Failed to remove team member');
      return false;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchTeams(), fetchCurrentTeam()]);
      setLoading(false);
    };

    if (user) {
      loadData();
    }
  }, [user]);

  useEffect(() => {
    if (currentTeam) {
      fetchTeamMembers(currentTeam.id);
    }
  }, [currentTeam]);

  return {
    teams,
    currentTeam,
    teamMembers,
    loading,
    error,
    switchTeam,
    inviteTeamMember,
    updateMemberRole,
    removeTeamMember,
    refetchTeams: fetchTeams,
    refetchCurrentTeam: fetchCurrentTeam
  };
};
