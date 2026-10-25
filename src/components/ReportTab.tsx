import React, { useState } from 'react';
import { MODEL_METRICS, CONFUSION_MATRICES } from '../data/modelsData';
import { Printer, Copy, Check, FileText } from 'lucide-react';

export const ReportTab: React.FC = () => {
  const [studentName, setStudentName] = useState('Prasad Shimpi');
  const [rollNumber, setRollNumber] = useState('25');
  const [collegeName, setCollegeName] = useState('Department of Computer Engineering / IT');
  const [guideName, setGuideName] = useState('Prof. Project Coordinator');
  const [academicYear, setAcademicYear] = useState('2025 - 2026');
  const [copied, setCopied] = useState(false);

  const rf = MODEL_METRICS.find(m => m.model === 'Random Forest')!;
  const lr = MODEL_METRICS.find(m => m.model === 'Logistic Regression')!;
  const rfCM = CONFUSION_MATRICES['Random Forest'];
  const lrCM = CONFUSION_MATRICES['Logistic Regression'];

  const copyMarkdown = () => {
    const md = `# Mini Project: Design and Implementation of an AI-Based Cyberattack Detection System Using Machine Learning

**Student Name:** ${studentName}  
**Roll Number:** ${rollNumber}  
**College / Department:** ${collegeName}  
**Guide:** ${guideName}  
**Academic Year:** ${academicYear}  

---

## Aim of the Experiment
Design and implementation of a complete AI/ML solution involving data preprocessing, model development, evaluation, and result interpretation for a real-world problem. Integration of suitable algorithms, visualization techniques, and performance analysis in a practical application setting.

## Abstract
This project presents an intrusion detection prototype using machine learning on the UNSW-NB15 network flow dataset. We evaluated Random Forest and Logistic Regression classifiers on 175,341 test flows. Random Forest achieved an F1-score of ${(rf.f1_score * 100).toFixed(2)}% (Accuracy: ${(rf.accuracy * 100).toFixed(2)}%, Recall: ${(rf.recall * 100).toFixed(2)}%), outperforming Logistic Regression (${(lr.f1_score * 100).toFixed(2)}% F1).

## Model Evaluation Results
- **Random Forest:** Accuracy: ${(rf.accuracy * 100).toFixed(2)}% | Precision: ${(rf.precision * 100).toFixed(2)}% | Recall: ${(rf.recall * 100).toFixed(2)}% | F1: ${(rf.f1_score * 100).toFixed(2)}% | ROC-AUC: ${(rf.roc_auc * 100).toFixed(2)}%
- **Logistic Regression:** Accuracy: ${(lr.accuracy * 100).toFixed(2)}% | Precision: ${(lr.precision * 100).toFixed(2)}% | Recall: ${(lr.recall * 100).toFixed(2)}% | F1: ${(lr.f1_score * 100).toFixed(2)}% | ROC-AUC: ${(lr.roc_auc * 100).toFixed(2)}%

## Confusion Matrix Analysis
- Random Forest: TN = ${rfCM.tn.toLocaleString()}, FP = ${rfCM.fp.toLocaleString()}, FN = ${rfCM.fn.toLocaleString()}, TP = ${rfCM.tp.toLocaleString()}
- Logistic Regression: TN = ${lrCM.tn.toLocaleString()}, FP = ${lrCM.fp.toLocaleString()}, FN = ${lrCM.fn.toLocaleString()}, TP = ${lrCM.tp.toLocaleString()}
`;

    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" /> Academic Project Report
          </h2>
          <p className="text-xs text-slate-400">
            Formulated from <code className="text-cyan-300">report_template.md</code> with actual measured experimental benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Markdown' : 'Copy Report Markdown'}
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Editable Student Metadata Card */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Student &amp; College Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">Student Name</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-medium focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Roll / Candidate Number</label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-medium focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Academic Year</label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-medium focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-slate-400 block mb-1">College / Department</label>
            <input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-medium focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Project Guide</label>
            <input
              type="text"
              value={guideName}
              onChange={(e) => setGuideName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-medium focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Formatted Report Document */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-8 text-slate-300 text-sm leading-relaxed shadow-lg">
        {/* Title Section */}
        <div className="text-center border-b border-slate-800 pb-8 space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">Mini Project Report</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Design and Implementation of an AI-Based Cyberattack Detection System Using Machine Learning
          </h1>
          <p className="text-xs text-slate-400 pt-2">
            Submitted by: <strong className="text-slate-200">{studentName}</strong> (Roll No: {rollNumber}) | Guide: <strong className="text-slate-200">{guideName}</strong> | {collegeName} ({academicYear})
          </p>
        </div>

        {/* Aim */}
        <div className="space-y-2">
          <h2 className="text-base font-bold text-cyan-400 uppercase tracking-wider">Aim of the Experiment</h2>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-200 italic">
            "Mini Project: Design and implementation of a complete AI/ML solution involving data preprocessing, model development, evaluation, and result interpretation for a real-world problem. Integration of suitable algorithms, visualization techniques, and performance analysis in a practical application setting."
          </div>
        </div>

        {/* Abstract */}
        <div className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">Abstract</h2>
          <p>
            The growing sophistication and volume of network intrusions necessitate automated, machine learning-driven defense mechanisms capable of high-throughput flow classification. In this project, we designed and implemented an end-to-end cyberattack detection architecture trained on the benchmark UNSW-NB15 dataset. We engineered a dual-pipeline comprising scikit-learn standard scaling, median imputation, and one-hot encoding across 42 network flow attributes. Two classification algorithms—Logistic Regression and Random Forest—were rigorously benchmarked on an unseen test partition of 175,341 records. The Random Forest ensemble demonstrated superior performance, reaching an F1-score of <strong>{(rf.f1_score * 100).toFixed(2)}%</strong> with a precision of <strong>{(rf.precision * 100).toFixed(2)}%</strong> and an attack recall of <strong>{(rf.recall * 100).toFixed(2)}%</strong>. An interactive dashboard was developed to enable batch CSV ingestion, real-time single-record flow simulation, and confusion matrix diagnostics.
          </p>
        </div>

        {/* Chapter 1: Introduction */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">Chapter 1: Introduction</h2>
          <h3 className="text-sm font-semibold text-slate-200">1.1 Background &amp; Problem Statement</h3>
          <p>
            Traditional signature-based Network Intrusion Detection Systems (NIDS) fail against zero-day exploits, evasive polymorphic payloads, and distributed denial-of-service (DDoS) flood variants. Machine learning algorithms that evaluate statistical flow parameters (e.g., packet arrival jitter, TTL anomalies, connection recurrence frequencies) provide a defensive capability capable of generalising beyond static signatures.
          </p>
          <h3 className="text-sm font-semibold text-slate-200">1.2 Objectives</h3>
          <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
            <li>Preprocess raw network flow data with robust imputation and standard normalization.</li>
            <li>Train, tune, and compare multiple classification models (Linear vs Ensemble).</li>
            <li>Evaluate accuracy, precision, recall, F1-score, ROC-AUC, and full confusion matrices.</li>
            <li>Provide a user-facing interactive system for batch predictions and risk analysis.</li>
          </ul>
        </div>

        {/* Chapter 3 & 4: Dataset & Methodology */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">Chapter 2: Dataset &amp; Methodology</h2>
          <p>
            The project utilizes the UNSW-NB15 dataset generated by the Australian Centre for Cyber Security (ACCS). The dataset reflects synthetic modern normal activities and nine distinct attack categories: DoS, Exploits, Generic, Reconnaissance, Fuzzers, Backdoor, Shellcode, Worms, and Analysis.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <span className="font-semibold text-white block mb-1">Preprocessing Pipeline:</span>
              <p className="text-slate-400">
                • Numeric Features (39): SimpleImputer (median) + StandardScaler.<br />
                • Categorical Features (3: proto, service, state): SimpleImputer (most frequent) + OneHotEncoder(handle_unknown='ignore').
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <span className="font-semibold text-white block mb-1">Evaluated Classifiers:</span>
              <p className="text-slate-400">
                • Logistic Regression: L2-penalized, balanced class weight, max_iter=1200.<br />
                • Random Forest: 150 decision trees, balanced class weight, random_state=42.
              </p>
            </div>
          </div>
        </div>

        {/* Chapter 5: Results & Discussion */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">Chapter 3: Measured Results &amp; Discussion</h2>
          <p>
            The models were evaluated on the independent test set containing 175,341 labeled flows.
          </p>

          {/* Results Table */}
          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-300">
                  <th className="p-3">Model</th>
                  <th className="p-3">Accuracy</th>
                  <th className="p-3">Precision</th>
                  <th className="p-3">Recall</th>
                  <th className="p-3">F1-Score</th>
                  <th className="p-3">ROC-AUC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr>
                  <td className="p-3 font-sans font-bold text-white">Random Forest</td>
                  <td className="p-3">{(rf.accuracy * 100).toFixed(2)}%</td>
                  <td className="p-3">{(rf.precision * 100).toFixed(2)}%</td>
                  <td className="p-3">{(rf.recall * 100).toFixed(2)}%</td>
                  <td className="p-3 text-cyan-400 font-bold">{(rf.f1_score * 100).toFixed(2)}%</td>
                  <td className="p-3">{(rf.roc_auc * 100).toFixed(2)}%</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium text-slate-300">Logistic Regression</td>
                  <td className="p-3">{(lr.accuracy * 100).toFixed(2)}%</td>
                  <td className="p-3">{(lr.precision * 100).toFixed(2)}%</td>
                  <td className="p-3">{(lr.recall * 100).toFixed(2)}%</td>
                  <td className="p-3 text-slate-300 font-bold">{(lr.f1_score * 100).toFixed(2)}%</td>
                  <td className="p-3">{(lr.roc_auc * 100).toFixed(2)}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-xs space-y-2 pt-2">
            <p>
              <strong>Key Findings:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
              <li>
                <strong>F1-Score Champion:</strong> Random Forest achieved an F1-score of {(rf.f1_score * 100).toFixed(2)}%, outperforming Logistic Regression by 3.51 percentage points.
              </li>
              <li>
                <strong>Attack Recall:</strong> Random Forest captured 103,969 out of 119,341 attacks ({(rf.recall * 100).toFixed(2)}% recall), compared to 97,037 for Logistic Regression ({(lr.recall * 100).toFixed(2)}%), capturing 6,932 additional threats.
              </li>
              <li>
                <strong>False Positive Suppression:</strong> Both models exhibited remarkable precision &gt; 98.4%, with Random Forest producing only {rfCM.fp.toLocaleString()} false positives across 56,000 normal flows (a false positive rate of only {((rfCM.fp / 56000) * 100).toFixed(2)}%).
              </li>
              <li>
                <strong>Feature Importance:</strong> Gini importance analysis identified <code className="text-cyan-300">ct_dst_src_ltm</code> (0.073), <code className="text-cyan-300">sload</code> (0.057), and <code className="text-cyan-300">sttl</code> (0.056) as the three most discriminating indicators.
              </li>
            </ul>
          </div>
        </div>

        {/* Conclusion */}
        <div className="space-y-2 border-t border-slate-800 pt-6">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">Chapter 4: Conclusion &amp; Scope</h2>
          <p>
            The experiment successfully validated the design and implementation of a defensive ML solution for network cyberattack detection. The interactive web application delivers batch traffic evaluation, model transparency, and parameter testing in an accessible dashboard. As future scope, the architecture can be extended to multiclass attack category prediction and online stream processing.
          </p>
        </div>
      </div>
    </div>
  );
};
