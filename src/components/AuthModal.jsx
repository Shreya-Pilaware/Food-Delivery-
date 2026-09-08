import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { X, Mail, Lock, User, Phone, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { login, signup, quickLoginCustomer, quickLoginAdmin } = useAuth();
  const { showToast } = useCart();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'login') {
      if (!email || !password) {
        setErrorMsg('Please enter both email and password.');
        return;
      }
      login(email, password);
      showToast('Logged in successfully! Welcome back.');
      onClose();
    } else {
      if (!fullName || !email || !phone || !password) {
        setErrorMsg('All fields are required.');
        return;
      }
      signup(fullName, email, phone);
      showToast('Account created successfully!');
      onClose();
    }
  };

  const handleQuickCustomer = () => {
    quickLoginCustomer();
    showToast('Logged in as Demo Customer');
    onClose();
  };

  const handleQuickAdmin = () => {
    quickLoginAdmin();
    showToast('Logged in as Demo Admin');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-gradient-orange text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-gradient-orange text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        <h2 className="text-xl font-black text-white mb-1">
          {mode === 'login' ? 'Welcome Back!' : 'Join FlavorCraft'}
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          {mode === 'login'
            ? 'Sign in to order food, save addresses & track deliveries.'
            : 'Register in seconds to enjoy fast food ordering & discounts.'}
        </p>

        {/* Demo Quick Logins */}
        <div className="mb-6 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider block flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 fill-orange-400" /> One-Click Demo Logins
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickCustomer}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-orange-500/50 text-xs font-bold text-slate-200 hover:text-white transition-all text-left truncate"
            >
              👤 Demo Customer
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-500/50 text-xs font-bold text-purple-300 hover:text-white transition-all text-left truncate"
            >
              🛡️ Demo Admin
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Shreya Sharma"
                  className="custom-input text-xs pl-9"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@flavorcraft.com"
                className="custom-input text-xs pl-9"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="custom-input text-xs pl-9"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="custom-input text-xs pl-9"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full text-xs font-bold !py-3">
            <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
