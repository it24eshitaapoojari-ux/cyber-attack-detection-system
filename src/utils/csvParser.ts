import { NetworkFlowRecord, PredictionResult } from '../types/cybersecurity';
import { FEATURE_COLUMNS } from '../data/modelsData';

export interface CSVParseResult {
  records: NetworkFlowRecord[];
  missingFeatures: string[];
  extraColumns: string[];
  totalRows: number;
  hasLabelColumn: boolean;
}

export function parseCSV(csvText: string): CSVParseResult {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) {
    throw new Error('CSV file has no data rows.');
  }

  // Parse header
  const headerLine = lines[0];
  const headers = headerLine.split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));

  const hasLabelColumn = headers.includes('label');
  const missingFeatures = FEATURE_COLUMNS.filter(f => !headers.includes(f));
  const extraColumns = headers.filter(h => !FEATURE_COLUMNS.includes(h) && !['label', 'attack_cat', 'id'].includes(h));

  const records: NetworkFlowRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const record: NetworkFlowRecord = {};

    headers.forEach((header, index) => {
      const val = values[index];
      if (val === undefined || val === '') {
        record[header] = undefined;
      } else if (!isNaN(Number(val)) && val !== '') {
        record[header] = Number(val);
      } else {
        record[header] = val;
      }
    });

    records.push(record);
  }

  return {
    records,
    missingFeatures,
    extraColumns,
    totalRows: records.length,
    hasLabelColumn
  };
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim().replace(/^["']|["']$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^["']|["']$/g, ''));
  return result;
}

export function exportPredictionsToCSV(predictions: PredictionResult[]): string {
  if (predictions.length === 0) return '';

  const headers = [
    'record_id',
    'predicted_class',
    'attack_probability_percent',
    'ground_truth_label',
    'prediction_match',
    'key_risk_factor',
    ...FEATURE_COLUMNS
  ];

  const rows = predictions.map((p, idx) => {
    const r = p.record;
    const match = p.isCorrect !== undefined ? (p.isCorrect ? 'MATCH' : 'MISMATCH') : 'N/A';
    const mainRisk = (p.topRiskFactors[0] || '').replace(/,/g, ';');

    const featureVals = FEATURE_COLUMNS.map(col => {
      const v = r[col];
      return v !== undefined && v !== null ? String(v) : '';
    });

    return [
      r.id ?? idx + 1,
      p.predictedClass,
      p.attackProbability,
      p.groundTruthLabel !== undefined ? (p.groundTruthLabel === 1 ? 'Attack' : 'Normal') : 'N/A',
      match,
      `"${mainRisk}"`,
      ...featureVals
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

export function downloadFile(content: string, fileName: string, contentType: string = 'text/csv;charset=utf-8;') {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
