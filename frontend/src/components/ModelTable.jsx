import { MODEL_RESULTS, MODALITY_COLORS } from './modelData'
import { Trophy } from 'lucide-react'

export default function ModelTable({ metric = 'overallAUC' }) {
  const sorted = [...MODEL_RESULTS].sort((a, b) => b[metric] - a[metric])

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-navy-600">
            <th className="pb-3 text-gray-400 font-medium">Modality</th>
            <th className="pb-3 text-gray-400 font-medium">Algorithm</th>
            <th className="pb-3 text-gray-400 font-medium text-right">Overall AUC</th>
            <th className="pb-3 text-gray-400 font-medium text-right">Thin-File AUC</th>
            <th className="pb-3 text-gray-400 font-medium text-right">F1</th>
            <th className="pb-3 text-gray-400 font-medium text-right">Precision</th>
            <th className="pb-3 text-gray-400 font-medium text-right">Recall</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-navy-700/50 transition-colors
                ${row.champion ? 'bg-emerald-500/5 border-l-2 border-l-emerald-500' : 'hover:bg-navy-700/30'}`}
            >
              <td className="py-3">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded"
                  style={{
                    background: MODALITY_COLORS[row.modality] + '22',
                    color: MODALITY_COLORS[row.modality],
                  }}
                >
                  {row.modality}
                </span>
              </td>
              <td className="py-3 text-gray-200 flex items-center gap-1.5">
                {row.champion && <Trophy size={13} className="text-emerald-400" />}
                {row.algorithm}
              </td>
              <td className="py-3 text-right font-mono text-gray-200">{row.overallAUC.toFixed(4)}</td>
              <td className={`py-3 text-right font-mono font-bold ${row.champion ? 'text-emerald-400' : 'text-gray-200'}`}>
                {row.thinFileAUC.toFixed(4)}
              </td>
              <td className="py-3 text-right font-mono text-gray-400">{row.overallF1.toFixed(4)}</td>
              <td className="py-3 text-right font-mono text-gray-400">{row.precision.toFixed(4)}</td>
              <td className="py-3 text-right font-mono text-gray-400">{row.recall.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
