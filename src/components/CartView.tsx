import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ArrowRight, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface CartViewProps {
  cart: {product: Product, quantity: number}[];
  onRemove: (id: string) => void;
  onNavigate: (view: any) => void;
}

export default function CartView({ cart, onRemove, onNavigate }: CartViewProps) {
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success'>('idle');
  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    setCheckoutState('processing');
    setTimeout(() => {
      setCheckoutState('success');
    }, 2000);
  };

  if (checkoutState === 'success') {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-8"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h1 className="font-display text-4xl font-bold tracking-tight mb-4">Order Confirmed</h1>
        <p className="text-white/60 mb-8 max-w-md">Thank you for your purchase. We've sent a confirmation email with your order details.</p>
        <button 
          onClick={() => {
            // Ideally we would clear cart here via prop
            onNavigate('home');
          }}
          className="bg-brand text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-hover transition-colors shadow-lg shadow-brand/20"
        >
          Return to Store
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 text-white/20"
        >
          <ShoppingBag size={48} />
        </motion.div>
        <h1 className="font-display text-4xl font-bold tracking-tight mb-4">Your cart is empty</h1>
        <p className="text-white/60 mb-8 max-w-md">Looks like you haven't added any products to your cart yet. Explore our premium collection.</p>
        <button 
          onClick={() => onNavigate('home')}
          className="bg-brand text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-hover transition-colors shadow-lg shadow-brand/20"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight mb-12">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item.product.id} 
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                layout
                className="flex gap-6 bg-[#16161A] p-4 rounded-2xl border border-white/5"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-black/40 border border-white/10 overflow-hidden shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover mix-blend-lighten opacity-80" />
                </div>
                <div className="flex-grow py-2 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-brand-light font-bold mb-1 block">{item.product.type}</span>
                      <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">{item.product.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-lg text-white">${item.product.price}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-4">
                    <div className="text-sm text-white/40 font-medium">
                      Qty: {item.quantity}
                    </div>
                    <button 
                      onClick={() => onRemove(item.product.id)}
                      className="text-white/40 hover:text-brand transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#16161A] p-8 rounded-2xl border border-white/5 sticky top-24"
          >
            <h3 className="font-display text-2xl font-bold mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6 text-sm text-white/60">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-brand-light font-medium">Free Express</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-mono text-white">Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-end">
              <span className="font-bold text-white">Total</span>
              <span className="font-mono text-3xl text-white leading-none">${total.toFixed(2)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={checkoutState === 'processing'}
              className="w-full bg-brand text-white py-4 rounded-xl font-bold hover:bg-brand-hover transition-colors shadow-lg shadow-brand/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {checkoutState === 'processing' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Proceed to Checkout <ArrowRight size={18} /></>
              )}
            </button>
            <div className="mt-4 text-center flex items-center justify-center gap-2 text-white/30 text-xs">
              <ShieldCheckIcon size={14} /> Secure Encrypted Checkout
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheckIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  )
}
