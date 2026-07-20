import React from 'react';
import { motion } from 'motion/react';
import { Headphones, Menu } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: any) => void;
  cartCount: number;
}

export default function Navbar({ currentView, onNavigate, cartCount }: NavbarProps) {
  return (
    <div className="sticky top-0 z-50 shrink-0">
      <div className="bg-brand text-white text-[10px] md:text-xs font-bold uppercase tracking-widest text-center py-2 px-4 flex items-center justify-center gap-2">
        <span>Free 2-Day Shipping on orders over $50</span>
      </div>
      <nav className="h-16 px-8 border-b border-white/10 flex items-center justify-between bg-[#120E0C]/90 backdrop-blur-md">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => onNavigate('home')}
        >
          <div className="bg-brand text-white px-3 py-1.5 rounded-sm font-display font-black tracking-tighter text-2xl uppercase transform -skew-x-6 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(212,48,37,0.4)]">
            AURA
          </div>
        </div>

      <div className="hidden md:flex gap-8 text-sm font-medium text-white/60 h-full items-center">
        <button 
          onClick={() => onNavigate('home')}
          className={`hover:text-white transition-colors h-full flex items-center ${currentView === 'home' || currentView === 'product' ? 'text-white border-b-2 border-brand-light' : ''}`}
        >
          Home
        </button>
        <button 
          onClick={() => onNavigate('compare')}
          className={`hover:text-white transition-colors h-full flex items-center ${currentView === 'compare' ? 'text-white border-b-2 border-brand-light' : ''}`}
        >
          Compare Models
        </button>
        <button 
          onClick={() => onNavigate('support')}
          className={`hover:text-white transition-colors h-full flex items-center ${currentView === 'support' ? 'text-white border-b-2 border-brand-light' : ''}`}
        >
          Support
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => onNavigate('account')}
          className={`hidden md:block hover:text-brand transition-colors ${currentView === 'account' ? 'text-brand' : 'text-white/60'}`}
          title="Account"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
        <button 
          onClick={() => onNavigate('cart')}
          className="hidden md:block px-5 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors"
        >
          Cart ({cartCount})
        </button>
        <button className="md:hidden text-white/60">
          <Menu size={24} />
        </button>
      </div>
    </nav>
    </div>
  );
}
