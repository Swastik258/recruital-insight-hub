
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Performance optimization
import { optimizePerformance } from './utils/performance'

// Initialize performance optimizations
optimizePerformance();

createRoot(document.getElementById("root")!).render(<App />);
