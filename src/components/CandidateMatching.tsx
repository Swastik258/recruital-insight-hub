
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Star, MapPin, Calendar, Briefcase, RefreshCw, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useJobOpenings } from '@/hooks/useJobOpenings';

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

export const CandidateMatching: React.FC = () => {
  const { jobOpenings, loading: jobsLoading, refreshJobs } = useJobOpenings();
  
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

  const [selectedJob, setSelectedJob] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [matchedCandidates, setMatchedCandidates] = useState<Candidate[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).filter(candidate => {
    if (experienceFilter === 'all') return true;
    if (experienceFilter === '1-2') return candidate.experience.includes('1') || candidate.experience.includes('2');
    if (experienceFilter === '3-5') return candidate.experience.includes('3') || candidate.experience.includes('4') || candidate.experience.includes('5');
    if (experienceFilter === '5+') return parseInt(candidate.experience) >= 5;
    return true;
  });

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
          job.required_skills.some(reqSkill =>
            reqSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(reqSkill.toLowerCase())
          )
        ).length;
        
        const matchScore = Math.min(
          Math.round((skillMatches / job.required_skills.length) * 100) + 
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

  const handleRefreshJobs = async () => {
    await refreshJobs();
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

  const formatPostedDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Candidate Matching System</h2>
          <p className="text-muted-foreground">
            Find and rank the best candidates for your job openings
          </p>
        </div>
        <Button 
          onClick={handleRefreshJobs}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Jobs
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Opening</CardTitle>
              <CardDescription>
                Select a position to find matching candidates
                {jobsLoading && <span className="text-blue-600"> (Loading...)</span>}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedJob} onValueChange={setSelectedJob} disabled={jobsLoading}>
                <SelectTrigger>
                  <SelectValue placeholder={jobsLoading ? "Loading jobs..." : "Select job opening"} />
                </SelectTrigger>
                <SelectContent>
                  {jobOpenings.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{job.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {job.company} • {job.location}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatPostedDate(job.posted_date)} • {job.source}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedJob && (
                <div className="space-y-3">
                  {(() => {
                    const selectedJobData = jobOpenings.find(j => j.id === selectedJob);
                    if (!selectedJobData) return null;
                    
                    return (
                      <>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Job Details</h4>
                          <div className="text-sm space-y-1">
                            <p><span className="font-medium">Company:</span> {selectedJobData.company}</p>
                            <p><span className="font-medium">Location:</span> {selectedJobData.location}</p>
                            {selectedJobData.experience_level && (
                              <p><span className="font-medium">Experience:</span> {selectedJobData.experience_level}</p>
                            )}
                            {selectedJobData.salary_range && (
                              <p><span className="font-medium">Salary:</span> {selectedJobData.salary_range}</p>
                            )}
                            <p><span className="font-medium">Type:</span> {selectedJobData.job_type || 'Full-time'}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Required Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedJobData.required_skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              <Button 
                onClick={handleMatchCandidates} 
                disabled={isMatching || !selectedJob}
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
                    <SelectItem value="all">Any experience</SelectItem>
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {matchedCandidates.length > 0 ? 'Matched Candidates' : 'Candidate Database'}
                  </CardTitle>
                  <CardDescription>
                    {matchedCandidates.length > 0 
                      ? `${matchedCandidates.length} candidates ranked by match score`
                      : `${filteredCandidates.length} candidates available`
                    }
                  </CardDescription>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{jobOpenings.length} active job openings</p>
                  <p>Updated daily</p>
                </div>
              </div>
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
