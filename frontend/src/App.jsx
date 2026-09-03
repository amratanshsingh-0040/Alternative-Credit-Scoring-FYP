import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Predict from './pages/Predict'
import Dashboard from './pages/Dashboard'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-navy-900 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="text-center text-gray-600 text-xs py-4 border-t border-navy-700">
          © 2025 Amratansh Singh · ABES Engineering College, Ghaziabad · Department of Information Technology
        </footer>
      </div>
    </BrowserRouter>
  )
}
