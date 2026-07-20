import React, { useState } from 'react';
import { motion } from 'motion/react';
import { products } from '../data';
import AudioVisualizer from './AudioVisualizer';
import { Check, Info } from 'lucide-react';
import { Product } from '../types';

interface CompareViewProps {
  onAddToCart: (product: Product) => void;
}

export default function CompareView({ onAddToCart }: CompareViewProps) {
  // Select first two products by default
  const [selectedIds, setSelectedIds] = useState<string[]>([products[0].id, products[1].id]);
  const [addedId, setAddedId] = useState<string | null>(null);

  const toggleProduct = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(pid => pid !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // Replace last one if already 3 selected
        setSelectedIds([...selectedIds.slice(0, 2), id]);
      }
    }
  };

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const selectedProducts = selectedIds.map(id => products.find(p => p.id === id)!).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="text-[10px] uppercase tracking-widest text-brand-light font-bold mb-2 block">Comparison Lab</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">Compare Models</h1>
        <p className="text-white/60 text-sm">Select up to 3 products to compare specs and test sound signatures.</p>
      </motion.div>

      {/* Product Selector */}
      <div className="flex flex-wrap gap-4 mb-16">
        {products.map(p => {
          const isSelected = selectedIds.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => toggleProduct(p.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all ${
                isSelected 
                  ? 'bg-brand/10 border-brand text-white' 
                  : 'bg-[#16161A] border-white/5 text-white/60 hover:border-brand-light/50 hover:text-white'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-brand bg-brand text-white' : 'border-white/20'}`}>
                {isSelected && <Check size={12} strokeWidth={3} />}
              </div>
              <span className="text-sm font-medium">{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Comparison Grid */}
      <div className="overflow-x-auto pb-8">
        <div className="min-w-[800px]">
          <div className={`grid gap-6 ${
            selectedProducts.length === 1 ? 'grid-cols-2' : 
            selectedProducts.length === 2 ? 'grid-cols-3' : 'grid-cols-4'
          }`}>
            
            {/* Headers row (empty for first col) */}
            <div></div>
            {selectedProducts.map((p, i) => (
              <motion.div 
                key={`header-${p.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-48 h-48 rounded-xl bg-black/40 border border-white/10 overflow-hidden mb-4">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover mix-blend-lighten opacity-80" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-brand-light font-bold mb-1 block">{p.type}</span>
                <h3 className="font-display text-2xl font-bold tracking-tight">{p.name}</h3>
                <div className="text-xl font-mono text-white mt-2">${p.price}</div>
                <button 
                  onClick={() => handleAdd(p)}
                  className={`mt-4 px-6 py-2 rounded-xl font-bold transition-colors shadow-lg shadow-brand/20 ${
                    addedId === p.id ? 'bg-green-600 text-white' : 'bg-brand text-white hover:bg-brand-hover'
                  }`}
                >
                  {addedId === p.id ? 'Added' : 'Add to Cart'}
                </button>
              </motion.div>
            ))}

            {/* Spec: Sound Profile Tester */}
            <div className="col-span-full h-px bg-white/5 my-4"></div>
            <div className="flex items-center font-medium text-white/60 text-xs uppercase tracking-widest">
              <span className="flex items-center gap-2">Interactive Sound Test <Info size={16} className="text-white/40"/></span>
            </div>
            {selectedProducts.map(p => (
              <div key={`audio-${p.id}`} className="px-2">
                <AudioVisualizer profile={p.soundProfile} title={p.name} />
              </div>
            ))}

            {/* Spec: Driver */}
            <div className="col-span-full h-px bg-white/5 my-4"></div>
            <div className="flex items-center font-medium text-white/60 text-xs uppercase tracking-widest">Driver Unit</div>
            {selectedProducts.map(p => (
              <div key={`driver-${p.id}`} className="flex items-center justify-center text-center px-4 text-sm text-white/80">
                {p.specs.driver}
              </div>
            ))}

            {/* Spec: Frequency Response */}
            <div className="col-span-full h-px bg-white/5 my-4"></div>
            <div className="flex items-center font-medium text-white/60 text-xs uppercase tracking-widest">Freq. Response</div>
            {selectedProducts.map(p => (
              <div key={`freq-${p.id}`} className="flex items-center justify-center text-center px-4 font-mono text-sm text-white">
                {p.specs.frequencyResponse}
              </div>
            ))}

            {/* Spec: Battery Life */}
            <div className="col-span-full h-px bg-white/5 my-4"></div>
            <div className="flex items-center font-medium text-white/60 text-xs uppercase tracking-widest">Power / Battery</div>
            {selectedProducts.map(p => (
              <div key={`bat-${p.id}`} className="flex items-center justify-center text-center px-4 text-sm text-white/80">
                {p.specs.batteryLife}
              </div>
            ))}
            
            {/* Spec: Connectivity */}
            <div className="col-span-full h-px bg-white/5 my-4"></div>
            <div className="flex items-center font-medium text-white/60 text-xs uppercase tracking-widest">Connectivity</div>
            {selectedProducts.map(p => (
              <div key={`conn-${p.id}`} className="flex items-center justify-center text-center px-4">
                {p.specs.connectivity}
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
