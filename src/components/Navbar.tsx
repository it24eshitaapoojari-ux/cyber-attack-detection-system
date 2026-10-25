import React from 'react';
import { Shield, Activity, BarChart3, Sliders, FileText, Info, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedModel: 'Random Forest' | 'Logistic Regression';
  setSelectedModel: (model: 'Random Forest' | 'Logistic Regression') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedModel,
  setSelectedModel
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'prediction', label: 'Traffic Prediction', icon: Activity },
    { id: 'simulator', label: 'Flow Simulator', icon: Sliders },
    { id: 'performance', label: 'Model Performance', icon: BarChart3 },
    { id: 'report', label: 'Project Report', icon: FileText },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 text-white">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">
                  AI Cyberattack Detection
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> UNSW-NB15
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Defensive Machine Learning Network-Flow Classifier
              </p>
            </div>
          </div>

          {/* Model Selector & Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
              <button
                type="button"
                onClick={() => setSelectedModel('Random Forest')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  selectedModel === 'Random Forest'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Random Forest (F1: 92.6%)
              </button>
              <button
                type="button"
                onClick={() => setSelectedModel('Logistic Regression')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  selectedModel === 'Logistic Regression'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Logistic Reg (F1: 89.1%)
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-900/60 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
