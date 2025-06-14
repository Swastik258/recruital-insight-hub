
import React from 'react';
import { FeatureCard } from './FeatureCard';

interface FeatureSelectorProps {
  onFeatureSelect: (feature: string) => void;
}

export const FeatureSelector: React.FC<FeatureSelectorProps> = ({ onFeatureSelect }) => {
  const features = [
    {
      key: 'resumeScreening',
      planKey: 'resume-screening',
      title: 'Resume Screening',
      description: 'AI-powered resume analysis and candidate screening',
      features: ['Automated resume parsing', 'Skill matching', 'Candidate ranking']
    },
    {
      key: 'interviewQuestions',
      planKey: 'interview-questions',
      title: 'Interview Questions',
      description: 'Generate tailored interview questions for any role',
      features: ['Role-specific questions', 'Difficulty levels', 'Answer guidelines']
    },
    {
      key: 'jobDescriptionOptimizer',
      planKey: 'job-description',
      title: 'Job Description Optimizer',
      description: 'Optimize job descriptions for better candidate attraction',
      features: ['SEO optimization', 'Language enhancement', 'Bias detection']
    },
    {
      key: 'performanceEvaluator',
      planKey: 'performance-evaluation',
      title: 'Performance Evaluation',
      description: 'Comprehensive employee performance assessment tools',
      features: ['360-degree feedback', 'Goal tracking', 'Performance analytics']
    },
    {
      key: 'candidateMatching',
      planKey: 'candidate-matching',
      title: 'Candidate Matching',
      description: 'Advanced AI matching between candidates and job openings',
      features: ['Smart matching algorithm', 'Compatibility scores', 'Recommendation engine']
    },
    {
      key: 'teamCollaboration',
      planKey: 'team-collaboration',
      title: 'Team Collaboration',
      description: 'Enhanced team collaboration and communication tools',
      features: ['Team workspaces', 'Real-time collaboration', 'Document sharing']
    },
    {
      key: 'calendarIntegration',
      planKey: 'calendar-integration',
      title: 'Calendar Integration',
      description: 'Seamless calendar management and scheduling',
      features: ['Event scheduling', 'Meeting coordination', 'Availability tracking']
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature) => (
        <FeatureCard
          key={feature.key}
          title={feature.title}
          description={feature.description}
          featureKey={feature.key}
          features={feature.features}
          onSelect={() => onFeatureSelect(feature.key)}
        />
      ))}
    </div>
  );
};
