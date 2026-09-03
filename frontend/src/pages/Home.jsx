import { Link } from 'react-router-dom'
import { ArrowRight, Users, BarChart3, Cpu, TrendingUp, ShieldCheck, Zap } from 'lucide-react'

const stats = [
  { value: '307,511', label: 'Loan Applications Analyzed', icon: Users, color: 'text-emerald-400' },
  { value: '113,320', label: 'Thin-File Borrowers Identified', icon: ShieldCheck, color: 'text-yellow-400' },
  { value: '9 Models', label: 'ML Configurations Benchmarked', icon: Cpu, color: 'text-purple-400' },
  { value: '0.7625', label: 'Best Thin-File ROC-AUC', icon: TrendingUp, color: 'text-emerald-400' },
]

const features = [
  {
    icon: BarChart3,
    title: 'Alternative Data Intelligence',
    desc: 'Goes beyond traditional credit bureau data — uses behavioral signals like external scores, contact stability, and application metadata to assess credit risk for thin-file borrowers.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Cpu,
    title: '9-Model Benchmark Comparison',
    desc: 'Systematically evaluates Logistic Regression, Random Forest, and XGBoost across Traditional, Alternative, and Combined feature taxonomies on real-world Home Credit data.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Zap,
    title: 'Real-Time Score Prediction',
    desc: 'Enter applicant details and instantly receive a Provisional Credit Score (300–900), default probability, and the top AI-driven factors influencing the decision.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
]

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            FYP Research Project · ABES Engineering College
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            AI Credit Scoring
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
              {' '}for Everyone
            </span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Enabling financial inclusion for <strong className="text-white">thin-file borrowers</strong> using 
            alternative behavioral data and machine learning — because creditworthiness is more than a bureau score.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/predict" className="btn-primary flex items-center justify-center gap-2 text-base">
              Get Your Credit Score
              <ArrowRight size={18} />
            </Link>
            <Link to="/dashboard" className="btn-secondary flex items-center justify-center gap-2 text-base">
              <BarChart3 size={18} />
              View Model Results
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ value, label, icon: Icon, color }) => (
            <div key={label} className="stat-card animate-slide-up">
              <Icon size={24} className={`${color} mx-auto mb-3`} />
              <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
              <div className="text-gray-400 text-xs leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="section-title">How AltCredit Works</h2>
          <p className="section-subtitle">Three research contributions powering this system</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="card hover:border-navy-500 transition-all duration-300 group">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={20} className={color} />
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">{title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="card bg-gradient-to-br from-emerald-500/10 to-navy-800 border-emerald-500/20 text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to See Your Score?</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Enter applicant data across Traditional, Alternative, or Combined feature sets and get an instant AI-generated Provisional Credit Score.
          </p>
          <Link to="/predict" className="btn-primary inline-flex items-center gap-2">
            Start Prediction <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
