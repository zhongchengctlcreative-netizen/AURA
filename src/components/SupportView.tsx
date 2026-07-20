import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Phone, MapPin, Search, Send, CheckCircle2 } from 'lucide-react';

export default function SupportView() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-[10px] uppercase tracking-widest text-brand-light font-bold mb-4 block">Help Center</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">How can we assist you?</h1>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search for answers, products, or order status..." 
            className="w-full bg-[#16161A] border border-white/10 rounded-2xl px-6 py-4 pl-12 text-white placeholder:text-white/30 focus:outline-none focus:border-brand transition-colors group-hover:border-white/20"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-brand transition-colors" size={20} />
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: MessageSquare, title: 'Live Chat', desc: 'Chat with our audio experts directly. Available 24/7.', action: 'Start Chat', onClick: () => alert('Live chat feature coming soon!') },
          { icon: Mail, title: 'Email Support', desc: "Send us an email and we'll respond within 24 hours.", action: 'support@aura.com', onClick: () => window.location.href = 'mailto:support@aura.com' },
          { icon: Phone, title: 'Phone Call', desc: 'Speak to a representative for complex technical issues.', action: '+1 (800) 123-AURA', onClick: () => window.location.href = 'tel:+1800123AURA' },
        ].map((item, i) => (
          <motion.button 
            key={i}
            onClick={item.onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#16161A] border border-white/5 p-8 rounded-2xl hover:border-brand/30 hover:bg-[#1A1615] transition-all flex flex-col items-center text-center cursor-pointer group w-full"
          >
            <div className="w-14 h-14 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <item.icon size={26} strokeWidth={1.5} />
            </div>
            <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
            <p className="text-sm text-white/50 mb-6 leading-relaxed">{item.desc}</p>
            <span className="text-brand text-xs font-bold uppercase tracking-widest mt-auto group-hover:text-brand-light transition-colors">{item.action}</span>
          </motion.button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#16161A] border border-white/5 rounded-3xl p-10"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight mb-2">Send a Message</h2>
          <p className="text-white/50 text-sm mb-8">We'd love to hear from you. Fill out the form below.</p>
          
          {formState === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center h-[340px]"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">Message Sent</h3>
              <p className="text-white/60 mb-6">Thank you for reaching out. We will get back to you shortly.</p>
              <button 
                onClick={() => setFormState('idle')}
                className="text-brand text-sm font-bold uppercase tracking-widest hover:text-brand-light transition-colors"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest block mb-2">First Name</label>
                  <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors text-sm" placeholder="Jane" />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest block mb-2">Last Name</label>
                  <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors text-sm" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest block mb-2">Email Address</label>
                <input required type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors text-sm" placeholder="jane@example.com" />
              </div>
              <div>
                <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest block mb-2">Message</label>
                <textarea required rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors text-sm resize-none" placeholder="How can we help?"></textarea>
              </div>
              <button 
                disabled={formState === 'submitting'}
                className="w-full bg-brand text-white py-4 rounded-xl font-bold hover:bg-brand-hover transition-colors shadow-lg shadow-brand/20 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {formState === 'submitting' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Send Message <Send size={16} /></>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Store Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#16161A] border border-white/5 rounded-3xl overflow-hidden flex flex-col"
        >
          <div className="aspect-video bg-black/40 relative">
             <img 
                src="https://images.unsplash.com/photo-1558459654-c430be5b0a44?auto=format&fit=crop&q=80&w=1000" 
                alt="Store Interior" 
                className="w-full h-full object-cover mix-blend-lighten opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16161A] to-transparent"></div>
          </div>
          <div className="p-10 relative z-10 -mt-20 flex-grow flex flex-col">
            <h2 className="font-display text-3xl font-bold tracking-tight mb-4">Visit our Flagship</h2>
            <p className="text-white/60 mb-8 leading-relaxed text-sm">
              Experience our premium audio equipment in person. Our acoustically treated listening rooms provide the perfect environment to audition our full range of products.
            </p>
            <div className="flex flex-col gap-6 mt-auto">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center shrink-0 border border-white/5">
                  <MapPin className="text-brand" size={18} />
                </div>
                <div>
                  <p className="font-bold text-white text-lg">Aura Acoustics NYC</p>
                  <p className="text-white/50 text-sm mt-1">100 Premium Sound Way<br/>New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
