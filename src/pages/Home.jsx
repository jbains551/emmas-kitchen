import { Link } from 'react-router-dom'
import { Sparkles, Search, Heart, Clock, ChefHat, ArrowRight } from 'lucide-react'
import recipes from '../data/recipes'

const featuredIds = [1, 11, 7, 31, 23, 20]
const featured = recipes.filter(r => featuredIds.includes(r.id))

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-coral via-pink to-lavender py-16 md:py-24 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🍳</div>
          <div className="absolute top-20 right-20 text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>🧁</div>
          <div className="absolute bottom-10 left-1/4 text-5xl animate-bounce" style={{ animationDelay: '1s' }}>🥘</div>
          <div className="absolute bottom-20 right-1/3 text-6xl animate-bounce" style={{ animationDelay: '1.5s' }}>🍕</div>
          <div className="absolute top-1/2 left-1/2 text-5xl animate-bounce" style={{ animationDelay: '0.8s' }}>🥗</div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-body mb-6">
            <Sparkles size={16} />
            Welcome, Chef Emma!
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Your Personal
            <br />
            <span className="text-sunshine">Cooking Adventure</span>
            <br />
            Starts Here!
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-body max-w-2xl mx-auto mb-8">
            Discover delicious recipes you can make yourself! From quick snacks to impressive dinners,
            every recipe is picked just for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 bg-white text-coral font-display font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all no-underline text-lg"
            >
              <Search size={20} />
              Find Recipes
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/favorites"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-display font-bold px-8 py-4 rounded-full hover:bg-white/30 transition-all no-underline text-lg border border-white/30"
            >
              <Heart size={20} />
              My Favorites
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-20 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Search, color: 'coral', title: 'Browse & Filter', desc: 'Find recipes by protein, cuisine, or difficulty' },
            { icon: Heart, color: 'pink', title: 'Save Favorites', desc: 'Keep your favorite recipes just a tap away' },
            { icon: Clock, color: 'lavender', title: 'Track History', desc: 'See everything you\'ve cooked and how often' },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-5 shadow-md border border-pink/10 flex items-start gap-3">
              <div className={`bg-${color}/10 p-2.5 rounded-xl shrink-0`}>
                <Icon size={22} className={`text-${color}`} />
              </div>
              <div>
                <h3 className="font-display font-bold text-charcoal text-sm">{title}</h3>
                <p className="text-gray-warm text-sm font-body">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured recipes */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-charcoal flex items-center gap-2">
              <ChefHat className="text-coral" size={28} />
              Featured Recipes
            </h2>
            <p className="text-gray-warm text-sm font-body">Hand-picked favorites to get you started!</p>
          </div>
          <Link
            to="/browse"
            className="text-coral font-body font-semibold text-sm flex items-center gap-1 no-underline hover:underline"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(recipe => (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden no-underline hover:-translate-y-1 transition-all border border-pink/10"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-2xl mr-2">{recipe.emoji}</span>
                  <h3 className="text-white font-display font-bold text-lg inline">{recipe.name}</h3>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between text-xs text-gray-warm font-body">
                <span className="bg-cream px-2 py-1 rounded-full">{recipe.ethnicity}</span>
                <span>{recipe.prepTime + recipe.cookTime} min</span>
                <span>{recipe.nutrition.calories} cal</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Fun stats */}
      <section className="bg-gradient-to-r from-mint to-sky py-12 px-4 mb-0">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-8">
            What's Cooking in Emma's Kitchen?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: recipes.length, label: 'Recipes', emoji: '📖' },
              { num: recipes.filter(r => r.protein === 'chicken').length, label: 'Chicken', emoji: '🐔' },
              { num: recipes.filter(r => r.protein === 'vegetarian').length, label: 'Veggie', emoji: '🥬' },
              { num: recipes.filter(r => r.difficulty === 'Easy').length, label: 'Easy Ones', emoji: '🟢' },
            ].map(({ num, label, emoji }) => (
              <div key={label} className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white">
                <div className="text-3xl mb-1">{emoji}</div>
                <div className="font-display text-3xl font-bold">{num}</div>
                <div className="text-sm font-body opacity-90">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
