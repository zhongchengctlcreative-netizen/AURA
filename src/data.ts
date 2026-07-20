import { Product, Review } from './types';

export const products: Product[] = [
  {
    id: 'aura-zenith',
    name: 'Aura Zenith',
    tagline: 'Absolute silence. Infinite sound.',
    description: 'Our flagship over-ear headphones featuring adaptive noise cancellation and studio-grade planar magnetic drivers. Experience music exactly as the artist intended.',
    price: 349,
    type: 'headphones',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
    features: ['Adaptive ANC', 'Planar Magnetic Drivers', 'Memory Foam Cushions', 'Spatial Audio'],
    specs: {
      driver: '40mm Planar Magnetic',
      frequencyResponse: '10Hz - 50kHz',
      batteryLife: '30 Hours',
      connectivity: 'Bluetooth 5.3 / 3.5mm / USB-C',
    },
    soundProfile: 'balanced',
    rating: 4.9,
  },
  {
    id: 'aura-pulse',
    name: 'Aura Pulse',
    tagline: 'Feel the rhythm. Anywhere.',
    description: 'True wireless earbuds engineered for active lifestyles. Deep, punchy bass and a secure fit that never lets you down during your most intense workouts.',
    price: 149,
    type: 'earbuds',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    features: ['IPX7 Water Resistant', 'Punchy Bass Boost', 'Ambient Passthrough', 'Ergonomic Fit'],
    specs: {
      driver: '10mm Dynamic',
      frequencyResponse: '20Hz - 20kHz',
      batteryLife: '8 Hours (32 with case)',
      connectivity: 'Bluetooth 5.3',
    },
    soundProfile: 'bass-heavy',
    rating: 4.7,
  },
  {
    id: 'aura-nexus',
    name: 'Aura Nexus',
    tagline: 'The heart of your living room.',
    description: 'A wireless bookshelf speaker system that delivers room-filling, crystal-clear acoustics. Hand-crafted wood veneer meets cutting-edge digital signal processing.',
    price: 499,
    type: 'speakers',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800',
    features: ['Room Calibration', 'High-Res Audio Support', 'Multi-room Sync', 'Analog Warmth'],
    specs: {
      driver: 'Dual 5.25" Woofers + 1" Tweeter',
      frequencyResponse: '40Hz - 40kHz',
      batteryLife: 'AC Powered',
      connectivity: 'Wi-Fi / Bluetooth 5.0 / RCA / Optical',
    },
    soundProfile: 'treble-focused',
    rating: 4.8,
  },
];

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Elena R.',
    rating: 5,
    date: '2023-10-12',
    text: 'The Zenith headphones are incredible. I use them for audio engineering and the flat response is chef\'s kiss. The comfort is unmatched for long sessions.',
    productId: 'aura-zenith',
  },
  {
    id: 'r2',
    author: 'Marcus T.',
    rating: 5,
    date: '2023-11-05',
    text: 'Aura Pulse got me through my marathon training. They DO NOT fall out. The bass gives that extra push when you need it most.',
    productId: 'aura-pulse',
  },
  {
    id: 'r3',
    author: 'Sarah Jenkins',
    rating: 4,
    date: '2023-09-22',
    text: 'The Nexus speakers look beautiful in my apartment. The highs are incredibly crisp, though I wish there was just a tiny bit more sub-bass. Still, amazing clarity.',
    productId: 'aura-nexus',
  },
  {
    id: 'r4',
    author: 'David Chen',
    rating: 5,
    date: '2023-12-01',
    text: 'Best ANC I\'ve ever experienced on the Zenith. Completely blocks out the subway noise.',
    productId: 'aura-zenith',
  }
];
