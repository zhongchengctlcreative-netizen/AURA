import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Square } from 'lucide-react';
import { AudioTestEngine } from '../lib/audio';

interface AudioVisualizerProps {
  profile: 'bass-heavy' | 'balanced' | 'treble-focused';
  title?: string;
}

export default function AudioVisualizer({ profile, title = "Test Sound Signature" }: AudioVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const engineRef = useRef<AudioTestEngine | null>(null);

  useEffect(() => {
    engineRef.current = new AudioTestEngine();
    return () => {
      if (engineRef.current) {
        engineRef.current.stop();
      }
    };
  }, []);

  const togglePlayback = () => {
    if (isPlaying) {
      engineRef.current?.stop();
      setIsPlaying(false);
      setAudioData(null);
    } else {
      engineRef.current?.start(profile, (data) => {
        // Create a copy to trigger re-render
        setAudioData(new Uint8Array(data));
      });
      setIsPlaying(true);
    }
  };

  // Convert typed array to standard array for mapping, take first 16 bins for visualization
  const bins = audioData ? Array.from(audioData).slice(0, 16) : Array(16).fill(0);

  return (
    <div className="bg-[#16161A] rounded-2xl border border-white/5 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-brand-light font-bold mb-1 block capitalize">{profile.replace('-', ' ')} Profile</span>
          <h4 className="font-display text-2xl font-bold tracking-tight">{title}</h4>
        </div>
        <button
          onClick={togglePlayback}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform ${
            isPlaying ? 'bg-red-600 shadow-red-600/20' : 'bg-brand shadow-brand/20 hover:bg-brand-hover'
          }`}
          aria-label={isPlaying ? 'Stop playback' : 'Start playback'}
        >
          {isPlaying ? <Square className="w-6 h-6 text-white fill-current" /> : <Play className="w-6 h-6 text-white fill-current" />}
        </button>
      </div>

      <div className="h-32 flex items-end justify-between gap-1 w-full bg-black/40 rounded-xl p-4 border border-white/10 overflow-hidden relative">
        {/* Background grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
          <div className="border-b border-white w-full h-px"></div>
          <div className="border-b border-white w-full h-px"></div>
          <div className="border-b border-white w-full h-px"></div>
        </div>
        
        {bins.map((val, i) => {
          // Normalize value (0-255) to a height percentage
          const heightPct = isPlaying ? Math.max(4, (val / 255) * 100) : 4;
          
          return (
            <motion.div
              key={i}
              className="w-full rounded-t-sm"
              initial={{ height: '4%' }}
              animate={{ height: `${heightPct}%` }}
              transition={{ type: 'tween', duration: 0.1, ease: 'linear' }}
              style={{
                background: `var(--color-brand-light)`,
                opacity: 0.8 + (val / 255) * 0.2
              }}
            />
          );
        })}
      </div>
      
      <p className="mt-4 text-[10px] uppercase tracking-tighter text-white/50 text-center">
        {isPlaying ? 'Simulated Real-time Output...' : 'Click play to hear a synthesized profile representation.'}
      </p>
    </div>
  );
}
