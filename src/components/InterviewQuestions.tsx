
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Loader2, Copy, Save, Brain, Code } from 'lucide-react';
import { generateBehavioralQuestions, generateTechnicalQuestions } from '@/utils/geminiApi';

export const InterviewQuestions = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [companyCulture, setCompanyCulture] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState('');
  const [companyTechStack, setCompanyTechStack] = useState('');
  const [behavioralQuestions, setBehavioralQuestions] = useState('');
  const [technicalQuestions, setTechnicalQuestions] = useState('');
  const [isGeneratingBehavioral, setIsGeneratingBehavioral] = useState(false);
  const [isGeneratingTechnical, setIsGeneratingTechnical] = useState(false);

  const jobRoles = [
    'Software Engineer', 'Product Manager', 'Data Scientist', 'UX/UI Designer',
    'Sales Manager', 'Marketing Manager', 'HR Manager', 'Business Analyst',
    'DevOps Engineer', 'Customer Success Manager', 'Project Manager',
    'Quality Assurance Engineer', 'Financial Analyst', 'Operations Manager'
  ];

  const experienceLevels = [
    'Entry Level (0-2 years)', 'Mid Level (3-5 years)',
    'Senior Level (6-10 years)', 'Lead/Principal (10+ years)'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Manufacturing', 'Consulting', 'Media', 'Non-profit', 'Government'
  ];

  const companySizes = [
    'Startup (1-50)', 'Small (51-200)', 'Medium (201-1000)',
    'Large (1000-5000)', 'Enterprise (5000+)'
  ];

  const handleGenerateBehavioral = async () => {
    if (!selectedRole || !selectedLevel || !industry || !companySize || !companyCulture) {
      alert('Please fill in all company context fields');
      return;
    }

    setIsGeneratingBehavioral(true);
    try {
      const questions = await generateBehavioralQuestions(
        selectedRole, industry, selectedLevel, companySize, companyCulture
      );
      setBehavioralQuestions(questions);
    } catch (error) {
      console.error('Error generating behavioral questions:', error);
      alert('Error generating questions. Please try again.');
    } finally {
      setIsGeneratingBehavioral(false);
    }
  };

  const handleGenerateTechnical = async () => {
    if (!selectedRole || !selectedLevel || !technicalSkills) {
      alert('Please fill in technical role, experience level, and required skills');
      return;
    }

    setIsGeneratingTechnical(true);
    try {
      const skillsArray = technicalSkills.split(',').map(skill => skill.trim());
      const questions = await generateTechnicalQuestions(
        selectedRole, skillsArray, selectedLevel, companyTechStack
      );
      setTechnicalQuestions(questions);
    } catch (error) {
      console.error('Error generating technical questions:', error);
      alert('Error generating questions. Please try again.');
    } finally {
      setIsGeneratingTechnical(false);
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    alert('Questions copied to clipboard!');
  };

  const saveQuestions = (content: string, type: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-interview-questions-${selectedRole.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Advanced Interview Question Generator</h1>
      </div>

      <Tabs defaultValue="behavioral" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="behavioral">Behavioral Questions</TabsTrigger>
          <TabsTrigger value="technical">Technical Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="behavioral" className="space-y-6">
          {/* Behavioral Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Behavioral Interview Configuration</CardTitle>
              <CardDescription>Configure context for comprehensive behavioral questions</CardDescription>
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
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Company Size</Label>
                  <Select value={companySize} onValueChange={setCompanySize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="culture">Company Culture Description</Label>
                <Input
                  id="culture"
                  placeholder="e.g., Collaborative, innovative, fast-paced, data-driven..."
                  value={companyCulture}
                  onChange={(e) => setCompanyCulture(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleGenerateBehavioral} 
                disabled={isGeneratingBehavioral || !selectedRole || !selectedLevel || !industry}
                className="w-full"
              >
                {isGeneratingBehavioral ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Behavioral Questions...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Behavioral Questions
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Behavioral Questions Results */}
          {behavioralQuestions && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Behavioral Interview Questions</CardTitle>
                    <CardDescription>
                      Questions for {selectedRole} - {selectedLevel} in {industry}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(behavioralQuestions)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => saveQuestions(behavioralQuestions, 'behavioral')}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {behavioralQuestions}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          {/* Technical Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Interview Configuration</CardTitle>
              <CardDescription>Configure technical requirements and skills assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Technical Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select technical role" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobRoles.filter(role => 
                        role.includes('Engineer') || role.includes('Developer') || 
                        role.includes('Scientist') || role.includes('Analyst')
                      ).map((role) => (
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
              <div className="space-y-2">
                <Label htmlFor="tech-skills">Required Technical Skills</Label>
                <Input
                  id="tech-skills"
                  placeholder="e.g., React, TypeScript, Node.js, Python, AWS, Docker..."
                  value={technicalSkills}
                  onChange={(e) => setTechnicalSkills(e.target.value)}
                />
                <p className="text-xs text-gray-500">Separate skills with commas</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tech-stack">Company Tech Stack (Optional)</Label>
                <Input
                  id="tech-stack"
                  placeholder="e.g., React, Node.js, PostgreSQL, AWS, Kubernetes..."
                  value={companyTechStack}
                  onChange={(e) => setCompanyTechStack(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleGenerateTechnical} 
                disabled={isGeneratingTechnical || !selectedRole || !selectedLevel || !technicalSkills}
                className="w-full"
              >
                {isGeneratingTechnical ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Technical Questions...
                  </>
                ) : (
                  <>
                    <Code className="mr-2 h-4 w-4" />
                    Generate Technical Questions
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Technical Questions Results */}
          {technicalQuestions && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Technical Interview Questions</CardTitle>
                    <CardDescription>
                      Questions for {selectedRole} - {selectedLevel}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(technicalQuestions)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => saveQuestions(technicalQuestions, 'technical')}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {technicalQuestions}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Interview Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Interview Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-600">Behavioral Assessment</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Use STAR method evaluation</li>
                <li>• Focus on specific examples</li>
                <li>• Assess cultural fit</li>
                <li>• Probe for details</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-green-600">Technical Evaluation</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Problem-solving approach</li>
                <li>• Code quality and structure</li>
                <li>• System design thinking</li>
                <li>• Learning ability</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-purple-600">Legal Compliance</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Avoid discriminatory questions</li>
                <li>• Focus on job-related skills</li>
                <li>• Consistent evaluation criteria</li>
                <li>• Document decisions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
