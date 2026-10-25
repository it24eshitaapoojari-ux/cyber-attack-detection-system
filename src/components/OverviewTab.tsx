import React from 'react';
import { MODEL_METRICS, FEATURE_COLUMNS } from '../data/modelsData';
import { Cpu, Layers, Database, ShieldAlert, CheckCircle, ArrowRight, Zap, Target } from 'lucide-react';

interface OverviewTabProps {
  selectedModel: 'Random Forest' | 'Logistic Regression';
  onNavigateToPredict: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  selectedModel,
  onNavigateToPredict
}) => {
  const currentMetric = MODEL_METRICS.find(m => m.model === selectedModel) || MODEL_METRICS[1];

  const metricsComparison = [
    { label: 'Accuracy', rf: 90.47, lr: 86.39, desc: 'Overall correct classifications' },
    { label: 'Precision', rf: 98.73, lr: 98.43, desc: 'When flagged as attack, probability it is real' },
    { label: 'Recall', rf: 87.12, lr: 81.31, desc: 'Portion of actual attacks successfully captured' },
    { label: 'F1-Score', rf: 92.56, lr: 89.05, desc: 'Harmonic mean of precision and recall' },
    { label: 'ROC-AUC', rf: 98.29, lr: 97.81, desc: 'Area under receiver operating characteristic curve' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 p-6 sm:p-8">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
            <Zap className="w-3.5 h-3.5" /> UNSW-NB15 Benchmark Trained Prototype
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            AI-Based Cyberattack Detection System
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            A machine-learning defense platform for classifying labeled network-flow records.
            Engineered with a full defensive ML pipeline: robust feature imputation, categorical encoding,
            StandardScaler normalization, and dual model benchmark (Random Forest &amp; Logistic Regression).
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onNavigateToPredict}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25"
            >
              Analyze Network Traffic <ArrowRight className="w-4 h-4" />
            </button>
            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 bg-slate-800/80 border border-slate-700/60">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              175,341 Test Flows Evaluated
            </span>
          </div>
        </div>

        {/* Decorative Grid Glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Active Model</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{selectedModel}</div>
          <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400">
            <span className="font-semibold">F1-Score: {(currentMetric.f1_score * 100).toFixed(2)}%</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Accuracy: {(currentMetric.accuracy * 100).toFixed(2)}%</span>
          </div>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Input Features</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{FEATURE_COLUMNS.length} Features</div>
          <p className="mt-2 text-xs text-slate-400">
            42 flow metrics (duration, rates, TTLs, TCP handshake latency, connection frequencies)
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Models Evaluated</span>
            <Target className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{MODEL_METRICS.length} Algorithms</div>
          <p className="mt-2 text-xs text-slate-400">
            Random Forest (150 trees) vs. Balanced Logistic Regression
          </p>
        </div>
      </div>

      {/* Workflow Architecture Grid */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
        <h2 className="text-lg font-bold text-white mb-2">Defensive Machine Learning Pipeline</h2>
        <p className="text-sm text-slate-400 mb-6">
          This system implements a production-grade defensive workflow for network intrusion detection:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs font-bold mb-3">1</div>
            <h3 className="font-semibold text-sm text-slate-200 mb-1">Data Ingestion</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accepts network flows with feature alignment, auto-excluding target labels (`label`, `attack_cat`, `id`).
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs font-bold mb-3">2</div>
            <h3 className="font-semibold text-sm text-slate-200 mb-1">Preprocessing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Median SimpleImputer &amp; StandardScaler for numerics; frequent imputer &amp; OneHotEncoder for categoricals.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs font-bold mb-3">3</div>
            <h3 className="font-semibold text-sm text-slate-200 mb-1">Classification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Computes calibrated decision probability, predicting binary outcome (Normal vs Attack) with risk flags.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs font-bold mb-3">4</div>
            <h3 className="font-semibold text-sm text-slate-200 mb-1">Evaluation &amp; Export</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Computes confusion matrices, precision/recall analysis, class distribution charts, and exports full CSV reports.
            </p>
          </div>
        </div>
      </div>

      {/* Model Benchmark Comparison Table & Visualization */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Model Comparison on UNSW-NB15 Test Set</h2>
            <p className="text-xs text-slate-400 mt-1">
              Rigorous test-set benchmark on 175,341 unseen network flow records (56,000 Normal, 119,341 Attacks)
            </p>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-3">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-cyan-500 inline-block"></span> Random Forest (Best)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block"></span> Logistic Regression</span>
          </div>
        </div>

        {/* Visual Bar Comparison */}
        <div className="space-y-4 mb-8">
          {metricsComparison.map((item) => (
            <div key={item.label} className="bg-slate-950/60 rounded-lg p-3 border border-slate-800/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-200">{item.label}</span>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-cyan-400">RF: {item.rf.toFixed(2)}%</span>
                  <span className="text-indigo-400">LR: {item.lr.toFixed(2)}%</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                  <div
                    className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.rf}%` }}
                    title={`Random Forest: ${item.rf}%`}
                  />
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.lr}%` }}
                    title={`Logistic Regression: ${item.lr}%`}
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="py-3 px-4 font-semibold">Model Algorithm</th>
                <th className="py-3 px-4 font-semibold">Accuracy</th>
                <th className="py-3 px-4 font-semibold">Precision</th>
                <th className="py-3 px-4 font-semibold">Recall</th>
                <th className="py-3 px-4 font-semibold">F1-Score</th>
                <th className="py-3 px-4 font-semibold">ROC-AUC</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {MODEL_METRICS.map((row) => {
                const isSelected = row.model === selectedModel;
                const isBest = row.model === 'Random Forest';
                return (
                  <tr
                    key={row.model}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isSelected ? 'bg-cyan-950/20' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                      {row.model}
                      {isBest && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          Selected Model
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-200">{(row.accuracy * 100).toFixed(2)}%</td>
                    <td className="py-3 px-4 font-mono text-slate-200">{(row.precision * 100).toFixed(2)}%</td>
                    <td className="py-3 px-4 font-mono text-slate-200">{(row.recall * 100).toFixed(2)}%</td>
                    <td className="py-3 px-4 font-mono font-bold text-cyan-400">{(row.f1_score * 100).toFixed(2)}%</td>
                    <td className="py-3 px-4 font-mono text-slate-200">{(row.roc_auc * 100).toFixed(2)}%</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-xs">
                        <CheckCircle className="w-3.5 h-3.5" /> Trained &amp; Verified
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scope and Defensive Security Notice */}
      <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 flex items-start gap-4">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400 space-y-1">
          <p className="font-semibold text-slate-200 text-sm">Educational and Defensive Scope Notice</p>
          <p>
            This system operates as an offline batch analysis and simulation tool for network flow records.
            It does not sniff raw network packets or replace a real-time production Intrusion Detection System (IDS).
            Model predictions reflect patterns captured in the UNSW-NB15 benchmark and should be used responsibly for research and authorized coursework.
          </p>
        </div>
      </div>
    </div>
  );
};
