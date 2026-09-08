import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  const isError = toastMessage.type === 'error';
  const isInfo = toastMessage.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-xl border ${
          isError
            ? 'bg-rose-950/90 border-rose-500/40 text-rose-200'
            : isInfo
            ? 'bg-slate-900/90 border-slate-700 text-slate-200'
            : 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
        }`}
      >
        {isError ? (
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
        ) : isInfo ? (
          <Info className="w-5 h-5 text-sky-400 shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        )}
        <span className="text-sm font-semibold pr-2">{toastMessage.text}</span>
      </div>
    </div>
  );
};
