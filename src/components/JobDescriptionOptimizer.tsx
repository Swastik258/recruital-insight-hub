
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface OptimizationResult {
  score: number;
  optimizedText: string;
  improvements: string[];
  keywords: string[];
  inclusivityScore: number;
  suggestions: string[];
}

export const JobDescriptionOptimizer: React.FC = () => {
  const [originalText, setOriginalText] = useState('');
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = () => {
    if (!originalText.trim()) {
      toast({
        title: "Please enter a job description",
        description: "Enter the job description you want to optimize.",
        variant: "destructive"
      });
      return;
    }

    setIsOptimizing(true);

    // Simulate AI optimization
    setTimeout(() => {
      const optimizedResult: OptimizationResult = {
        score: 85,
        optimizedText: `Senior Frontend Developer - Join Our Innovation Team

We're seeking a talented Senior Frontend Developer to join our dynamic team and help build cutting-edge web applications that impact millions of users worldwide.

What You'll Do:
• Develop and maintain responsive web applications using React, TypeScript, and modern JavaScript
• Collaborate with designers and backend developers to create seamless user experiences
• Optimize application performance and ensure cross-browser compatibility
• Mentor junior developers and contribute to technical discussions
• Participate in code reviews and maintain high coding standards

What We're Looking For:
• 4+ years of experience in frontend development
• Strong proficiency in React, TypeScript, HTML5, and CSS3
• Experience with modern build tools and version control systems
• Understanding of accessibility standards and SEO best practices
• Excellent communication skills and team collaboration abilities

What We Offer:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements and remote-friendly culture
• Professional development opportunities and conference attendance
• Collaborative and inclusive work environment

We are an equal opportunity employer committed to diversity and inclusion. We welcome applications from all qualified candidates regardless of race, gender, age, religion, sexual orientation, or disability status.`,
        improvements: [
          'Added compelling opening statement',
          'Improved bullet point structure',
          'Enhanced benefits section',
          'Added diversity and inclusion statement',
          'Optimized for SEO keywords'
        ],
        keywords: ['React', 'TypeScript', 'Frontend', 'JavaScript', 'HTML5', 'CSS3', 'Remote'],
        inclusivityScore: 92,
        suggestions: [
          'Consider adding salary range for transparency',
          'Mention specific team size and structure',
          'Include information about company culture'
        ]
      };

      setResult(optimizedResult);
      setIsOptimizing(false);
      toast({
        title: "Optimization complete",
        description: "Your job description has been optimized successfully.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Job Description Optimizer</h2>
        <p className="text-muted-foreground">
          Enhance your job descriptions for better reach and inclusivity
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Original Job Description</CardTitle>
            <CardDescription>
              Paste your job description here for optimization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your job description here..."
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="min-h-[300px]"
            />
            <Button 
              onClick={handleOptimize} 
              disabled={isOptimizing}
              className="w-full"
            >
              {isOptimizing ? 'Optimizing...' : 'Optimize Job Description'}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Optimized Job Description
              </CardTitle>
              <CardDescription>
                Enhanced version with improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="optimized" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="optimized">Optimized</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="optimized" className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">{result.optimizedText}</pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="analysis" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Overall Score</span>
                        <span className="text-lg font-bold text-green-600">{result.score}%</span>
                      </div>
                      <Progress value={result.score} />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Inclusivity Score</span>
                        <span className="text-lg font-bold text-blue-600">{result.inclusivityScore}%</span>
                      </div>
                      <Progress value={result.inclusivityScore} />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Key Improvements Made</h4>
                      <ul className="space-y-1">
                        {result.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Optimized Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.keywords.map((keyword, index) => (
                          <Badge key={index} variant="outline">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="suggestions" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Additional Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {result.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
