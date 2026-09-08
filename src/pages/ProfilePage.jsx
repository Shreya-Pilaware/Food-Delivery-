import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import {
  User,
  MapPin,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  RotateCcw,
  Edit2,
  Phone,
  Mail,
  Building,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const ProfilePage = ({ setActiveTab }) => {
  const { user, updateProfile, addAddress, deleteAddress, setDefaultAddress } = useAuth();
  const { orders } = useOrders();
  const { addToCart, showToast } = useCart();

  const [activeTabSub, setActiveTabSub] = useState('orders'); // 'orders' | 'addresses' | 'settings'

  // Edit profile state
  const [name, setName] = useState(user ? user.name : '');
  const [phone, setPhone] = useState(user ? user.phone : '');

  // Add Address Form State
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [addrTitle, setAddrTitle] = useState('Home');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrZip, setAddrZip] = useState('');

  if (!user) {
    return (
      <div className="container-custom py-20 text-center space-y-4">
        <User className="w-16 h-16 text-slate-600 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Please sign in to view your profile</h2>
        <button onClick={() => setActiveTab('home')} className="btn-primary text-xs">
          Return Home
        </button>
      </div>
    );
  }

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile({ name, phone });
    showToast('Profile updated successfully!');
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!addrStreet || !addrCity || !addrZip) return;

    addAddress({
      title: addrTitle,
      fullName: user.name,
      phone: user.phone,
      street: addrStreet,
      city: addrCity,
      zip: addrZip
    });

    setAddrStreet('');
    setAddrCity('');
    setAddrZip('');
    setShowAddAddr(false);
    showToast('New delivery address added!');
  };

  const handleReorder = (orderItems) => {
    orderItems.forEach((item) => {
      addToCart(
        { id: item.id || item.foodId, name: item.name, price: item.price || item.unitPrice, image: item.image },
        item.quantity,
        item.selectedOptions || [],
        ''
      );
    });
    showToast('Order items added to cart!');
    setActiveTab('menu');
  };

  return (
    <div className="container-custom py-8 space-y-8">
      {/* Profile Header */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-orange flex items-center justify-center text-white text-2xl font-black shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{user.name}</h1>
            <p className="text-xs text-slate-400">{user.email} • {user.phone}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-orange-500/20 text-orange-400">
              {user.role} Account
            </span>
          </div>
        </div>

        {/* Sub tab navigation */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTabSub('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTabSub === 'orders' ? 'bg-gradient-orange text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTabSub('addresses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTabSub === 'addresses' ? 'bg-gradient-orange text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Saved Addresses
          </button>
          <button
            onClick={() => setActiveTabSub('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTabSub === 'settings' ? 'bg-gradient-orange text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Account Details
          </button>
        </div>
      </div>

      {/* Orders Tab */}
      {activeTabSub === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-xl font-black text-white">Your Past Orders ({orders.length})</h2>

          {orders.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No past orders found.</p>
          ) : (
            orders.map((ord) => (
              <div key={ord.id} className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-extrabold text-white text-base">Order #{ord.id}</span>
                    <span className="text-xs text-slate-400 block">
                      {new Date(ord.createdAt).toLocaleDateString()} at {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {ord.status}
                    </span>
                    <button
                      onClick={() => handleReorder(ord.items)}
                      className="btn-secondary text-xs !py-1.5 !px-3"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reorder All
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-slate-300">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="font-bold text-slate-400">${((item.price || item.unitPrice) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800/80 text-xs font-bold text-white">
                  <span>Total Amount</span>
                  <span className="text-orange-400 text-sm">${ord.total?.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Saved Addresses Tab */}
      {activeTabSub === 'addresses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white">Saved Delivery Addresses</h2>
            <button
              onClick={() => setShowAddAddr(!showAddAddr)}
              className="btn-primary text-xs !py-2 !px-4"
            >
              <Plus className="w-4 h-4" /> Add New Address
            </button>
          </div>

          {/* Add Address Form */}
          {showAddAddr && (
            <form onSubmit={handleAddAddressSubmit} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white">New Address Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={addrTitle}
                  onChange={(e) => setAddrTitle(e.target.value)}
                  placeholder="Title (e.g. Home, Work, Gym)"
                  className="custom-input text-xs"
                  required
                />
                <input
                  type="text"
                  value={addrStreet}
                  onChange={(e) => setAddrStreet(e.target.value)}
                  placeholder="Street Address & Apt #"
                  className="custom-input text-xs"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={addrCity}
                  onChange={(e) => setAddrCity(e.target.value)}
                  placeholder="City"
                  className="custom-input text-xs"
                  required
                />
                <input
                  type="text"
                  value={addrZip}
                  onChange={(e) => setAddrZip(e.target.value)}
                  placeholder="Zip Code"
                  className="custom-input text-xs"
                  required
                />
              </div>
              <button type="submit" className="btn-primary text-xs">
                Save Address
              </button>
            </form>
          )}

          {/* Address List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.addresses?.map((addr) => (
              <div key={addr.id} className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-400" /> {addr.title}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Default
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400">{addr.street}</p>
                <p className="text-xs text-slate-400">{addr.city}, {addr.zip}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-xs text-orange-400 hover:underline font-semibold"
                    >
                      Make Default
                    </button>
                  )}
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-slate-500 hover:text-rose-400 text-xs flex items-center gap-1 ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Account Settings Tab */}
      {activeTabSub === 'settings' && (
        <form onSubmit={handleProfileSave} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 max-w-lg space-y-4">
          <h2 className="text-xl font-black text-white">Edit Profile Info</h2>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="custom-input text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="custom-input text-xs"
            />
          </div>
          <button type="submit" className="btn-primary text-xs">
            Save Profile Changes
          </button>
        </form>
      )}
    </div>
  );
};
