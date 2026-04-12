import { Heart, Frown } from 'lucide-react'
import { Link } from 'react-router-dom'
import recipes from '../data/recipes'
import RecipeCard from '../components/RecipeCard'

export default function Favorites({ favorites, toggleFavorite, isFavorite }) {
  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id))

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-charcoal flex items-center gap-2">
          <Heart className="text-coral" fill="currentColor" size={32} />
          My Favorites
        </h1>
        <p className="text-gray-warm font-body">
          {favoriteRecipes.length > 0
            ? `You have ${favoriteRecipes.length} favorite recipe${favoriteRecipes.length > 1 ? 's' : ''}!`
            : 'Your saved recipes will appear here.'}
        </p>
      </div>

      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favoriteRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-pink/10">
          <Heart className="mx-auto text-pink/30 mb-4" size={64} />
          <h3 className="font-display text-xl font-bold text-charcoal mb-2">No favorites yet!</h3>
          <p className="text-gray-warm font-body mb-6">
            Browse recipes and tap the heart to save your favorites here.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 bg-coral text-white font-display font-bold px-6 py-3 rounded-full no-underline hover:bg-coral-dark transition-colors"
          >
            Browse Recipes
          </Link>
        </div>
      )}
    </div>
  )
}
