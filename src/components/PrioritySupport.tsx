
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Phone, MessageCircle, Calendar } from 'lucide-react';

export const PrioritySupport: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Priority Support</h1>
        <p className="text-lg text-gray-600">Get premium assistance when you need it most</p>
      </div>

      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-600" />
            <CardTitle className="text-yellow-800">Priority Access</CardTitle>
            <Badge variant="secondary" className="bg-yellow-200 text-yellow-800">VIP</Badge>
          </div>
          <CardDescription className="text-yellow-700">
            Skip the queue and get immediate attention from our support team
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Phone className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Direct Phone Line</CardTitle>
            <CardDescription>
              Access our dedicated priority support phone line
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Call Now</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MessageCircle className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Priority Chat</CardTitle>
            <CardDescription>
              Get instant responses through our priority chat system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Calendar className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Scheduled Consultations</CardTitle>
            <CardDescription>
              Book one-on-one sessions with our HR experts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Schedule Session</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>Emergency Support</CardTitle>
            <CardDescription>
              24/7 emergency assistance for critical HR issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="w-full">Emergency Contact</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
