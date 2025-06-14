
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Clock, Users } from 'lucide-react';

export const EmailSupport: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Email Support</h1>
        <p className="text-lg text-gray-600">Get professional assistance via email</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Mail className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>24/7 Email Support</CardTitle>
            <CardDescription>
              Round-the-clock email assistance for all your HR questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Contact Support</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Clock className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Quick Response</CardTitle>
            <CardDescription>
              Get responses within 2-4 hours during business days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Response Times</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Expert Team</CardTitle>
            <CardDescription>
              Our HR experts are here to help with any challenges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Meet Our Team</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
