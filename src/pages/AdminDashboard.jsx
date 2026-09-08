import React, { useState } from 'react';
import { useFood } from '../context/FoodContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  LayoutDashboard,
  Utensils,
  ShoppingBag,
  Users,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  X,
  AlertCircle
} from 'lucide-react';

export const AdminDashboard = ({ setActiveTab }) => {
  const { foodItems, addFoodItem, editFoodItem, deleteFoodItem, toggleStock, categories } = useFood();
  const { orders, updateOrderStatus } = useOrders();
  const { user } = useAuth();
  const { showToast } = useCart();

  const [adminTab, setAdminTab] = useState('dishes'); // 'dishes' | 'orders' | 'users'

  // New Dish Form Modal State
  const [showAddDish, setShowAddDish] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('pizza');
  const [price, setPrice] = useState('14.99');
  const [prepTime, setPrepTime] = useState('15-20 min');
  const [calories, setCalories] = useState('650 kcal');
  const [isVeg, setIsVeg] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80');

  // Metrics Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const activeDishesCount = foodItems.length;

  const handleAddDishSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description) return;

    addFoodItem({
      name,
      category,
      price: parseFloat(price),
      prepTime,
      calories,
      isVeg,
      description,
      image,
      isPopular: true
    });

    setName('');
    setDescription('');
    setShowAddDish(false);
    showToast('New food item added to menu!');
  };

  return (
    <div className="container-custom py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl border border-purple-500/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase">
            <LayoutDashboard className="w-3.5 h-3.5" /> Executive Admin Portal
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Kitchen & Orders Command Center</h1>
          <p className="text-xs text-slate-400">Manage food items, update live customer order statuses & monitor revenue.</p>
        </div>

        <button
          onClick={() => setShowAddDish(true)}
          className="btn-primary text-xs !py-3 !px-5 shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Dish Item
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase">Total Sales Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-white">${totalRevenue.toFixed(2)}</span>
          <span className="text-[11px] text-emerald-400 font-semibold block">+18.5% from last week</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-white">{totalOrdersCount}</span>
          <span className="text-[11px] text-orange-400 font-semibold block">Live processing active</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase">Menu Dishes Count</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-white">{activeDishesCount}</span>
          <span className="text-[11px] text-slate-400 font-semibold block">In 8 food categories</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase">Active Customers</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-white">1,420</span>
          <span className="text-[11px] text-amber-400 font-semibold block">Registered accounts</span>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 max-w-md">
        <button
          onClick={() => setAdminTab('dishes')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            adminTab === 'dishes' ? 'bg-gradient-orange text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Menu Food Items ({foodItems.length})
        </button>
        <button
          onClick={() => setAdminTab('orders')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            adminTab === 'orders' ? 'bg-gradient-orange text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Live Orders ({orders.length})
        </button>
      </div>

      {/* Add New Dish Modal */}
      {showAddDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <form
            onSubmit={handleAddDishSubmit}
            className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setShowAddDish(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white">Add New Food Item</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Dish Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Garlic Butter Lobster Roll"
                  className="custom-input text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="custom-input text-xs"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="custom-input text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Prep Time</label>
                <input
                  type="text"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  className="custom-input text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Diet Type</label>
                <select
                  value={isVeg ? 'veg' : 'nonveg'}
                  onChange={(e) => setIsVeg(e.target.value === 'veg')}
                  className="custom-input text-xs"
                >
                  <option value="veg">Vegetarian 🌿</option>
                  <option value="nonveg">Non-Vegetarian 🥩</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="custom-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="custom-input text-xs"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full text-xs font-bold !py-3">
              Save Food Item to Menu
            </button>
          </form>
        </div>
      )}

      {/* Dishes Management Tab */}
      {adminTab === 'dishes' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-white">Menu Food Items List</h3>
            <span className="text-xs text-slate-400">Click stock button to toggle in-stock / out-of-stock</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Dish</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Diet</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {foodItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <span className="font-bold text-white block">{item.name}</span>
                        <span className="text-[11px] text-slate-500">Rating {item.rating}★</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold uppercase">{item.category}</td>
                    <td className="p-4 font-bold text-white">${item.price.toFixed(2)}</td>
                    <td className="p-4">
                      {item.isVeg ? (
                        <span className="text-emerald-400 font-bold">Veg 🌿</span>
                      ) : (
                        <span className="text-rose-400 font-bold">Non-Veg 🥩</span>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStock(item.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold border transition-colors ${
                          item.outOfStock
                            ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                            : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                        }`}
                      >
                        {item.outOfStock ? 'Out of Stock' : 'In Stock'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          deleteFoodItem(item.id);
                          showToast('Dish deleted', 'info');
                        }}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Management Tab */}
      {adminTab === 'orders' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl space-y-4 p-5">
          <h3 className="font-extrabold text-sm text-white mb-2">Live Customer Orders</h3>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-extrabold text-white text-base">Order #{ord.id}</span>
                    <p className="text-xs text-slate-400">Customer: {ord.customerName} ({ord.customerPhone})</p>
                    <p className="text-xs text-slate-400">Address: {ord.deliveryAddress}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-semibold">Order Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs font-bold text-white px-3 py-1.5 rounded-xl focus:outline-none focus:border-orange-500"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  {ord.items.map((i, idx) => (
                    <div key={idx} className="flex justify-between text-slate-300">
                      <span>{i.quantity}x {i.name}</span>
                      <span className="font-bold text-slate-400">${((i.price || i.unitPrice) * i.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs font-bold text-white">
                  <span>Payment: {ord.paymentMethod}</span>
                  <span className="text-orange-400 text-sm">Total: ${ord.total?.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
