import React, { useState, useMemo, useEffect } from 'react';
import { useFood } from '../context/FoodContext';
import { useCart } from '../context/CartContext';
import { DishCard } from '../components/DishCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle,
  Star,
  Sparkles,
  Utensils,
  ChevronLeft,
  ChevronRight,
  Tag,
  Gift,
  Flame,
  Percent,
  Clock,
  ArrowRight,
  Copy
} from 'lucide-react';

const OFFER_SLIDES = [
  {
    id: 1,
    title: 'FLAT 50% OFF GOURMET FEAST',
    subtitle: 'Handcrafted Artisan Smash Burgers & Wood-Fired Pizzas at half price today!',
    badge: '🔥 CRAZY 50% OFF',
    code: 'CRAVE50',
    discountText: '50% OFF on Orders over $20',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-orange-600 to-rose-600'
  },
  {
    id: 2,
    title: 'BUY 1 GET 1 FREE CRAVING DEAL',
    subtitle: 'Order 1 Tonkotsu Pork Ramen Bowl or Birria Tacos & get the 2nd deal FREE!',
    badge: '🎁 BOGO SPECIAL',
    code: 'BOGOFOOD',
    discountText: 'Flat $15.00 OFF on Orders over $30',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-purple-600 to-pink-600'
  },
  {
    id: 3,
    title: '30% OFF ARTISAN CHEF SPECIALS',
    subtitle: 'Fresh Poke Bowls, Greek Salads & Belgian Lava Cakes with 30% reduction.',
    badge: '⭐ 30% DISCOUNT',
    code: 'FLAVOR30',
    discountText: '30% OFF minimum spend of $25',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-emerald-600 to-teal-600'
  },
  {
    id: 4,
    title: 'FREE EXPRESS DELIVERY & $5 OFF',
    subtitle: 'Zero delivery fee + hot insulated thermal delivery on all food orders!',
    badge: '🚀 FREE DELIVERY',
    code: 'FREEDELIVERY',
    discountText: 'Free shipping on any order over $20',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-amber-500 to-orange-600'
  }
];

export const MenuPage = ({
  selectedCategory,
  setSelectedCategory,
  onSelectDish,
  searchQuery,
  setSearchQuery
}) => {
  const { foodItems, categories } = useFood();
  const { applyCoupon, appliedCoupon } = useCart();

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filters State
  const [dietFilter, setDietFilter] = useState('all'); // 'all' | 'veg' | 'nonveg' | 'vegan' | 'glutenfree'
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [maxPrice, setMaxPrice] = useState(30);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-low' | 'price-high' | 'rating' | 'prep'

  // Auto Slider Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % OFFER_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % OFFER_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + OFFER_SLIDES.length) % OFFER_SLIDES.length);
  };

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

        // Special Offers filter
        if (onlyOffers && !item.discountBadge && !item.originalPrice) return false;

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
  }, [foodItems, selectedCategory, searchQuery, dietFilter, onlyOffers, maxPrice, minRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setDietFilter('all');
    setOnlyOffers(false);
    setMaxPrice(30);
    setMinRating(0);
    setSortBy('popular');
  };

  const activeSlideData = OFFER_SLIDES[currentSlide];

  return (
    <div className="container-custom py-8 space-y-8">
      {/* Dynamic Food Offers & Discount Slider Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
        <div className="relative h-[320px] sm:h-[360px] w-full">
          {/* Background Slide Image with Fade Animation */}
          <img
            src={activeSlideData.image}
            alt={activeSlideData.title}
            className="w-full h-full object-cover transition-all duration-700 scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80';
            }}
          />

          {/* Dark Vignette & Color Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />

          {/* Slide Content Overlay */}
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between max-w-2xl z-10">
            {/* Top Badge & Timer */}
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-gradient-orange text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-orange-950/80 flex items-center gap-1.5 animate-pulse">
                <Flame className="w-3.5 h-3.5 fill-white" />
                {activeSlideData.badge}
              </span>
              <span className="text-[11px] font-bold text-slate-300 bg-slate-900/80 border border-slate-700 px-3 py-1 rounded-full backdrop-blur-md">
                Limited Time Food Special
              </span>
            </div>

            {/* Main Headline & Subtitle */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                {activeSlideData.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg font-medium leading-relaxed">
                {activeSlideData.subtitle}
              </p>
            </div>

            {/* Promo Code Box & Apply CTA */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="bg-slate-950/90 border border-dashed border-orange-500/60 rounded-2xl px-4 py-2 flex items-center gap-3 backdrop-blur-md">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Use Code</span>
                  <span className="text-sm font-black text-orange-400 tracking-widest">{activeSlideData.code}</span>
                </div>
              </div>

              <button
                onClick={() => applyCoupon(activeSlideData.code)}
                className={`btn-primary text-xs font-bold !py-3 !px-6 flex items-center gap-2 shadow-xl ${
                  appliedCoupon?.code === activeSlideData.code
                    ? '!bg-emerald-600 border-emerald-500'
                    : ''
                }`}
              >
                {appliedCoupon?.code === activeSlideData.code ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Coupon Applied!</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4" />
                    <span>Claim {activeSlideData.code}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Slider Prev/Next Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 border border-slate-700 text-white flex items-center justify-center hover:bg-orange-500 transition-colors z-20 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 border border-slate-700 text-white flex items-center justify-center hover:bg-orange-500 transition-colors z-20 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator Bar */}
          <div className="absolute bottom-4 right-6 flex items-center gap-2 z-20">
            {OFFER_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  currentSlide === idx
                    ? 'w-8 bg-orange-500'
                    : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Offers & Promo Coupon Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {OFFER_SLIDES.map((offer) => {
          const isApplied = appliedCoupon?.code === offer.code;
          return (
            <div
              key={offer.id}
              onClick={() => applyCoupon(offer.code)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                isApplied
                  ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/50'
                  : 'bg-slate-900/80 border-slate-800 hover:border-orange-500/50'
              }`}
            >
              <div className="space-y-1 min-w-0 pr-2">
                <span className="text-[10px] font-black uppercase text-orange-400 block tracking-wider">
                  {offer.badge}
                </span>
                <p className="font-extrabold text-white text-xs truncate">Code: {offer.code}</p>
                <p className="text-[11px] text-slate-400 truncate">{offer.discountText}</p>
              </div>
              <button
                className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold shrink-0 transition-colors ${
                  isApplied
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white'
                }`}
              >
                {isApplied ? 'Applied' : 'Apply'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Search & Category Pills Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-orange text-white border-orange-500 shadow-lg shadow-orange-500/20'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 relative shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items, ingredients..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>
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

          {/* Special Discounts Filter Toggle */}
          <div className="space-y-2">
            <button
              onClick={() => setOnlyOffers(!onlyOffers)}
              className={`w-full p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
                onlyOffers
                  ? 'bg-rose-500/20 border-rose-500/60 text-rose-300'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-rose-400" />
                <span>Special Offers & Deals Only</span>
              </span>
              {onlyOffers && <CheckCircle className="w-4 h-4 text-rose-400" />}
            </button>
          </div>

          {/* Diet Preferences */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
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
              {onlyOffers && <span className="text-rose-400 ml-1 font-bold">(On Special Discount)</span>}
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

