
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Check, ChevronDown, Users } from 'lucide-react';
import { useTeams } from '@/hooks/useTeams';

export const TeamSwitcher: React.FC = () => {
  const { teams, currentTeam, switchTeam, loading } = useTeams();

  if (loading || !currentTeam) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-xs">
                {currentTeam.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="truncate">{currentTeam.name}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2">
        <div className="space-y-1">
          {teams.map((team) => (
            <Button
              key={team.id}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => switchTeam(team.id)}
            >
              <div className="flex items-center space-x-2 flex-1">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-xs">
                    {team.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate flex-1">{team.name}</span>
                {currentTeam.id === team.id && (
                  <Check className="h-4 w-4" />
                )}
              </div>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
