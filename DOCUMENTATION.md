
# HRBoost AI - Complete Documentation

## Overview
HRBoost AI is a comprehensive HR automation platform built with React, TypeScript, and Supabase, featuring AI-powered tools for recruitment, performance evaluation, and HR management.

## Architecture

### Frontend Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/UI** - Component library
- **React Router** - Navigation
- **TanStack Query** - Data fetching
- **Supabase** - Backend services

### Backend Services
- **Supabase** - Database, Authentication, Edge Functions
- **Gemini AI API** - AI-powered features
- **PostgreSQL** - Database

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn UI components
│   ├── home/            # Homepage components
│   ├── team/            # Team management
│   └── calendar/        # Calendar features
├── pages/               # Route components
├── hooks/               # Custom React hooks
├── contexts/            # React contexts
├── utils/               # Utility functions
└── integrations/        # Third-party integrations
```

## Key Features

### 1. Resume Screening (`src/components/ResumeScreening.tsx`)
- AI-powered resume analysis
- Candidate scoring and ranking
- ATS optimization insights
- Bulk resume processing

### 2. Interview Questions (`src/components/InterviewQuestions.tsx`)
- Behavioral question generation
- Technical question sets
- Role-specific customization
- Interview scoring guides

### 3. Job Description Optimizer (`src/components/JobDescriptionOptimizer.tsx`)
- SEO optimization
- Bias detection and removal
- Keyword integration
- Performance prediction

### 4. Performance Evaluator (`src/components/PerformanceEvaluator.tsx`)
- 360-degree feedback synthesis
- Goal achievement tracking
- Development recommendations
- Performance scoring

### 5. Candidate Matching (`src/components/CandidateMatching.tsx`)
- Multi-dimensional matching
- Cultural fit prediction
- Skill gap analysis
- Interview prioritization

## Configuration Files

### Environment Setup
No .env files are used. Configuration is handled through:
- Supabase integration settings
- Runtime environment variables
- Edge function secrets

### Performance Optimization (`src/utils/performance.ts`)
```typescript
// Web Vitals monitoring
// Resource preloading
// Cache optimization
// Bundle splitting
```

### Image Optimization (`src/utils/imageOptimization.ts`)
```typescript
// Lazy loading implementation
// Image compression
// Format optimization
// Preloading strategies
```

### Code Splitting (`src/utils/codeSplitting.ts`)
```typescript
// Route-based splitting
// Component lazy loading
// Error boundaries
// Preloading strategies
```

## API Integration

### Gemini AI API (`src/utils/geminiApi.ts`)
- Centralized API handling
- Error handling and retries
- Rate limiting
- Response caching

Key functions:
- `analyzeResume()` - Resume analysis
- `generateBehavioralQuestions()` - Interview questions
- `optimizeJobDescriptionAdvanced()` - Job posting optimization
- `matchCandidatesAdvanced()` - Candidate matching

## Authentication & Authorization

### Auth Context (`src/contexts/AuthContext.tsx`)
- Supabase authentication
- User session management
- Protected routes
- Role-based access

### Subscription Management (`src/hooks/useSubscription.tsx`)
- Feature access control
- Plan management
- Usage tracking
- Upgrade flows

## Database Schema

### Core Tables
- `profiles` - User profiles
- `subscriptions` - Subscription data
- `teams` - Team management
- `job_openings` - Job postings
- `candidates` - Candidate data

## Performance Features

### Web Performance
- **Core Web Vitals** monitoring
- **Resource preloading** for critical assets
- **Service Worker** for caching
- **Image optimization** with lazy loading
- **Code splitting** for reduced bundle size

### Caching Strategy
- Browser caching for static assets
- Service Worker for offline functionality
- API response caching
- Image optimization and compression

## Security Features

- Authentication via Supabase
- Row Level Security (RLS)
- API key protection
- CORS configuration
- Input validation

## Development Guidelines

### Component Creation
1. Create focused, single-responsibility components
2. Use TypeScript for type safety
3. Implement proper error boundaries
4. Follow accessibility guidelines

### State Management
- React Context for global state
- TanStack Query for server state
- Local state for component-specific data

### Styling Guidelines
- Use Tailwind CSS utility classes
- Leverage Shadcn/UI components
- Maintain consistent design system
- Implement responsive design

## Deployment

### Build Process
```bash
npm run build
```

### Environment Variables
Configure in Supabase dashboard:
- `GEMINI_API_KEY` - For AI features
- Database connection strings (auto-configured)

### Performance Monitoring
- Web Vitals tracking
- Error monitoring
- Usage analytics
- Performance metrics

## API Documentation

### Core Endpoints
All API calls go through Supabase Edge Functions:

#### Resume Analysis
```typescript
const result = await analyzeResume(resumeText, jobRequirements);
```

#### Interview Questions
```typescript
const questions = await generateBehavioralQuestions(
  jobTitle, 
  industry, 
  experienceLevel,
  companySize,
  companyCulture
);
```

#### Job Optimization
```typescript
const optimized = await optimizeJobDescriptionAdvanced(
  jobDescription,
  jobTitle,
  industry,
  companySize,
  location,
  targetLevel
);
```

## Testing Strategy

### Unit Testing
- Component testing with React Testing Library
- Hook testing
- Utility function testing

### Integration Testing
- API integration tests
- Authentication flow tests
- Feature workflow tests

## Monitoring & Analytics

### Performance Tracking
- Core Web Vitals
- Load times
- Error rates
- User interactions

### Business Metrics
- Feature usage
- Conversion rates
- User engagement
- Subscription metrics

## Future Enhancements

### Planned Features
1. Advanced analytics dashboard
2. Mobile application
3. Third-party integrations (Slack, Teams)
4. Advanced AI models
5. Multi-language support

### Technical Improvements
1. Enhanced caching strategies
2. Progressive Web App features
3. Advanced security measures
4. Performance optimizations

## Troubleshooting

### Common Issues
1. **API Rate Limits** - Implement retry logic
2. **Performance Issues** - Check bundle size and lazy loading
3. **Authentication Problems** - Verify Supabase configuration
4. **Build Errors** - Check TypeScript types and imports

### Debug Tools
- Browser DevTools
- React Developer Tools
- Supabase logs
- Performance profiler

## Maintenance

### Regular Tasks
1. Update dependencies
2. Monitor performance metrics
3. Review and optimize API usage
4. Update documentation
5. Security audits

### Code Quality
- ESLint configuration
- TypeScript strict mode
- Code formatting with Prettier
- Regular code reviews

## Support & Resources

### Documentation Links
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/UI](https://ui.shadcn.com)

### Community
- GitHub repository
- Discord community
- Stack Overflow tags

This documentation provides a comprehensive overview of the HRBoost AI platform architecture, features, and development guidelines for future maintenance and enhancements.
