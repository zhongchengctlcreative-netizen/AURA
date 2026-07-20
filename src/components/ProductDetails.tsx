import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShoppingCart, Check, Shield, Truck, RefreshCw, ChevronDown } from 'lucide-react';
import { products, reviews } from '../data';
import { Product } from '../types';

interface ProductDetailsProps {
  productId: string;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetails({ productId, onBack, onAddToCart }: ProductDetailsProps) {
  const product = products.find(p => p.id === productId);
  const [added, setAdded] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'specs' | 'features'>('features');

  if (!product) return <div className="text-white p-8 flex items-center justify-center h-[50vh]">Product not found</div>;

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-white/60 hover:text-brand transition-colors mb-8 uppercase tracking-widest text-xs font-bold w-fit"
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      <div className="grid lg:grid-cols-2 gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative lg:sticky lg:top-24 aspect-square rounded-3xl bg-[#16161A] border border-white/5 overflow-hidden flex items-center justify-center p-8 group h-fit hover:border-brand hover:shadow-[0_0_50px_rgba(212,48,37,0.2)] transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover mix-blend-lighten opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col pt-4"
        >
          <span className="text-[10px] uppercase tracking-widest text-brand-light font-bold mb-4 block">{product.type} Series</span>
          <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight mb-4">{product.name}</h1>
          <p className="text-xl text-white/80 mb-6 font-light">{product.tagline}</p>
          <div className="text-4xl font-mono text-white mb-8 border-b border-white/5 pb-8">${product.price}</div>
          
          <p className="text-white/60 mb-10 leading-relaxed text-lg">
            {product.description}
          </p>

          <button 
            onClick={handleAdd}
            className={`w-full py-5 rounded-xl font-black uppercase tracking-widest text-white transition-all flex items-center justify-center gap-3 mb-12 ${
              added ? 'bg-green-600 hover:bg-green-500 scale-[0.98]' : 'bg-brand hover:bg-brand-hover shadow-xl shadow-brand/20'
            }`}
          >
            {added ? (
              <><Check size={22} /> Added to Cart</>
            ) : (
              <><ShoppingCart size={22} /> Add to Cart</>
            )}
          </button>

          <div className="space-y-4">
            {/* Features Accordion */}
            <div className="border border-white/5 rounded-2xl bg-[#16161A] overflow-hidden">
              <button 
                onClick={() => setExpandedSection(expandedSection === 'features' ? '' as any : 'features')}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-bold uppercase tracking-widest text-xs">Key Features</span>
                <ChevronDown size={18} className={`text-white/50 transition-transform ${expandedSection === 'features' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {expandedSection === 'features' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <ul className="space-y-3">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                          <Check size={14} className="text-brand shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Specs Accordion */}
            <div className="border border-white/5 rounded-2xl bg-[#16161A] overflow-hidden">
              <button 
                onClick={() => setExpandedSection(expandedSection === 'specs' ? '' as any : 'specs')}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-bold uppercase tracking-widest text-xs">Technical Specs</span>
                <ChevronDown size={18} className={`text-white/50 transition-transform ${expandedSection === 'specs' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {expandedSection === 'specs' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-white/40">Driver</span>
                        <span className="text-sm font-medium">{product.specs.driver}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-white/40">Freq. Response</span>
                        <span className="text-sm font-mono text-white/80">{product.specs.frequencyResponse}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-white/40">Battery</span>
                        <span className="text-sm font-medium">{product.specs.batteryLife}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-white/40">Connectivity</span>
                        <span className="text-sm font-medium">{product.specs.connectivity}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-24 grid md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center text-center p-8 bg-[#16161A] border border-white/5 rounded-3xl">
          <div className="w-14 h-14 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-5">
            <Shield size={24} />
          </div>
          <h3 className="font-display font-bold text-xl mb-2">2-Year Warranty</h3>
          <p className="text-sm text-white/50">Comprehensive coverage for your peace of mind.</p>
        </div>
        <div className="flex flex-col items-center text-center p-8 bg-[#16161A] border border-white/5 rounded-3xl">
          <div className="w-14 h-14 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-5">
            <Truck size={24} />
          </div>
          <h3 className="font-display font-bold text-xl mb-2">Free Global Shipping</h3>
          <p className="text-sm text-white/50">Insured express delivery directly to your door.</p>
        </div>
        <div className="flex flex-col items-center text-center p-8 bg-[#16161A] border border-white/5 rounded-3xl">
          <div className="w-14 h-14 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-5">
            <RefreshCw size={24} />
          </div>
          <h3 className="font-display font-bold text-xl mb-2">30-Day Returns</h3>
          <p className="text-sm text-white/50">Not fully satisfied? Return it for a full refund.</p>
        </div>
      </div>
    </div>
  );
}
