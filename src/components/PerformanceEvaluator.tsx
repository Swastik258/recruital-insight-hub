
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EvaluationCriteria {
  id: string;
  label: string;
  checked: boolean;
}

interface EvaluationResult {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  criteriaScores: Record<string, number>;
}

export const PerformanceEvaluator: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [criteria, setCriteria] = useState<EvaluationCriteria[]>([
    { id: 'teamwork', label: 'Teamwork & Collaboration', checked: true },
    { id: 'productivity', label: 'Productivity & Output', checked: true },
    { id: 'communication', label: 'Communication Skills', checked: true },
    { id: 'leadership', label: 'Leadership Potential', checked: false },
    { id: 'innovation', label: 'Innovation & Creativity', checked: false },
    { id: 'reliability', label: 'Reliability & Accountability', checked: true },
    { id: 'learning', label: 'Learning & Development', checked: false },
    { id: 'quality', label: 'Quality of Work', checked: true },
  ]);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const employees = [
    'John Doe - Frontend Developer',
    'Jane Smith - Product Manager',
    'Mike Johnson - Backend Developer',
    'Sarah Wilson - UX Designer',
    'David Brown - Data Analyst'
  ];

  const handleCriteriaChange = (id: string, checked: boolean) => {
    setCriteria(prev => 
      prev.map(c => c.id === id ? { ...c, checked } : c)
    );
  };

  const handleEvaluate = () => {
    if (!selectedEmployee) {
      toast({
        title: "Please select an employee",
        description: "Choose an employee to evaluate their performance.",
        variant: "destructive"
      });
      return;
    }

    const selectedCriteria = criteria.filter(c => c.checked);
    if (selectedCriteria.length === 0) {
      toast({
        title: "Please select evaluation criteria",
        description: "Choose at least one criterion for evaluation.",
        variant: "destructive"
      });
      return;
    }

    setIsEvaluating(true);

    // Simulate AI evaluation
    setTimeout(() => {
      const evaluationResult: EvaluationResult = {
        overallScore: 82,
        strengths: [
          'Excellent teamwork and collaboration skills',
          'Consistently delivers high-quality work on time',
          'Strong communication with stakeholders',
          'Shows initiative in problem-solving'
        ],
        improvements: [
          'Could benefit from taking on more leadership responsibilities',
          'Opportunity to mentor junior team members',
          'Consider exploring new technologies to enhance skill set'
        ],
        recommendations: [
          'Enroll in leadership development program',
          'Assign mentoring role for new hires',
          'Provide opportunities for cross-functional projects',
          'Consider for promotion to senior role within next 6 months'
        ],
        criteriaScores: {
          teamwork: 90,
          productivity: 85,
          communication: 88,
          reliability: 92,
          quality: 87
        }
      };

      setResult(evaluationResult);
      setIsEvaluating(false);
      toast({
        title: "Evaluation complete",
        description: "Performance evaluation has been generated successfully.",
      });
    }, 3000);
  };

  const getScoreIcon = (score: number) => {
    if (score >= 85) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (score >= 70) return <Minus className="h-4 w-4 text-yellow-500" />;
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Employee Performance Evaluator</h2>
        <p className="text-muted-foreground">
          Conduct comprehensive AI-powered performance evaluations
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evaluation Setup</CardTitle>
            <CardDescription>
              Select employee and evaluation criteria
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Employee</label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee} value={employee}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {employee}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Evaluation Criteria</label>
              <div className="space-y-2">
                {criteria.map((criterion) => (
                  <div key={criterion.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={criterion.id}
                      checked={criterion.checked}
                      onCheckedChange={(checked) => 
                        handleCriteriaChange(criterion.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={criterion.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {criterion.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleEvaluate} 
              disabled={isEvaluating}
              className="w-full"
            >
              {isEvaluating ? 'Evaluating...' : 'Start Evaluation'}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Performance Evaluation Results
              </CardTitle>
              <CardDescription>
                AI-generated evaluation for {selectedEmployee}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-green-600">
                  {result.overallScore}%
                </div>
                <p className="text-sm text-muted-foreground">Overall Performance Score</p>
                <Progress value={result.overallScore} className="mt-2" />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Criteria Breakdown</h4>
                {Object.entries(result.criteriaScores).map(([key, score]) => {
                  const criterion = criteria.find(c => c.id === key);
                  if (!criterion) return null;
                  
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm">{criterion.label}</span>
                      <div className="flex items-center gap-2">
                        {getScoreIcon(score)}
                        <span className={`font-medium ${getScoreColor(score)}`}>
                          {score}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Key Strengths</h4>
                <ul className="space-y-1">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <TrendingUp className="h-3 w-3 text-green-500 mt-1" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Areas for Improvement</h4>
                <ul className="space-y-1">
                  {result.improvements.map((improvement, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <TrendingDown className="h-3 w-3 text-yellow-500 mt-1" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Development Recommendations</h4>
                <div className="space-y-2">
                  {result.recommendations.map((recommendation, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {recommendation}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
