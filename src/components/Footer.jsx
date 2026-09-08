import React from 'react';
import { Flame, Heart, Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12 mt-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-orange flex items-center justify-center text-white">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white">
                Flavor<span className="text-gradient">Craft</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Artisan handcrafted meals delivered smoking hot to your doorstep in 30 minutes or less. Made with organic, chef-curated ingredients.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-orange-400 cursor-pointer">
                <span>FB</span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-orange-400 cursor-pointer">
                <span>IG</span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-orange-400 cursor-pointer">
                <span>TW</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-orange-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('menu')} className="hover:text-orange-400 transition-colors">
                  Explore Full Menu
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tracking')} className="hover:text-orange-400 transition-colors">
                  Order Live Tracking
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-orange-400 transition-colors">
                  About Our Kitchen
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('profile')} className="hover:text-orange-400 transition-colors">
                  My Customer Account
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Kitchen & Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>742 Gourmet Way, Culinary District, CA 90210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>+1 (800) 555-FOOD (3663)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>orders@flavorcraft.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Mon - Sun: 10:00 AM - 11:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Stay Hungry</h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe for exclusive secret promos and 20% OFF coupon codes!
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-slate-500 block">No spam ever. Unsubscribe anytime.</span>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FlavorCraft Food Express Inc. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for food lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};
