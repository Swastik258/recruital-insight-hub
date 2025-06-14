
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Resume {
  id: string;
  name: string;
  dateUploaded: string;
  status: 'uploaded' | 'analyzing' | 'analyzed';
  score?: number;
  skills?: string[];
  recommendations?: string;
}

export const ResumeScreening: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: '1',
      name: 'John_Doe_Resume.pdf',
      dateUploaded: '2024-06-14',
      status: 'analyzed',
      score: 85,
      skills: ['React', 'TypeScript', 'Node.js', 'Python'],
      recommendations: 'Strong technical background with relevant experience. Recommended for technical interview.'
    },
    {
      id: '2',
      name: 'Jane_Smith_Resume.pdf',
      dateUploaded: '2024-06-13',
      status: 'uploaded',
    }
  ]);

  const handleFileUpload = () => {
    const newResume: Resume = {
      id: Date.now().toString(),
      name: 'New_Resume.pdf',
      dateUploaded: new Date().toISOString().split('T')[0],
      status: 'uploaded'
    };
    setResumes([...resumes, newResume]);
    toast({
      title: "Resume uploaded successfully",
      description: "The resume has been added to the queue for analysis.",
    });
  };

  const handleAnalyze = (id: string) => {
    setResumes(resumes.map(resume => 
      resume.id === id 
        ? { ...resume, status: 'analyzing' as const }
        : resume
    ));

    // Simulate AI analysis
    setTimeout(() => {
      setResumes(prev => prev.map(resume => 
        resume.id === id 
          ? { 
              ...resume, 
              status: 'analyzed' as const,
              score: Math.floor(Math.random() * 40) + 60,
              skills: ['JavaScript', 'Communication', 'Project Management', 'Leadership'],
              recommendations: 'Good candidate with relevant skills. Consider for next round of interviews.'
            }
          : resume
      ));
      toast({
        title: "Analysis complete",
        description: "Resume analysis has been completed successfully.",
      });
    }, 3000);
  };

  const getStatusIcon = (status: Resume['status']) => {
    switch (status) {
      case 'uploaded':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'analyzing':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'analyzed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusBadge = (status: Resume['status']) => {
    const variants = {
      uploaded: 'secondary',
      analyzing: 'default',
      analyzed: 'default'
    };
    return (
      <Badge variant={variants[status] as any}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Resume Screening Assistant</h2>
          <p className="text-muted-foreground">
            Upload and analyze resumes with AI-powered screening
          </p>
        </div>
        <Button onClick={handleFileUpload} className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload Resume
        </Button>
      </div>

      <div className="grid gap-4">
        {resumes.map((resume) => (
          <Card key={resume.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <CardTitle className="text-lg">{resume.name}</CardTitle>
                    <CardDescription>Uploaded on {resume.dateUploaded}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusIcon(resume.status)}
                  {getStatusBadge(resume.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {resume.status === 'uploaded' && (
                <Button onClick={() => handleAnalyze(resume.id)}>
                  Analyze Resume
                </Button>
              )}
              
              {resume.status === 'analyzing' && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Analyzing resume...</p>
                  <Progress value={65} className="w-full" />
                </div>
              )}
              
              {resume.status === 'analyzed' && resume.score && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm font-medium">Match Score</p>
                      <p className="text-2xl font-bold text-green-600">{resume.score}%</p>
                    </div>
                    <Progress value={resume.score} className="flex-1" />
                  </div>
                  
                  {resume.skills && (
                    <div>
                      <p className="text-sm font-medium mb-2">Key Skills Found</p>
                      <div className="flex flex-wrap gap-2">
                        {resume.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {resume.recommendations && (
                    <div>
                      <p className="text-sm font-medium mb-2">AI Recommendations</p>
                      <p className="text-sm text-muted-foreground">{resume.recommendations}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
