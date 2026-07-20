import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, Package, Settings, LogOut, ShieldCheck, CreditCard } from 'lucide-react';

interface AccountViewProps {
  onNavigate: (view: any) => void;
}

export default function AccountView({ onNavigate }: AccountViewProps) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Check local storage for mocked auth session
  useEffect(() => {
    const session = localStorage.getItem('aura_auth_session');
    if (session) {
      setIsLoggedIn(true);
      setEmail(session);
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock authentication flow
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      localStorage.setItem('aura_auth_session', email);
    }, 1200);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    localStorage.removeItem('aura_auth_session');
  };

  if (isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-[12px] uppercase tracking-[0.3em] text-brand font-black mb-4 block">My Account</span>
          <h1 className="font-display text-4xl md:text-5xl font-black tracking-tighter mb-4">Welcome back</h1>
          <p className="text-white/60">{email}</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
            <button className="w-full text-left px-6 py-4 bg-[#16161A] border border-brand/50 text-brand rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-3">
              <Package size={16} /> Orders
            </button>
            <button className="w-full text-left px-6 py-4 hover:bg-[#16161A] text-white/60 hover:text-white rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 transition-colors">
              <Settings size={16} /> Settings
            </button>
            <button className="w-full text-left px-6 py-4 hover:bg-[#16161A] text-white/60 hover:text-white rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 transition-colors">
              <CreditCard size={16} /> Payment
            </button>
            <button 
              onClick={handleLogout}
              className="w-full text-left px-6 py-4 hover:bg-[#16161A] text-white/60 hover:text-brand-light rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 transition-colors mt-8"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-[#16161A] border border-white/5 rounded-3xl p-8 min-h-[400px]">
              <h2 className="font-display text-2xl font-black mb-8 border-b border-white/5 pb-6">Recent Orders</h2>
              <div className="flex flex-col items-center justify-center text-center py-16 h-full opacity-60">
                <Package size={48} className="text-white/20 mb-6" />
                <p className="text-lg font-medium text-white/80 mb-2">No recent orders</p>
                <p className="text-sm text-white/50 max-w-sm mb-6">Looks like you haven't made any purchases yet. Start exploring our premium acoustics.</p>
                <button 
                  onClick={() => onNavigate('home')}
                  className="bg-brand/10 text-brand px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-brand/20 transition-colors"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#16161A] border border-white/5 rounded-3xl p-8 md:p-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-brand-light"></div>
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="font-display text-3xl font-black tracking-tighter mb-2">
            {isLoginView ? 'Sign In' : 'Create Account'}
          </h1>
          <p className="text-white/50 text-sm">
            {isLoginView 
              ? 'Enter your credentials to access your account' 
              : 'Join Aura Acoustics for exclusive benefits'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          {!isLoginView && (
            <div>
              <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest block mb-2">Full Name</label>
              <div className="relative">
                <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:border-brand transition-colors text-sm" placeholder="Jane Doe" />
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              </div>
            </div>
          )}
          
          <div>
            <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest block mb-2">Email Address</label>
            <div className="relative">
              <input 
                required 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:border-brand transition-colors text-sm" 
                placeholder="jane@example.com" 
              />
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest block mb-2">Password</label>
            <div className="relative">
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:border-brand transition-colors text-sm" 
                placeholder="••••••••" 
              />
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          {isLoginView && (
            <div className="flex justify-end">
              <button type="button" className="text-brand text-xs font-bold hover:text-brand-light transition-colors">Forgot Password?</button>
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-hover transition-colors shadow-lg shadow-brand/20 flex items-center justify-center mt-6 disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              isLoginView ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-8">
          <p className="text-white/50 text-sm">
            {isLoginView ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-white font-bold hover:text-brand transition-colors"
            >
              {isLoginView ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
