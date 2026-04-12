import { Clock, Trash2, Frown, ChefHat } from 'lucide-react'
import { Link } from 'react-router-dom'
import recipes from '../data/recipes'
import RecipeCard from '../components/RecipeCard'

export default function History({ history, clearHistory, toggleFavorite, isFavorite }) {
  const historyRecipes = history
    .map(entry => {
      const recipe = recipes.find(r => r.id === entry.recipeId)
      return recipe ? { ...recipe, cookedAt: entry.cookedAt, cookCount: entry.count } : null
    })
    .filter(Boolean)

  const totalMeals = history.reduce((sum, e) => sum + e.count, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-charcoal flex items-center gap-2">
            <Clock className="text-lavender" size={32} />
            Cooking History
          </h1>
          <p className="text-gray-warm font-body">
            {historyRecipes.length > 0
              ? `You've cooked ${historyRecipes.length} different recipe${historyRecipes.length > 1 ? 's' : ''} (${totalMeals} total meals)!`
              : 'Recipes you\'ve cooked will show up here.'}
          </p>
        </div>
        {historyRecipes.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-body font-semibold text-coral bg-coral/10 hover:bg-coral/20 transition-all"
          >
            <Trash2 size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Stats bar */}
      {historyRecipes.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-lavender/20">
            <ChefHat className="mx-auto text-lavender mb-1" size={24} />
            <div className="font-display text-2xl font-bold text-charcoal">{historyRecipes.length}</div>
            <div className="text-xs text-gray-warm font-body">Unique Recipes</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-coral/20">
            <span className="text-2xl">🍽️</span>
            <div className="font-display text-2xl font-bold text-charcoal">{totalMeals}</div>
            <div className="text-xs text-gray-warm font-body">Total Meals</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-mint/20">
            <span className="text-2xl">🏆</span>
            <div className="font-display text-2xl font-bold text-charcoal">
              {historyRecipes.length >= 10 ? 'Master Chef' : historyRecipes.length >= 5 ? 'Rising Star' : 'Beginner'}
            </div>
            <div className="text-xs text-gray-warm font-body">Chef Level</div>
          </div>
        </div>
      )}

      {historyRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {historyRecipes.map(recipe => (
            <div key={recipe.id} className="relative">
              <RecipeCard
                recipe={recipe}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
                historyEntry={{ count: recipe.cookCount }}
              />
              <div className="absolute -top-2 -right-2 bg-lavender text-white text-xs font-bold px-2 py-1 rounded-full shadow-md font-body">
                {new Date(recipe.cookedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-pink/10">
          <Clock className="mx-auto text-lavender/30 mb-4" size={64} />
          <h3 className="font-display text-xl font-bold text-charcoal mb-2">No cooking history yet!</h3>
          <p className="text-gray-warm font-body mb-6">
            When you make a recipe, tap "I Made This!" to track it here.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 bg-lavender text-white font-display font-bold px-6 py-3 rounded-full no-underline hover:bg-lavender-dark transition-colors"
          >
            Find Something to Cook
          </Link>
        </div>
      )}
    </div>
  )
}
