import { ModelMetric, ClassificationReport, ConfusionMatrixData, FeatureImportance } from '../types/cybersecurity';

export const FEATURE_COLUMNS: string[] = [
  "dur", "proto", "service", "state", "spkts", "dpkts", "sbytes", "dbytes",
  "rate", "sttl", "dttl", "sload", "dload", "sloss", "dloss", "sinpkt",
  "dinpkt", "sjit", "djit", "swin", "stcpb", "dtcpb", "dwin", "tcprtt",
  "synack", "ackdat", "smean", "dmean", "trans_depth", "response_body_len",
  "ct_srv_src", "ct_state_ttl", "ct_dst_ltm", "ct_src_dport_ltm", "ct_dst_sport_ltm",
  "ct_dst_src_ltm", "is_ftp_login", "ct_ftp_cmd", "ct_flw_http_mthd", "ct_src_ltm",
  "ct_srv_dst", "is_sm_ips_ports"
];

export const MODEL_METRICS: ModelMetric[] = [
  {
    model: "Logistic Regression",
    accuracy: 0.8639451126661762,
    precision: 0.9842578786680055,
    recall: 0.8131069791605567,
    f1_score: 0.890533657596476,
    roc_auc: 0.9780500933998254
  },
  {
    model: "Random Forest",
    accuracy: 0.9046885782560838,
    precision: 0.9872755415016761,
    recall: 0.8711926328755415,
    f1_score: 0.92560872468284,
    roc_auc: 0.9829426252443478
  }
];

export const CONFUSION_MATRICES: Record<string, ConfusionMatrixData> = {
  "Logistic Regression": {
    tn: 54448,
    fp: 1552,
    fn: 22304,
    tp: 97037
  },
  "Random Forest": {
    tn: 54660,
    fp: 1340,
    fn: 15372,
    tp: 103969
  }
};

export const CLASSIFICATION_REPORTS: Record<string, ClassificationReport> = {
  "Logistic Regression": {
    "Normal": {
      "precision": 0.7094017094017094,
      "recall": 0.9722857142857143,
      "f1-score": 0.8202964927082078,
      "support": 56000.0
    },
    "Attack": {
      "precision": 0.9842578786680055,
      "recall": 0.8131069791605567,
      "f1-score": 0.890533657596476,
      "support": 119341.0
    },
    "accuracy": 0.8639451126661762,
    "macro avg": {
      "precision": 0.8468297940348575,
      "recall": 0.8926963467231355,
      "f1-score": 0.8554150751523419,
      "support": 175341.0
    },
    "weighted avg": {
      "precision": 0.8964749557982113,
      "recall": 0.8639451126661762,
      "f1-score": 0.8681014755412635,
      "support": 175341.0
    }
  },
  "Random Forest": {
    "Normal": {
      "precision": 0.7805003427004797,
      "recall": 0.9760714285714286,
      "f1-score": 0.8673987558715247,
      "support": 56000.0
    },
    "Attack": {
      "precision": 0.9872755415016761,
      "recall": 0.8711926328755415,
      "f1-score": 0.92560872468284,
      "support": 119341.0
    },
    "accuracy": 0.9046885782560838,
    "macro avg": {
      "precision": 0.8838879421010779,
      "recall": 0.9236320307234851,
      "f1-score": 0.8965037402771823,
      "support": 175341.0
    },
    "weighted avg": {
      "precision": 0.9212361603365921,
      "recall": 0.9046885782560838,
      "f1-score": 0.9070177604848848,
      "support": 175341.0
    }
  }
};

export const FEATURE_DESCRIPTIONS: Record<string, string> = {
  dur: "Record total duration (seconds)",
  proto: "Transaction protocol (e.g., tcp, udp, arp, ospf)",
  service: "Destination service (http, ftp, smtp, dns, etc.)",
  state: "State and its dependent protocol (CON, FIN, INT, REQ, etc.)",
  spkts: "Source to destination packet count",
  dpkts: "Destination to source packet count",
  sbytes: "Source to destination transaction bytes",
  dbytes: "Destination to source transaction bytes",
  rate: "Packets per second rate",
  sttl: "Source to destination time to live value",
  dttl: "Destination to source time to live value",
  sload: "Source bits per second",
  dload: "Destination bits per second",
  sloss: "Source packets retransmitted or dropped",
  dloss: "Destination packets retransmitted or dropped",
  sinpkt: "Source interpacket arrival time (msec)",
  dinpkt: "Destination interpacket arrival time (msec)",
  sjit: "Source jitter (msec)",
  djit: "Destination jitter (msec)",
  swin: "Source TCP window advertisement value",
  stcpb: "Source TCP base sequence number",
  dtcpb: "Destination TCP base sequence number",
  dwin: "Destination TCP window advertisement value",
  tcprtt: "TCP connection setup round-trip time (synack + ackdat)",
  synack: "TCP setup time between SYN and SYN_ACK",
  ackdat: "TCP setup time between SYN_ACK and ACK",
  smean: "Mean packet size transmitted by the source",
  dmean: "Mean packet size transmitted by the destination",
  trans_depth: "Pipelined HTTP depth of request/response transactions",
  response_body_len: "Actual uncompressed content size of HTTP response",
  ct_srv_src: "Count of connections to the same service and source IP",
  ct_state_ttl: "Count of connections having the same state and TTL",
  ct_dst_ltm: "Count of connections to the destination address in last 100",
  ct_src_dport_ltm: "Count of connections from source to same dest port",
  ct_dst_sport_ltm: "Count of connections from same dest to source port",
  ct_dst_src_ltm: "Count of connections from same dest address to source address",
  is_ftp_login: "Binary flag: 1 if FTP session accessed with user/pwd",
  ct_ftp_cmd: "Count of commands executed in the FTP session",
  ct_flw_http_mthd: "Count of flows with HTTP methods such as GET or POST",
  ct_src_ltm: "Count of connections from same source address in last 100",
  ct_srv_dst: "Count of connections to the same service and destination IP",
  is_sm_ips_ports: "Binary flag: 1 if source and destination IP & port are equal"
};

export const FEATURE_IMPORTANCE_LIST: FeatureImportance[] = [
  { feature: "ct_dst_src_ltm", rawFeature: "num__ct_dst_src_ltm", importance: 0.073385, description: "Conn count: Dest to Source in 100 records" },
  { feature: "sload", rawFeature: "num__sload", importance: 0.056891, description: "Source bits per second (burst traffic)" },
  { feature: "sttl", rawFeature: "num__sttl", importance: 0.056026, description: "Source-to-dest Time To Live (OS footprinting)" },
  { feature: "sbytes", rawFeature: "num__sbytes", importance: 0.053537, description: "Source-to-destination volume (bytes)" },
  { feature: "ct_dst_sport_ltm", rawFeature: "num__ct_dst_sport_ltm", importance: 0.048594, description: "Conn count: Dest to same Source Port" },
  { feature: "smean", rawFeature: "num__smean", importance: 0.047922, description: "Mean packet size transmitted by source" },
  { feature: "ct_srv_dst", rawFeature: "num__ct_srv_dst", importance: 0.041615, description: "Conn count: Service & Dest IP" },
  { feature: "dbytes", rawFeature: "num__dbytes", importance: 0.038513, description: "Destination-to-source payload bytes" },
  { feature: "ct_state_ttl", rawFeature: "num__ct_state_ttl", importance: 0.038378, description: "Conn count with matching State and TTL" },
  { feature: "rate", rawFeature: "num__rate", importance: 0.035654, description: "Transmission packet rate (pkts/sec)" },
  { feature: "synack", rawFeature: "num__synack", importance: 0.029875, description: "TCP handshake SYN to SYN-ACK latency" },
  { feature: "dload", rawFeature: "num__dload", importance: 0.028553, description: "Destination bits per second" },
  { feature: "ct_srv_src", rawFeature: "num__ct_srv_src", importance: 0.027585, description: "Conn count: Service & Source IP" },
  { feature: "dur", rawFeature: "num__dur", importance: 0.026886, description: "Total connection duration in seconds" },
  { feature: "dttl", rawFeature: "num__dttl", importance: 0.025111, description: "Destination-to-source Time To Live" },
  { feature: "dmean", rawFeature: "num__dmean", importance: 0.023311, description: "Mean packet size from destination" },
  { feature: "dpkts", rawFeature: "num__dpkts", importance: 0.023297, description: "Packets sent destination to source" },
  { feature: "sinpkt", rawFeature: "num__sinpkt", importance: 0.023059, description: "Source interpacket arrival time" },
  { feature: "state_INT", rawFeature: "cat__state_INT", importance: 0.023044, description: "Connection state INT (Interrupted/Half-open)" },
  { feature: "tcprtt", rawFeature: "num__tcprtt", importance: 0.022408, description: "TCP round-trip time (handshake latency)" },
  { feature: "dinpkt", rawFeature: "num__dinpkt", importance: 0.021323, description: "Destination interpacket arrival time" },
  { feature: "ackdat", rawFeature: "num__ackdat", importance: 0.019790, description: "TCP handshake SYN-ACK to ACK latency" },
  { feature: "sjit", rawFeature: "num__sjit", importance: 0.014730, description: "Source packet jitter" },
  { feature: "sloss", rawFeature: "num__sloss", importance: 0.014470, description: "Source packet drops / retransmissions" },
  { feature: "ct_src_dport_ltm", rawFeature: "num__ct_src_dport_ltm", importance: 0.014430, description: "Conn count: Source to same Dest Port" },
  { feature: "spkts", rawFeature: "num__spkts", importance: 0.014095, description: "Packets sent source to destination" },
  { feature: "djit", rawFeature: "num__djit", importance: 0.013950, description: "Destination packet jitter" },
  { feature: "proto_tcp", rawFeature: "cat__proto_tcp", importance: 0.013303, description: "Protocol: Transmission Control Protocol (TCP)" },
  { feature: "swin", rawFeature: "num__swin", importance: 0.013176, description: "Source TCP window size advertisement" },
  { feature: "service_-", rawFeature: "cat__service_-", importance: 0.011542, description: "Unrecognized / raw port service" }
];
