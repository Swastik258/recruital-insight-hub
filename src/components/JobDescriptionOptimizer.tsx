
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Loader2, Copy, Download } from 'lucide-react';
import { optimizeJobDescription } from '@/utils/geminiApi';

export const JobDescriptionOptimizer = () => {
  const [originalJD, setOriginalJD] = useState('');
  const [optimizedJD, setOptimizedJD] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = async () => {
    if (!originalJD.trim()) {
      alert('Please enter a job description to optimize');
      return;
    }

    setIsOptimizing(true);
    try {
      const result = await optimizeJobDescription(originalJD);
      
      // Parse the result to extract optimized JD and analysis
      const sections = result.split('\n\n');
      let optimized = '';
      let analysisText = '';
      
      // Simple parsing - in production, you'd want more sophisticated parsing
      const optimizedSection = sections.find(s => s.toLowerCase().includes('optimized'));
      const analysisSection = sections.find(s => s.toLowerCase().includes('improvement') || s.toLowerCase().includes('analysis'));
      
      if (optimizedSection) {
        optimized = optimizedSection.replace(/^.*optimized.*?:/i, '').trim();
      }
      if (analysisSection) {
        analysisText = analysisSection;
      }
      
      // If parsing fails, use the full result
      if (!optimized) {
        optimized = result;
        analysisText = 'AI analysis included in the optimized version above.';
      }
      
      setOptimizedJD(optimized);
      setAnalysis(analysisText);
    } catch (error) {
      console.error('Error optimizing job description:', error);
      alert('Error optimizing job description. Please try again.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const copyOptimized = () => {
    navigator.clipboard.writeText(optimizedJD);
    alert('Optimized job description copied to clipboard!');
  };

  const downloadJD = () => {
    const content = `OPTIMIZED JOB DESCRIPTION\n\n${optimizedJD}\n\n\nANALYSIS\n\n${analysis}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-job-description.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Job Description Optimizer</h1>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Original Job Description</CardTitle>
          <CardDescription>Paste your job description below for AI-powered optimization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="original-jd">Job Description</Label>
            <textarea
              id="original-jd"
              className="w-full p-3 border rounded-md resize-none"
              rows={10}
              placeholder="Paste your job description here..."
              value={originalJD}
              onChange={(e) => setOriginalJD(e.target.value)}
            />
          </div>
          <Button onClick={handleOptimize} disabled={isOptimizing || !originalJD.trim()}>
            {isOptimizing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Optimize with AI
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
                <CardDescription>AI-enhanced job description with improvements</CardDescription>
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
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
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
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">
                    {optimizedJD}
                  </pre>
                </div>
              </TabsContent>
              
              <TabsContent value="analysis">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">
                    {analysis}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Optimization Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-600">SEO Optimization</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Include relevant keywords</li>
                <li>• Optimize for job board search</li>
                <li>• Use industry-standard terms</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-green-600">Inclusive Language</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Remove biased terms</li>
                <li>• Use gender-neutral language</li>
                <li>• Focus on skills over degrees</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-purple-600">Attraction Factors</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Highlight growth opportunities</li>
                <li>• Emphasize company culture</li>
                <li>• Clear value proposition</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
