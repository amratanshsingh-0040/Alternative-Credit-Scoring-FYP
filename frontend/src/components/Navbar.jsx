import { Link, useLocation } from 'react-router-dom'
import { BarChart3, Brain, Home, Info, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/predict', label: 'Predict Score', icon: Brain },
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/about', label: 'About', icon: Info },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur border-b border-navy-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-white font-bold text-sm">AC</span>
            </div>
            <span className="font-bold text-white text-lg group-hover:text-emerald-400 transition-colors">
              AltCredit
            </span>
            <span className="hidden sm:block text-xs text-gray-500 ml-1 mt-0.5">AI Scoring</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link flex items-center gap-1.5 ${pathname === to ? 'active' : ''}`}
              >
                <Icon size={14} />
                {label}
              </Link>
            ))}
            <Link to="/predict" className="btn-primary text-sm py-2 px-4">
              Get Score →
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-400 hover:text-white p-2"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <div className="md:hidden border-t border-navy-700 py-3 space-y-1 animate-fade-in">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${pathname === to ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-300 hover:bg-navy-700'}`}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
