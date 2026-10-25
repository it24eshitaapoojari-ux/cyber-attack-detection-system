export interface ModelMetric {
  model: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  roc_auc: number;
}

export interface ClassMetrics {
  precision: number;
  recall: number;
  'f1-score': number;
  support: number;
}

export interface ClassificationReport {
  Normal: ClassMetrics;
  Attack: ClassMetrics;
  accuracy: number;
  'macro avg': ClassMetrics;
  'weighted avg': ClassMetrics;
}

export interface ConfusionMatrixData {
  tn: number; // True Negative (Actual Normal, Predicted Normal)
  fp: number; // False Positive (Actual Normal, Predicted Attack)
  fn: number; // False Negative (Actual Attack, Predicted Normal)
  tp: number; // True Positive (Actual Attack, Predicted Attack)
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  rawFeature: string;
  description?: string;
}

export interface NetworkFlowRecord {
  id?: string | number;
  dur?: number;
  proto?: string;
  service?: string;
  state?: string;
  spkts?: number;
  dpkts?: number;
  sbytes?: number;
  dbytes?: number;
  rate?: number;
  sttl?: number;
  dttl?: number;
  sload?: number;
  dload?: number;
  sloss?: number;
  dloss?: number;
  sinpkt?: number;
  dinpkt?: number;
  sjit?: number;
  djit?: number;
  swin?: number;
  stcpb?: number;
  dtcpb?: number;
  dwin?: number;
  tcprtt?: number;
  synack?: number;
  ackdat?: number;
  smean?: number;
  dmean?: number;
  trans_depth?: number;
  response_body_len?: number;
  ct_srv_src?: number;
  ct_state_ttl?: number;
  ct_dst_ltm?: number;
  ct_src_dport_ltm?: number;
  ct_dst_sport_ltm?: number;
  ct_dst_src_ltm?: number;
  is_ftp_login?: number;
  ct_ftp_cmd?: number;
  ct_flw_http_mthd?: number;
  ct_src_ltm?: number;
  ct_srv_dst?: number;
  is_sm_ips_ports?: number;
  attack_cat?: string;
  label?: number;
  [key: string]: unknown;
}

export interface PredictionResult {
  record: NetworkFlowRecord;
  predictedClass: 'Attack' | 'Normal';
  predictedLabel: 0 | 1;
  attackProbability: number;
  confidenceScore: number;
  groundTruthLabel?: number;
  isCorrect?: boolean;
  topRiskFactors: string[];
}

export interface BatchEvaluationSummary {
  totalRecords: number;
  predictedAttacks: number;
  predictedNormal: number;
  attackRate: number;
  hasGroundTruth: boolean;
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1Score?: number;
  confusionMatrix?: ConfusionMatrixData;
}
