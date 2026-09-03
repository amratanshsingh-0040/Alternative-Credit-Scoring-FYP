import { useState } from 'react'
import { Brain, ChevronDown, TrendingDown, TrendingUp, AlertCircle, Loader2 } from 'lucide-react'
import ScoreGauge from '../components/ScoreGauge'
import { predictCreditScore } from '../services/api'

const TABS = ['Traditional', 'Alternative', 'Combined']

const FIELDS = {
  Traditional: [
    { key: 'amt_income_total', label: 'Annual Income (₹)', placeholder: '300000', type: 'number' },
    { key: 'amt_credit', label: 'Loan Amount Requested (₹)', placeholder: '500000', type: 'number' },
    { key: 'amt_annuity', label: 'Monthly Annuity (₹)', placeholder: '25000', type: 'number' },
    { key: 'amt_goods_price', label: 'Goods Price (₹)', placeholder: '450000', type: 'number' },
    { key: 'days_birth', label: 'Age (years)', placeholder: '30', type: 'number' },
    { key: 'days_employed', label: 'Years Employed', placeholder: '5', type: 'number' },
    { key: 'cnt_children', label: 'Number of Children', placeholder: '0', type: 'number' },
    { key: 'cnt_fam_members', label: 'Family Members', placeholder: '2', type: 'number' },
  ],
  Alternative: [
    { key: 'ext_source_1', label: 'External Score 1 (0–1)', placeholder: '0.60', type: 'number', step: '0.01', min: 0, max: 1 },
    { key: 'ext_source_2', label: 'External Score 2 (0–1)', placeholder: '0.55', type: 'number', step: '0.01', min: 0, max: 1 },
    { key: 'ext_source_3', label: 'External Score 3 (0–1)', placeholder: '0.50', type: 'number', step: '0.01', min: 0, max: 1 },
    { key: 'days_registration', label: 'Address Stability (years)', placeholder: '7', type: 'number' },
    { key: 'days_id_publish', label: 'ID Document Age (years)', placeholder: '5', type: 'number' },
    { key: 'days_last_phone_change', label: 'Phone Recency (years)', placeholder: '1', type: 'number' },
    { key: 'flag_mobil', label: 'Mobile Phone?', placeholder: '', type: 'select', options: ['Yes', 'No'] },
    { key: 'flag_email', label: 'Email Provided?', placeholder: '', type: 'select', options: ['Yes', 'No'] },
    { key: 'hour_appr_process_start', label: 'Application Hour (0–23)', placeholder: '10', type: 'number', min: 0, max: 23 },
    { key: 'bureau_year_enquiries', label: 'Bureau Enquiries This Year', placeholder: '0', type: 'number', min: 0 },
  ],
  Combined: null, // renders both
}

const DEFAULT_VALUES = {
  amt_income_total: '300000', amt_credit: '500000', amt_annuity: '25000', amt_goods_price: '450000',
  days_birth: '30', days_employed: '5', cnt_children: '0', cnt_fam_members: '2',
  ext_source_1: '0.60', ext_source_2: '0.55', ext_source_3: '0.50',
  days_registration: '7', days_id_publish: '5', days_last_phone_change: '1',
  flag_mobil: 'Yes', flag_email: 'Yes', hour_appr_process_start: '10', bureau_year_enquiries: '0',
}

function FieldGroup({ fields, values, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {fields.map(({ key, label, placeholder, type, step, min, max, options }) => (
        <div key={key}>
          <label className="label">{label}</label>
          {type === 'select' ? (
            <div className="relative">
              <select
                className="input-field appearance-none pr-8"
                value={values[key] ?? 'Yes'}
                onChange={e => onChange(key, e.target.value)}
              >
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
            </div>
          ) : (
            <input
              type="number"
              className="input-field"
              placeholder={placeholder}
              step={step || '1'}
              min={min}
              max={max}
              value={values[key] ?? placeholder}
              onChange={e => onChange(key, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Predict() {
  const [activeTab, setActiveTab] = useState('Combined')
  const [values, setValues] = useState(DEFAULT_VALUES)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (key, val) => setValues(prev => ({ ...prev, [key]: val }))

  const getFields = (tab) => {
    if (tab === 'Combined') return [...FIELDS.Traditional, ...FIELDS.Alternative]
    return FIELDS[tab]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const payload = {
        modality: activeTab,
        ...Object.fromEntries(
          Object.entries(values).map(([k, v]) => [k, isNaN(v) || v === '' ? v : parseFloat(v)])
        )
      }
      const data = await predictCreditScore(payload)
      setResult(data)
    } catch (err) {
      setError('Prediction failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getTierLabel = (score) => {
    if (score >= 750) return { label: 'Prime Tier', cls: 'badge-prime', recommendation: 'Eligible for standard micro-credit loan products.' }
    if (score >= 620) return { label: 'Near-Prime Tier', cls: 'badge-near', recommendation: 'Eligible for structured peer-to-peer lending.' }
    return { label: 'Sub-Prime Tier', cls: 'badge-sub', recommendation: 'Recommended for collateralized or secured loan products.' }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 bg-emerald-500/20 rounded-xl flex items-center justify-center">
            <Brain size={20} className="text-emerald-400" />
          </div>
          <h1 className="section-title mb-0">Credit Score Predictor</h1>
        </div>
        <p className="section-subtitle ml-12">
          Enter applicant details to generate a Provisional Credit Score (300–900) powered by XGBoost.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-3 card">
          {/* Feature Set Tabs */}
          <div className="flex gap-1 bg-navy-900 rounded-xl p-1 mb-6">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all duration-200
                  ${activeTab === tab ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-gray-400 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === 'Combined' ? (
              <>
                <div>
                  <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">Traditional Features</p>
                  <FieldGroup fields={FIELDS.Traditional} values={values} onChange={handleChange} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-3">Alternative Behavioral Features</p>
                  <FieldGroup fields={FIELDS.Alternative} values={values} onChange={handleChange} />
                </div>
              </>
            ) : (
              <FieldGroup fields={getFields(activeTab)} values={values} onChange={handleChange} />
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Analyzing...</>
              ) : (
                <><Brain size={18} /> Generate Credit Score</>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          )}
        </div>

        {/* Result Panel */}
        <div className="lg:col-span-2 space-y-4">
          {result ? (
            <>
              <div className="card border-emerald-500/20 text-center animate-slide-up">
                <ScoreGauge score={result.score} />
                <div className="mt-4 space-y-2">
                  {(() => {
                    const tier = getTierLabel(result.score)
                    return (
                      <>
                        <span className={`${tier.cls} border inline-block`}>{tier.label}</span>
                        <p className="text-xs text-gray-400 mt-2">{tier.recommendation}</p>
                      </>
                    )
                  })()}
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="text-center">
                      <div className="text-red-400 font-bold font-mono text-lg">
                        {(result.default_probability * 100).toFixed(1)}%
                      </div>
                      <div className="text-gray-500 text-xs">Default Risk</div>
                    </div>
                    <div className="text-center">
                      <div className="text-emerald-400 font-bold font-mono text-lg">
                        {((1 - result.default_probability) * 100).toFixed(1)}%
                      </div>
                      <div className="text-gray-500 text-xs">Repay Probability</div>
                    </div>
                  </div>
                  {result.is_thin_file && (
                    <div className="mt-3 text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-lg px-3 py-2">
                      ⚡ Thin-File Borrower detected — Alternative data model applied.
                    </div>
                  )}
                </div>
              </div>

              {/* SHAP Factors */}
              <div className="card">
                <h3 className="text-sm font-semibold text-white mb-4">Key AI Factors</h3>
                <div className="space-y-3">
                  {result.shap_factors.map((f, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400 truncate mr-2">{f.feature}</span>
                        <span className={`text-xs font-medium flex items-center gap-1 shrink-0
                          ${f.direction === 'positive' ? 'text-emerald-400' : 'text-red-400'}`}>
                          {f.direction === 'positive' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                          {f.direction === 'positive' ? '↑ Helps' : '↓ Hurts'}
                        </span>
                      </div>
                      <div className="w-full bg-navy-900 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${f.direction === 'positive' ? 'bg-emerald-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(100, Math.abs(f.impact) * 250)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 text-xs mt-4">
                  * SHAP-based explanation — demo mode. Connect FastAPI backend for real SHAP values.
                </p>
              </div>
            </>
          ) : (
            <div className="card h-full min-h-[320px] flex flex-col items-center justify-center text-center">
              <Brain size={40} className="text-navy-600 mb-4" />
              <p className="text-gray-500 text-sm">Fill in the form and click</p>
              <p className="text-gray-400 font-medium text-sm mt-1">"Generate Credit Score"</p>
              <p className="text-gray-600 text-xs mt-4">Score range: 300–900<br />Powered by XGBoost + SHAP</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
