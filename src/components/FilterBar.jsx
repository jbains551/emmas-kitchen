import { proteins, cuisines, ethnicities, difficulties } from '../data/recipes'
import { Filter, X } from 'lucide-react'

const proteinLabels = {
  chicken: '🐔 Chicken',
  beef: '🐄 Beef',
  seafood: '🐟 Seafood',
  pork: '🐷 Pork',
  turkey: '🦃 Turkey',
  vegetarian: '🥬 Veggie',
}

export default function FilterBar({ filters, setFilters }) {
  const activeCount = Object.values(filters).filter(v => v).length

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: prev[key] === value ? '' : value }))
  }

  const clearAll = () => setFilters({ protein: '', cuisine: '', ethnicity: '', difficulty: '', search: '' })

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-md border border-pink/10">
      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search recipes... (try 'pasta' or 'crispy')"
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-pink/20 focus:border-coral focus:outline-none font-body text-charcoal bg-white placeholder:text-gray-warm/50"
        />
        <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-warm/50" />
      </div>

      {/* Protein filter */}
      <div className="mb-3">
        <label className="text-xs font-display font-bold text-gray-warm uppercase tracking-wide mb-1.5 block">
          Main Protein
        </label>
        <div className="flex flex-wrap gap-1.5">
          {proteins.map(p => (
            <button
              key={p}
              onClick={() => updateFilter('protein', p)}
              className={`px-3 py-1.5 rounded-full text-sm font-body font-semibold transition-all ${
                filters.protein === p
                  ? 'bg-coral text-white shadow-md scale-105'
                  : 'bg-cream text-charcoal hover:bg-coral/10'
              }`}
            >
              {proteinLabels[p]}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine filter */}
      <div className="mb-3">
        <label className="text-xs font-display font-bold text-gray-warm uppercase tracking-wide mb-1.5 block">
          Cuisine Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {cuisines.map(c => (
            <button
              key={c}
              onClick={() => updateFilter('cuisine', c)}
              className={`px-3 py-1.5 rounded-full text-sm font-body font-semibold transition-all ${
                filters.cuisine === c
                  ? 'bg-mint text-white shadow-md scale-105'
                  : 'bg-cream text-charcoal hover:bg-mint/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Ethnicity filter */}
      <div className="mb-3">
        <label className="text-xs font-display font-bold text-gray-warm uppercase tracking-wide mb-1.5 block">
          Cuisine Origin
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ethnicities.map(e => (
            <button
              key={e}
              onClick={() => updateFilter('ethnicity', e)}
              className={`px-3 py-1.5 rounded-full text-sm font-body font-semibold transition-all ${
                filters.ethnicity === e
                  ? 'bg-lavender text-white shadow-md scale-105'
                  : 'bg-cream text-charcoal hover:bg-lavender/10'
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty filter */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-display font-bold text-gray-warm uppercase tracking-wide mb-1.5 block">
            Difficulty
          </label>
          <div className="flex gap-1.5">
            {difficulties.map(d => (
              <button
                key={d}
                onClick={() => updateFilter('difficulty', d)}
                className={`px-3 py-1.5 rounded-full text-sm font-body font-semibold transition-all ${
                  filters.difficulty === d
                    ? 'bg-sunshine text-charcoal shadow-md scale-105'
                    : 'bg-cream text-charcoal hover:bg-sunshine/10'
                }`}
              >
                {d === 'Easy' ? '🟢 Easy' : '🟡 Medium'}
              </button>
            ))}
          </div>
        </div>

        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-body font-semibold bg-coral/10 text-coral hover:bg-coral/20 transition-all"
          >
            <X size={14} />
            Clear all ({activeCount})
          </button>
        )}
      </div>
    </div>
  )
}
