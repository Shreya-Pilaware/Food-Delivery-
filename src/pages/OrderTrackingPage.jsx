import React, { useEffect } from 'react';
import { useOrders } from '../context/OrderContext';
import confetti from 'canvas-confetti';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Flame,
  Phone,
  ArrowRight,
  Sparkles,
  ChefHat,
  PackageCheck
} from 'lucide-react';

export const OrderTrackingPage = ({ setActiveTab }) => {
  const { activeOrder, advanceActiveOrderStatus } = useOrders();

  useEffect(() => {
    // Fire celebratory confetti when tracking page opens
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  if (!activeOrder) {
    return (
      <div className="container-custom py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-slate-500">
          <Truck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">No Active Order Found</h2>
        <p className="text-xs text-slate-400">Place an order to track kitchen preparation and live driver progress!</p>
        <button onClick={() => setActiveTab('menu')} className="btn-primary text-xs">
          Explore Menu & Order Now
        </button>
      </div>
    );
  }

  const steps = [
    { title: 'Order Placed', desc: 'Received & sent to kitchen', icon: PackageCheck, statusKey: 'Order Placed' },
    { title: 'Preparing Dish', desc: 'Chef assembling organic ingredients', icon: ChefHat, statusKey: 'Preparing' },
    { title: 'Out for Delivery', desc: 'Driver en route with thermal bag', icon: Truck, statusKey: 'Out for Delivery' },
    { title: 'Delivered', desc: 'Enjoy your artisan meal!', icon: CheckCircle2, statusKey: 'Delivered' }
  ];

  const currentStepIndex = steps.findIndex((s) => s.statusKey === activeOrder.status);

  return (
    <div className="container-custom py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-950/60 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl border border-orange-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-emerald-400" /> Live Tracker Active
          </span>
          <h1 className="text-3xl font-black text-white">
            Order #{activeOrder.id}
          </h1>
          <p className="text-xs text-slate-400">
            Placed on {new Date(activeOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Estimated Arrival in 20-30 mins
          </p>
        </div>

        {/* Advance Order Status Simulation Button */}
        {activeOrder.status !== 'Delivered' && (
          <button
            onClick={advanceActiveOrderStatus}
            className="btn-primary text-xs !py-3 !px-5 shadow-lg flex items-center gap-2"
          >
            <span>Simulate Next Stage ({activeOrder.status})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline & Map Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step Progress Tracker */}
          <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8">
            <h3 className="font-extrabold text-base text-white border-b border-slate-800 pb-4">
              Real-Time Kitchen & Delivery Progression
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
              {steps.map((step, idx) => {
                const IconComponent = step.icon;
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={idx} className="flex flex-col items-center text-center space-y-3 relative z-10">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        isCurrent
                          ? 'bg-gradient-orange text-white ring-4 ring-orange-500/30 scale-110 shadow-xl'
                          : isPassed
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-950 text-slate-600 border border-slate-800'
                      }`}
                    >
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <div>
                      <h4 className={`font-bold text-xs ${isPassed ? 'text-white' : 'text-slate-500'}`}>
                        {step.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Delivery Driver & Map Simulation Card */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-orange flex items-center justify-center text-white font-bold text-sm">
                  MD
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Driver: Marcus D.</h4>
                  <p className="text-xs text-orange-400 font-semibold">Toyota Prius • License #7XYZ99</p>
                </div>
              </div>
              <a
                href="tel:+15550000000"
                className="btn-secondary text-xs !py-2 !px-3"
              >
                <Phone className="w-3.5 h-3.5" /> Call Driver
              </a>
            </div>

            {/* Visual Simulated Map View */}
            <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              {/* Map background grid visual */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-gradient-orange text-white flex items-center justify-center mx-auto animate-bounce shadow-2xl">
                  <Truck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white block">
                  {activeOrder.status === 'Delivered'
                    ? 'Driver arrived at destination!'
                    : activeOrder.status === 'Out for Delivery'
                    ? 'Driver is 8 mins away from your door'
                    : 'Kitchen is preparing your order'}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  Destination: {activeOrder.deliveryAddress}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-white border-b border-slate-800 pb-3">
              Order Details
            </h3>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-800 text-orange-400 font-bold flex items-center justify-center text-[10px]">
                      {item.quantity}x
                    </span>
                    <span className="font-semibold text-slate-200">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-400">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${activeOrder.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${activeOrder.deliveryFee?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                <span>Total Paid</span>
                <span className="text-gradient">${activeOrder.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
