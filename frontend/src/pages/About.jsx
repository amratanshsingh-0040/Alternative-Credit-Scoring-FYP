import { GraduationCap, Mail, BookOpen, Database, Cpu, FlaskConical } from 'lucide-react'

const traditionalFeatures = [
  'AMT_INCOME_TOTAL — Annual Income', 'AMT_CREDIT — Loan Amount', 'AMT_ANNUITY — Monthly Annuity',
  'AMT_GOODS_PRICE — Goods Price', 'DAYS_BIRTH — Age', 'DAYS_EMPLOYED — Employment Duration',
  'CNT_CHILDREN — Children Count', 'CNT_FAM_MEMBERS — Family Size',
  'Credit-to-Income Ratio (engineered)', 'Credit Term Ratio (engineered)',
]
const alternativeFeatures = [
  'EXT_SOURCE_1 — External Behavioral Score 1', 'EXT_SOURCE_2 — External Behavioral Score 2',
  'EXT_SOURCE_3 — External Behavioral Score 3', 'EXT Mean & Std (engineered)',
  'DAYS_REGISTRATION — Address Stability', 'DAYS_ID_PUBLISH — ID Document Age',
  'DAYS_LAST_PHONE_CHANGE — Phone Recency', 'FLAG_MOBIL — Mobile Contactability',
  'FLAG_EMAIL — Email Contactability', 'HOUR_APPR_PROCESS_START — Application Hour',
  'DEF_30_CNT / OBS_30_CNT — Social Default Ratio (engineered)',
]

const timeline = [
  { phase: 'Phase 1', title: 'Dataset & Thin-File Formulation', desc: 'Ingested 307,511 rows from Kaggle Home Credit dataset. Defined deterministic thin-file criterion isolating 113,320 applicants.', icon: Database },
  { phase: 'Phase 2', title: 'Feature Engineering', desc: 'Created 19 Traditional and 20 Alternative features. Engineered Credit-to-Income ratio, Social Default Ratio, and EXT aggregates.', icon: FlaskConical },
  { phase: 'Phase 3', title: 'ML Benchmarking (Paper 1)', desc: 'Trained and compared 9 model configurations. Combined XGBoost achieved 0.7625 Thin-File ROC-AUC — best across all experiments.', icon: Cpu },
]

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
          Final Year Project — 2025
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">About This Research</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
          This Final Year Project investigates whether alternative behavioral data can replace traditional credit bureau
          histories for predicting loan default risk in thin-file borrowers — enabling financial inclusion for 1.4 billion
          credit-invisible adults globally.
        </p>
      </div>

      {/* Author Card */}
      <div className="card border-emerald-500/20 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
            <span className="text-white font-bold text-2xl">AS</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">Amratansh Singh</h2>
            <p className="text-emerald-400 text-sm font-medium">Department of Information Technology</p>
            <p className="text-gray-400 text-sm">ABES Engineering College, Ghaziabad, Uttar Pradesh, India</p>
            <div className="flex items-center gap-2 mt-2">
              <Mail size={13} className="text-gray-500" />
              <a href="mailto:amratansh.23b0131136@abes.ac.in" className="text-gray-400 text-xs hover:text-emerald-400 transition-colors">
                amratansh.23b0131136@abes.ac.in
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <GraduationCap size={16} className="text-emerald-400" />
            <span>B.Tech Final Year, 2025</span>
          </div>
        </div>
      </div>

      {/* Research Paper Summary */}
      <div className="card mb-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 bg-purple-500/20 rounded-xl flex items-center justify-center">
            <BookOpen size={16} className="text-purple-400" />
          </div>
          <h2 className="text-lg font-bold text-white">Research Paper 1</h2>
        </div>
        <h3 className="text-sm font-medium text-gray-300 italic mb-3">
          "Comparative Credit Risk Prediction Using Traditional and Alternative Data for Thin-File Borrowers"
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          This paper benchmarks 9 ML model configurations across 3 feature modalities on the Home Credit Default Risk dataset.
          The core finding is that <strong className="text-white">Combined XGBoost</strong> achieves the highest predictive
          accuracy (<strong className="text-emerald-400">0.7625 Thin-File ROC-AUC</strong>), proving that alternative behavioral
          data meaningfully improves credit scoring for thin-file borrowers.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Dataset', value: 'Home Credit (Kaggle)' },
            { label: 'Applicants', value: '307,511 total' },
            { label: 'Thin-File', value: '113,320 (36.85%)' },
            { label: 'Best Model', value: 'Combined XGBoost' },
            { label: 'Best AUC', value: '0.7625 (Thin-File)' },
            { label: 'Format', value: 'IEEE Two-Column' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-navy-900 rounded-xl p-3">
              <div className="text-xs text-gray-500 mb-0.5">{label}</div>
              <div className="text-sm text-white font-medium">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Taxonomy */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-4">
            Traditional Features (19 Dimensions)
          </h3>
          <ul className="space-y-2">
            {traditionalFeatures.map(f => (
              <li key={f} className="text-xs text-gray-400 flex items-start gap-2">
                <span className="text-indigo-500 mt-0.5 shrink-0">▸</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-4">
            Alternative Features (20 Dimensions)
          </h3>
          <ul className="space-y-2">
            {alternativeFeatures.map(f => (
              <li key={f} className="text-xs text-gray-400 flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5 shrink-0">▸</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Research Timeline */}
      <div className="card mb-8">
        <h2 className="text-lg font-bold text-white mb-6">Research Timeline</h2>
        <div className="space-y-6">
          {timeline.map(({ phase, title, desc, icon: Icon }, i) => (
            <div key={phase} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-emerald-400" />
                </div>
                {i < timeline.length - 1 && <div className="w-px flex-1 bg-navy-600 mt-3" />}
              </div>
              <div className="pb-6">
                <span className="text-xs text-emerald-500 font-mono font-medium">{phase}</span>
                <h3 className="text-white font-semibold text-sm mt-0.5 mb-1">{title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="card">
        <h2 className="text-lg font-bold text-white mb-4">Technology Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { cat: 'Frontend', items: 'React 18, Vite, Tailwind CSS, Recharts' },
            { cat: 'Backend', items: 'Node.js, Express.js, MySQL' },
            { cat: 'ML Service', items: 'Python, FastAPI, Scikit-learn, XGBoost' },
            { cat: 'Explainability', items: 'SHAP (TreeSHAP), LIME, Fairlearn' },
          ].map(({ cat, items }) => (
            <div key={cat} className="bg-navy-900 rounded-xl p-3">
              <div className="text-xs text-emerald-500 font-medium mb-1">{cat}</div>
              <div className="text-xs text-gray-400 leading-relaxed">{items}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
