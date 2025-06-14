import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Sparkles, Users, Target, AlertCircle, CheckCircle, Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateInterviewQuestions } from '@/utils/geminiApi';

export const InterviewQuestions: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [questions, setQuestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a job description first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const generatedQuestions = await generateInterviewQuestions(jobDescription);
      setQuestions(generatedQuestions);
      toast({
        title: "Questions Generated Successfully",
        description: "Your behavioral interview questions are ready!",
      });
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate interview questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(questions);
    toast({
      title: "Copied to Clipboard",
      description: "Interview questions copied successfully!",
    });
  };

  const downloadQuestions = () => {
    const blob = new Blob([questions], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview-questions.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Download Started",
      description: "Interview questions file downloaded!",
    });
  };

  const parseQuestions = (questionsText: string) => {
    if (!questionsText) return null;

    const sections = questionsText.split(/\*\*\d+\.\s+/).filter(Boolean);
    const parsedSections = sections.map((section, index) => {
      const lines = section.split('\n').filter(line => line.trim());
      const title = lines[0]?.replace(/\*\*/g, '').trim();
      
      let questions = [];
      let currentQuestion = null;
      let assessingCriteria = [];
      let goodAnswers = [];
      let redFlags = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('* **Question:**')) {
          if (currentQuestion) {
            questions.push({
              question: currentQuestion,
              assessing: assessingCriteria,
              goodAnswers: goodAnswers,
              redFlags: redFlags
            });
          }
          currentQuestion = line.replace('* **Question:**', '').trim();
          assessingCriteria = [];
          goodAnswers = [];
          redFlags = [];
        } else if (line.startsWith('* **Assessing:**')) {
          assessingCriteria.push(line.replace('* **Assessing:**', '').trim());
        } else if (line.startsWith('* **Good Answer Indicators:**')) {
          goodAnswers.push(line.replace('* **Good Answer Indicators:**', '').trim());
        } else if (line.startsWith('* **Red Flag Responses:**')) {
          redFlags.push(line.replace('* **Red Flag Responses:**', '').trim());
        } else if (line.startsWith('*') && currentQuestion) {
          if (line.includes('Good Answer Indicators')) {
            goodAnswers.push(line.replace(/^\*\s*/, '').trim());
          } else if (line.includes('Red Flag')) {
            redFlags.push(line.replace(/^\*\s*/, '').trim());
          } else {
            assessingCriteria.push(line.replace(/^\*\s*/, '').trim());
          }
        }
      }

      if (currentQuestion) {
        questions.push({
          question: currentQuestion,
          assessing: assessingCriteria,
          goodAnswers: goodAnswers,
          redFlags: redFlags
        });
      }

      return {
        title,
        questions
      };
    });

    return parsedSections;
  };

  const parsedQuestions = parseQuestions(questions);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-4">
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm font-semibold">Interview Questions Generator</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI-Powered Behavioral Interview Questions
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Generate comprehensive behavioral interview questions tailored to your job requirements
        </p>
      </div>

      {/* Input Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Job Description Input
          </CardTitle>
          <CardDescription>
            Paste your job description below to generate targeted behavioral interview questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter the job description, required skills, and responsibilities..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            className="resize-none border-blue-200 focus:border-blue-400"
          />
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            {isLoading ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Generating Questions...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Interview Questions
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {questions && (
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button onClick={copyToClipboard} variant="outline" className="gap-2">
              <Copy className="h-4 w-4" />
              Copy All
            </Button>
            <Button onClick={downloadQuestions} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>

          {/* Parsed Questions Display */}
          {parsedQuestions && parsedQuestions.length > 0 ? (
            <div className="space-y-6">
              {parsedQuestions.map((section, sectionIndex) => (
                <Card key={sectionIndex} className="shadow-lg border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Users className="h-5 w-5" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {section.questions.map((q, qIndex) => (
                      <div key={qIndex} className="space-y-4">
                        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                            <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            {q.question}
                          </h4>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          {/* Assessing */}
                          {q.assessing.length > 0 && (
                            <div className="space-y-2">
                              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                                <Target className="h-3 w-3 mr-1" />
                                Assessing
                              </Badge>
                              <ul className="text-sm text-gray-700 space-y-1">
                                {q.assessing.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Good Indicators */}
                          {q.goodAnswers.length > 0 && (
                            <div className="space-y-2">
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Good Indicators
                              </Badge>
                              <ul className="text-sm text-gray-700 space-y-1">
                                {q.goodAnswers.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Red Flags */}
                          {q.redFlags.length > 0 && (
                            <div className="space-y-2">
                              <Badge variant="secondary" className="bg-red-100 text-red-800">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Red Flags
                              </Badge>
                              <ul className="text-sm text-gray-700 space-y-1">
                                {q.redFlags.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {qIndex < section.questions.length - 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Fallback Raw Text Display */
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Generated Interview Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
                    {questions}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
