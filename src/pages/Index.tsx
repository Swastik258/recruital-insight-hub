
import { useState } from 'react';
import { Header } from '@/components/Header';
import { ResumeScreening } from '@/components/ResumeScreening';
import { InterviewQuestions } from '@/components/InterviewQuestions';
import { JobDescriptionOptimizer } from '@/components/JobDescriptionOptimizer';
import { PerformanceEvaluator } from '@/components/PerformanceEvaluator';
import { CandidateMatching } from '@/components/CandidateMatching';
import { TeamCollaboration } from '@/components/team/TeamCollaboration';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('resume');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'resume':
        return <ResumeScreening />;
      case 'interview':
        return <InterviewQuestions />;
      case 'job-description':
        return <JobDescriptionOptimizer />;
      case 'performance':
        return <PerformanceEvaluator />;
      case 'matching':
        return <CandidateMatching />;
      case 'team':
        return <TeamCollaboration />;
      default:
        return <ResumeScreening />;
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
