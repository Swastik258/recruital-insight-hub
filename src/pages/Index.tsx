
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
import { DashboardHome } from '@/components/DashboardHome';
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
        return <DashboardHome onFeatureSelect={handleFeatureSelect} />;
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
        return <DashboardHome onFeatureSelect={handleFeatureSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-7xl">
        <div className="animate-fade-in">
          {renderActiveSection()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
