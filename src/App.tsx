import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewTab } from './components/OverviewTab';
import { PredictionTab } from './components/PredictionTab';
import { SingleFlowTester } from './components/SingleFlowTester';
import { ModelPerformanceTab } from './components/ModelPerformanceTab';
import { ReportTab } from './components/ReportTab';
import { AboutTab } from './components/AboutTab';
import { Shield, ExternalLink } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedModel, setSelectedModel] = useState<'Random Forest' | 'Logistic Regression'>('Random Forest');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'overview' && (
          <OverviewTab
            selectedModel={selectedModel}
            onNavigateToPredict={() => setActiveTab('prediction')}
          />
        )}

        {activeTab === 'prediction' && (
          <PredictionTab selectedModel={selectedModel} />
        )}

        {activeTab === 'simulator' && (
          <SingleFlowTester selectedModel={selectedModel} />
        )}

        {activeTab === 'performance' && (
          <ModelPerformanceTab />
        )}

        {activeTab === 'report' && (
          <ReportTab />
        )}

        {activeTab === 'about' && (
          <AboutTab />
        )}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Shield className="w-4 h-4 text-cyan-500" />
            <span>AI-Based Cyberattack Detection System &copy; 2026</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>UNSW-NB15 Benchmark Dataset</span>
            <span>•</span>
            <a
              href="https://research.unsw.edu.au/projects/unsw-nb15-dataset"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
            >
              UNSW Canberra <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
