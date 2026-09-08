import React from 'react';
import { useCart } from '../context/CartContext';
import { Star, Clock, Flame, Plus, Check } from 'lucide-react';

export const DishCard = ({ dish, onSelectDish }) => {
  const { addToCart, cartItems } = useCart();

  // Check if item is already in cart
  const inCartItem = cartItems.find((i) => i.foodId === dish.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (dish.customizations && dish.customizations.length > 0) {
      // If dish has options, open modal so user can customize
      onSelectDish(dish);
    } else {
      addToCart(dish, 1, [], '');
    }
  };

  return (
    <div
      onClick={() => onSelectDish(dish)}
      className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer group transition-all duration-300 relative"
    >
      {/* Image & Overlay Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          {dish.isVeg ? (
            <span className="badge-veg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Veg
            </span>
          ) : (
            <span className="badge-nonveg">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Non-Veg
            </span>
          )}

          {dish.isPopular && (
            <span className="px-2 py-0.5 rounded-full bg-gradient-orange text-white text-[10px] font-extrabold uppercase shadow-md flex items-center gap-1">
              <Flame className="w-3 h-3 fill-white" /> Popular
            </span>
          )}
        </div>

        {/* Prep Time & Calorie badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-slate-300 z-10">
          <span className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-700/60">
            <Clock className="w-3.5 h-3.5 text-orange-400" /> {dish.prepTime}
          </span>
          <span className="bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-700/60 text-slate-400">
            {dish.calories}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md text-xs font-bold border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{dish.rating}</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              ({dish.reviewCount} reviews)
            </span>
          </div>

          {/* Dish Name */}
          <h3 className="font-bold text-base text-white group-hover:text-orange-400 transition-colors line-clamp-1 mb-1">
            {dish.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 mt-2">
          <div>
            <span className="text-xs text-slate-500 block uppercase font-semibold">Price</span>
            <span className="text-lg font-extrabold text-white">
              ${dish.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
              inCartItem
                ? 'bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30'
                : 'btn-primary'
            }`}
          >
            {inCartItem ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>In Cart ({inCartItem.quantity})</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
