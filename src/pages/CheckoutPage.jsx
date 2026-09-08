import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import {
  CreditCard,
  MapPin,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  User,
  Phone,
  Building,
  Smartphone,
  Wallet
} from 'lucide-react';

export const CheckoutPage = ({ setActiveTab, setIsAuthOpen }) => {
  const { cartItems, subtotal, discount, deliveryFee, tax, grandTotal, clearCart, showToast } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();

  // Address State
  const defaultAddr = user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0] || {};
  const [selectedAddrId, setSelectedAddrId] = useState(defaultAddr.id || 'new');
  const [fullName, setFullName] = useState(user ? user.name : 'Shreya Sharma');
  const [phone, setPhone] = useState(user ? user.phone : '+1 (555) 389-2910');
  const [street, setStreet] = useState(defaultAddr.street || '742 Evergreen Terrace, Apt 4B');
  const [city, setCity] = useState(defaultAddr.city || 'Springfield');
  const [zip, setZip] = useState(defaultAddr.zip || '97477');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'wallet' | 'cod'
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const handleSavedAddrSelect = (addr) => {
    setSelectedAddrId(addr.id);
    setFullName(addr.fullName || user.name);
    setPhone(addr.phone || user.phone);
    setStreet(addr.street);
    setCity(addr.city);
    setZip(addr.zip);
  };

  const handlePlaceOrderSubmit = (e) => {
    e.preventDefault();

    if (!street || !city || !zip || !fullName || !phone) {
      showToast('Please complete all delivery address fields', 'error');
      return;
    }

    const orderPayload = {
      deliveryAddress: { fullName, phone, street, city, zip, deliveryNotes },
      paymentMethod:
        paymentMethod === 'card'
          ? `Credit Card (${cardNumber.slice(-4)})`
          : paymentMethod === 'wallet'
          ? 'Apple Pay / Digital Wallet'
          : 'Cash on Delivery (COD)',
      items: cartItems,
      subtotal,
      discount,
      deliveryFee,
      tax,
      grandTotal
    };

    const newOrder = placeOrder(orderPayload);
    clearCart();
    showToast('Order placed successfully! 🎉 Redirecting to tracking...');
    setActiveTab('tracking');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-slate-500">
          <Truck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">No items in your cart to checkout</h2>
        <button onClick={() => setActiveTab('menu')} className="btn-primary text-xs">
          Browse Delicious Menu
        </button>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 space-y-8">
      {/* Title */}
      <div>
        <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block mb-1">
          Finalize Order
        </span>
        <h1 className="text-3xl font-black text-white">Express Checkout</h1>
      </div>

      <form onSubmit={handlePlaceOrderSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Saved Address Selector */}
          {user && user.addresses && user.addresses.length > 0 && (
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" /> Saved Delivery Addresses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => handleSavedAddrSelect(addr)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      selectedAddrId === addr.id
                        ? 'bg-orange-500/15 border-orange-500/50 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-xs text-white block mb-0.5">{addr.title}</span>
                    <p className="text-[11px] text-slate-400 truncate">{addr.street}</p>
                    <p className="text-[11px] text-slate-400">{addr.city}, {addr.zip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery Address Details */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-orange-400" /> Delivery Address Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Recipient Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="custom-input text-xs pl-9"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number for Driver</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="custom-input text-xs pl-9"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Street & Apartment / Suite</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="742 Evergreen Terrace, Apt 4B"
                className="custom-input text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="custom-input text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Zip Code</label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="custom-input text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Delivery Notes (Optional)</label>
              <input
                type="text"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="Gate code #4490, leave at front door..."
                className="custom-input text-xs"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-orange-400" /> Select Payment Method
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-orange-500/15 border-orange-500/50 text-orange-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Credit / Debit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'wallet'
                    ? 'bg-orange-500/15 border-orange-500/50 text-orange-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Wallet className="w-5 h-5" />
                <span>Digital Wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-orange-500/15 border-orange-500/50 text-orange-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {/* Interactive Visual Card Input Form */}
            {paymentMethod === 'card' && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="custom-input text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="custom-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">CVC Code</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="custom-input text-xs"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-emerald-400 pt-1 font-semibold">
                  <Lock className="w-3 h-3" /> Encrypted 256-Bit SSL Payment Protection
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-white border-b border-slate-800 pb-3">
              Order Items Summary ({cartItems.length})
            </h3>

            {/* Item list preview */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.cartKey} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <span className="font-bold text-white block">{item.name}</span>
                      <span className="text-slate-400 text-[11px]">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-200">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="border-t border-slate-800 pt-3 space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-200">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Promo Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-slate-200">
                  {deliveryFee === 0 ? <span className="text-emerald-400">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-bold text-slate-200">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-gradient">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Action */}
            <button
              type="submit"
              className="btn-primary w-full text-sm font-bold !py-4 shadow-xl"
            >
              <span>Place Order (${grandTotal.toFixed(2)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
