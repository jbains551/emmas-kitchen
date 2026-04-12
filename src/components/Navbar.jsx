import { Link, useLocation } from 'react-router-dom'
import { ChefHat, Search, Heart, Clock, Home, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/browse', label: 'Browse', icon: Search },
  { to: '/favorites', label: 'Favorites', icon: Heart },
  { to: '/history', label: 'History', icon: Clock },
]

export default function Navbar({ favoriteCount }) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b-2 border-pink/30 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline group">
          <div className="bg-gradient-to-br from-coral to-pink p-2 rounded-xl shadow-md group-hover:scale-110 transition-transform">
            <ChefHat className="text-white" size={24} />
          </div>
          <span className="font-display text-xl font-bold bg-gradient-to-r from-coral to-lavender bg-clip-text text-transparent">
            Emma's Kitchen
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to || (to === '/browse' && location.pathname.startsWith('/recipe'))
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-semibold no-underline transition-all ${
                  active
                    ? 'bg-gradient-to-r from-coral to-pink text-white shadow-md'
                    : 'text-charcoal hover:bg-pink/10'
                }`}
              >
                <Icon size={16} />
                {label}
                {label === 'Favorites' && favoriteCount > 0 && (
                  <span className="bg-sunshine text-charcoal text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {favoriteCount}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-charcoal hover:bg-pink/10"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-pink/20 bg-white/95 backdrop-blur-md px-4 py-3 space-y-1">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body font-semibold no-underline transition-all ${
                  active
                    ? 'bg-gradient-to-r from-coral to-pink text-white'
                    : 'text-charcoal hover:bg-pink/10'
                }`}
              >
                <Icon size={18} />
                {label}
                {label === 'Favorites' && favoriteCount > 0 && (
                  <span className="bg-sunshine text-charcoal text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                    {favoriteCount}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
