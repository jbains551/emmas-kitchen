import { useState, useMemo } from 'react'
import recipes from '../data/recipes'
import RecipeCard from '../components/RecipeCard'
import FilterBar from '../components/FilterBar'
import { Search, Frown } from 'lucide-react'

export default function Browse({ toggleFavorite, isFavorite, getHistoryEntry }) {
  const [filters, setFilters] = useState({
    protein: '',
    cuisine: '',
    ethnicity: '',
    difficulty: '',
    search: '',
  })

  const filtered = useMemo(() => {
    return recipes.filter(r => {
      if (filters.protein && r.protein !== filters.protein) return false
      if (filters.cuisine && r.cuisine !== filters.cuisine) return false
      if (filters.ethnicity && r.ethnicity !== filters.ethnicity) return false
      if (filters.difficulty && r.difficulty !== filters.difficulty) return false
      if (filters.search) {
        const q = filters.search.toLowerCase()
        const searchFields = [r.name, r.description, r.ethnicity, r.cuisine, r.protein, ...r.tags].join(' ').toLowerCase()
        if (!searchFields.includes(q)) return false
      }
      return true
    })
  }, [filters])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-charcoal flex items-center gap-2">
          <Search className="text-coral" size={32} />
          Browse Recipes
        </h1>
        <p className="text-gray-warm font-body">
          Find the perfect recipe! Use the filters below to narrow it down.
        </p>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} />

      <div className="mt-6 mb-3 flex items-center justify-between">
        <p className="text-gray-warm text-sm font-body">
          Showing <span className="font-bold text-charcoal">{filtered.length}</span> of {recipes.length} recipes
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              historyEntry={getHistoryEntry(recipe.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Frown className="mx-auto text-gray-warm/30 mb-4" size={64} />
          <h3 className="font-display text-xl font-bold text-charcoal mb-2">No recipes found</h3>
          <p className="text-gray-warm font-body">Try adjusting your filters or search term!</p>
        </div>
      )}
    </div>
  )
}
