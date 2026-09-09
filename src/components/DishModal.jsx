import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useFood } from '../context/FoodContext';
import { useAuth } from '../context/AuthContext';
import {
  X,
  Star,
  Clock,
  Flame,
  Plus,
  Minus,
  MessageSquare,
  Send,
  Check
} from 'lucide-react';

export const DishModal = ({ dish, onClose }) => {
  const { addToCart } = useCart();
  const { addReview } = useFood();
  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [specialNote, setSpecialNote] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!dish) return null;

  // Toggle options selection
  const handleOptionToggle = (group, option) => {
    const isSingleChoice = group.required;
    setSelectedOptions((prev) => {
      if (isSingleChoice) {
        // Remove existing options from this group and add new one
        const groupOptionNames = group.options.map((o) => o.name);
        const filtered = prev.filter((o) => !groupOptionNames.includes(o.name));
        return [...filtered, option];
      } else {
        // Multi-select toggle
        const exists = prev.some((o) => o.name === option.name);
        if (exists) {
          return prev.filter((o) => o.name !== option.name);
        } else {
          return [...prev, option];
        }
      }
    });
  };

  const optionsTotal = selectedOptions.reduce((sum, opt) => sum + (opt.price || 0), 0);
  const finalUnitPrice = dish.price + optionsTotal;
  const totalPrice = finalUnitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(dish, quantity, selectedOptions, specialNote);
    onClose();
  };

  const handlePostReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const reviewObj = {
      id: `r-${Date.now()}`,
      user: user ? user.name : 'Guest Foodie',
      rating: newReviewRating,
      comment: newReviewText.trim(),
      date: 'Just now'
    };

    addReview(dish.id, reviewObj);
    setNewReviewText('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/70 border border-slate-700/60 text-slate-300 hover:text-white flex items-center justify-center transition-all hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="relative h-56 sm:h-64 w-full shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

          {/* Badges */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            {dish.isVeg ? (
              <span className="badge-veg">Veg</span>
            ) : (
              <span className="badge-nonveg">Non-Veg</span>
            )}
            <span className="flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> {dish.rating} ({dish.reviewCount})
            </span>
            <span className="bg-slate-800/80 text-slate-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
              <Clock className="w-3 h-3 inline mr-1 text-orange-400" /> {dish.prepTime}
            </span>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Title & Description */}
          <div>
            <h2 className="text-2xl font-black text-white mb-2">{dish.name}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{dish.description}</p>
          </div>

          {/* Customization Options */}
          {dish.customizations && dish.customizations.length > 0 && (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-orange-400">
                Customizations & Add-ons
              </h3>

              {dish.customizations.map((group, idx) => (
                <div key={idx} className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm text-white">{group.name}</span>
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">
                      {group.required ? 'Select 1 (Required)' : 'Optional'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {group.options.map((opt, optIdx) => {
                      const isSelected = selectedOptions.some((o) => o.name === opt.name);
                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleOptionToggle(group, opt)}
                          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-orange-500/15 border-orange-500/50 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-${
                                group.required ? 'full' : 'md'
                              } border flex items-center justify-center ${
                                isSelected
                                  ? 'bg-orange-500 border-orange-500 text-white'
                                  : 'border-slate-600'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span>{opt.name}</span>
                          </div>
                          <span className="font-bold text-slate-300">
                            {opt.price > 0 ? `+$${opt.price.toFixed(2)}` : 'Free'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Special Kitchen Instructions
            </label>
            <input
              type="text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g. Extra spicy, sauce on the side, allergies..."
              className="custom-input text-xs"
            />
          </div>

          {/* Customer Reviews Section */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-400" />
                Customer Reviews ({dish.reviews ? dish.reviews.length : 0})
              </h3>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-xs font-bold text-orange-400 hover:underline"
              >
                + Write a Review
              </button>
            </div>

            {/* Write Review Form */}
            {showReviewForm && (
              <form onSubmit={handlePostReview} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-300">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= newReviewRating ? 'fill-amber-400' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Share your thoughts about this dish..."
                  rows={2}
                  className="custom-input text-xs"
                />
                <button type="submit" className="btn-primary text-xs !py-1.5 !px-4">
                  <Send className="w-3.5 h-3.5" /> Submit Review
                </button>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {dish.reviews && dish.reviews.length > 0 ? (
                dish.reviews.map((rev) => (
                  <div key={rev.id} className="bg-slate-950/40 p-3 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white">{rev.user}</span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span className="font-bold text-[11px]">{rev.rating}</span>
                      </div>
                    </div>
                    <p className="text-slate-400">{rev.comment}</p>
                    <span className="text-[10px] text-slate-600 block mt-1">{rev.date}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions: Quantity selector & Add CTA */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-extrabold text-base text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className="btn-primary flex-1 text-sm font-bold !py-3"
          >
            <span>Add {quantity} to Cart</span>
            <span className="opacity-40">•</span>
            <span>${totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
