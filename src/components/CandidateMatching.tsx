
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Star, MapPin, Calendar, Briefcase } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: string;
  skills: string[];
  matchScore?: number;
  avatar?: string;
  email: string;
}

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  requiredSkills: string[];
}

export const CandidateMatching: React.FC = () => {
  const [candidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      title: 'Senior Frontend Developer',
      location: 'New York, NY',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      email: 'alice@email.com'
    },
    {
      id: '2',
      name: 'Bob Chen',
      title: 'Full Stack Developer',
      location: 'San Francisco, CA',
      experience: '4 years',
      skills: ['JavaScript', 'Python', 'React', 'Django'],
      email: 'bob@email.com'
    },
    {
      id: '3',
      name: 'Carol Martinez',
      title: 'Product Manager',
      location: 'Austin, TX',
      experience: '6 years',
      skills: ['Product Strategy', 'Analytics', 'Agile', 'Leadership'],
      email: 'carol@email.com'
    },
    {
      id: '4',
      name: 'David Lee',
      title: 'UI/UX Designer',
      location: 'Seattle, WA',
      experience: '3 years',
      skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
      email: 'david@email.com'
    }
  ]);

  const [jobOpenings] = useState<JobOpening[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      requiredSkills: ['React', 'TypeScript', 'JavaScript', 'CSS']
    },
    {
      id: '2',
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      requiredSkills: ['Product Strategy', 'Analytics', 'Leadership', 'Agile']
    },
    {
      id: '3',
      title: 'UX Designer',
      department: 'Design',
      location: 'San Francisco, CA',
      requiredSkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems']
    }
  ]);

  const [selectedJob, setSelectedJob] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState<string>('');
  const [matchedCandidates, setMatchedCandidates] = useState<Candidate[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).filter(candidate =>
    experienceFilter === '' || candidate.experience.includes(experienceFilter)
  );

  const handleMatchCandidates = () => {
    if (!selectedJob) {
      toast({
        title: "Please select a job opening",
        description: "Choose a job opening to find matching candidates.",
        variant: "destructive"
      });
      return;
    }

    setIsMatching(true);

    // Simulate AI matching
    setTimeout(() => {
      const job = jobOpenings.find(j => j.id === selectedJob);
      if (!job) return;

      const candidatesWithScores = candidates.map(candidate => {
        // Calculate match score based on skill overlap
        const skillMatches = candidate.skills.filter(skill =>
          job.requiredSkills.some(reqSkill =>
            reqSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(reqSkill.toLowerCase())
          )
        ).length;
        
        const matchScore = Math.min(
          Math.round((skillMatches / job.requiredSkills.length) * 100) + 
          Math.floor(Math.random() * 20), 
          100
        );

        return {
          ...candidate,
          matchScore
        };
      }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

      setMatchedCandidates(candidatesWithScores.slice(0, 5));
      setIsMatching(false);
      
      toast({
        title: "Matching complete",
        description: `Found ${candidatesWithScores.length} potential matches for the position.`,
      });
    }, 2000);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Candidate Matching System</h2>
        <p className="text-muted-foreground">
          Find and rank the best candidates for your job openings
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Opening</CardTitle>
              <CardDescription>
                Select a position to find matching candidates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job opening" />
                </SelectTrigger>
                <SelectContent>
                  {jobOpenings.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{job.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {job.department} • {job.location}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedJob && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Required Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {jobOpenings.find(j => j.id === selectedJob)?.requiredSkills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                onClick={handleMatchCandidates} 
                disabled={isMatching}
                className="w-full"
              >
                {isMatching ? 'Finding Matches...' : 'Match Candidates'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filter Candidates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Experience Level</label>
                <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any experience</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5+">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {matchedCandidates.length > 0 ? 'Matched Candidates' : 'Candidate Database'}
              </CardTitle>
              <CardDescription>
                {matchedCandidates.length > 0 
                  ? `${matchedCandidates.length} candidates ranked by match score`
                  : `${filteredCandidates.length} candidates available`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(matchedCandidates.length > 0 ? matchedCandidates : filteredCandidates).map((candidate) => (
                  <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback>
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{candidate.name}</h3>
                          {candidate.matchScore && (
                            <Badge className={getMatchScoreBadge(candidate.matchScore)}>
                              {candidate.matchScore}% match
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {candidate.title}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {candidate.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {candidate.experience}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{candidate.skills.length - 4} more
                            </Badge>
                          )}
                        </div>

                        {candidate.matchScore && (
                          <div className="mt-2">
                            <Progress value={candidate.matchScore} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {candidate.matchScore && (
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getMatchScoreColor(candidate.matchScore)}`}>
                            {candidate.matchScore}%
                          </div>
                          <div className="text-xs text-muted-foreground">match</div>
                        </div>
                      )}
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
