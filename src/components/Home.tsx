import React from 'react';
import { motion } from 'motion/react';
import { products, reviews } from '../data';
import { Star, ChevronRight } from 'lucide-react';

export default function Home({ onNavigate }: { onNavigate: (v: any, id?: string) => void }) {
  return (
    <div className="pb-24 overflow-hidden">
      {/* Scrolling Text Marquee */}
      <div className="relative w-full py-4 bg-brand overflow-hidden flex items-center border-y-4 border-black/50 z-10 shadow-[0_0_50px_rgba(212,48,37,0.3)]">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Double the content so it loops smoothly */}
          <div className="flex gap-8 text-white font-display font-black text-3xl uppercase tracking-tighter shrink-0 pr-8">
            {Array(10).fill("HEAR THE UNSEEN • FEEL THE POWER • REFERENCE QUALITY • PURE BASS • ").map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </div>
          <div className="flex gap-8 text-white font-display font-black text-3xl uppercase tracking-tighter shrink-0 pr-8">
            {Array(10).fill("HEAR THE UNSEEN • FEEL THE POWER • REFERENCE QUALITY • PURE BASS • ").map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Shop By Category */}
      <section className="max-w-7xl mx-auto px-6 pt-16">
        <h2 className="font-display text-2xl font-black uppercase tracking-tight mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { name: 'Over-Ear', img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400' },
            { name: 'In-Ear', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=400' },
            { name: 'Speakers', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=400' },
            { name: 'Accessories', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400' }
          ].map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col items-center"
              onClick={() => {
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="w-full aspect-square rounded-full bg-[#16161A] border-4 border-[#1C1512] group-hover:border-brand transition-colors overflow-hidden mb-4 p-4 shadow-lg">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-full mix-blend-lighten group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="font-display font-bold uppercase tracking-widest text-sm group-hover:text-brand transition-colors">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="catalog-section" className="max-w-7xl mx-auto px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <span className="text-[10px] uppercase tracking-widest text-brand-light font-bold mb-2 block">Catalog</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">Precision Audio Lineup</h2>
            <p className="text-white/60">Masterfully crafted for every listening environment.</p>
          </div>
          <button 
            onClick={() => onNavigate('compare')}
            className="hidden md:flex items-center gap-1 text-brand-light hover:text-brand transition-colors text-sm font-bold uppercase tracking-widest"
          >
            Compare All <ChevronRight size={18} />
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group cursor-pointer"
              onClick={() => onNavigate('product', product.id)}
            >
              <div className="bg-[#16161A] rounded-2xl p-6 border border-white/5 hover:border-brand transition-all duration-300 h-full flex flex-col group-hover:shadow-[0_0_30px_rgba(212,48,37,0.15)] group-hover:-translate-y-2">
                <div className="relative aspect-square mb-6 overflow-hidden rounded-xl bg-black/40 border border-white/10 group-hover:border-brand/30 transition-colors">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-lighten opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute top-4 right-4 font-display font-black text-xl text-brand drop-shadow-md bg-black/50 px-3 py-1 rounded-md backdrop-blur-sm">
                    ${product.price}
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-brand font-black mb-1 block">{product.type} Tier</span>
                <h3 className="font-display text-3xl font-black tracking-tight mb-2 group-hover:text-brand transition-colors">{product.name}</h3>
                <p className="text-white/50 font-medium text-sm mb-6 flex-grow">{product.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {product.features.slice(0,2).map(f => (
                    <div key={f} className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:border-brand/20 transition-colors">
                      <span className="text-[10px] text-white/50 uppercase block leading-tight font-bold">{f}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 rounded-xl bg-brand hover:bg-brand-hover text-white font-black uppercase tracking-widest transition-transform group-hover:scale-[1.02]">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Full Width Promo Banner */}
      <section className="mt-24 w-full bg-brand relative overflow-hidden flex items-center justify-center py-24 px-6">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=2000" alt="Promo background" className="w-full h-full object-cover opacity-20 mix-blend-multiply" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">Unleash the Bass</h2>
          <p className="text-xl text-white/90 font-medium mb-8 max-w-2xl mx-auto">Our new line of party speakers are here to dominate your next event. Waterproof, drop-proof, and dangerously loud.</p>
          <button className="bg-white text-brand px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 hover:scale-110 shadow-2xl">
            Shop Party Speakers
          </button>
        </div>
      </section>

      {/* Reviews Marquee/Grid */}
      <section className="max-w-7xl mx-auto px-6 pt-32">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-widest text-brand-light font-bold mb-2 block">Testimonials</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">Audiophile Approved</h2>
          <p className="text-white/60">Don't just take our word for it.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => {
            const product = products.find(p => p.id === review.productId);
            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#16161A] p-6 rounded-2xl border border-white/5 hover:border-brand-light/20 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-brand-light">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" className="text-brand-light" />)}
                  </div>
                  <p className="text-sm leading-relaxed text-white/80 mb-6">"{review.text}"</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                  <span className="text-[10px] uppercase text-brand-light font-bold">— {review.author}</span>
                  <span className="text-[10px] text-white/40">Purchased {product?.name}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  );
}
