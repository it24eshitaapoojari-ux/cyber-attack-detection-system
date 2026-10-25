import React, { useState, useMemo } from 'react';
import { SAMPLE_DATASETS } from '../data/sampleFlows';
import { parseCSV, exportPredictionsToCSV, downloadFile } from '../utils/csvParser';
import { evaluateBatch } from '../utils/mlEngine';
import { NetworkFlowRecord, PredictionResult, BatchEvaluationSummary } from '../types/cybersecurity';
import {
  UploadCloud,
  FileSpreadsheet,
  Download,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Database
} from 'lucide-react';

interface PredictionTabProps {
  selectedModel: 'Random Forest' | 'Logistic Regression';
}

export const PredictionTab: React.FC<PredictionTabProps> = ({ selectedModel }) => {
  // Pre-load with the mixed sample dataset by default
  const [currentRecords, setCurrentRecords] = useState<NetworkFlowRecord[]>(SAMPLE_DATASETS[0].data);
  const [datasetName, setDatasetName] = useState<string>(SAMPLE_DATASETS[0].name);
  const [isCustomUpload, setIsCustomUpload] = useState<boolean>(false);
  const [missingFeaturesWarning, setMissingFeaturesWarning] = useState<string[]>([]);
  const [extraColumnsNotice, setExtraColumnsNotice] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [classFilter, setClassFilter] = useState<'ALL' | 'Attack' | 'Normal'>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRecordDetail, setSelectedRecordDetail] = useState<PredictionResult | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  const pageSize = 10;

  // Run ML inference
  const { predictions, summary }: { predictions: PredictionResult[]; summary: BatchEvaluationSummary } = useMemo(() => {
    return evaluateBatch(currentRecords, selectedModel);
  }, [currentRecords, selectedModel]);

  // Handle CSV file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParseError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const result = parseCSV(text);
        if (result.records.length === 0) {
          throw new Error('The uploaded CSV contains no valid records.');
        }
        setCurrentRecords(result.records);
        setDatasetName(file.name);
        setIsCustomUpload(true);
        setMissingFeaturesWarning(result.missingFeatures);
        setExtraColumnsNotice(result.extraColumns);
        setCurrentPage(1);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to parse CSV file.';
        setParseError(`Could not process this file: ${message}. Check that the CSV is valid and contains network-flow features.`);
      }
    };
    reader.readAsText(file);
  };

  // Switch to one of the built-in sample datasets
  const handleSelectSample = (sampleId: string) => {
    const sample = SAMPLE_DATASETS.find(s => s.id === sampleId);
    if (!sample) return;
    setCurrentRecords(sample.data);
    setDatasetName(sample.name);
    setIsCustomUpload(false);
    setMissingFeaturesWarning([]);
    setExtraColumnsNotice([]);
    setCurrentPage(1);
    setParseError(null);
  };

  // Handle Export CSV
  const handleExportCSV = () => {
    const csvData = exportPredictionsToCSV(predictions);
    downloadFile(csvData, 'cyberattack_predictions.csv', 'text/csv');
  };

  // Filtered predictions
  const filteredPredictions = useMemo(() => {
    return predictions.filter((p) => {
      if (classFilter !== 'ALL' && p.predictedClass !== classFilter) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      const r = p.record;
      return (
        String(r.id || '').toLowerCase().includes(q) ||
        String(r.proto || '').toLowerCase().includes(q) ||
        String(r.service || '').toLowerCase().includes(q) ||
        String(r.state || '').toLowerCase().includes(q) ||
        String(r.attack_cat || '').toLowerCase().includes(q) ||
        p.topRiskFactors.some(rf => rf.toLowerCase().includes(q))
      );
    });
  }, [predictions, classFilter, searchQuery]);

  const totalPages = Math.ceil(filteredPredictions.length / pageSize) || 1;
  const paginatedPredictions = filteredPredictions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header and Scope Description */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Network Traffic Flow Prediction
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Upload network-flow CSV records or select UNSW-NB15 test flow batches. The model automatically aligns columns
          to the 42 trained features, handling missing or extra fields.
        </p>
      </div>

      {/* Dataset Selection & File Upload Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sample Datasets Selector */}
        <div className="lg:col-span-2 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" /> Pre-Configured Flow Batches
            </span>
            <span className="text-xs text-cyan-400 font-medium">Ready to test in 1-click</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SAMPLE_DATASETS.map((sample) => {
              const isSelected = datasetName === sample.name;
              return (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample.id)}
                  className={`p-3.5 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500/50 text-white shadow-sm ring-1 ring-cyan-500/30'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="font-semibold text-xs text-white mb-1">{sample.name}</div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {sample.description}
                  </p>
                  <div className="mt-2.5 text-[10px] font-mono text-cyan-400 font-medium">
                    {sample.count} Network Flows
                  </div>
                </button>
              );
            })}
          </div>

          {/* Upload Notice */}
          <div className="text-[11px] text-slate-500 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
            <strong>UNSW-NB15 Auto-Alignment:</strong> The system automatically extracts features and drops target columns
            (<code className="text-slate-300">label</code>, <code className="text-slate-300">attack_cat</code>, <code className="text-slate-300">id</code>)
            prior to inference, preventing data leakage.
          </div>
        </div>

        {/* Custom File Upload Box */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2 flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-cyan-400" /> Upload Custom CSV
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Upload any CSV with network traffic flow records. Supports standard UNSW-NB15 headers.
            </p>
          </div>

          <label className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-xl p-5 text-center cursor-pointer bg-slate-950/60 hover:bg-cyan-950/10 transition-all block">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <FileSpreadsheet className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <span className="text-xs font-semibold text-white block">Click to Browse CSV</span>
            <span className="text-[10px] text-slate-500">Supports .csv up to 10,000 rows</span>
          </label>
        </div>
      </div>

      {/* Parse Error Box */}
      {parseError && (
        <div className="rounded-xl bg-rose-950/30 border border-rose-500/40 p-4 text-xs text-rose-300 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-rose-200">{parseError}</p>
          </div>
        </div>
      )}

      {/* Feature Alignment Warnings */}
      {missingFeaturesWarning.length > 0 && (
        <div className="rounded-xl bg-amber-950/20 border border-amber-500/30 p-3.5 text-xs text-amber-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>{missingFeaturesWarning.length} expected feature(s) missing</strong> in uploaded CSV. Missing columns were handled by median/mode imputers.
          </span>
        </div>
      )}
      {extraColumnsNotice.length > 0 && (
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs text-slate-400 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            Ignoring {extraColumnsNotice.length} non-model column(s): <span className="font-mono text-slate-300">{extraColumnsNotice.slice(0, 5).join(', ')}{extraColumnsNotice.length > 5 ? '...' : ''}</span>
          </span>
        </div>
      )}

      {/* Prediction Batch Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Records Analyzed</span>
          <div className="text-2xl font-bold text-white mt-1">{summary.totalRecords.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500 mt-1 truncate">
            {isCustomUpload ? '📁 Custom CSV' : '🔬 Benchmark'}: {datasetName}
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Predicted Attacks</span>
          <div className="text-2xl font-bold text-rose-400 mt-1">{summary.predictedAttacks.toLocaleString()}</div>
          <p className="text-[11px] text-rose-400/80 mt-1">Malicious traffic flows</p>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Predicted Normal</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{summary.predictedNormal.toLocaleString()}</div>
          <p className="text-[11px] text-emerald-400/80 mt-1">Legitimate traffic flows</p>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Attack Rate</span>
          <div className="text-2xl font-bold text-cyan-400 mt-1">{(summary.attackRate * 100).toFixed(1)}%</div>
          <p className="text-[11px] text-slate-400 mt-1">Model: {selectedModel}</p>
        </div>
      </div>

      {/* Distribution Chart & Ground Truth Confusion Matrix (if ground truth is present) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Distribution Bar Card */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
          <h3 className="font-bold text-sm text-white mb-3">Predicted Traffic Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Attacks ({summary.predictedAttacks})
                </span>
                <span className="font-mono text-slate-300">{(summary.attackRate * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${summary.attackRate * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Normal ({summary.predictedNormal})
                </span>
                <span className="font-mono text-slate-300">{((1 - summary.attackRate) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(1 - summary.attackRate) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Model Decision Boundary:</span>
            <span className="font-mono text-cyan-400">Attack threshold &ge; 50% probability</span>
          </div>
        </div>

        {/* Ground Truth Validation Box (if label is available) */}
        {summary.hasGroundTruth && summary.confusionMatrix && (
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-white">Batch Ground Truth Evaluation</h3>
              <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                `label` Verified
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4 text-center">
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Accuracy</span>
                <span className="font-bold text-sm text-white">{((summary.accuracy ?? 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Precision</span>
                <span className="font-bold text-sm text-white">{((summary.precision ?? 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Recall</span>
                <span className="font-bold text-sm text-white">{((summary.recall ?? 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">F1-Score</span>
                <span className="font-bold text-sm text-cyan-400">{((summary.f1Score ?? 0) * 100).toFixed(1)}%</span>
              </div>
            </div>

            {/* Confusion Matrix Visual */}
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-800">
              <div className="text-[11px] font-semibold text-slate-400 mb-2 text-center">
                Batch Confusion Matrix
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded text-center">
                  <span className="text-[10px] text-slate-400 block">True Negative (TN)</span>
                  <span className="text-base font-bold text-emerald-400">{summary.confusionMatrix.tn}</span>
                  <span className="text-[9px] text-slate-500 block">Actual Normal, Pred Normal</span>
                </div>
                <div className="bg-amber-950/30 border border-amber-500/30 p-2.5 rounded text-center">
                  <span className="text-[10px] text-slate-400 block">False Positive (FP)</span>
                  <span className="text-base font-bold text-amber-400">{summary.confusionMatrix.fp}</span>
                  <span className="text-[9px] text-slate-500 block">Actual Normal, Pred Attack</span>
                </div>
                <div className="bg-rose-950/30 border border-rose-500/30 p-2.5 rounded text-center">
                  <span className="text-[10px] text-slate-400 block">False Negative (FN)</span>
                  <span className="text-base font-bold text-rose-400">{summary.confusionMatrix.fn}</span>
                  <span className="text-[9px] text-slate-500 block">Actual Attack, Pred Normal</span>
                </div>
                <div className="bg-cyan-950/30 border border-cyan-500/30 p-2.5 rounded text-center">
                  <span className="text-[10px] text-slate-400 block">True Positive (TP)</span>
                  <span className="text-base font-bold text-cyan-400">{summary.confusionMatrix.tp}</span>
                  <span className="text-[9px] text-slate-500 block">Actual Attack, Pred Attack</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Predictions Data Table Section */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base text-white">Prediction Results</h3>
            <p className="text-xs text-slate-400">
              Showing {filteredPredictions.length} of {predictions.length} classified records
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search protocol, state..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-44 sm:w-56"
              />
            </div>

            {/* Class Filter */}
            <div className="flex rounded-lg bg-slate-950 border border-slate-800 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setClassFilter('ALL')}
                className={`px-2.5 py-1 rounded-md font-medium ${
                  classFilter === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setClassFilter('Attack')}
                className={`px-2.5 py-1 rounded-md font-medium ${
                  classFilter === 'Attack' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Attacks
              </button>
              <button
                type="button"
                onClick={() => setClassFilter('Normal')}
                className={`px-2.5 py-1 rounded-md font-medium ${
                  classFilter === 'Normal' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Normal
              </button>
            </div>

            {/* Download CSV Button */}
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Download CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950">
                <th className="py-2.5 px-3 font-semibold">ID</th>
                <th className="py-2.5 px-3 font-semibold">Predicted Class</th>
                <th className="py-2.5 px-3 font-semibold">Attack Probability</th>
                <th className="py-2.5 px-3 font-semibold">Protocol / Service</th>
                <th className="py-2.5 px-3 font-semibold">State / TTL</th>
                <th className="py-2.5 px-3 font-semibold">Conn Count</th>
                {summary.hasGroundTruth && <th className="py-2.5 px-3 font-semibold">Ground Truth</th>}
                <th className="py-2.5 px-3 font-semibold text-right">Inspection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {paginatedPredictions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-slate-500 font-sans">
                    No matching traffic records found for this query.
                  </td>
                </tr>
              ) : (
                paginatedPredictions.map((pred, i) => {
                  const r = pred.record;
                  const isAttack = pred.predictedClass === 'Attack';
                  return (
                    <tr
                      key={i}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedRecordDetail(pred)}
                    >
                      <td className="py-2.5 px-3 text-slate-300 font-medium">{r.id ?? (currentPage - 1) * pageSize + i + 1}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                            isAttack
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {isAttack ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                          {pred.predictedClass}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${isAttack ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {pred.attackProbability.toFixed(1)}%
                          </span>
                          <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${isAttack ? 'bg-rose-500' : 'bg-emerald-500'}`}
                              style={{ width: `${pred.attackProbability}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-300 font-sans">
                        <span className="uppercase font-mono text-cyan-400">{String(r.proto ?? 'tcp')}</span>
                        <span className="text-slate-500 mx-1">/</span>
                        <span className="text-slate-400">{String(r.service ?? '-')}</span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-300 font-sans">
                        <span className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px] font-mono mr-1.5 text-slate-300">
                          {String(r.state ?? 'FIN')}
                        </span>
                        <span className="text-slate-400 text-[11px]">sttl: {r.sttl ?? 'N/A'}</span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                        dst_src: <span className="text-slate-200 font-bold">{r.ct_dst_src_ltm ?? '0'}</span>
                      </td>
                      {summary.hasGroundTruth && (
                        <td className="py-2.5 px-3">
                          {pred.groundTruthLabel !== undefined ? (
                            <span
                              className={`inline-flex items-center gap-1 text-[11px] ${
                                pred.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                              }`}
                            >
                              {pred.isCorrect ? (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5" />
                              )}
                              {pred.groundTruthLabel === 1 ? 'Attack' : 'Normal'}
                            </span>
                          ) : (
                            <span className="text-slate-500 text-[10px]">N/A</span>
                          )}
                        </td>
                      )}
                      <td className="py-2.5 px-3 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRecordDetail(pred);
                          }}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] inline-flex items-center gap-1"
                        >
                          Details <ExternalLink className="w-3 h-3 text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-1.5 rounded bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Record Inspection Modal / Detail Card */}
      {selectedRecordDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Flow Record Analysis</span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                  Record #{selectedRecordDetail.record.id ?? 'Unknown'}
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                      selectedRecordDetail.predictedClass === 'Attack'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {selectedRecordDetail.predictedClass} ({selectedRecordDetail.attackProbability.toFixed(1)}% Attack Probability)
                  </span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecordDetail(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Risk Factor Analysis */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Key Decision Drivers &amp; Threat Indicators
              </h4>
              <div className="space-y-1.5">
                {selectedRecordDetail.topRiskFactors.map((rf, idx) => (
                  <div
                    key={idx}
                    className={`text-xs p-2.5 rounded-lg border ${
                      selectedRecordDetail.predictedClass === 'Attack'
                        ? 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                        : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                    }`}
                  >
                    • {rf}
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Values Grid */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Network Flow Attributes (42 UNSW-NB15 Features)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80 max-h-56 overflow-y-auto font-mono text-xs">
                {Object.entries(selectedRecordDetail.record).map(([k, v]) => (
                  <div key={k} className="p-1.5 rounded bg-slate-900/60 border border-slate-800/40">
                    <span className="text-[10px] text-slate-500 block truncate">{k}</span>
                    <span className="text-slate-200 font-semibold truncate block">{String(v ?? 'null')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedRecordDetail(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
