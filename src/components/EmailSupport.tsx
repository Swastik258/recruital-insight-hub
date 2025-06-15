
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Mail, Send, Template, Users, Clock, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const EmailSupport: React.FC = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    body: '',
    template: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const emailTemplates = [
    {
      id: 'interview_invitation',
      name: 'Interview Invitation',
      subject: 'Interview Invitation - {position}',
      category: 'Interview',
      body: `Dear {candidate_name},

We were impressed with your application for the {position} role at {company_name}. We would like to invite you for an interview.

Interview Details:
- Date: {interview_date}
- Time: {interview_time}
- Location: {interview_location}
- Duration: Approximately {duration}

Please confirm your availability by replying to this email.

Best regards,
{interviewer_name}
{company_name} HR Team`
    },
    {
      id: 'job_offer',
      name: 'Job Offer',
      subject: 'Job Offer - {position} at {company_name}',
      category: 'Offer',
      body: `Dear {candidate_name},

Congratulations! We are pleased to offer you the position of {position} at {company_name}.

Offer Details:
- Position: {position}
- Start Date: {start_date}
- Salary: {salary}
- Benefits: {benefits}

Please review the attached offer letter and let us know your decision by {deadline}.

We look forward to welcoming you to our team!

Best regards,
{hiring_manager}
{company_name}`
    },
    {
      id: 'rejection_polite',
      name: 'Polite Rejection',
      subject: 'Thank you for your interest in {company_name}',
      category: 'Rejection',
      body: `Dear {candidate_name},

Thank you for your interest in the {position} position at {company_name} and for taking the time to interview with us.

After careful consideration, we have decided to move forward with another candidate whose experience more closely matches our current needs.

We were impressed with your qualifications and encourage you to apply for future opportunities that match your skills.

Thank you again for your time and interest in {company_name}.

Best regards,
{recruiter_name}
HR Team`
    },
    {
      id: 'follow_up',
      name: 'Follow-up Email',
      subject: 'Following up on your application - {position}',
      category: 'Follow-up',
      body: `Dear {candidate_name},

I hope this email finds you well. I wanted to follow up on your application for the {position} role at {company_name}.

We are currently reviewing applications and expect to begin the interview process on {timeline}. We will contact you within the next {time_frame} with an update on your application status.

Thank you for your patience and continued interest in {company_name}.

Best regards,
{recruiter_name}
{company_name} HR Team`
    },
    {
      id: 'welcome_employee',
      name: 'Welcome New Employee',
      subject: 'Welcome to {company_name}!',
      category: 'Onboarding',
      body: `Dear {employee_name},

Welcome to {company_name}! We are excited to have you join our team as {position}.

First Day Information:
- Start Date: {start_date}
- Start Time: {start_time}
- Location: {office_address}
- Contact Person: {contact_person} - {contact_email}

What to Bring:
- Valid ID for I-9 verification
- Banking information for direct deposit
- Any signed paperwork from your offer package

We look forward to working with you!

Best regards,
{hr_manager}
HR Team`
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setEmailData({
        ...emailData,
        subject: template.subject,
        body: template.body,
        template: templateId
      });
    }
  };

  const handleSendEmail = async () => {
    if (!emailData.to || !emailData.subject || !emailData.body) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate email sending
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Email Sent Successfully",
        description: `Email sent to ${emailData.to}`,
      });
      
      // Reset form
      setEmailData({
        to: '',
        subject: '',
        body: '',
        template: ''
      });
      setSelectedTemplate('');
    }, 2000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Interview':
        return 'bg-blue-100 text-blue-800';
      case 'Offer':
        return 'bg-green-100 text-green-800';
      case 'Rejection':
        return 'bg-red-100 text-red-800';
      case 'Follow-up':
        return 'bg-yellow-100 text-yellow-800';
      case 'Onboarding':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Mail className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Email Support</h1>
            <p className="opacity-90">Professional email templates for HR communications</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Template className="h-5 w-5" />
              <span>Email Templates</span>
            </CardTitle>
            <CardDescription>
              Choose from professionally crafted email templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emailTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{template.name}</h3>
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{template.subject}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Email Composer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="h-5 w-5" />
              <span>Compose Email</span>
            </CardTitle>
            <CardDescription>
              Customize and send your email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                type="email"
                placeholder="recipient@example.com"
                value={emailData.to}
                onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Email subject"
                value={emailData.subject}
                onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Email Body</Label>
              <Textarea
                id="body"
                placeholder="Compose your email..."
                value={emailData.body}
                onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                rows={12}
                className="resize-none"
              />
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={handleSendEmail} 
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Email
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span>Email Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-600">Emails Sent</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-sm text-gray-600">Delivery Rate</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">78%</div>
              <div className="text-sm text-gray-600">Open Rate</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2.1s</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
