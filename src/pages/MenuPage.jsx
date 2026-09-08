import React, { useState, useMemo } from 'react';
import { useFood } from '../context/FoodContext';
import { DishCard } from '../components/DishCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle,
  Star,
  Sparkles,
  Utensils
} from 'lucide-react';

export const MenuPage = ({
  selectedCategory,
  setSelectedCategory,
  onSelectDish,
  searchQuery,
  setSearchQuery
}) => {
  const { foodItems, categories } = useFood();

  // Filters State
  const [dietFilter, setDietFilter] = useState('all'); // 'all' | 'veg' | 'nonveg' | 'vegan' | 'glutenfree'
  const [maxPrice, setMaxPrice] = useState(30);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-low' | 'price-high' | 'rating' | 'prep'

  // Filter & Sort Logic
  const filteredDishes = useMemo(() => {
    return foodItems
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        // Search Query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = item.name.toLowerCase().includes(q);
          const matchesDesc = item.description.toLowerCase().includes(q);
          const matchesCategory = item.category.toLowerCase().includes(q);
          if (!matchesName && !matchesDesc && !matchesCategory) return false;
        }

        // Diet filter
        if (dietFilter === 'veg' && !item.isVeg) return false;
        if (dietFilter === 'nonveg' && item.isVeg) return false;
        if (dietFilter === 'vegan' && !item.isVegan) return false;
        if (dietFilter === 'glutenfree' && !item.isGlutenFree) return false;

        // Price filter
        if (item.price > maxPrice) return false;

        // Rating filter
        if (item.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'prep') return parseInt(a.prepTime) - parseInt(b.prepTime);
        // Default popular
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      });
  }, [foodItems, selectedCategory, searchQuery, dietFilter, maxPrice, minRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setDietFilter('all');
    setMaxPrice(30);
    setMinRating(0);
    setSortBy('popular');
  };

  return (
    <div className="container-custom py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block mb-1">
            Artisan Kitchen Menu
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Discover Delicious Flavor Creations
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Filter by dietary preferences, price range, and craving. Pre-ordered & delivered smoking hot.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items, ingredients..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-gradient-orange text-white border-orange-500 shadow-lg shadow-orange-500/20'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Main Grid & Filters Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-orange-400" /> Filter Options
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-bold text-slate-400 hover:text-orange-400 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Diet Preferences */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Dietary Preference
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'all', label: 'All Dishes' },
                { id: 'veg', label: 'Vegetarian Only 🌿' },
                { id: 'nonveg', label: 'Non-Vegetarian 🥩' },
                { id: 'vegan', label: '100% Vegan 🌱' },
                { id: 'glutenfree', label: 'Gluten-Free 🌾' }
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDietFilter(d.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                    dietFilter === d.id
                      ? 'bg-orange-500/15 border border-orange-500/40 text-orange-300'
                      : 'text-slate-400 hover:bg-slate-800/60'
                  }`}
                >
                  <span>{d.label}</span>
                  {dietFilter === d.id && <CheckCircle className="w-3.5 h-3.5 text-orange-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-300 uppercase tracking-wider">Max Price</span>
              <span className="text-orange-400">${maxPrice.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
          </div>

          {/* Rating Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Minimum Rating
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[0, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                    minRating === r
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {r === 0 ? 'All' : `${r}★+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Dish Grid Column */}
        <main className="lg:col-span-9 space-y-6">
          {/* Sorting & Result Count Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-300">
              Showing <span className="text-orange-400">{filteredDishes.length}</span> delicious items
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs text-slate-200 font-bold px-3 py-1.5 rounded-xl focus:outline-none focus:border-orange-500"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="prep">Fastest Prep Time</option>
              </select>
            </div>
          </div>

          {/* Dishes Listing Grid */}
          {filteredDishes.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4">
              <Utensils className="w-12 h-12 text-slate-600 mx-auto" />
              <div>
                <h3 className="font-bold text-lg text-white">No dishes match your filter criteria</h3>
                <p className="text-xs text-slate-400 mt-1">Try resetting price sliders or dietary tags.</p>
              </div>
              <button onClick={handleResetFilters} className="btn-primary text-xs">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} onSelectDish={onSelectDish} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
