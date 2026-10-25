import React, { useState, useMemo } from 'react';
import { predictSingleFlow } from '../utils/mlEngine';
import { NetworkFlowRecord } from '../types/cybersecurity';
import { Sliders, AlertTriangle, CheckCircle2, RotateCcw, ShieldCheck, Flame } from 'lucide-react';

interface SingleFlowTesterProps {
  selectedModel: 'Random Forest' | 'Logistic Regression';
}

export const SingleFlowTester: React.FC<SingleFlowTesterProps> = ({ selectedModel }) => {
  const initialValues: NetworkFlowRecord = {
    sttl: 254,
    dttl: 0,
    sload: 180000000,
    rate: 90000,
    ct_dst_src_ltm: 24,
    ct_srv_dst: 20,
    ct_dst_sport_ltm: 12,
    dur: 0.00001,
    sbytes: 500,
    proto: 'udp',
    state: 'INT',
    service: '-'
  };

  const [flow, setFlow] = useState<NetworkFlowRecord>(initialValues);

  const prediction = useMemo(() => {
    return predictSingleFlow(flow, selectedModel);
  }, [flow, selectedModel]);

  const isAttack = prediction.predictedClass === 'Attack';

  const resetToNormalPreset = () => {
    setFlow({
      sttl: 62,
      dttl: 252,
      sload: 12000,
      rate: 32,
      ct_dst_src_ltm: 1,
      ct_srv_dst: 2,
      ct_dst_sport_ltm: 1,
      dur: 0.52,
      sbytes: 820,
      proto: 'tcp',
      state: 'FIN',
      service: 'http'
    });
  };

  const resetToAttackPreset = () => {
    setFlow(initialValues);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            Interactive Network Flow Simulator &amp; Inspector
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tune critical flow variables and watch the ML decision pipeline evaluate the attack probability and identify threat vectors in real time.
          </p>
        </div>

        {/* Preset buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetToNormalPreset}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Normal Web Preset
          </button>
          <button
            type="button"
            onClick={resetToAttackPreset}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition-all flex items-center gap-1.5"
          >
            <Flame className="w-3.5 h-3.5" /> Cyberattack Preset
          </button>
        </div>
      </div>

      {/* Main Grid: Controls vs Real-time Outcome */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-2 rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-6">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center justify-between">
            <span>Primary Feature Inputs (Ranked by Model Importance)</span>
            <button
              onClick={resetToAttackPreset}
              className="text-slate-500 hover:text-slate-300 text-xs flex items-center gap-1 font-normal lowercase"
            >
              <RotateCcw className="w-3 h-3" /> reset
            </button>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* sttl: Source TTL */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">sttl (Source Time To Live)</span>
                <span className="font-mono text-cyan-400 font-bold">{flow.sttl}</span>
              </div>
              <input
                type="range"
                min="0"
                max="255"
                value={Number(flow.sttl ?? 0)}
                onChange={(e) => setFlow({ ...flow, sttl: Number(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500">
                UNSW-NB15 note: Attack generators frequently emit sttl=254, while normal web hosts use sttl=62 or 31.
              </p>
            </div>

            {/* ct_dst_src_ltm: #1 feature */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">ct_dst_src_ltm (Conn Recurrence)</span>
                <span className="font-mono text-cyan-400 font-bold">{flow.ct_dst_src_ltm}</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={Number(flow.ct_dst_src_ltm ?? 1)}
                onChange={(e) => setFlow({ ...flow, ct_dst_src_ltm: Number(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500">
                Number of connections from same destination to source IP in last 100 records (Top RF Feature).
              </p>
            </div>

            {/* sload: Source Bits/sec */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">sload (Source Bits/sec)</span>
                <span className="font-mono text-cyan-400 font-bold">
                  {((Number(flow.sload ?? 0)) / 1_000_000).toFixed(1)} Mbps
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="1000000000"
                step="5000000"
                value={Number(flow.sload ?? 0)}
                onChange={(e) => setFlow({ ...flow, sload: Number(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500">
                High volumetric bandwidth indicative of DoS floods or large unauthorized exfiltration.
              </p>
            </div>

            {/* rate: Transmission Packet Rate */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">rate (Packets / Second)</span>
                <span className="font-mono text-cyan-400 font-bold">{Number(flow.rate ?? 0).toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1"
                max="350000"
                step="5000"
                value={Number(flow.rate ?? 0)}
                onChange={(e) => setFlow({ ...flow, rate: Number(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500">
                Extreme packet frequency indicates automated scanner tools or flood scripts.
              </p>
            </div>

            {/* Connection State Dropdown */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="block text-xs font-semibold text-slate-300">state (Connection State)</label>
              <select
                value={String(flow.state ?? 'INT')}
                onChange={(e) => setFlow({ ...flow, state: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="INT">INT - Interrupted / Half-Open (Suspicious)</option>
                <option value="FIN">FIN - Normal Finished TCP Session</option>
                <option value="CON">CON - Established Connected Flow</option>
                <option value="REQ">REQ - Request Pending</option>
                <option value="RST">RST - Connection Reset</option>
              </select>
              <p className="text-[10px] text-slate-500">
                State INT is heavily correlated with port sweeps and forged packets.
              </p>
            </div>

            {/* Protocol Dropdown */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="block text-xs font-semibold text-slate-300">proto (Protocol)</label>
              <select
                value={String(flow.proto ?? 'udp')}
                onChange={(e) => setFlow({ ...flow, proto: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="tcp">TCP (Transmission Control Protocol)</option>
                <option value="udp">UDP (User Datagram Protocol)</option>
                <option value="unas">UNAS (Unassigned / Raw)</option>
                <option value="ospf">OSPF (Open Shortest Path First)</option>
                <option value="arp">ARP (Address Resolution)</option>
              </select>
              <p className="text-[10px] text-slate-500">
                Attacks use UDP amplification or unassigned protocols to bypass simple firewalls.
              </p>
            </div>
          </div>
        </div>

        {/* Real-Time Prediction Gauge Card */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-4 flex items-center justify-between">
              <span>Real-Time Inference</span>
              <span className="font-mono text-cyan-400 text-[10px]">{selectedModel}</span>
            </div>

            {/* Threat Gauge */}
            <div className="text-center py-4">
              <div
                className={`inline-flex items-center justify-center w-28 h-28 rounded-full border-4 shadow-xl transition-all duration-300 mb-4 ${
                  isAttack
                    ? 'border-rose-500/80 bg-rose-950/30 text-rose-400 shadow-rose-500/20'
                    : 'border-emerald-500/80 bg-emerald-950/30 text-emerald-400 shadow-emerald-500/20'
                }`}
              >
                <div>
                  <div className="text-2xl font-black font-mono tracking-tight">
                    {prediction.attackProbability.toFixed(1)}%
                  </div>
                  <div className="text-[10px] uppercase font-semibold text-slate-400">Threat Score</div>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    isAttack
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {isAttack ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  Classified: {prediction.predictedClass} Traffic
                </span>
              </div>
            </div>

            {/* Risk Drivers */}
            <div className="space-y-2 mt-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Active Heuristic Indicators:
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {prediction.topRiskFactors.map((rf, idx) => (
                  <div
                    key={idx}
                    className={`text-xs p-2 rounded-lg border ${
                      isAttack
                        ? 'bg-rose-950/20 border-rose-500/20 text-rose-300'
                        : 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {rf}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            <strong>Interactive Experiment:</strong> Try moving <code className="text-cyan-300">sttl</code> from 254 down to 62, or switching state to <code className="text-cyan-300">FIN</code> to see the classification flip from Attack to Normal!
          </div>
        </div>
      </div>
    </div>
  );
};
