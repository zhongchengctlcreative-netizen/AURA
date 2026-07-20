import React from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (view: any) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const scrollToCatalog = () => {
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Abstract background blobs */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-brand-light/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="text-[12px] uppercase tracking-[0.3em] text-brand font-black mb-4 block">Dare to listen</span>
          <h1 className="font-display text-6xl md:text-8xl font-black tracking-tighter leading-[1] mb-6 uppercase">
            Hear the <span className="text-brand">unseen.</span><br/>Feel the <span className="text-brand">power.</span>
          </h1>
          <p className="text-base text-white/80 mb-8 max-w-lg leading-relaxed font-medium">
            Premium acoustics engineered for the bold. Experience breathtaking clarity, profound bass, and an unapologetic design that commands attention.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={scrollToCatalog}
              className="bg-brand text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-brand-hover transition-transform hover:scale-105 shadow-lg shadow-brand/20 flex items-center gap-2 text-sm"
            >
              Explore Collection
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          {/* Glowing rings */}
          <div className="aspect-square rounded-full border border-brand/30 absolute inset-0 animate-[spin_60s_linear_infinite] shadow-[0_0_100px_rgba(212,48,37,0.2)]"></div>
          <div className="aspect-square rounded-full border border-brand/50 absolute inset-8 animate-[spin_40s_linear_infinite_reverse]"></div>
          <div className="aspect-square rounded-full border-2 border-brand/10 absolute inset-16 animate-[spin_20s_linear_infinite] border-t-brand/80"></div>
          
          {/* Animated Equalizer Bars in the background */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-30 blur-[2px]">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-4 bg-brand rounded-full"
                animate={{ 
                  height: ["20%", "80%", "40%", "100%", "30%"]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          <img 
            src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000" 
            alt="Aura Zenith Headphones" 
            className="relative z-10 w-full h-auto object-cover rounded-full mix-blend-lighten opacity-100"
            style={{ filter: 'drop-shadow(0 0px 80px rgba(212,48,37,0.6))' }}
          />
        </motion.div>
      </div>
    </section>
  );
}

