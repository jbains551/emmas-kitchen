import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('emmas-kitchen-favorites', []);

  const toggleFavorite = (recipeId) => {
    setFavorites(prev =>
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const isFavorite = (recipeId) => favorites.includes(recipeId);

  return { favorites, toggleFavorite, isFavorite };
}

export function useCookingHistory() {
  const [history, setHistory] = useLocalStorage('emmas-kitchen-history', []);

  const addToHistory = (recipeId) => {
    setHistory(prev => {
      const filtered = prev.filter(entry => entry.recipeId !== recipeId);
      return [{ recipeId, cookedAt: new Date().toISOString(), count: (prev.find(e => e.recipeId === recipeId)?.count || 0) + 1 }, ...filtered];
    });
  };

  const getHistoryEntry = (recipeId) => history.find(e => e.recipeId === recipeId);

  const clearHistory = () => setHistory([]);

  return { history, addToHistory, getHistoryEntry, clearHistory };
}
