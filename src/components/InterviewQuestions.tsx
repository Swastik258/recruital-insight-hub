
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const InterviewQuestions: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const jobRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Product Manager',
    'UI/UX Designer',
    'Data Scientist',
    'DevOps Engineer',
    'Marketing Manager'
  ];

  const sampleQuestions = {
    'Frontend Developer': [
      {
        id: '1',
        question: 'Can you explain the difference between let, const, and var in JavaScript?',
        category: 'Technical',
        difficulty: 'Medium' as const
      },
      {
        id: '2',
        question: 'How do you optimize the performance of a React application?',
        category: 'Technical',
        difficulty: 'Hard' as const
      },
      {
        id: '3',
        question: 'Tell me about a challenging project you worked on and how you overcame obstacles.',
        category: 'Behavioral',
        difficulty: 'Medium' as const
      },
      {
        id: '4',
        question: 'What is your approach to ensuring cross-browser compatibility?',
        category: 'Technical',
        difficulty: 'Medium' as const
      },
      {
        id: '5',
        question: 'How do you stay updated with the latest frontend technologies?',
        category: 'General',
        difficulty: 'Easy' as const
      }
    ],
    'Product Manager': [
      {
        id: '1',
        question: 'How do you prioritize features in a product roadmap?',
        category: 'Strategic',
        difficulty: 'Hard' as const
      },
      {
        id: '2',
        question: 'Describe a time when you had to make a difficult product decision.',
        category: 'Behavioral',
        difficulty: 'Medium' as const
      },
      {
        id: '3',
        question: 'How do you gather and analyze user feedback?',
        category: 'Process',
        difficulty: 'Medium' as const
      },
      {
        id: '4',
        question: 'What metrics do you use to measure product success?',
        category: 'Analytics',
        difficulty: 'Medium' as const
      },
      {
        id: '5',
        question: 'How do you handle conflicting stakeholder requirements?',
        category: 'Communication',
        difficulty: 'Hard' as const
      }
    ]
  };

  const generateQuestions = () => {
    if (!selectedRole) {
      toast({
        title: "Please select a job role",
        description: "Choose a job role to generate relevant interview questions.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const roleQuestions = sampleQuestions[selectedRole as keyof typeof sampleQuestions] || [];
      setQuestions(roleQuestions);
      setIsGenerating(false);
      toast({
        title: "Questions generated successfully",
        description: `Generated ${roleQuestions.length} interview questions for ${selectedRole}.`,
      });
    }, 2000);
  };

  const copyQuestion = (question: string) => {
    navigator.clipboard.writeText(question);
    toast({
      title: "Question copied",
      description: "The question has been copied to your clipboard.",
    });
  };

  const saveQuestions = () => {
    toast({
      title: "Questions saved",
      description: "All questions have been saved to your question bank.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Interview Question Generator</h2>
        <p className="text-muted-foreground">
          Generate tailored interview questions based on job roles
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Questions</CardTitle>
          <CardDescription>
            Select a job role to generate relevant interview questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select job role" />
              </SelectTrigger>
              <SelectContent>
                {jobRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={generateQuestions} 
              disabled={isGenerating}
              className="px-8"
            >
              {isGenerating ? 'Generating...' : 'Generate Questions'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Questions for {selectedRole}</CardTitle>
                <CardDescription>
                  {questions.length} questions generated
                </CardDescription>
              </div>
              <Button onClick={saveQuestions} variant="outline" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={q.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-sm">Q{index + 1}.</span>
                        <Badge variant="outline">{q.category}</Badge>
                        <Badge className={getDifficultyColor(q.difficulty)}>
                          {q.difficulty}
                        </Badge>
                      </div>
                      <p className="text-gray-900">{q.question}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyQuestion(q.question)}
                      className="flex items-center gap-1"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  {index < questions.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
