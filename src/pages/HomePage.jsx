import React, { useState, useRef, useEffect } from 'react';
import { useFood } from '../context/FoodContext';
import { useCart } from '../context/CartContext';
import { DishCard } from '../components/DishCard';
import {
  Flame,
  Search,
  Truck,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  Pizza,
  Beef,
  Soup,
  Salad,
  Sandwich,
  Cake,
  Coffee,
  ChevronRight,
  CheckCircle2,
  Utensils,
  X
} from 'lucide-react';

const HOME_SIGNATURE_SPECIALS = [
  {
    id: 'home-spec-1',
    name: 'Flame-Grilled Prime Wagyu Ribeye Steak',
    category: 'burger',
    price: 24.99,
    rating: 4.9,
    reviewCount: 312,
    prepTime: '25 min',
    calories: '780 kcal',
    isVeg: false,
    isPopular: true,
    discountBadge: 'CHEF SPECIAL',
    description: '10oz USDA Prime Wagyu ribeye steak seared with garlic herb butter, roasted vine tomatoes, and truffle mashed potatoes.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    tags: ['Signature', 'Prime Cut']
  },
  {
    id: 'home-spec-2',
    name: 'Crispy Maine Lobster & Garlic Butter Roll',
    category: 'asian',
    price: 21.50,
    rating: 4.9,
    reviewCount: 204,
    prepTime: '18 min',
    calories: '540 kcal',
    isVeg: false,
    isPopular: true,
    discountBadge: 'EXCLUSIVE',
    description: 'Chilled wild Maine lobster claw meat tossed in lemon garlic aioli, served in a toasted split-top brioche roll.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    tags: ['Seafood', 'Top Rated']
  },
  {
    id: 'home-spec-3',
    name: 'Artisan Spanish Saffron Seafood Paella',
    category: 'asian',
    price: 22.99,
    rating: 4.8,
    reviewCount: 178,
    prepTime: '22 min',
    calories: '610 kcal',
    isVeg: false,
    isPopular: true,
    discountBadge: 'BESTSELLER',
    description: 'Saffron-infused Bomba rice loaded with jumbo prawns, calamari rings, blue mussels, chorizo sausage, and sweet bell peppers.',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80',
    tags: ['Spanish Classic', 'Saffron']
  },
  {
    id: 'home-spec-4',
    name: 'Iced Strawberry Vanilla Cloud Latte',
    category: 'drinks',
    price: 6.49,
    rating: 4.9,
    reviewCount: 290,
    prepTime: '5 min',
    calories: '210 kcal',
    isVeg: true,
    isPopular: true,
    discountBadge: 'NEW FLAVOR',
    description: 'Fresh organic strawberry puree layered with cold-brewed espresso, oat milk, and dense vanilla bean foam.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    tags: ['Craft Drink', 'Sweet Cloud']
  }
];

export const HomePage = ({
  setActiveTab,
  setSelectedCategory,
  onSelectDish,
  searchQuery,
  setSearchQuery
}) => {
  const { foodItems, categories } = useFood();
  const { applyCoupon } = useCart();
  const [showHeroDropdown, setShowHeroDropdown] = useState(false);
  const heroSearchRef = useRef(null);

  // Close hero dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (heroSearchRef.current && !heroSearchRef.current.contains(e.target)) {
        setShowHeroDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchedDishes = searchQuery.trim()
    ? foodItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    : [];

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Pizza': return <Pizza className="w-6 h-6" />;
      case 'Beef': return <Beef className="w-6 h-6" />;
      case 'Soup': return <Soup className="w-6 h-6" />;
      case 'Salad': return <Salad className="w-6 h-6" />;
      case 'Sandwich': return <Sandwich className="w-6 h-6" />;
      case 'Cake': return <Cake className="w-6 h-6" />;
      case 'Coffee': return <Coffee className="w-6 h-6" />;
      default: return <Utensils className="w-6 h-6" />;
    }
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setActiveTab('menu');
  };

  const handleSelectSearchedDish = (dish) => {
    setShowHeroDropdown(false);
    if (onSelectDish) {
      onSelectDish(dish);
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 lg:pt-12 lg:pb-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-extrabold uppercase tracking-wider animate-pulse-glow">
              <Sparkles className="w-4 h-4 fill-orange-400" />
              <span>Free Delivery on Orders Over $35</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Craving Something <br />
              <span className="text-gradient">Extraordinary?</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Handcrafted gourmet pizzas, sizzling smash burgers, fresh poke bowls, and artisan desserts delivered steaming hot to your doorstep in 25 minutes.
            </p>

            {/* Search Box */}
            <div ref={heroSearchRef} className="pt-2 max-w-xl mx-auto lg:mx-0 relative">
              <div className="bg-slate-900/90 p-2 rounded-2xl border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setShowHeroDropdown(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowHeroDropdown(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setShowHeroDropdown(false);
                      }
                    }}
                    placeholder="Search dishes, cuisines, or ingredients..."
                    className="w-full bg-transparent text-white placeholder-slate-500 pl-11 pr-10 py-3 text-sm focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => {
                    setShowHeroDropdown(false);
                    setActiveTab('menu');
                  }}
                  className="btn-primary text-sm font-bold !py-3 !px-6 shrink-0"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Hero Live Search Dropdown */}
              {showHeroDropdown && searchQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 border border-slate-700/80 rounded-2xl p-3 shadow-2xl z-50 backdrop-blur-xl max-h-96 overflow-y-auto space-y-2">
                  <div className="px-2 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 flex justify-between items-center">
                    <span>Dishes matching "{searchQuery}"</span>
                    <span className="text-orange-400 font-extrabold">{searchedDishes.length} items</span>
                  </div>

                  {searchedDishes.length > 0 ? (
                    searchedDishes.slice(0, 6).map((dish) => (
                      <div
                        key={dish.id}
                        onClick={() => handleSelectSearchedDish(dish)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors group"
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-800 shrink-0"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white group-hover:text-orange-400 truncate">
                              {dish.name}
                            </span>
                            {dish.isVeg ? (
                              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-extrabold">Veg</span>
                            ) : (
                              <span className="text-[10px] text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded font-extrabold">Non-Veg</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">{dish.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-black text-sm text-orange-400 block">${dish.price.toFixed(2)}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{dish.prepTime}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No dishes found matching "{searchQuery}". Try searching for burger, pizza, ramen, tacos, or salad.
                    </div>
                  )}

                  {searchedDishes.length > 0 && (
                    <button
                      onClick={() => {
                        setShowHeroDropdown(false);
                        setActiveTab('menu');
                      }}
                      className="w-full text-center py-2 text-xs font-bold text-orange-400 hover:bg-orange-500/10 rounded-xl transition-colors border-t border-slate-800"
                    >
                      View all {searchedDishes.length} results in Menu →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <span className="text-2xl font-black text-white">25m</span>
                <span className="block text-xs text-slate-400 font-semibold">Avg. Delivery</span>
              </div>
              <div>
                <span className="text-2xl font-black text-white">4.9★</span>
                <span className="block text-xs text-slate-400 font-semibold">Customer Rating</span>
              </div>
              <div>
                <span className="text-2xl font-black text-white">100%</span>
                <span className="block text-xs text-slate-400 font-semibold">Fresh Organic</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-square rounded-3xl overflow-hidden glass-card p-3 relative shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80"
                  alt="Delicious Pizza"
                  className="w-full h-full object-cover rounded-2xl animate-float"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </div>

              {/* Floating Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-pulse-glow z-20">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Live Order</span>
                  <span className="text-sm font-extrabold text-white">On the way (12 mins away)</span>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 z-20">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-white">Chef's Special</span>
                  <span className="text-[11px] text-orange-400 block font-bold">20% OFF Code: YUMMY20</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promos Banner Bar */}
      <section className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => applyCoupon('YUMMY20')}
            className="glass-card p-5 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-950/40 to-slate-900 flex items-center justify-between cursor-pointer group hover:scale-[1.02] transition-all"
          >
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded bg-orange-500 text-white text-[10px] font-black uppercase">
                Save 20%
              </span>
              <h4 className="font-extrabold text-white text-base">Use Promo: YUMMY20</h4>
              <p className="text-xs text-slate-400">On all orders above $25</p>
            </div>
            <span className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </span>
          </div>

          <div
            onClick={() => applyCoupon('WELCOME10')}
            className="glass-card p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 to-slate-900 flex items-center justify-between cursor-pointer group hover:scale-[1.02] transition-all"
          >
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                First Order
              </span>
              <h4 className="font-extrabold text-white text-base">Use Code: WELCOME10</h4>
              <p className="text-xs text-slate-400">10% OFF minimum spend $15</p>
            </div>
            <span className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </span>
          </div>

          <div
            onClick={() => applyCoupon('FREEDELIVERY')}
            className="glass-card p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 to-slate-900 flex items-center justify-between cursor-pointer group hover:scale-[1.02] transition-all"
          >
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 text-[10px] font-black uppercase">
                Free Shipping
              </span>
              <h4 className="font-extrabold text-white text-base">Code: FREEDELIVERY</h4>
              <p className="text-xs text-slate-400">Zero delivery fee on any order</p>
            </div>
            <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </span>
          </div>
        </div>
      </section>

      {/* DYNAMIC SECTION: Search Results or Default Sections */}
      {searchQuery.trim() ? (
        <section className="container-custom space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block mb-1">
                Search Results
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                Dishes matching <span className="text-orange-400">"{searchQuery}"</span>
              </h2>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700"
            >
              Clear Search <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {searchedDishes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchedDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} onSelectDish={onSelectDish} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4">
              <Utensils className="w-12 h-12 text-slate-600 mx-auto" />
              <div>
                <h3 className="font-bold text-lg text-white">No dishes found for "{searchQuery}"</h3>
                <p className="text-xs text-slate-400 mt-1">Try searching for pizza, burger, ramen, tacos, or cake.</p>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="btn-primary text-xs !py-2 !px-5"
              >
                View All Popular Dishes
              </button>
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Categories Horizontal Grid */}
          <section className="container-custom space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block mb-1">
                  Explore By Craving
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">Popular Categories</h2>
              </div>
              <button
                onClick={() => setActiveTab('menu')}
                className="text-xs font-bold text-orange-400 hover:underline flex items-center gap-1"
              >
                View All ({foodItems.length}) <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="glass-card p-4 rounded-2xl text-center cursor-pointer group hover:border-orange-500/50 transition-all flex flex-col items-center justify-center space-y-2"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 group-hover:bg-gradient-orange text-orange-400 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-md">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="font-bold text-xs text-slate-200 group-hover:text-orange-400 transition-colors line-clamp-1">
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Home Signature Specials Showcase */}
          <section className="container-custom space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block mb-1">
                  Home Exclusive Specials
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">Chef's Signature Creations</h2>
              </div>
              <button
                onClick={() => setActiveTab('menu')}
                className="btn-secondary text-xs"
              >
                Explore Full Menu ({foodItems.length} Dishes)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HOME_SIGNATURE_SPECIALS.map((dish) => (
                <DishCard key={dish.id} dish={dish} onSelectDish={onSelectDish} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Why Choose FlavorCraft Feature Section */}
      <section className="container-custom">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-8 relative z-10">
            <div>
              <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block mb-2">
                Our Guarantee
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Why Thousands Choose FlavorCraft Every Day
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">30-Min Hot Guarantee</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  If your food arrives lukewarm or late, your order is 100% on us. Thermal insulated bags guaranteed.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Organic Farm Ingredients</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We source produce directly from certified local farms with zero frozen artificial preservatives.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Real-time GPS Tracking</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Watch your kitchen chef prep and driver bring your meal step-by-step on live map updates.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Award-Winning Chefs</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every dish is crafted by Michelin-trained culinary experts for restaurant-grade fine dining at home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

