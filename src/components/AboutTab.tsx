import React, { useState } from 'react';
import { FEATURE_COLUMNS, FEATURE_DESCRIPTIONS } from '../data/modelsData';
import { ShieldCheck, AlertCircle, ExternalLink, BookOpen, Search } from 'lucide-react';

export const AboutTab: React.FC = () => {
  const [featureSearch, setFeatureSearch] = useState('');

  const filteredFeatures = FEATURE_COLUMNS.filter(f =>
    f.toLowerCase().includes(featureSearch.toLowerCase()) ||
    (FEATURE_DESCRIPTIONS[f] || '').toLowerCase().includes(featureSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          About the Cyberattack Detection System
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Technical specifications, dataset details, responsible use, and complete feature glossary.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <BookOpen className="w-4 h-4" /> Dataset &amp; Provenance
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The <strong>UNSW-NB15</strong> dataset was created by the Cyber Range Lab of UNSW Canberra using the IXIA PerfectStorm tool. It contains synthetic contemporary normal activities and nine attack families:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['Fuzzers', 'Analysis', 'Backdoors', 'DoS', 'Exploits', 'Generic', 'Reconnaissance', 'Shellcode', 'Worms'].map(cat => (
              <span key={cat} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 text-slate-300 border border-slate-800">
                {cat}
              </span>
            ))}
          </div>
          <div className="pt-2">
            <a
              href="https://research.unsw.edu.au/projects/unsw-nb15-dataset"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 underline"
            >
              Official UNSW-NB15 Dataset Repository <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <ShieldCheck className="w-4 h-4" /> Algorithms &amp; Architecture
          </div>
          <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <p>
              <strong>Random Forest:</strong> An ensemble of 150 randomized decision trees utilizing balanced bootstrap class weighting. Highly effective at capturing non-linear threshold relationships across TCP flags and connection rates.
            </p>
            <p>
              <strong>Logistic Regression:</strong> A convex linear classifier utilizing standardized feature scaling and L2 regularization as an interpretable baseline comparison.
            </p>
          </div>
        </div>
      </div>

      {/* Limitations & Ethical Guidance */}
      <div className="rounded-xl bg-amber-950/20 border border-amber-500/30 p-6 space-y-3 text-xs text-amber-200">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
          <AlertCircle className="w-4 h-4 text-amber-400" /> Important Limitations &amp; Ethical Defense Scope
        </div>
        <ul className="list-disc list-inside space-y-1.5 text-amber-200/90 pl-1 leading-relaxed">
          <li>
            <strong>Distribution Shift:</strong> A model trained on the UNSW-NB15 benchmark may not directly generalize to contemporary live enterprise networks without domain adaptation.
          </li>
          <li>
            <strong>Probabilistic Inference:</strong> Predictions can yield false positives (normal traffic marked as attack) or false negatives (stealthy intrusions bypassed).
          </li>
          <li>
            <strong>Offline Batch Scope:</strong> The application analyzes uploaded flow records; it does not capture live raw packets or replace a real-time production IDS/IPS sensor.
          </li>
          <li>
            <strong>Correlation vs Causation:</strong> High feature importance scores indicate model dependency, not necessarily causal intrusion factors.
          </li>
          <li>
            <strong>Authorized Use:</strong> This project is designed strictly for coursework, academic research, and defensive security analysis on authorized traffic.
          </li>
        </ul>
      </div>

      {/* 42 Features Glossary */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base text-white">UNSW-NB15 Feature Glossary (42 Inputs)</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive reference of all flow characteristics utilized by the classification pipelines.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search feature name or description..."
              value={featureSearch}
              onChange={(e) => setFeatureSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-56 sm:w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
          {filteredFeatures.map((feat) => (
            <div key={feat} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
              <span className="font-mono font-bold text-cyan-300 block mb-0.5">{feat}</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {FEATURE_DESCRIPTIONS[feat] || 'Network traffic flow parameter.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
