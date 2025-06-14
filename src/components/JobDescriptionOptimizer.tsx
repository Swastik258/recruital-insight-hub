
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Loader2, Copy, Download, TrendingUp, Target } from 'lucide-react';
import { optimizeJobDescriptionAdvanced, predictJobPostingPerformance } from '@/utils/geminiApi';

export const JobDescriptionOptimizer = () => {
  const [originalJD, setOriginalJD] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [location, setLocation] = useState('');
  const [targetLevel, setTargetLevel] = useState('');
  const [optimizedJD, setOptimizedJD] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [performancePrediction, setPerformancePrediction] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Manufacturing', 'Consulting', 'Media', 'Non-profit', 'Government'
  ];

  const companySizes = [
    'Startup (1-50)', 'Small (51-200)', 'Medium (201-1000)',
    'Large (1000-5000)', 'Enterprise (5000+)'
  ];

  const targetLevels = [
    'Entry Level', 'Mid Level', 'Senior Level', 'Executive Level'
  ];

  const handleOptimize = async () => {
    if (!originalJD.trim() || !jobTitle.trim() || !industry || !companySize || !location || !targetLevel) {
      alert('Please fill in all required fields');
      return;
    }

    setIsOptimizing(true);
    try {
      const result = await optimizeJobDescriptionAdvanced(
        originalJD, jobTitle, industry, companySize, location, targetLevel
      );
      
      // Parse the result to extract optimized JD and analysis
      const sections = result.split('\n\n');
      let optimized = '';
      let analysisText = '';
      
      const optimizedSection = sections.find(s => s.toLowerCase().includes('optimized') || s.toLowerCase().includes('enhanced'));
      const analysisSection = sections.find(s => 
        s.toLowerCase().includes('improvement') || 
        s.toLowerCase().includes('analysis') || 
        s.toLowerCase().includes('keyword')
      );
      
      if (optimizedSection) {
        optimized = optimizedSection.replace(/^.*(?:optimized|enhanced).*?:/i, '').trim();
      }
      if (analysisSection) {
        analysisText = analysisSection;
      }
      
      // If parsing fails, use the full result
      if (!optimized) {
        const resultLines = result.split('\n');
        const midPoint = Math.floor(resultLines.length / 2);
        optimized = resultLines.slice(0, midPoint).join('\n');
        analysisText = resultLines.slice(midPoint).join('\n');
      }
      
      setOptimizedJD(optimized || result);
      setAnalysis(analysisText || 'Comprehensive optimization analysis included in the optimized version.');
    } catch (error) {
      console.error('Error optimizing job description:', error);
      alert('Error optimizing job description. Please try again.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handlePredictPerformance = async () => {
    if (!originalJD.trim()) {
      alert('Please enter a job description first');
      return;
    }

    setIsPredicting(true);
    try {
      const prediction = await predictJobPostingPerformance(originalJD);
      setPerformancePrediction(prediction);
    } catch (error) {
      console.error('Error predicting performance:', error);
      alert('Error predicting performance. Please try again.');
    } finally {
      setIsPredicting(false);
    }
  };

  const copyOptimized = () => {
    navigator.clipboard.writeText(optimizedJD);
    alert('Optimized job description copied to clipboard!');
  };

  const downloadJD = () => {
    const content = `OPTIMIZED JOB DESCRIPTION\n\n${optimizedJD}\n\n\nANALYSIS & IMPROVEMENTS\n\n${analysis}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `optimized-job-description-${jobTitle.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Advanced Job Description Optimizer</h1>
      </div>

      <Tabs defaultValue="optimizer" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="optimizer">JD Optimizer</TabsTrigger>
          <TabsTrigger value="performance">Performance Predictor</TabsTrigger>
        </TabsList>

        <TabsContent value="optimizer" className="space-y-6">
          {/* Configuration Section */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description Configuration</CardTitle>
              <CardDescription>Provide context for comprehensive optimization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title *</Label>
                  <Input
                    id="job-title"
                    placeholder="e.g., Senior Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Industry *</Label>
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
                  <Label>Company Size *</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, Remote, Hybrid"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Target Experience Level *</Label>
                  <Select value={targetLevel} onValueChange={setTargetLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target level" />
                    </SelectTrigger>
                    <SelectContent>
                      {targetLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Original Job Description</CardTitle>
              <CardDescription>Paste your job description for AI-powered optimization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="original-jd">Job Description *</Label>
                <textarea
                  id="original-jd"
                  className="w-full p-3 border rounded-md resize-none"
                  rows={12}
                  placeholder="Paste your complete job description here..."
                  value={originalJD}
                  onChange={(e) => setOriginalJD(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleOptimize} 
                disabled={isOptimizing || !originalJD.trim() || !jobTitle.trim()}
                className="w-full"
              >
                {isOptimizing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Optimizing with AI...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Optimize Job Description
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          {optimizedJD && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Optimization Results</CardTitle>
                    <CardDescription>AI-enhanced job description with comprehensive improvements</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={copyOptimized}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadJD}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="comparison" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="comparison">Before & After</TabsTrigger>
                    <TabsTrigger value="optimized">Optimized Version</TabsTrigger>
                    <TabsTrigger value="analysis">Analysis & Insights</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="comparison" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2 text-red-600">Before (Original)</h3>
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200 max-h-96 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-sm text-gray-700">
                            {originalJD}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-green-600">After (Optimized)</h3>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200 max-h-96 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-sm text-gray-700">
                            {optimizedJD}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="optimized">
                    <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700">
                        {optimizedJD}
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="analysis">
                    <div className="bg-blue-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700">
                        {analysis}
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Posting Performance Predictor</CardTitle>
              <CardDescription>Analyze and predict job posting performance across platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="performance-jd">Job Description to Analyze</Label>
                <textarea
                  id="performance-jd"
                  className="w-full p-3 border rounded-md resize-none"
                  rows={8}
                  placeholder="Paste job description for performance analysis..."
                  value={originalJD}
                  onChange={(e) => setOriginalJD(e.target.value)}
                />
              </div>
              <Button
                onClick={handlePredictPerformance}
                disabled={isPredicting || !originalJD.trim()}
                className="w-full"
              >
                {isPredicting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Performance...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Predict Performance
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {performancePrediction && (
            <Card>
              <CardHeader>
                <CardTitle>Performance Prediction Results</CardTitle>
                <CardDescription>AI analysis of job posting effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">
                    {performancePrediction}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Optimization Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-600">SEO Optimization</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Include relevant keywords</li>
                <li>• Optimize for job board search</li>
                <li>• Use industry-standard terms</li>
                <li>• Location-based keywords</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-green-600">Inclusive Language</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Remove biased terms</li>
                <li>• Use gender-neutral language</li>
                <li>• Focus on skills over degrees</li>
                <li>• Accessibility compliance</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-purple-600">Attraction Factors</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Highlight growth opportunities</li>
                <li>• Emphasize company culture</li>
                <li>• Clear value proposition</li>
                <li>• Compelling benefits</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-orange-600">Performance Metrics</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Application volume prediction</li>
                <li>• Quality candidate ratio</li>
                <li>• Time-to-fill estimates</li>
                <li>• Platform optimization</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
