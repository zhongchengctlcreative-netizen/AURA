import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Home from './components/Home';
import CompareView from './components/CompareView';
import ProductDetails from './components/ProductDetails';
import CartView from './components/CartView';
import SupportView from './components/SupportView';
import AccountView from './components/AccountView';
import { Product } from './types';

export type ViewState = 'home' | 'compare' | 'support' | 'cart' | 'product' | 'account';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);

  const handleNavigate = (view: ViewState, productId?: string) => {
    setCurrentView(view);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar currentView={currentView} onNavigate={handleNavigate} cartCount={cartItemCount} />
      
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <Home onNavigate={handleNavigate} />
          </>
        )}
        {currentView === 'compare' && (
          <CompareView onAddToCart={addToCart} />
        )}
        {currentView === 'product' && selectedProductId && (
          <ProductDetails 
            productId={selectedProductId} 
            onBack={() => handleNavigate('home')} 
            onAddToCart={addToCart} 
          />
        )}
        {currentView === 'cart' && (
          <CartView cart={cart} onRemove={removeFromCart} onNavigate={handleNavigate} />
        )}
        {currentView === 'support' && (
          <SupportView />
        )}
        {currentView === 'account' && (
          <AccountView onNavigate={handleNavigate} />
        )}
      </main>

      <footer className="bg-[#0A0706] pt-16 pb-8 border-t border-white/5 mt-auto shrink-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="font-display font-black tracking-tighter text-2xl uppercase mb-6 text-white">AURA</div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">Premium acoustics engineered for the bold. Hear the unseen, feel the power.</p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-white">Products</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><button onClick={() => { handleNavigate('home'); setTimeout(() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-brand transition-colors text-left w-full">Headphones</button></li>
                <li><button onClick={() => { handleNavigate('home'); setTimeout(() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-brand transition-colors text-left w-full">Earbuds</button></li>
                <li><button onClick={() => { handleNavigate('home'); setTimeout(() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-brand transition-colors text-left w-full">Speakers</button></li>
                <li><button onClick={() => { handleNavigate('home'); setTimeout(() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-brand transition-colors text-left w-full">Accessories</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-white">Support</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><button onClick={() => handleNavigate('support')} className="hover:text-brand transition-colors cursor-pointer text-left w-full">Help Center</button></li>
                <li><button onClick={() => handleNavigate('support')} className="hover:text-brand transition-colors text-left w-full">Track Order</button></li>
                <li><button onClick={() => handleNavigate('support')} className="hover:text-brand transition-colors text-left w-full">Warranty Info</button></li>
                <li><button onClick={() => handleNavigate('support')} className="hover:text-brand transition-colors text-left w-full">Return Policy</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-white">Stay in the Loop</h4>
              <p className="text-white/50 text-sm mb-4">Sign up for exclusive offers and product news.</p>
              <form onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }} className="flex gap-2">
                <input type="email" required placeholder="Email address" className="bg-[#16161A] border border-white/10 rounded-lg px-4 py-2 text-sm text-white w-full focus:outline-none focus:border-brand" />
                <button type="submit" className="bg-brand text-white px-4 py-2 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-brand-hover">Join</button>
              </form>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30 uppercase tracking-widest font-bold">
            <div>© 2026 Aura Acoustics. All rights reserved.</div>
            <div className="flex gap-6">
              <button onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Privacy</button>
              <button onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Terms</button>
              <button onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

