import { useState } from 'react'
import { BarChart3, LayoutGrid, Trophy } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine
} from 'recharts'
import ModelTable from '../components/ModelTable'
import { MODEL_RESULTS, MODALITY_COLORS } from '../components/modelData'

const METRICS = [
  { key: 'overallAUC', label: 'Overall ROC-AUC' },
  { key: 'thinFileAUC', label: 'Thin-File ROC-AUC' },
  { key: 'overallF1', label: 'Overall F1' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-navy-800 border border-navy-600 rounded-xl p-3 text-xs shadow-xl">
      <p className="font-semibold text-white mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span style={{ color: p.color }}>●</span>
          <span className="text-gray-300">{p.name}:</span>
          <span className="font-mono font-bold text-white">{Number(p.value).toFixed(4)}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [metric, setMetric] = useState('thinFileAUC')
  const [view, setView] = useState('chart')

  const chartData = MODEL_RESULTS.map(r => ({
    name: r.algorithm.replace(' ', '\n'),
    modality: r.modality,
    [r.modality]: r[metric],
    fullName: `${r.modality} · ${r.algorithm}`,
    isChampion: r.champion,
  }))

  // Group by algorithm for grouped bar chart
  const algorithms = ['Logistic Regression', 'Random Forest', 'XGBoost']
  const groupedData = algorithms.map(algo => {
    const row = { algo }
    MODEL_RESULTS.filter(r => r.algorithm === algo).forEach(r => {
      row[r.modality] = r[metric]
    })
    return row
  })

  const best = MODEL_RESULTS.find(r => r.champion)

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <BarChart3 size={20} className="text-purple-400" />
            </div>
            <h1 className="section-title mb-0">Model Benchmark Dashboard</h1>
          </div>
          <p className="section-subtitle ml-12">
            9 experiments across 3 feature modalities × 3 ML algorithms on 307,511 loan applications.
          </p>
        </div>
        {/* View toggle */}
        <div className="flex gap-1 bg-navy-800 border border-navy-600 rounded-xl p-1 self-start">
          <button
            onClick={() => setView('chart')}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all ${view === 'chart' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <BarChart3 size={14} /> Chart
          </button>
          <button
            onClick={() => setView('table')}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all ${view === 'table' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <LayoutGrid size={14} /> Table
          </button>
        </div>
      </div>

      {/* Champion banner */}
      {best && (
        <div className="card border-emerald-500/30 bg-emerald-500/5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Trophy size={22} className="text-emerald-400 shrink-0" />
            <div>
              <p className="text-white font-semibold text-sm">🏆 Best Model: Combined + XGBoost</p>
              <p className="text-gray-400 text-xs mt-0.5">
                Achieved highest Thin-File ROC-AUC of <strong className="text-emerald-400">0.7625</strong> and
                Overall ROC-AUC of <strong className="text-emerald-400">0.7614</strong> — a +5.79% lift over traditional XGBoost (0.7046).
              </p>
            </div>
          </div>
          <div className="flex gap-4 shrink-0">
            {[{ label: 'Thin-File AUC', value: '0.7625' }, { label: 'Overall AUC', value: '0.7614' }, { label: 'F1-Score', value: '0.2603' }].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-emerald-400 font-mono font-bold">{s.value}</div>
                <div className="text-gray-500 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metric selector */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {METRICS.map(m => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={`text-xs font-medium px-4 py-2 rounded-lg border transition-all
              ${metric === m.key
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                : 'border-navy-600 text-gray-400 hover:border-navy-500 hover:text-white'}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {view === 'chart' ? (
        <div className="card mb-6">
          <h3 className="text-sm font-semibold text-white mb-6">
            {METRICS.find(m => m.key === metric)?.label} — Grouped by Algorithm
          </h3>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={groupedData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2d52" />
              <XAxis dataKey="algo" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis
                domain={[0.6, 0.8]}
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickFormatter={v => v.toFixed(2)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#9ca3af', fontSize: '12px' }} />
              <ReferenceLine y={0.7046} stroke="#6b7280" strokeDasharray="4 4" label={{ value: 'Trad. Baseline', fill: '#6b7280', fontSize: 10 }} />
              {['Traditional', 'Alternative', 'Combined'].map(mod => (
                <Bar key={mod} dataKey={mod} fill={MODALITY_COLORS[mod]} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-600 mt-3 text-center">
            Dashed line = Traditional XGBoost baseline (0.7046). Alternative and Combined modalities exceed this threshold.
          </p>
        </div>
      ) : (
        <div className="card mb-6">
          <ModelTable metric={metric} />
        </div>
      )}

      {/* Insight cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Alternative > Traditional', value: '+3.59%', desc: 'AUC improvement for thin-file borrowers using behavioral data over traditional credit features.', color: 'text-yellow-400' },
          { label: 'Combined Synergy', value: '+5.79%', desc: 'AUC lift when combining both feature modalities vs. traditional-only approach.', color: 'text-emerald-400' },
          { label: 'Thin-File Accuracy', value: '76.25%', desc: 'ROC-AUC for the 113,320 thin-file borrower subgroup with zero credit bureau history.', color: 'text-purple-400' },
        ].map(({ label, value, desc, color }) => (
          <div key={label} className="card">
            <div className={`text-2xl font-bold font-mono ${color} mb-1`}>{value}</div>
            <div className="text-white text-sm font-medium mb-1">{label}</div>
            <div className="text-gray-400 text-xs leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
