import React, { useState } from 'react';
import {
  MODEL_METRICS,
  CONFUSION_MATRICES,
  CLASSIFICATION_REPORTS,
  FEATURE_IMPORTANCE_LIST
} from '../data/modelsData';
import { downloadFile } from '../utils/csvParser';
import { Download, SlidersHorizontal, Info } from 'lucide-react';

export const ModelPerformanceTab: React.FC = () => {
  const [selectedCMModel, setSelectedCMModel] = useState<string>('Random Forest');
  const [featureLimit, setFeatureLimit] = useState<number>(20);
  const [featureSortAsc, setFeatureSortAsc] = useState<boolean>(false);

  // Handle Download Reports
  const handleDownloadReports = () => {
    downloadFile(
      JSON.stringify(CLASSIFICATION_REPORTS, null, 2),
      'classification_reports.json',
      'application/json'
    );
  };

  // Handle Download Feature Importance
  const handleDownloadImportance = () => {
    const csvRows = ['feature,importance'];
    FEATURE_IMPORTANCE_LIST.forEach(f => {
      csvRows.push(`${f.rawFeature},${f.importance}`);
    });
    downloadFile(csvRows.join('\n'), 'feature_importance.csv', 'text/csv');
  };

  const cmData = CONFUSION_MATRICES[selectedCMModel] || CONFUSION_MATRICES['Random Forest'];
  const cmTotal = cmData.tn + cmData.fp + cmData.fn + cmData.tp;

  // Sorted and limited features
  const sortedFeatures = [...FEATURE_IMPORTANCE_LIST]
    .sort((a, b) => (featureSortAsc ? a.importance - b.importance : b.importance - a.importance))
    .slice(0, featureLimit);

  const maxImportance = Math.max(...FEATURE_IMPORTANCE_LIST.map(f => f.importance));

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Model Evaluation &amp; Performance Benchmarks
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Comparative analysis between Random Forest (Ensemble) and Logistic Regression on the test set of 175,341 records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadReports}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Classification Reports (JSON)
          </button>
          <button
            onClick={handleDownloadImportance}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Feature Importance (CSV)
          </button>
        </div>
      </div>

      {/* Model Benchmark Summary Table */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <h3 className="font-bold text-sm text-white uppercase tracking-wider">
          Standardized Metrics on UNSW-NB15 Test Set
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950">
                <th className="py-3 px-4 font-semibold">Model</th>
                <th className="py-3 px-4 font-semibold">Accuracy</th>
                <th className="py-3 px-4 font-semibold">Precision</th>
                <th className="py-3 px-4 font-semibold">Recall</th>
                <th className="py-3 px-4 font-semibold">F1-Score</th>
                <th className="py-3 px-4 font-semibold">ROC-AUC</th>
                <th className="py-3 px-4 font-semibold">Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {MODEL_METRICS.map((m) => {
                const isRF = m.model === 'Random Forest';
                return (
                  <tr key={m.model} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-white font-sans flex items-center gap-2">
                      {m.model}
                      {isRF && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          Primary
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-200">{(m.accuracy * 100).toFixed(2)}%</td>
                    <td className="py-3 px-4 text-slate-200">{(m.precision * 100).toFixed(2)}%</td>
                    <td className="py-3 px-4 text-slate-200">{(m.recall * 100).toFixed(2)}%</td>
                    <td className="py-3 px-4 font-bold text-cyan-400">{(m.f1_score * 100).toFixed(2)}%</td>
                    <td className="py-3 px-4 text-slate-200">{(m.roc_auc * 100).toFixed(2)}%</td>
                    <td className="py-3 px-4 font-sans text-xs text-slate-400">
                      {isRF
                        ? '+5.81% higher recall capturing stealthy exploits'
                        : 'Faster inference, convex convergence'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confusion Matrix Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                Confusion Matrix: {selectedCMModel}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluated against 175,341 actual test samples (56,000 Normal, 119,341 Attacks)
              </p>
            </div>

            <div className="flex rounded-lg bg-slate-950 border border-slate-800 p-1 text-xs">
              <button
                type="button"
                onClick={() => setSelectedCMModel('Random Forest')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  selectedCMModel === 'Random Forest'
                    ? 'bg-cyan-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Random Forest
              </button>
              <button
                type="button"
                onClick={() => setSelectedCMModel('Logistic Regression')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  selectedCMModel === 'Logistic Regression'
                    ? 'bg-cyan-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Logistic Regression
              </button>
            </div>
          </div>

          {/* Heatmap Visual Matrix */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
            <div className="grid grid-cols-3 gap-3 text-center items-center">
              {/* Header col */}
              <div></div>
              <div className="text-xs font-semibold text-slate-300 py-1">Predicted Normal</div>
              <div className="text-xs font-semibold text-slate-300 py-1">Predicted Attack</div>

              {/* Row 1: Actual Normal */}
              <div className="text-xs font-semibold text-slate-300 text-right pr-2">Actual Normal</div>
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 transition-all">
                <span className="text-xs font-mono text-emerald-400 font-semibold block">True Negative (TN)</span>
                <span className="text-2xl font-black font-mono text-white mt-1 block">
                  {cmData.tn.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400">
                  {((cmData.tn / (cmData.tn + cmData.fp)) * 100).toFixed(2)}% of Normal traffic
                </span>
              </div>
              <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 transition-all">
                <span className="text-xs font-mono text-amber-400 font-semibold block">False Positive (FP)</span>
                <span className="text-2xl font-black font-mono text-amber-300 mt-1 block">
                  {cmData.fp.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400">
                  {((cmData.fp / (cmData.tn + cmData.fp)) * 100).toFixed(2)}% false alarms
                </span>
              </div>

              {/* Row 2: Actual Attack */}
              <div className="text-xs font-semibold text-slate-300 text-right pr-2">Actual Attack</div>
              <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-4 transition-all">
                <span className="text-xs font-mono text-rose-400 font-semibold block">False Negative (FN)</span>
                <span className="text-2xl font-black font-mono text-rose-300 mt-1 block">
                  {cmData.fn.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400">
                  {((cmData.fn / (cmData.fn + cmData.tp)) * 100).toFixed(2)}% missed attacks
                </span>
              </div>
              <div className="bg-cyan-950/40 border border-cyan-500/40 rounded-xl p-4 transition-all">
                <span className="text-xs font-mono text-cyan-400 font-semibold block">True Positive (TP)</span>
                <span className="text-2xl font-black font-mono text-cyan-200 mt-1 block">
                  {cmData.tp.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400">
                  {((cmData.tp / (cmData.fn + cmData.tp)) * 100).toFixed(2)}% attack recall
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Confusion Matrix Analysis Cards */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">
              Diagnostic Insights ({selectedCMModel})
            </h4>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Overall Accuracy:</span>
                  <span className="font-mono font-bold text-white">
                    {(((cmData.tp + cmData.tn) / cmTotal) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {(cmData.tp + cmData.tn).toLocaleString()} of {cmTotal.toLocaleString()} correctly classified
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">False Positive Rate (FPR):</span>
                  <span className="font-mono font-bold text-amber-400">
                    {((cmData.fp / (cmData.tn + cmData.fp)) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Remarkably low: Only {cmData.fp.toLocaleString()} legitimate flows flagged as attacks
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Attack Detection Rate (Recall):</span>
                  <span className="font-mono font-bold text-cyan-400">
                    {((cmData.tp / (cmData.tp + cmData.fn)) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {cmData.tp.toLocaleString()} malicious threats identified
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 text-xs text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Random Forest achieves a higher recall (+5.8%) than Logistic Regression because tree ensembles capture nonlinear interactions between connection state <code className="text-cyan-300">state_INT</code> and connection recurrence <code className="text-cyan-300">ct_dst_src_ltm</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Importance Section */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              Top Random Forest Feature Importances
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Ranked Gini importance scores extracted from the fitted 150-tree Random Forest pipeline.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Show:</span>
              <select
                value={featureLimit}
                onChange={(e) => setFeatureLimit(Number(e.target.value))}
                className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white"
              >
                <option value={10}>Top 10</option>
                <option value={20}>Top 20</option>
                <option value={30}>Top 30</option>
              </select>
            </div>

            <button
              onClick={() => setFeatureSortAsc(!featureSortAsc)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              {featureSortAsc ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>

        {/* Feature Importance Bars */}
        <div className="space-y-3">
          {sortedFeatures.map((item, idx) => {
            const pct = (item.importance / maxImportance) * 100;
            return (
              <div key={item.feature} className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/60">
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 text-right font-mono text-slate-500 font-semibold">{idx + 1}.</span>
                    <span className="font-mono font-bold text-cyan-300">{item.feature}</span>
                    {item.description && (
                      <span className="text-[11px] text-slate-400 hidden sm:inline">— {item.description}</span>
                    )}
                  </div>
                  <span className="font-mono font-bold text-white text-xs">
                    {(item.importance * 100).toFixed(3)}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
