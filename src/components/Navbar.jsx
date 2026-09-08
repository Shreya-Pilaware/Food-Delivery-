import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import {
  Flame,
  ShoppingBag,
  User,
  Search,
  Truck,
  ShieldAlert,
  LogOut,
  ChevronDown,
  Menu,
  X,
  PlusCircle,
  LayoutDashboard
} from 'lucide-react';

export const Navbar = ({
  activeTab,
  setActiveTab,
  setIsCartOpen,
  setIsAuthOpen,
  searchQuery,
  setSearchQuery
}) => {
  const { totalItemCount, subtotal } = useCart();
  const { user, logout, activeRole, switchRole, quickLoginAdmin, quickLoginCustomer } = useAuth();
  const { activeOrder } = useOrders();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 glass-nav transition-all">
      <div className="container-custom flex items-center justify-between h-20">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-orange flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
              Flavor<span className="text-gradient">Craft</span>
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
              Artisan Food Express
            </span>
          </div>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex items-center relative w-72 lg:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== 'menu') setActiveTab('menu');
            }}
            placeholder="Search pizza, burger, ramen..."
            className="w-full bg-slate-900/80 border border-slate-700/60 rounded-full pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
          />
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 font-medium text-sm">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'home'
                ? 'text-orange-400 bg-orange-500/10 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('menu')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'menu'
                ? 'text-orange-400 bg-orange-500/10 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Explore Menu
          </button>

          {activeOrder && (
            <button
              onClick={() => handleNavClick('tracking')}
              className={`px-3 py-1.5 rounded-full flex items-center gap-2 border text-xs font-bold transition-all animate-pulse-glow ${
                activeTab === 'tracking'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800/80 text-amber-400 border-amber-500/30 hover:border-amber-400'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>Track Order ({activeOrder.status})</span>
            </button>
          )}

          <button
            onClick={() => handleNavClick('about')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'about'
                ? 'text-orange-400 bg-orange-500/10 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            About & Contact
          </button>
        </div>

        {/* Right Actions: Admin Switcher, Cart, Profile */}
        <div className="flex items-center gap-3">
          {/* Admin / Customer View Switcher */}
          <button
            onClick={() => {
              if (activeRole === 'admin') {
                switchRole('customer');
                setActiveTab('home');
              } else {
                quickLoginAdmin();
                setActiveTab('admin');
              }
            }}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              activeRole === 'admin'
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 hover:bg-purple-500/30'
                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-orange-500/40 hover:text-orange-400'
            }`}
            title="Switch between Customer app & Admin dashboard"
          >
            <LayoutDashboard className="w-4 h-4 text-purple-400" />
            <span>{activeRole === 'admin' ? 'Admin Mode' : 'Admin Panel'}</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-orange-500/50 text-slate-200 hover:text-white transition-all shadow-md group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
              {totalItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-orange text-white text-[11px] font-extrabold flex items-center justify-center shadow-lg">
                  {totalItemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-bold text-sm">
              ${subtotal.toFixed(2)}
            </span>
          </button>

          {/* User Account / Auth Dropdown */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-600 text-slate-200 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-orange flex items-center justify-center text-white font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden md:inline text-xs font-semibold max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl p-2 shadow-2xl border border-slate-700/80 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-slate-700/60 mb-1">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-orange-500/20 text-orange-400">
                        {user.role}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <User className="w-4 h-4 text-orange-400" />
                      My Profile & Addresses
                    </button>

                    {user.role === 'admin' && (
                      <button
                        onClick={() => {
                          setActiveTab('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-purple-300 hover:bg-purple-950/40 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-purple-400" />
                        Admin Dashboard
                      </button>
                    )}

                    <div className="border-t border-slate-700/60 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-950/40 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="btn-primary text-xs !py-2 !px-4"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-xl bg-slate-900 border border-slate-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-4 space-y-3 animate-fade-in">
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveTab('menu');
              }}
              placeholder="Search dishes..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200"
            />
          </div>

          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm ${
              activeTab === 'home' ? 'bg-orange-500/20 text-orange-400 font-bold' : 'text-slate-300'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('menu')}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm ${
              activeTab === 'menu' ? 'bg-orange-500/20 text-orange-400 font-bold' : 'text-slate-300'
            }`}
          >
            Explore Menu
          </button>
          {activeOrder && (
            <button
              onClick={() => handleNavClick('tracking')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm bg-amber-500/20 text-amber-300 flex items-center justify-between`}
            >
              <span>Track Order ({activeOrder.status})</span>
              <Truck className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm ${
              activeTab === 'about' ? 'bg-orange-500/20 text-orange-400 font-bold' : 'text-slate-300'
            }`}
          >
            About Us & Contact
          </button>

          <button
            onClick={() => {
              if (activeRole === 'admin') {
                switchRole('customer');
                setActiveTab('home');
              } else {
                quickLoginAdmin();
                setActiveTab('admin');
              }
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-center py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-bold"
          >
            Switch to {activeRole === 'admin' ? 'Customer App' : 'Admin Panel'}
          </button>
        </div>
      )}
    </nav>
  );
};
