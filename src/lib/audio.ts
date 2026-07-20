/**
 * A simple synthesizer that simulates a "sound profile" test
 * using the Web Audio API. 
 */
export class AudioTestEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private dataArray: Uint8Array | null = null;
  private animationFrameId: number | null = null;

  start(profile: 'bass-heavy' | 'balanced' | 'treble-focused', onData: (data: Uint8Array) => void) {
    if (this.isPlaying) this.stop();
    
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;
    
    this.masterGain = this.ctx.createGain();
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
    
    // Smooth fade in
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.5);

    const freqs = this.getFrequenciesForProfile(profile);
    
    freqs.forEach(freq => {
      const osc = this.ctx!.createOscillator();
      const oscGain = this.ctx!.createGain();
      
      osc.type = freq < 100 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
      
      // Add a slight LFO for texture
      const lfo = this.ctx!.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 2; // 2Hz
      const lfoGain = this.ctx!.createGain();
      lfoGain.gain.value = 10;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      
      // Balance volumes
      oscGain.gain.value = freq < 200 ? 0.8 : (freq > 2000 ? 0.4 : 0.6);
      
      osc.connect(oscGain);
      oscGain.connect(this.masterGain!);
      osc.start();
      
      this.oscillators.push(osc);
      this.oscillators.push(lfo);
    });

    this.isPlaying = true;
    
    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);
    
    const updateLoop = () => {
      if (!this.isPlaying || !this.analyser || !this.dataArray) return;
      this.analyser.getByteFrequencyData(this.dataArray);
      onData(this.dataArray);
      this.animationFrameId = requestAnimationFrame(updateLoop);
    };
    
    updateLoop();
  }

  stop() {
    if (!this.isPlaying) return;
    
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    }
    
    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try { osc.stop(); } catch(e) {}
        osc.disconnect();
      });
      this.oscillators = [];
      
      if (this.ctx) {
        this.ctx.close();
        this.ctx = null;
      }
      this.analyser = null;
      this.masterGain = null;
      this.isPlaying = false;
    }, 600);
  }

  private getFrequenciesForProfile(profile: string): number[] {
    switch (profile) {
      case 'bass-heavy':
        // C major chord but bass heavy (C2, G2, C3, E3)
        return [65.41, 98.00, 130.81, 164.81];
      case 'treble-focused':
        // C major chord higher register (C4, E4, G4, C5)
        return [261.63, 329.63, 392.00, 523.25];
      case 'balanced':
      default:
        // C major spread across spectrum (C3, G3, E4, C5)
        return [130.81, 196.00, 329.63, 523.25];
    }
  }
}
