
import { useState } from 'react';
import { Header } from '@/components/Header';
import { ResumeScreening } from '@/components/ResumeScreening';
import { InterviewQuestions } from '@/components/InterviewQuestions';
import { JobDescriptionOptimizer } from '@/components/JobDescriptionOptimizer';
import { PerformanceEvaluator } from '@/components/PerformanceEvaluator';
import { CandidateMatching } from '@/components/CandidateMatching';
import { TeamCollaboration } from '@/components/team/TeamCollaboration';
import { CalendarIntegration } from '@/components/calendar/CalendarIntegration';
import { EmailSupport } from '@/components/EmailSupport';
import { BasicAnalytics } from '@/components/BasicAnalytics';
import { PrioritySupport } from '@/components/PrioritySupport';
import { AdvancedAnalytics } from '@/components/AdvancedAnalytics';
import { ApiAccess } from '@/components/ApiAccess';
import { FeaturePaywall } from '@/components/FeaturePaywall';
import { FeatureSelector } from '@/components/FeatureSelector';
import { Footer } from '@/components/Footer';
import { useSubscription } from '@/hooks/useSubscription';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { subscription } = useSubscription();

  const handleFeatureSelect = (feature: string) => {
    setActiveSection(feature);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                HR Management Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Choose the features you need and pay only for what you use
              </p>
            </div>
            <FeatureSelector onFeatureSelect={handleFeatureSelect} />
          </div>
        );
      case 'resumeScreening':
        return (
          <FeaturePaywall 
            feature="Resume Screening" 
            featureKey="resumeScreening"
          >
            <ResumeScreening />
          </FeaturePaywall>
        );
      case 'interviewQuestions':
        return (
          <FeaturePaywall 
            feature="Interview Questions" 
            featureKey="interviewQuestions"
          >
            <InterviewQuestions />
          </FeaturePaywall>
        );
      case 'jobDescriptionOptimizer':
        return (
          <FeaturePaywall 
            feature="Job Description Optimizer" 
            featureKey="jobDescriptionOptimizer"
          >
            <JobDescriptionOptimizer />
          </FeaturePaywall>
        );
      case 'performanceEvaluator':
        return (
          <FeaturePaywall 
            feature="Performance Evaluation" 
            featureKey="performanceEvaluator"
          >
            <PerformanceEvaluator />
          </FeaturePaywall>
        );
      case 'candidateMatching':
        return (
          <FeaturePaywall 
            feature="Candidate Matching" 
            featureKey="candidateMatching"
          >
            <CandidateMatching />
          </FeaturePaywall>
        );
      case 'teamCollaboration':
        return (
          <FeaturePaywall 
            feature="Team Collaboration" 
            featureKey="teamCollaboration"
          >
            <TeamCollaboration />
          </FeaturePaywall>
        );
      case 'calendarIntegration':
        return (
          <FeaturePaywall 
            feature="Calendar Integration" 
            featureKey="calendarIntegration"
          >
            <CalendarIntegration />
          </FeaturePaywall>
        );
      case 'emailSupport':
        return (
          <FeaturePaywall 
            feature="Email Support" 
            featureKey="emailSupport"
          >
            <EmailSupport />
          </FeaturePaywall>
        );
      case 'basicAnalytics':
        return (
          <FeaturePaywall 
            feature="Basic Analytics" 
            featureKey="basicAnalytics"
          >
            <BasicAnalytics />
          </FeaturePaywall>
        );
      case 'prioritySupport':
        return (
          <FeaturePaywall 
            feature="Priority Support" 
            featureKey="prioritySupport"
          >
            <PrioritySupport />
          </FeaturePaywall>
        );
      case 'advancedAnalytics':
        return (
          <FeaturePaywall 
            feature="Advanced Analytics" 
            featureKey="advancedAnalytics"
          >
            <AdvancedAnalytics />
          </FeaturePaywall>
        );
      case 'apiAccess':
        return (
          <FeaturePaywall 
            feature="API Access" 
            featureKey="apiAccess"
          >
            <ApiAccess />
          </FeaturePaywall>
        );
      default:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                HR Management Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Choose the features you need and pay only for what you use
              </p>
            </div>
            <FeatureSelector onFeatureSelect={handleFeatureSelect} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="container mx-auto px-4 py-8">
        {renderActiveSection()}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
