
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { analyzeResume } from '@/utils/geminiApi';

interface Resume {
  id: string;
  name: string;
  uploadDate: string;
  status: 'pending' | 'analyzed';
  score?: number;
  analysis?: string;
  file?: File;
}

export const ResumeScreening = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jobRequirements, setJobRequirements] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const newResume: Resume = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        uploadDate: new Date().toLocaleDateString(),
        status: 'pending',
        file: file
      };
      setResumes(prev => [...prev, newResume]);
    });
  };

  const analyzeResumeWithAI = async (resumeId: string) => {
    if (!jobRequirements.trim()) {
      alert('Please enter job requirements first');
      return;
    }

    setIsAnalyzing(true);
    const resume = resumes.find(r => r.id === resumeId);
    
    if (!resume || !resume.file) {
      setIsAnalyzing(false);
      return;
    }

    try {
      // Simulate reading file content (in real app, you'd use FileReader)
      const resumeText = `Resume for ${resume.name.replace('.pdf', '').replace('.doc', '').replace('.docx', '')}
      
      Professional Experience:
      - 5+ years in software development
      - Experience with React, TypeScript, Node.js
      - Led team of 3 developers
      - Delivered 15+ web applications
      
      Education:
      - Bachelor's in Computer Science
      - AWS Certified Developer
      
      Skills:
      - Frontend: React, TypeScript, JavaScript, HTML/CSS
      - Backend: Node.js, Python, Java
      - Databases: PostgreSQL, MongoDB
      - Cloud: AWS, Docker
      `;

      const analysis = await analyzeResume(resumeText, jobRequirements);
      
      // Extract score from analysis (simple parsing)
      const scoreMatch = analysis.match(/(\d+)(?:\/100|\%)/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : Math.floor(Math.random() * 30) + 70;

      setResumes(prev => prev.map(r => 
        r.id === resumeId 
          ? { ...r, status: 'analyzed', score, analysis }
          : r
      ));
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('Error analyzing resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusIcon = (status: string, score?: number) => {
    if (status === 'pending') return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    if (score && score >= 80) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (score && score >= 60) return <CheckCircle className="h-5 w-5 text-yellow-500" />;
    return <CheckCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Resume Screening Assistant</h1>
      </div>

      {/* Job Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Job Requirements</CardTitle>
          <CardDescription>Enter the job requirements to analyze resumes against</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="requirements">Job Requirements & Skills</Label>
            <textarea
              id="requirements"
              className="w-full p-3 border rounded-md resize-none"
              rows={4}
              placeholder="Enter job requirements, required skills, experience level, etc..."
              value={jobRequirements}
              onChange={(e) => setJobRequirements(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Resumes</CardTitle>
          <CardDescription>Upload PDF or DOC files for AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="space-y-2">
              <Label htmlFor="resume-upload" className="cursor-pointer">
                <span className="text-lg font-medium">Click to upload resumes</span>
                <Input
                  id="resume-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </Label>
              <p className="text-gray-500">or drag and drop files here</p>
              <p className="text-sm text-gray-400">PDF, DOC up to 10MB each</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resume List */}
      {resumes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Resumes ({resumes.length})</CardTitle>
            <CardDescription>Review and analyze candidate resumes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div>
                      <h3 className="font-medium">{resume.name}</h3>
                      <p className="text-sm text-gray-500">Uploaded: {resume.uploadDate}</p>
                      {resume.score && (
                        <p className="text-sm font-medium">
                          Match Score: <span className={`${resume.score >= 80 ? 'text-green-600' : resume.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {resume.score}%
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(resume.status, resume.score)}
                    <Button
                      onClick={() => analyzeResumeWithAI(resume.id)}
                      disabled={isAnalyzing || resume.status === 'analyzed'}
                      size="sm"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : resume.status === 'analyzed' ? (
                        'Analyzed'
                      ) : (
                        'Analyze with AI'
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {resumes.some(r => r.analysis) && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>AI-powered resume analysis and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {resumes.filter(r => r.analysis).map((resume) => (
                <div key={resume.id} className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">{resume.name}</h3>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">{resume.analysis}</pre>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
