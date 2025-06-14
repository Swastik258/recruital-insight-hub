
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Key, Book, Webhook } from 'lucide-react';

export const ApiAccess: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">API Access</h1>
        <p className="text-lg text-gray-600">Integrate our HR tools with your existing systems</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-6 w-6 text-blue-600" />
              <CardTitle>API Keys</CardTitle>
            </div>
            <CardDescription>
              Generate and manage your API keys for secure access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-mono">hr_live_sk_1234567890abcdef</p>
              <Badge variant="secondary" className="mt-1">Active</Badge>
            </div>
            <Button className="w-full">Generate New Key</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Book className="h-6 w-6 text-green-600" />
              <CardTitle>Documentation</CardTitle>
            </div>
            <CardDescription>
              Comprehensive API documentation and examples
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">• REST API endpoints</p>
              <p className="text-sm">• Code examples</p>
              <p className="text-sm">• Authentication guides</p>
              <p className="text-sm">• Rate limiting info</p>
            </div>
            <Button variant="outline" className="w-full">View Docs</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code className="h-6 w-6 text-purple-600" />
              <CardTitle>Code Examples</CardTitle>
            </div>
            <CardDescription>
              Ready-to-use code snippets in multiple languages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-gray-900 text-green-400 rounded-lg text-sm font-mono">
              <p>curl -X GET \</p>
              <p>&nbsp;&nbsp;"https://api.hr-tool.com/v1/candidates" \</p>
              <p>&nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY"</p>
            </div>
            <Button variant="outline" className="w-full">More Examples</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Webhook className="h-6 w-6 text-orange-600" />
              <CardTitle>Webhooks</CardTitle>
            </div>
            <CardDescription>
              Real-time notifications for your integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">• Candidate applications</p>
              <p className="text-sm">• Interview scheduling</p>
              <p className="text-sm">• Status updates</p>
              <p className="text-sm">• Performance events</p>
            </div>
            <Button variant="outline" className="w-full">Configure Webhooks</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
