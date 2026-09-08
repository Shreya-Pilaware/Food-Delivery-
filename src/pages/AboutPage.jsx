import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  Flame,
  Clock,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Send,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const AboutPage = () => {
  const { showToast } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    showToast('Message sent! Our kitchen manager will contact you shortly.');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const faqs = [
    {
      q: 'What is your average delivery time guarantee?',
      a: 'We guarantee hot delivery in 25 to 35 minutes across our entire delivery radius. If your meal takes longer than 40 minutes, your order is 100% free!'
    },
    {
      q: 'Do you offer vegetarian, vegan, and gluten-free options?',
      a: 'Yes! Over 45% of our menu items are certified vegetarian, vegan, or gluten-free. Every dish card clearly lists dietary badges.'
    },
    {
      q: 'How do promo coupon codes work at checkout?',
      a: 'Simply enter code YUMMY20 at checkout for 20% OFF orders over $25, or WELCOME10 for 10% OFF. You can also use code FREEDELIVERY.'
    },
    {
      q: 'Can I track my driver in real-time?',
      a: 'Absolutedly! Once your order is sent to the kitchen, click "Track Order" in the top navigation bar to see live step progress and driver location updates.'
    }
  ];

  return (
    <div className="container-custom py-8 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block">
          Our Culinary Story
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
          Handcrafted Gourmet Meals Delivered With Passion
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Founded in 2024, FlavorCraft brings restaurant-grade fine dining straight to your dining table with organic ingredients, wood-fired ovens, and zero frozen compromises.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Wood-Fired Perfection</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our pizzas are baked in authentic Italian sourdough stone ovens at 900°F for crisp yet airy perfection.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">100% Organic Sourcing</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We partner with certified local organic farmers to bring farm-fresh vegetables, grass-fed beef, and wild-caught seafood.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Michelin Trained Chefs</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our kitchen team is led by veteran chefs obsessed with flavor balance, rich reductions, and beautiful presentation.
          </p>
        </div>
      </div>

      {/* Contact Form & Location Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white">Get in Touch</h2>
            <p className="text-xs text-slate-400">Have questions about catering, allergies, or feedback? Send us a message!</p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Shreya Sharma"
                  className="custom-input text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="shreya@example.com"
                  className="custom-input text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Catering Inquiry / Feedback..."
                className="custom-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can our kitchen help you today?"
                rows={4}
                className="custom-input text-xs"
                required
              />
            </div>

            <button type="submit" className="btn-primary text-xs font-bold !py-3">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>

        {/* Location & Hours Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <h2 className="text-2xl font-black text-white">Central Kitchen</h2>

            <ul className="space-y-4 text-xs">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Main Kitchen Location</span>
                  <span className="text-slate-400">742 Gourmet Way, Culinary District, CA 90210</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Customer Support Phone</span>
                  <span className="text-slate-400">+1 (800) 555-FOOD (3663)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Email Support</span>
                  <span className="text-slate-400">support@flavorcraft.com</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Opening Operating Hours</span>
                  <span className="text-slate-400">Monday - Sunday: 10:00 AM - 11:30 PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-orange-400" />
          <h2 className="text-2xl font-black text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-orange-400' : ''}`} />
              </button>

              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
