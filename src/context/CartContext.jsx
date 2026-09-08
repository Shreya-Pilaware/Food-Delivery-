import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROMO_COUPONS } from '../data/mockData';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('flavorcraft_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const saved = localStorage.getItem('flavorcraft_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('flavorcraft_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('flavorcraft_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('flavorcraft_coupon');
    }
  }, [appliedCoupon]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type, id: Date.now() });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (food, quantity = 1, selectedOptions = [], specialNote = '') => {
    // calculate extra price from selected options
    const optionsPrice = selectedOptions.reduce((sum, opt) => sum + (opt.price || 0), 0);
    const unitPrice = food.price + optionsPrice;

    // generate key
    const optionsKey = selectedOptions.map(o => o.name).sort().join('|');
    const cartKey = `${food.id}__${optionsKey}__${specialNote.trim()}`;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.cartKey === cartKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartKey,
            foodId: food.id,
            name: food.name,
            image: food.image,
            unitPrice,
            basePrice: food.price,
            quantity,
            selectedOptions,
            specialNote
          }
        ];
      }
    });

    showToast(`Added ${quantity}x "${food.name}" to cart! 🛒`);
  };

  const removeFromCart = (cartKey) => {
    setCartItems(prev => prev.filter(item => item.cartKey !== cartKey));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartKey);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.cartKey === cartKey ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (codeStr) => {
    const cleanCode = codeStr.trim().toUpperCase();
    const coupon = PROMO_COUPONS[cleanCode];
    if (!coupon) {
      showToast('Invalid promo code. Try YUMMY20 or WELCOME10', 'error');
      return false;
    }

    if (subtotal < coupon.minSpend) {
      showToast(`Minimum order amount of $${coupon.minSpend} required for code ${cleanCode}`, 'error');
      return false;
    }

    setAppliedCoupon({ code: cleanCode, ...coupon });
    showToast(`Coupon "${cleanCode}" applied successfully! 🎉`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Summary calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = (subtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.fixedDiscount) {
      discount = appliedCoupon.fixedDiscount;
    }
  }

  const isFreeDelivery = subtotal >= 35 || (appliedCoupon && appliedCoupon.code === 'FREEDELIVERY');
  const deliveryFee = cartItems.length > 0 ? (isFreeDelivery ? 0 : 2.99) : 0;
  const tax = (subtotal - discount) > 0 ? (subtotal - discount) * 0.08 : 0;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee + tax);
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        subtotal,
        discount,
        deliveryFee,
        tax,
        grandTotal,
        isFreeDelivery,
        appliedCoupon,
        toastMessage,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
