import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { 
  Rocket, 
  GitBranch, 
  Activity,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Database,
  Cpu,
  ChevronRight,
  CheckCircle,
  Zap,
  Target,
  RotateCcw
} from 'lucide-react';

const rolloutData = [
  { name: '0%', traffic: 100, stable: 100, canary: 0 },
  { name: '20%', traffic: 100, stable: 80, canary: 20 },
  { name: '40%', traffic: 100, stable: 60, canary: 40 },
  { name: '60%', traffic: 100, stable: 40, canary: 60 },
  { name: '80%', traffic: 100, stable: 20, canary: 80 },
  { name: '100%', traffic: 100, stable: 0, canary: 100 },
];

const KPI_CARDS = [
  { title: 'Active Rollouts', value: '12', trend: '+2', color: 'indigo', icon: Rocket },
  { title: 'Downtime Savings', value: '100%', trend: 'Optimum', color: 'indigo', icon: CheckCircle },
  { title: 'Avg Shift Time', value: '8.4m', trend: '-1.2m', color: 'indigo', icon: Clock },
  { title: 'Success Velocity', 99.98: '99.98%', trend: '+0.01%', color: 'indigo', icon: Activity },
];

const DeploymentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Release Command Center</h1>
          <p className="text-slate-400">Enterprise-grade zero-downtime orchestration, traffic shifting, and automated rollback governance.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-slate-800">
            Export Release Log
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-600/20">
            Initiate Canary Deployment
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-indigo-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-indigo-400`} />
              </div>
              <div className={`text-xs font-medium text-indigo-400`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value || card['99.98']}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Shift Visualization */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Canary Traffic Shift Analysis</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rolloutData}>
                <defs>
                  <linearGradient id="colorCanary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="canary" stroke="#6366f1" fill="url(#colorCanary)" name="Canary Traffic (%)" />
                <Area type="monotone" dataKey="stable" stroke="#334155" fill="none" name="Stable Traffic (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strategy Distribution */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Deployment Strategy Usage</h3>
          <div className="flex-1 space-y-6">
            {[
              { label: 'Blue/Green Deployment', score: 45, color: 'bg-indigo-500', status: 'ACTIVE' },
              { label: 'Canary (Progressive Rollout)', score: 35, color: 'bg-indigo-500', status: 'STABLE' },
              { label: 'Rolling Updates', score: 15, color: 'bg-indigo-600', status: 'READY' },
              { label: 'Shadow (Dark Launch)', score: 5, color: 'bg-slate-600', status: 'IDLE' },
            ].map((node) => (
              <div key={node.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{node.label}</span>
                  <span className="text-slate-400 font-bold">{node.score}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${node.color}`} style={{ width: `${node.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex gap-3">
            <Zap className="text-indigo-400 shrink-0" size={18} />
            <p className="text-xs text-slate-400">Rollback Status: <span className="text-indigo-400 font-bold">Automatic Reversion</span> configured for error rates > 2% during canary phase.</p>
          </div>
        </div>
      </div>

      {/* Deployment Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Live Release Pipeline</h3>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">View History</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Service / Cluster</th>
                <th className="px-6 py-4 font-semibold">Version</th>
                <th className="px-6 py-4 font-semibold">Strategy</th>
                <th className="px-6 py-4 font-semibold">Traffic Split</th>
                <th className="px-6 py-4 font-semibold">Health</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { service: 'payment-api-prod', cluster: 'EKS-East-01', version: 'v2.4.1', strategy: 'BLUE_GREEN', split: 'B:100% G:0%', health: 'OPTIMAL' },
                { service: 'auth-svc-global', cluster: 'EKS-Central-02', version: 'v1.9.0', strategy: 'CANARY', split: 'S:90% C:10%', health: 'MONITORING' },
                { service: 'order-worker', cluster: 'EKS-West-04', version: 'v4.2.2', strategy: 'ROLLING', split: '5/10 Nodes', health: 'HEALTHY' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-200">{row.service}</span>
                      <span className="text-xs text-slate-500">{row.cluster}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400 tracking-widest uppercase">{row.version}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold px-2 py-1 rounded border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                      {row.strategy}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-300 font-bold">{row.split}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${row.health === 'OPTIMAL' ? 'bg-indigo-400 animate-pulse' : 'bg-indigo-600'}`}></div>
                      <span className="text-xs font-bold text-slate-400">{row.health}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-indigo-400 hover:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                      Orchestrate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeploymentDashboard;
