import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';

export const CartDrawer = ({ isOpen, onClose, onProceedToCheckout }) => {
  const {
    cartItems,
    subtotal,
    discount,
    deliveryFee,
    tax,
    grandTotal,
    isFreeDelivery,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col z-10 animate-slide-in">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-white">Your Shopping Cart</h2>
              <span className="text-xs text-slate-400 font-medium">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar Progress */}
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 text-xs">
          {isFreeDelivery ? (
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Sparkles className="w-4 h-4 fill-emerald-400" />
              <span>Congratulations! You unlocked FREE Delivery!</span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between text-slate-400 font-semibold mb-1">
                <span>Add ${(35 - subtotal).toFixed(2)} more for FREE Delivery</span>
                <span>${subtotal.toFixed(2)} / $35.00</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-orange transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / 35) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 rounded-full bg-slate-800/60 mx-auto flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <p className="text-slate-300 font-bold text-base">Your cart is currently empty</p>
                <p className="text-xs text-slate-500 mt-1">Explore our delicious menu items and add your favorites!</p>
              </div>
              <button
                onClick={onClose}
                className="btn-secondary text-xs"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartKey}
                className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 flex gap-3 relative group"
              >
                {/* Item Thumbnail */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-800"
                />

                {/* Info */}
                <div className="flex-1 min-w-0 pr-6">
                  <h4 className="font-bold text-sm text-white truncate">{item.name}</h4>
                  <p className="text-xs text-orange-400 font-extrabold mt-0.5">
                    ${item.unitPrice.toFixed(2)}
                  </p>

                  {/* Selected Options */}
                  {item.selectedOptions && item.selectedOptions.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {item.selectedOptions.map((opt, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                          +{opt.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Special Note */}
                  {item.specialNote && (
                    <p className="text-[10px] text-slate-400 italic mt-1 truncate">
                      Note: "{item.specialNote}"
                    </p>
                  )}

                  {/* Quantity adjustment */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-extrabold text-slate-300">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Remove Item Button */}
                <button
                  onClick={() => removeFromCart(item.cartKey)}
                  className="absolute top-3.5 right-3 text-slate-500 hover:text-rose-400 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-4 shrink-0">
            {/* Coupon Code Section */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-emerald-950/60 border border-emerald-500/30 p-2.5 rounded-xl text-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <Tag className="w-4 h-4 text-emerald-400" />
                  <span>Promo "{appliedCoupon.code}" Applied</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-rose-400 hover:underline font-semibold text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Promo code (Try YUMMY20)"
                    className="custom-input text-xs pl-9 !py-2"
                  />
                </div>
                <button type="submit" className="btn-secondary text-xs !py-2 !px-3 font-bold">
                  Apply
                </button>
              </form>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-200">${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-semibold text-slate-200">
                  {deliveryFee === 0 ? <span className="text-emerald-400">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-slate-200">${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                <span>Grand Total</span>
                <span className="text-gradient">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="btn-primary w-full text-sm font-bold !py-3.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
