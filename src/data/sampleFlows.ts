import { NetworkFlowRecord } from '../types/cybersecurity';

export const SAMPLE_DATASETS: { id: string; name: string; description: string; count: number; data: NetworkFlowRecord[] }[] = [
  {
    id: 'unsw_mixed',
    name: 'UNSW-NB15 Mixed Flow Sample (25 Records)',
    description: 'Realistic mix of normal traffic and various cyberattacks (Exploits, Reconnaissance, DoS, Fuzzers, Generic).',
    count: 25,
    data: [
      {
        id: 1, dur: 0.000011, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 496, dbytes: 0,
        rate: 90909.09, sttl: 254, dttl: 0, sload: 180363632, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.011, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 248, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 2, ct_state_ttl: 2, ct_dst_ltm: 1, ct_src_dport_ltm: 1,
        ct_dst_sport_ltm: 1, ct_dst_src_ltm: 2, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 1,
        ct_srv_dst: 2, is_sm_ips_ports: 0, attack_cat: 'Reconnaissance', label: 1
      },
      {
        id: 2, dur: 0.589956, proto: 'tcp', service: 'http', state: 'FIN', spkts: 10, dpkts: 8, sbytes: 796, dbytes: 1254,
        rate: 28.8157, sttl: 62, dttl: 252, sload: 9709.198, dload: 15302.83, sloss: 2, dloss: 1, sinpkt: 65.55, dinpkt: 81.42,
        sjit: 35.12, djit: 42.15, swin: 255, stcpb: 145628192, dtcpb: 38291024, dwin: 255, tcprtt: 0.071, synack: 0.038, ackdat: 0.033,
        smean: 80, dmean: 157, trans_depth: 1, response_body_len: 540, ct_srv_src: 1, ct_state_ttl: 0, ct_dst_ltm: 2,
        ct_src_dport_ltm: 1, ct_dst_sport_ltm: 1, ct_dst_src_ltm: 1, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 1,
        ct_src_ltm: 1, ct_srv_dst: 1, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 3, dur: 0.000008, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 1064, dbytes: 0,
        rate: 125000.0, sttl: 254, dttl: 0, sload: 532000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.008, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 532, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 36, ct_state_ttl: 2, ct_dst_ltm: 36, ct_src_dport_ltm: 36,
        ct_dst_sport_ltm: 19, ct_dst_src_ltm: 36, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 36,
        ct_srv_dst: 36, is_sm_ips_ports: 0, attack_cat: 'DoS', label: 1
      },
      {
        id: 4, dur: 0.000005, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 900, dbytes: 0,
        rate: 200000.0, sttl: 254, dttl: 0, sload: 720000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.005, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 450, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 30, ct_state_ttl: 2, ct_dst_ltm: 30, ct_src_dport_ltm: 30,
        ct_dst_sport_ltm: 15, ct_dst_src_ltm: 30, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 30,
        ct_srv_dst: 30, is_sm_ips_ports: 0, attack_cat: 'Exploits', label: 1
      },
      {
        id: 5, dur: 0.001026, proto: 'udp', service: 'dns', state: 'CON', spkts: 2, dpkts: 2, sbytes: 146, dbytes: 178,
        rate: 2923.97, sttl: 31, dttl: 29, sload: 569200.75, dload: 693957.1, sloss: 0, dloss: 0, sinpkt: 0.005, dinpkt: 0.005,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 73, dmean: 89,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 4, ct_state_ttl: 0, ct_dst_ltm: 2, ct_src_dport_ltm: 1,
        ct_dst_sport_ltm: 1, ct_dst_src_ltm: 2, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 2,
        ct_srv_dst: 4, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 6, dur: 0.000003, proto: 'unas', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 200, dbytes: 0,
        rate: 333333.3, sttl: 254, dttl: 0, sload: 266666656, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.003, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 100, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 2, ct_state_ttl: 2, ct_dst_ltm: 1, ct_src_dport_ltm: 1,
        ct_dst_sport_ltm: 1, ct_dst_src_ltm: 2, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 1,
        ct_srv_dst: 2, is_sm_ips_ports: 0, attack_cat: 'Generic', label: 1
      },
      {
        id: 7, dur: 0.812492, proto: 'tcp', service: 'http', state: 'FIN', spkts: 14, dpkts: 12, sbytes: 1682, dbytes: 10158,
        rate: 30.769, sttl: 62, dttl: 252, sload: 15330.61, dload: 92576.91, sloss: 3, dloss: 4, sinpkt: 58.03, dinpkt: 67.71,
        sjit: 24.5, djit: 18.2, swin: 255, stcpb: 73849120, dtcpb: 19283741, dwin: 255, tcprtt: 0.065, synack: 0.034, ackdat: 0.031,
        smean: 120, dmean: 846, trans_depth: 1, response_body_len: 4210, ct_srv_src: 2, ct_state_ttl: 0, ct_dst_ltm: 3,
        ct_src_dport_ltm: 1, ct_dst_sport_ltm: 1, ct_dst_src_ltm: 2, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 1,
        ct_src_ltm: 2, ct_srv_dst: 2, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 8, dur: 0.000009, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 720, dbytes: 0,
        rate: 111111.1, sttl: 254, dttl: 0, sload: 320000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.009, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 360, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 14, ct_state_ttl: 2, ct_dst_ltm: 14, ct_src_dport_ltm: 14,
        ct_dst_sport_ltm: 14, ct_dst_src_ltm: 14, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 14,
        ct_srv_dst: 14, is_sm_ips_ports: 0, attack_cat: 'Fuzzers', label: 1
      },
      {
        id: 9, dur: 1.102381, proto: 'tcp', service: 'ftp', state: 'FIN', spkts: 24, dpkts: 20, sbytes: 2840, dbytes: 1820,
        rate: 38.099, sttl: 62, dttl: 252, sload: 19800.0, dload: 12690.0, sloss: 1, dloss: 1, sinpkt: 47.92, dinpkt: 55.11,
        sjit: 14.8, djit: 22.1, swin: 255, stcpb: 19827364, dtcpb: 98127364, dwin: 255, tcprtt: 0.082, synack: 0.045, ackdat: 0.037,
        smean: 118, dmean: 91, trans_depth: 0, response_body_len: 0, ct_srv_src: 1, ct_state_ttl: 0, ct_dst_ltm: 1,
        ct_src_dport_ltm: 1, ct_dst_sport_ltm: 1, ct_dst_src_ltm: 1, is_ftp_login: 1, ct_ftp_cmd: 4, ct_flw_http_mthd: 0,
        ct_src_ltm: 1, ct_srv_dst: 1, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 10, dur: 0.000004, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 840, dbytes: 0,
        rate: 250000.0, sttl: 254, dttl: 0, sload: 840000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.004, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 420, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 40, ct_state_ttl: 2, ct_dst_ltm: 40, ct_src_dport_ltm: 40,
        ct_dst_sport_ltm: 20, ct_dst_src_ltm: 40, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 40,
        ct_srv_dst: 40, is_sm_ips_ports: 0, attack_cat: 'Exploits', label: 1
      },
      {
        id: 11, dur: 0.000010, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 520, dbytes: 0,
        rate: 100000.0, sttl: 254, dttl: 0, sload: 208000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.010, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 260, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 5, ct_state_ttl: 2, ct_dst_ltm: 3, ct_src_dport_ltm: 2,
        ct_dst_sport_ltm: 2, ct_dst_src_ltm: 5, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 3,
        ct_srv_dst: 5, is_sm_ips_ports: 0, attack_cat: 'Reconnaissance', label: 1
      },
      {
        id: 12, dur: 0.001150, proto: 'udp', service: 'dns', state: 'CON', spkts: 2, dpkts: 2, sbytes: 130, dbytes: 162,
        rate: 2608.7, sttl: 31, dttl: 29, sload: 452173.9, dload: 563478.3, sloss: 0, dloss: 0, sinpkt: 0.006, dinpkt: 0.006,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 65, dmean: 81,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 2, ct_state_ttl: 0, ct_dst_ltm: 2, ct_src_dport_ltm: 1,
        ct_dst_sport_ltm: 1, ct_dst_src_ltm: 2, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 2,
        ct_srv_dst: 2, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 13, dur: 0.000007, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 1120, dbytes: 0,
        rate: 142857.1, sttl: 254, dttl: 0, sload: 640000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.007, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 560, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 28, ct_state_ttl: 2, ct_dst_ltm: 28, ct_src_dport_ltm: 28,
        ct_dst_sport_ltm: 14, ct_dst_src_ltm: 28, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 28,
        ct_srv_dst: 28, is_sm_ips_ports: 0, attack_cat: 'DoS', label: 1
      },
      {
        id: 14, dur: 0.421590, proto: 'tcp', service: 'smtp', state: 'FIN', spkts: 12, dpkts: 10, sbytes: 1140, dbytes: 2040,
        rate: 52.18, sttl: 62, dttl: 252, sload: 21632.0, dload: 38710.0, sloss: 0, dloss: 0, sinpkt: 35.1, dinpkt: 42.1,
        sjit: 11.2, djit: 19.3, swin: 255, stcpb: 63829104, dtcpb: 83910245, dwin: 255, tcprtt: 0.059, synack: 0.031, ackdat: 0.028,
        smean: 95, dmean: 204, trans_depth: 0, response_body_len: 0, ct_srv_src: 1, ct_state_ttl: 0, ct_dst_ltm: 2,
        ct_src_dport_ltm: 1, ct_dst_sport_ltm: 1, ct_dst_src_ltm: 1, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0,
        ct_src_ltm: 1, ct_srv_dst: 1, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 15, dur: 0.000006, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 780, dbytes: 0,
        rate: 166666.7, sttl: 254, dttl: 0, sload: 520000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.006, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 390, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 22, ct_state_ttl: 2, ct_dst_ltm: 22, ct_src_dport_ltm: 22,
        ct_dst_sport_ltm: 11, ct_dst_src_ltm: 22, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 22,
        ct_srv_dst: 22, is_sm_ips_ports: 0, attack_cat: 'Exploits', label: 1
      },
      {
        id: 16, dur: 0.000004, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 960, dbytes: 0,
        rate: 250000.0, sttl: 254, dttl: 0, sload: 960000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.004, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 480, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 34, ct_state_ttl: 2, ct_dst_ltm: 34, ct_src_dport_ltm: 34,
        ct_dst_sport_ltm: 17, ct_dst_src_ltm: 34, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 34,
        ct_srv_dst: 34, is_sm_ips_ports: 0, attack_cat: 'DoS', label: 1
      },
      {
        id: 17, dur: 0.638102, proto: 'tcp', service: 'http', state: 'FIN', spkts: 8, dpkts: 6, sbytes: 620, dbytes: 940,
        rate: 21.94, sttl: 62, dttl: 252, sload: 7773.0, dload: 11784.0, sloss: 1, dloss: 1, sinpkt: 85.2, dinpkt: 104.1,
        sjit: 19.4, djit: 28.1, swin: 255, stcpb: 82910471, dtcpb: 48192034, dwin: 255, tcprtt: 0.076, synack: 0.041, ackdat: 0.035,
        smean: 77, dmean: 156, trans_depth: 1, response_body_len: 380, ct_srv_src: 2, ct_state_ttl: 0, ct_dst_ltm: 3,
        ct_src_dport_ltm: 1, ct_dst_sport_ltm: 1, ct_dst_src_ltm: 2, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 1,
        ct_src_ltm: 2, ct_srv_dst: 2, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 18, dur: 0.000012, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 480, dbytes: 0,
        rate: 83333.3, sttl: 254, dttl: 0, sload: 160000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.012, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 240, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 3, ct_state_ttl: 2, ct_dst_ltm: 2, ct_src_dport_ltm: 1,
        ct_dst_sport_ltm: 1, ct_dst_src_ltm: 3, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 2,
        ct_srv_dst: 3, is_sm_ips_ports: 0, attack_cat: 'Reconnaissance', label: 1
      },
      {
        id: 19, dur: 0.001080, proto: 'udp', service: 'dns', state: 'CON', spkts: 2, dpkts: 2, sbytes: 140, dbytes: 172,
        rate: 2777.8, sttl: 31, dttl: 29, sload: 518518.5, dload: 637037.0, sloss: 0, dloss: 0, sinpkt: 0.005, dinpkt: 0.005,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 70, dmean: 86,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 5, ct_state_ttl: 0, ct_dst_ltm: 3, ct_src_dport_ltm: 1,
        ct_dst_sport_ltm: 1, ct_dst_src_ltm: 3, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 3,
        ct_srv_dst: 5, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 20, dur: 0.000008, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 640, dbytes: 0,
        rate: 125000.0, sttl: 254, dttl: 0, sload: 320000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.008, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 320, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 18, ct_state_ttl: 2, ct_dst_ltm: 18, ct_src_dport_ltm: 18,
        ct_dst_sport_ltm: 9, ct_dst_src_ltm: 18, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 18,
        ct_srv_dst: 18, is_sm_ips_ports: 0, attack_cat: 'Fuzzers', label: 1
      },
      {
        id: 21, dur: 0.521034, proto: 'tcp', service: 'http', state: 'FIN', spkts: 10, dpkts: 8, sbytes: 750, dbytes: 1420,
        rate: 34.54, sttl: 62, dttl: 252, sload: 11515.0, dload: 21802.0, sloss: 1, dloss: 1, sinpkt: 57.8, dinpkt: 74.4,
        sjit: 16.7, djit: 29.3, swin: 255, stcpb: 29103847, dtcpb: 92837104, dwin: 255, tcprtt: 0.068, synack: 0.035, ackdat: 0.033,
        smean: 75, dmean: 177, trans_depth: 1, response_body_len: 720, ct_srv_src: 3, ct_state_ttl: 0, ct_dst_ltm: 2,
        ct_src_dport_ltm: 1, ct_dst_sport_ltm: 1, ct_dst_src_ltm: 2, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 1,
        ct_src_ltm: 2, ct_srv_dst: 3, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 22, dur: 0.000005, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 880, dbytes: 0,
        rate: 200000.0, sttl: 254, dttl: 0, sload: 704000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.005, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 440, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 26, ct_state_ttl: 2, ct_dst_ltm: 26, ct_src_dport_ltm: 26,
        ct_dst_sport_ltm: 13, ct_dst_src_ltm: 26, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 26,
        ct_srv_dst: 26, is_sm_ips_ports: 0, attack_cat: 'Exploits', label: 1
      },
      {
        id: 23, dur: 0.312940, proto: 'tcp', service: 'ssh', state: 'FIN', spkts: 16, dpkts: 14, sbytes: 1820, dbytes: 2340,
        rate: 95.86, sttl: 62, dttl: 252, sload: 46526.0, dload: 59819.0, sloss: 0, dloss: 0, sinpkt: 20.8, dinpkt: 24.1,
        sjit: 6.8, djit: 11.2, swin: 255, stcpb: 39481029, dtcpb: 59201948, dwin: 255, tcprtt: 0.048, synack: 0.025, ackdat: 0.023,
        smean: 113, dmean: 167, trans_depth: 0, response_body_len: 0, ct_srv_src: 1, ct_state_ttl: 0, ct_dst_ltm: 1,
        ct_src_dport_ltm: 1, ct_dst_sport_ltm: 1, ct_dst_src_ltm: 1, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0,
        ct_src_ltm: 1, ct_srv_dst: 1, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 24, dur: 0.000003, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 1040, dbytes: 0,
        rate: 333333.3, sttl: 254, dttl: 0, sload: 1386666624, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.003, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 520, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 38, ct_state_ttl: 2, ct_dst_ltm: 38, ct_src_dport_ltm: 38,
        ct_dst_sport_ltm: 19, ct_dst_src_ltm: 38, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 38,
        ct_srv_dst: 38, is_sm_ips_ports: 0, attack_cat: 'DoS', label: 1
      },
      {
        id: 25, dur: 0.000950, proto: 'udp', service: 'dns', state: 'CON', spkts: 2, dpkts: 2, sbytes: 124, dbytes: 156,
        rate: 3157.9, sttl: 31, dttl: 29, sload: 522105.3, dload: 656842.1, sloss: 0, dloss: 0, sinpkt: 0.005, dinpkt: 0.005,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 62, dmean: 78,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 3, ct_state_ttl: 0, ct_dst_ltm: 2, ct_src_dport_ltm: 1,
        ct_dst_sport_ltm: 1, ct_dst_src_ltm: 2, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 2,
        ct_srv_dst: 3, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      }
    ]
  },
  {
    id: 'attack_traffic',
    name: 'High-Risk Cyberattack Flow Batch (10 Records)',
    description: 'Concentrated attack records demonstrating DoS floods, port scans (Reconnaissance), and exploit payloads.',
    count: 10,
    data: [
      {
        id: 101, dur: 0.000003, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 1200, dbytes: 0,
        rate: 333333.3, sttl: 254, dttl: 0, sload: 1600000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.003, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 600, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 45, ct_state_ttl: 2, ct_dst_ltm: 45, ct_src_dport_ltm: 45,
        ct_dst_sport_ltm: 22, ct_dst_src_ltm: 45, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 45,
        ct_srv_dst: 45, is_sm_ips_ports: 0, attack_cat: 'DoS Flood', label: 1
      },
      {
        id: 102, dur: 0.000010, proto: 'tcp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 128, dbytes: 0,
        rate: 100000.0, sttl: 254, dttl: 0, sload: 51200000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.01, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 64, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 8, ct_state_ttl: 2, ct_dst_ltm: 8, ct_src_dport_ltm: 8,
        ct_dst_sport_ltm: 4, ct_dst_src_ltm: 8, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 8,
        ct_srv_dst: 8, is_sm_ips_ports: 0, attack_cat: 'Port Scan Recon', label: 1
      },
      {
        id: 103, dur: 0.000006, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 940, dbytes: 0,
        rate: 166666.7, sttl: 254, dttl: 0, sload: 626666688, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.006, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 470, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 32, ct_state_ttl: 2, ct_dst_ltm: 32, ct_src_dport_ltm: 32,
        ct_dst_sport_ltm: 16, ct_dst_src_ltm: 32, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 32,
        ct_srv_dst: 32, is_sm_ips_ports: 0, attack_cat: 'Exploits', label: 1
      },
      {
        id: 104, dur: 0.000004, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 760, dbytes: 0,
        rate: 250000.0, sttl: 254, dttl: 0, sload: 760000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.004, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 380, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 29, ct_state_ttl: 2, ct_dst_ltm: 29, ct_src_dport_ltm: 29,
        ct_dst_sport_ltm: 15, ct_dst_src_ltm: 29, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 29,
        ct_srv_dst: 29, is_sm_ips_ports: 0, attack_cat: 'Fuzzers', label: 1
      },
      {
        id: 105, dur: 0.000002, proto: 'unas', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 200, dbytes: 0,
        rate: 500000.0, sttl: 254, dttl: 0, sload: 400000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.002, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 100, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 4, ct_state_ttl: 2, ct_dst_ltm: 2, ct_src_dport_ltm: 2,
        ct_dst_sport_ltm: 2, ct_dst_src_ltm: 4, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 2,
        ct_srv_dst: 4, is_sm_ips_ports: 0, attack_cat: 'Generic Payload', label: 1
      },
      {
        id: 106, dur: 0.000005, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 1100, dbytes: 0,
        rate: 200000.0, sttl: 254, dttl: 0, sload: 880000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.005, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 550, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 38, ct_state_ttl: 2, ct_dst_ltm: 38, ct_src_dport_ltm: 38,
        ct_dst_sport_ltm: 19, ct_dst_src_ltm: 38, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 38,
        ct_srv_dst: 38, is_sm_ips_ports: 0, attack_cat: 'DoS Flood', label: 1
      },
      {
        id: 107, dur: 0.000007, proto: 'tcp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 128, dbytes: 0,
        rate: 142857.1, sttl: 254, dttl: 0, sload: 73142856, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.007, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 64, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 12, ct_state_ttl: 2, ct_dst_ltm: 12, ct_src_dport_ltm: 12,
        ct_dst_sport_ltm: 6, ct_dst_src_ltm: 12, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 12,
        ct_srv_dst: 12, is_sm_ips_ports: 0, attack_cat: 'Reconnaissance', label: 1
      },
      {
        id: 108, dur: 0.000004, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 860, dbytes: 0,
        rate: 250000.0, sttl: 254, dttl: 0, sload: 860000000, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.004, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 430, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 42, ct_state_ttl: 2, ct_dst_ltm: 42, ct_src_dport_ltm: 42,
        ct_dst_sport_ltm: 21, ct_dst_src_ltm: 42, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 42,
        ct_srv_dst: 42, is_sm_ips_ports: 0, attack_cat: 'Exploits', label: 1
      },
      {
        id: 109, dur: 0.000006, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 700, dbytes: 0,
        rate: 166666.7, sttl: 254, dttl: 0, sload: 466666688, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.006, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 350, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 24, ct_state_ttl: 2, ct_dst_ltm: 24, ct_src_dport_ltm: 24,
        ct_dst_sport_ltm: 12, ct_dst_src_ltm: 24, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 24,
        ct_srv_dst: 24, is_sm_ips_ports: 0, attack_cat: 'Fuzzers', label: 1
      },
      {
        id: 110, dur: 0.000003, proto: 'udp', service: '-', state: 'INT', spkts: 2, dpkts: 0, sbytes: 1300, dbytes: 0,
        rate: 333333.3, sttl: 254, dttl: 0, sload: 1733333248, dload: 0, sloss: 0, dloss: 0, sinpkt: 0.003, dinpkt: 0,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 650, dmean: 0,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 48, ct_state_ttl: 2, ct_dst_ltm: 48, ct_src_dport_ltm: 48,
        ct_dst_sport_ltm: 24, ct_dst_src_ltm: 48, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 48,
        ct_srv_dst: 48, is_sm_ips_ports: 0, attack_cat: 'DoS Flood', label: 1
      }
    ]
  },
  {
    id: 'normal_traffic',
    name: 'Normal Enterprise Traffic Sample (10 Records)',
    description: 'Clean legitimate network flows comprising HTTP/HTTPS web surfing, DNS queries, SMTP mail, and SSH admin sessions.',
    count: 10,
    data: [
      {
        id: 201, dur: 0.612040, proto: 'tcp', service: 'http', state: 'FIN', spkts: 10, dpkts: 8, sbytes: 820, dbytes: 1350,
        rate: 29.41, sttl: 62, dttl: 252, sload: 10032.0, dload: 16502.0, sloss: 1, dloss: 1, sinpkt: 68.0, dinpkt: 87.4,
        sjit: 32.1, djit: 45.2, swin: 255, stcpb: 15482019, dtcpb: 49201847, dwin: 255, tcprtt: 0.074, synack: 0.039, ackdat: 0.035,
        smean: 82, dmean: 168, trans_depth: 1, response_body_len: 620, ct_srv_src: 1, ct_state_ttl: 0, ct_dst_ltm: 2,
        ct_src_dport_ltm: 1, ct_dst_sport_ltm: 1, ct_dst_src_ltm: 1, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 1,
        ct_src_ltm: 1, ct_srv_dst: 1, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 202, dur: 0.001045, proto: 'udp', service: 'dns', state: 'CON', spkts: 2, dpkts: 2, sbytes: 148, dbytes: 180,
        rate: 2870.8, sttl: 31, dttl: 29, sload: 566507.0, dload: 688995.0, sloss: 0, dloss: 0, sinpkt: 0.005, dinpkt: 0.005,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 74, dmean: 90,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 4, ct_state_ttl: 0, ct_dst_ltm: 2, ct_src_dport_ltm: 1,
        ct_dst_sport_ltm: 1, ct_dst_src_ltm: 2, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 2,
        ct_srv_dst: 4, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 203, dur: 0.784192, proto: 'tcp', service: 'http', state: 'FIN', spkts: 14, dpkts: 12, sbytes: 1640, dbytes: 9800,
        rate: 33.15, sttl: 62, dttl: 252, sload: 16730.0, dload: 99975.0, sloss: 2, dloss: 3, sinpkt: 60.3, dinpkt: 71.3,
        sjit: 22.8, djit: 16.5, swin: 255, stcpb: 74920184, dtcpb: 20394819, dwin: 255, tcprtt: 0.063, synack: 0.032, ackdat: 0.031,
        smean: 117, dmean: 816, trans_depth: 1, response_body_len: 3950, ct_srv_src: 2, ct_state_ttl: 0, ct_dst_ltm: 3,
        ct_src_dport_ltm: 1, ct_dst_sport_ltm: 1, ct_dst_src_ltm: 2, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 1,
        ct_src_ltm: 2, ct_srv_dst: 2, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 204, dur: 1.050412, proto: 'tcp', service: 'ftp', state: 'FIN', spkts: 22, dpkts: 18, sbytes: 2600, dbytes: 1740,
        rate: 38.08, sttl: 62, dttl: 252, sload: 19801.0, dload: 13252.0, sloss: 1, dloss: 1, sinpkt: 50.0, dinpkt: 61.8,
        sjit: 15.3, djit: 24.2, swin: 255, stcpb: 20491827, dtcpb: 87192038, dwin: 255, tcprtt: 0.080, synack: 0.043, ackdat: 0.037,
        smean: 118, dmean: 96, trans_depth: 0, response_body_len: 0, ct_srv_src: 1, ct_state_ttl: 0, ct_dst_ltm: 1,
        ct_src_dport_ltm: 1, ct_dst_sport_ltm: 1, ct_dst_src_ltm: 1, is_ftp_login: 1, ct_ftp_cmd: 3, ct_flw_http_mthd: 0,
        ct_src_ltm: 1, ct_srv_dst: 1, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 205, dur: 0.001120, proto: 'udp', service: 'dns', state: 'CON', spkts: 2, dpkts: 2, sbytes: 136, dbytes: 168,
        rate: 2678.5, sttl: 31, dttl: 29, sload: 485714.0, dload: 600000.0, sloss: 0, dloss: 0, sinpkt: 0.006, dinpkt: 0.006,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 68, dmean: 84,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 3, ct_state_ttl: 0, ct_dst_ltm: 2, ct_src_dport_ltm: 1,
        ct_dst_sport_ltm: 1, ct_dst_src_ltm: 2, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 2,
        ct_srv_dst: 3, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 206, dur: 0.395120, proto: 'tcp', service: 'smtp', state: 'FIN', spkts: 12, dpkts: 10, sbytes: 1100, dbytes: 1980,
        rate: 55.68, sttl: 62, dttl: 252, sload: 22271.0, dload: 40089.0, sloss: 0, dloss: 0, sinpkt: 35.9, dinpkt: 43.9,
        sjit: 10.9, djit: 18.7, swin: 255, stcpb: 62910482, dtcpb: 82910244, dwin: 255, tcprtt: 0.058, synack: 0.030, ackdat: 0.028,
        smean: 91, dmean: 198, trans_depth: 0, response_body_len: 0, ct_srv_src: 1, ct_state_ttl: 0, ct_dst_ltm: 2,
        ct_src_dport_ltm: 1, ct_dst_sport_ltm: 1, ct_dst_src_ltm: 1, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0,
        ct_src_ltm: 1, ct_srv_dst: 1, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 207, dur: 0.620184, proto: 'tcp', service: 'http', state: 'FIN', spkts: 8, dpkts: 6, sbytes: 640, dbytes: 980,
        rate: 22.57, sttl: 62, dttl: 252, sload: 8255.0, dload: 12641.0, sloss: 1, dloss: 1, sinpkt: 88.6, dinpkt: 103.4,
        sjit: 18.9, djit: 27.5, swin: 255, stcpb: 81920473, dtcpb: 47291038, dwin: 255, tcprtt: 0.075, synack: 0.040, ackdat: 0.035,
        smean: 80, dmean: 163, trans_depth: 1, response_body_len: 410, ct_srv_src: 2, ct_state_ttl: 0, ct_dst_ltm: 3,
        ct_src_dport_ltm: 1, ct_dst_sport_ltm: 1, ct_dst_src_ltm: 2, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 1,
        ct_src_ltm: 2, ct_srv_dst: 2, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 208, dur: 0.298104, proto: 'tcp', service: 'ssh', state: 'FIN', spkts: 14, dpkts: 12, sbytes: 1650, dbytes: 2180,
        rate: 87.21, sttl: 62, dttl: 252, sload: 44279.0, dload: 58503.0, sloss: 0, dloss: 0, sinpkt: 22.9, dinpkt: 27.1,
        sjit: 7.2, djit: 12.0, swin: 255, stcpb: 38291024, dtcpb: 58291047, dwin: 255, tcprtt: 0.047, synack: 0.024, ackdat: 0.023,
        smean: 117, dmean: 181, trans_depth: 0, response_body_len: 0, ct_srv_src: 1, ct_state_ttl: 0, ct_dst_ltm: 1,
        ct_src_dport_ltm: 1, ct_dst_sport_ltm: 1, ct_dst_src_ltm: 1, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0,
        ct_src_ltm: 1, ct_srv_dst: 1, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 209, dur: 0.001090, proto: 'udp', service: 'dns', state: 'CON', spkts: 2, dpkts: 2, sbytes: 142, dbytes: 174,
        rate: 2752.3, sttl: 31, dttl: 29, sload: 521100.0, dload: 638532.0, sloss: 0, dloss: 0, sinpkt: 0.005, dinpkt: 0.005,
        sjit: 0, djit: 0, swin: 0, stcpb: 0, dtcpb: 0, dwin: 0, tcprtt: 0, synack: 0, ackdat: 0, smean: 71, dmean: 87,
        trans_depth: 0, response_body_len: 0, ct_srv_src: 5, ct_state_ttl: 0, ct_dst_ltm: 3, ct_src_dport_ltm: 1,
        ct_dst_sport_ltm: 1, ct_dst_src_ltm: 3, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 0, ct_src_ltm: 3,
        ct_srv_dst: 5, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      },
      {
        id: 210, dur: 0.498210, proto: 'tcp', service: 'http', state: 'FIN', spkts: 10, dpkts: 8, sbytes: 780, dbytes: 1390,
        rate: 36.13, sttl: 62, dttl: 252, sload: 12524.0, dload: 22319.0, sloss: 1, dloss: 1, sinpkt: 55.3, dinpkt: 71.1,
        sjit: 15.4, djit: 28.2, swin: 255, stcpb: 30192847, dtcpb: 91827364, dwin: 255, tcprtt: 0.067, synack: 0.034, ackdat: 0.033,
        smean: 78, dmean: 173, trans_depth: 1, response_body_len: 680, ct_srv_src: 2, ct_state_ttl: 0, ct_dst_ltm: 2,
        ct_src_dport_ltm: 1, ct_dst_sport_ltm: 1, ct_dst_src_ltm: 2, is_ftp_login: 0, ct_ftp_cmd: 0, ct_flw_http_mthd: 1,
        ct_src_ltm: 2, ct_srv_dst: 2, is_sm_ips_ports: 0, attack_cat: 'Normal', label: 0
      }
    ]
  }
];
