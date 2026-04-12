import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Browse from './pages/Browse'
import RecipeDetail from './pages/RecipeDetail'
import Favorites from './pages/Favorites'
import History from './pages/History'
import { useFavorites, useCookingHistory } from './hooks/useLocalStorage'

function App() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { history, addToHistory, getHistoryEntry, clearHistory } = useCookingHistory()

  return (
    <div className="min-h-screen bg-cream">
      <Navbar favoriteCount={favorites.length} />
      <main className="pb-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/browse"
            element={
              <Browse
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
                getHistoryEntry={getHistoryEntry}
              />
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <RecipeDetail
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
                addToHistory={addToHistory}
                getHistoryEntry={getHistoryEntry}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/history"
            element={
              <History
                history={history}
                clearHistory={clearHistory}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
        </Routes>
      </main>
      <footer className="text-center py-6 text-gray-warm text-sm font-body border-t border-pink/30">
        Made with love for Emma | Happy Cooking!
      </footer>
    </div>
  )
}

export default App
