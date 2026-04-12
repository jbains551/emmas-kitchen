import { useParams, Link } from 'react-router-dom'
import { Heart, Clock, Flame, Users, ArrowLeft, ChefHat, CheckCircle2, CookingPot } from 'lucide-react'
import recipes from '../data/recipes'
import { useState } from 'react'

export default function RecipeDetail({ toggleFavorite, isFavorite, addToHistory, getHistoryEntry }) {
  const { id } = useParams()
  const recipe = recipes.find(r => r.id === parseInt(id))
  const [checkedSteps, setCheckedSteps] = useState([])
  const [markedCooked, setMarkedCooked] = useState(false)

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="font-display text-2xl font-bold text-charcoal">Recipe not found!</h2>
        <Link to="/browse" className="text-coral font-body mt-4 inline-block">Back to Browse</Link>
      </div>
    )
  }

  const fav = isFavorite(recipe.id)
  const historyEntry = getHistoryEntry(recipe.id)
  const allChecked = checkedSteps.length === recipe.steps.length

  const toggleStep = (i) => {
    setCheckedSteps(prev => prev.includes(i) ? prev.filter(s => s !== i) : [...prev, i])
  }

  const handleCooked = () => {
    addToHistory(recipe.id)
    setMarkedCooked(true)
    setTimeout(() => setMarkedCooked(false), 3000)
  }

  const n = recipe.nutrition

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back nav */}
      <Link to="/browse" className="inline-flex items-center gap-1 text-gray-warm hover:text-coral font-body text-sm no-underline mb-4">
        <ArrowLeft size={16} /> Back to recipes
      </Link>

      {/* Hero image */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full font-body">
              {recipe.ethnicity}
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full font-body">
              {recipe.cuisine}
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full font-body">
              {recipe.difficulty}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
            {recipe.emoji} {recipe.name}
          </h1>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => toggleFavorite(recipe.id)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-bold text-sm transition-all ${
            fav
              ? 'bg-coral text-white shadow-md'
              : 'bg-white text-coral border-2 border-coral/30 hover:bg-coral/5'
          }`}
        >
          <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
          {fav ? 'Saved to Favorites!' : 'Add to Favorites'}
        </button>
        <button
          onClick={handleCooked}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-bold text-sm transition-all ${
            markedCooked
              ? 'bg-mint text-white shadow-md'
              : 'bg-white text-mint border-2 border-mint/30 hover:bg-mint/5'
          }`}
        >
          <CookingPot size={18} />
          {markedCooked ? 'Marked as Cooked!' : "I Made This!"}
        </button>
        {historyEntry && (
          <span className="flex items-center gap-1 px-4 py-2.5 rounded-full bg-lavender/10 text-lavender text-sm font-body font-bold">
            <ChefHat size={16} />
            Cooked {historyEntry.count} time{historyEntry.count > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { icon: Clock, label: 'Prep', value: `${recipe.prepTime} min`, color: 'mint' },
          { icon: Flame, label: 'Cook', value: `${recipe.cookTime} min`, color: 'coral' },
          { icon: Clock, label: 'Total', value: `${recipe.prepTime + recipe.cookTime} min`, color: 'lavender' },
          { icon: Users, label: 'Servings', value: recipe.servings, color: 'sky' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className={`bg-white rounded-xl p-3 text-center shadow-sm border border-${color}/20`}>
            <Icon size={20} className={`mx-auto text-${color} mb-1`} />
            <div className="font-display font-bold text-charcoal">{value}</div>
            <div className="text-xs text-gray-warm font-body">{label}</div>
          </div>
        ))}
      </div>

      <p className="text-gray-warm font-body text-lg mb-8 leading-relaxed">{recipe.description}</p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Ingredients */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-pink/10">
          <h2 className="font-display text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
            🛒 Ingredients
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-start gap-2 text-charcoal font-body">
                <span className="text-coral mt-0.5">&#9679;</span>
                {ing}
              </li>
            ))}
          </ul>
        </div>

        {/* Nutrition */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-pink/10">
          <h2 className="font-display text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
            📊 Nutrition Info
            <span className="text-xs font-body font-normal text-gray-warm">(per serving)</span>
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Calories', value: n.calories, unit: 'kcal', color: 'coral', max: 600 },
              { label: 'Protein', value: n.protein, unit: 'g', color: 'mint', max: 50 },
              { label: 'Carbs', value: n.carbs, unit: 'g', color: 'sunshine', max: 60 },
              { label: 'Fat', value: n.fat, unit: 'g', color: 'lavender', max: 30 },
              { label: 'Sugar', value: n.sugar, unit: 'g', color: 'pink', max: 30 },
              { label: 'Fiber', value: n.fiber, unit: 'g', color: 'mint', max: 10 },
              { label: 'Sodium', value: n.sodium, unit: 'mg', color: 'sky', max: 800 },
            ].map(({ label, value, unit, color, max }) => (
              <div key={label}>
                <div className="flex justify-between text-sm font-body mb-1">
                  <span className="text-gray-warm">{label}</span>
                  <span className="font-bold text-charcoal">{value} {unit}</span>
                </div>
                <div className="h-2 bg-cream rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${color} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-pink/10 mb-8">
        <h2 className="font-display text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
          👩‍🍳 Steps
          {allChecked && <span className="text-mint text-sm font-body">All done! Great job, Emma!</span>}
        </h2>
        <div className="space-y-3">
          {recipe.steps.map((step, i) => {
            const checked = checkedSteps.includes(i)
            return (
              <button
                key={i}
                onClick={() => toggleStep(i)}
                className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all ${
                  checked ? 'bg-mint/10 opacity-60' : 'bg-cream hover:bg-mint/5'
                }`}
              >
                <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-display font-bold ${
                  checked ? 'bg-mint text-white' : 'bg-coral/10 text-coral'
                }`}>
                  {checked ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <span className={`font-body text-charcoal ${checked ? 'line-through' : ''}`}>
                  {step}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {recipe.tags.map(tag => (
          <span key={tag} className="bg-lavender/10 text-lavender px-3 py-1 rounded-full text-sm font-body font-semibold">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}
