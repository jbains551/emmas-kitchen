import { Link } from 'react-router-dom'
import { Heart, Clock, Flame, ChefHat } from 'lucide-react'

const difficultyColors = {
  Easy: 'bg-mint/20 text-mint-dark',
  Medium: 'bg-sunshine/30 text-amber-700',
}

const proteinEmojis = {
  chicken: '🐔',
  beef: '🐄',
  seafood: '🐟',
  pork: '🐷',
  turkey: '🦃',
  vegetarian: '🥬',
}

export default function RecipeCard({ recipe, toggleFavorite, isFavorite, historyEntry }) {
  const fav = isFavorite(recipe.id)

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 border border-pink/10">
      <Link to={`/recipe/${recipe.id}`} className="no-underline">
        <div className="relative h-48 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${difficultyColors[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-white/90 text-charcoal">
              {recipe.ethnicity}
            </span>
          </div>
          <div className="absolute top-3 right-3 text-2xl">
            {recipe.emoji}
          </div>
          {historyEntry && (
            <div className="absolute bottom-3 left-3 bg-lavender/90 text-white text-xs font-bold px-2 py-1 rounded-full">
              Cooked {historyEntry.count}x
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/recipe/${recipe.id}`} className="no-underline">
            <h3 className="font-display font-bold text-charcoal text-lg leading-tight hover:text-coral transition-colors">
              {recipe.name}
            </h3>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(recipe.id)
            }}
            className={`shrink-0 p-1.5 rounded-full transition-all ${
              fav ? 'text-coral scale-110' : 'text-gray-300 hover:text-coral'
            }`}
          >
            <Heart size={20} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>

        <p className="text-gray-warm text-sm mt-1 line-clamp-2 font-body">
          {recipe.description}
        </p>

        <div className="flex items-center gap-3 mt-3 text-xs text-gray-warm font-body">
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-mint" />
            {recipe.prepTime + recipe.cookTime} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} className="text-coral" />
            {recipe.nutrition.calories} cal
          </span>
          <span className="flex items-center gap-1">
            <ChefHat size={14} className="text-lavender" />
            {recipe.nutrition.protein}g protein
          </span>
          <span className="ml-auto text-base">
            {proteinEmojis[recipe.protein]}
          </span>
        </div>
      </div>
    </div>
  )
}
