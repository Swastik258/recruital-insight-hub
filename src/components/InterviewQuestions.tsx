
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Loader2, Copy, Save } from 'lucide-react';
import { generateInterviewQuestions } from '@/utils/geminiApi';

export const InterviewQuestions = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [questions, setQuestions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const jobRoles = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'UX/UI Designer',
    'Sales Manager',
    'Marketing Manager',
    'HR Manager',
    'Business Analyst',
    'DevOps Engineer',
    'Customer Success Manager'
  ];

  const experienceLevels = [
    'Entry Level (0-2 years)',
    'Mid Level (3-5 years)',
    'Senior Level (6-10 years)',
    'Lead/Principal (10+ years)'
  ];

  const handleGenerateQuestions = async () => {
    if (!selectedRole || !selectedLevel) {
      alert('Please select both job role and experience level');
      return;
    }

    setIsGenerating(true);
    try {
      const generatedQuestions = await generateInterviewQuestions(selectedRole, selectedLevel);
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Error generating questions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(questions);
    alert('Questions copied to clipboard!');
  };

  const saveQuestions = () => {
    const blob = new Blob([questions], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-questions-${selectedRole.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Interview Question Generator</h1>
      </div>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configure Interview Questions</CardTitle>
          <CardDescription>Select job role and experience level to generate tailored questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a job role" />
                </SelectTrigger>
                <SelectContent>
                  {jobRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleGenerateQuestions} disabled={isGenerating || !selectedRole || !selectedLevel}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Questions...
              </>
            ) : (
              <>
                <MessageSquare className="mr-2 h-4 w-4" />
                Generate Questions
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Questions */}
      {questions && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Generated Interview Questions</CardTitle>
                <CardDescription>
                  Questions for {selectedRole} - {selectedLevel}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={saveQuestions}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                {questions}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Interview Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-600">Behavioral Questions</h3>
              <p className="text-gray-600">Use STAR method (Situation, Task, Action, Result) to evaluate responses.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-green-600">Technical Questions</h3>
              <p className="text-gray-600">Focus on problem-solving approach rather than just correct answers.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-purple-600">Cultural Fit</h3>
              <p className="text-gray-600">Listen for alignment with company values and team dynamics.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
